/**
 * DOM Helper utilities pro dynamické updaty UI elementů
 * Používá se v client-side scriptech pro změnu stylování na základě special notices
 */

/**
 * Aplikuje CSS třídy na element - buď modified nebo default
 */
export function applyConditionalClasses(
  element: HTMLElement | null,
  baseClasses: string,
  modifiedClasses: string | null,
  defaultClasses: string
): void {
  if (!element) return;

  // Reset na base strukturu
  element.className = baseClasses;

  // Aplikuj buď modified nebo default
  if (modifiedClasses) {
    const classes = modifiedClasses.split(" ").filter((c) => c);
    element.classList.add(...classes);
  } else {
    const classes = defaultClasses.split(" ").filter((c) => c);
    element.classList.add(...classes);
  }
}

/**
 * Toggle viditelnosti dvou ikon (default vs modified)
 */
export function toggleIcons(
  container: HTMLElement | null,
  showModified: boolean
): void {
  if (!container) return;

  const defaultIcon = container.querySelector<HTMLElement>(
    "[data-opening-icon='default']"
  );
  const modifiedIcon = container.querySelector<HTMLElement>(
    "[data-opening-icon='modified']"
  );

  if (defaultIcon && modifiedIcon) {
    if (showModified) {
      defaultIcon.classList.add("hidden");
      modifiedIcon.classList.remove("hidden");
    } else {
      defaultIcon.classList.remove("hidden");
      modifiedIcon.classList.add("hidden");
    }
  }
}

/**
 * Update stylování elementu s podporou data-opening-default-classes
 */
export function updateElementWithDefaults(
  selector: string,
  baseClasses: string,
  modifiedClasses: string | null,
  fallbackDefault?: string
): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  const defaultClasses =
    element.getAttribute("data-opening-default-classes") || fallbackDefault || "";

  applyConditionalClasses(element, baseClasses, modifiedClasses, defaultClasses);
}

/**
 * Update text contentu elementu
 */
export function updateTextContent(
  selector: string,
  content: string | null
): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  elements.forEach((el) => {
    el.textContent = content || "";
  });
}

/**
 * Toggle viditelnost elementu
 */
export function toggleVisibility(
  element: HTMLElement | null,
  visible: boolean
): void {
  if (!element) return;

  if (visible) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}
