export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "nx-theme";

/**
 * Runs in <head> before first paint so the page never flashes the wrong
 * theme: a stored choice wins, otherwise the OS preference. Without JS the
 * attribute stays unset and the default (dark) tokens apply.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;
