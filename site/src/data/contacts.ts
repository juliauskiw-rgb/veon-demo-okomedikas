// Контакты клиента: источник — veon/client.json (company.contacts). Здесь только то, что подтверждено.
export interface Phone { label: string; href: string; }

const phone = (label: string): Phone => ({ label, href: `tel:+38${label.replace(/\D/g, "")}` });

export const CLINIC = phone("(050) 840-00-44");
export const CLINIC_2 = phone("(068) 840-00-44");
export const OPTICS = phone("(096) 840-53-53");
export const DISTRICT = phone("(067) 770-70-08");

export const EMAIL = "info@okomedikas.com";
export const INSTAGRAM = "https://www.instagram.com/okomedikas/";
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("проспект Перемоги, 16, Черкаси")}`;
export const SOON = "Розділ у розробці";

export const NAV = [
  { href: "#routes", label: "Напрямки" },
  { href: "#first-visit", label: "Перший візит" },
  { href: "#prices", label: "Ціни" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#kids", label: "Дітям" },
  { href: "#optics", label: "Оптика" },
  { href: "#locations", label: "Адреси" },
];

export interface City { name: string; address: string; place: string; phones: Phone[]; }

export const CITIES: City[] = [
  { name: "Шпола", address: "вул. Амосова, 10", place: "Офтальмологічне відділення Шполянської районної лікарні", phones: [phone("(096) 790-29-54"), phone("(068) 430-69-26")] },
  { name: "Знам'янка", address: "вул. Грушевського, 15, каб. 21", place: "Знам'янська міська лікарня ім. Лисенка", phones: [DISTRICT] },
  { name: "Драбів", address: "вул. Садова, 1Б, каб. 102", place: "Поліклініка Драбівської багатопрофільної лікарні", phones: [DISTRICT, phone("(097) 970-99-77")] },
  { name: "Голованівськ", address: "вул. Незалежності, 2, кабінет № 15", place: "Голованівська центральна районна лікарня", phones: [DISTRICT] },
  { name: "Чигирин", address: "вул. Замкова, 90, кабінет офтальмолога № 5", place: "КНП «Чигиринська багатопрофільна лікарня»", phones: [DISTRICT, phone("(050) 243-71-56")] },
];
