// Поведение страницы. Без скрипта всё читается: меню и строки — нативные <details>, все адреса открыты.
const root = document.documentElement;
const KEY = "okomedikas-text";

/* А / А+: размер текста, положение прокрутки сохраняется */
const sizeButtons = document.querySelectorAll<HTMLButtonElement>("[data-text-size]");
const syncSize = () => {
  const large = root.dataset.text === "large";
  sizeButtons.forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.textSize === "large") === large)));
};
const firstVisible = () => {
  const header = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
  return [...document.querySelectorAll<HTMLElement>("main h2, main h3, main p, main li")].find((el) => {
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.top >= header;
  });
};
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const anchor = firstVisible();
    const before = anchor?.getBoundingClientRect().top ?? 0;
    if (button.dataset.textSize === "large") root.dataset.text = "large";
    else delete root.dataset.text;
    try { localStorage.setItem(KEY, button.dataset.textSize ?? "normal"); } catch { /* приватный режим: размер живёт до перезагрузки */ }
    syncSize();
    if (anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
  });
});
syncSize();

/* Меню: закрывается по выбору пункта, Esc и клику мимо */
const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");
if (menu) {
  menu.querySelectorAll("a[href^='#']").forEach((a) => a.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary")?.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (menu.open && !menu.contains(e.target as Node)) menu.open = false;
  });
}

/* Строки, которые на телефоне свёрнуты, а на широком экране открыты и не сворачиваются */
const wide = window.matchMedia("(min-width: 64rem)");
const rows = document.querySelectorAll<HTMLDetailsElement>("details[data-phone]");
const syncRows = () => {
  rows.forEach((row) => {
    row.open = wide.matches || row.dataset.phone === "open";
    const summary = row.querySelector("summary");
    if (wide.matches) summary?.setAttribute("tabindex", "-1");
    else summary?.removeAttribute("tabindex");
  });
};
rows.forEach((row) => {
  row.querySelector("summary")?.addEventListener("click", (e) => { if (wide.matches) e.preventDefault(); });
});
wide.addEventListener("change", syncRows);
syncRows();

/* Нижняя панель на телефоне: появляется, когда плита с номером ушла с экрана */
const plate = document.querySelector("[data-plate]");
const bar = document.querySelector("[data-call-bar]");
if (plate && bar && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle("is-on", !entry.isIntersecting);
  }).observe(plate);
}
