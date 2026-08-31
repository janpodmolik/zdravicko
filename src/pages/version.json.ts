import type { APIRoute } from "astro";

// Statický endpoint /version.json - vrací ID aktuálního buildu.
// Klient ho stahuje s cache-busting parametrem a porovnává se svým
// zapečeným PUBLIC_BUILD_ID. Nesouhlas = na serveru je novější verze webu.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({ buildId: import.meta.env.PUBLIC_BUILD_ID }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
