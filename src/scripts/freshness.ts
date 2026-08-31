// Detekce zastaralé verze stránky v cache.
//
// GitHub Pages posílá pro HTML `cache-control: max-age=600`, takže prohlížeč
// (i CDN) smí až 10 minut servírovat starou stránku bez dotazu na server.
// Navíc mobilní prohlížeče obnovují karty z bfcache úplně bez sítě - stránka
// otevřená před pár dny se klidně zobrazí ve stavu, v jakém byla tehdy.
//
// Řešení: při každém zobrazení stránky stáhneme malý /version.json
// (s unikátním query parametrem, který obejde browser cache i CDN)
// a porovnáme ID buildu. Když se liší, stránku jednou obnovíme -
// reload vynutí revalidaci HTML a načte se čerstvá verze.

const RELOAD_GUARD_PREFIX = "zdravicko-reloaded-for-";

/**
 * Zkontroluje, jestli na serveru není novější build, a případně
 * stránku jednou obnoví. Pojistka přes sessionStorage brání smyčce
 * reloadů (např. když CDN chvíli po deployi ještě drží staré HTML).
 */
export async function reloadIfStale(): Promise<void> {
  const currentBuildId = import.meta.env.PUBLIC_BUILD_ID;
  if (!currentBuildId) return;

  try {
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) return;

    const data: { buildId?: string } = await response.json();
    if (!data.buildId || data.buildId === currentBuildId) return;

    // Novější build existuje - obnov stránku, ale jen jednou pro každou verzi
    const guardKey = `${RELOAD_GUARD_PREFIX}${data.buildId}`;
    let alreadyReloaded = false;
    try {
      alreadyReloaded = sessionStorage.getItem(guardKey) === "1";
      if (!alreadyReloaded) sessionStorage.setItem(guardKey, "1");
    } catch {
      // sessionStorage nemusí být dostupná (private mode) - reload přeskočíme,
      // jinak bychom riskovali nekonečnou smyčku
      return;
    }

    if (!alreadyReloaded) {
      window.location.reload();
    }
  } catch {
    // Offline nebo chyba sítě - ticho, zobrazí se zapečená verze
  }
}
