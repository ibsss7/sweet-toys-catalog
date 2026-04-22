import { useState } from "react";

const USD_RATE = 12700;
const TG_USER = "ib_sss";
const WA_PHONE = "998951338824";
const PHONE1 = "+998909088824";
const PHONE2 = "+998951338824";
const SINCE_YEAR = 2018;

type Lang = "uz" | "ru" | "en";
const T: Record<Lang, Record<string, string>> = {
  uz: {
    tagline: "ishlab chiqaruvchi", since: "yildan beri", officialCatalog: "Rasmiy katalog 2024",
    catalogTitle: "Mahsulotlar katalogi", subtitle: "Plastik o'yinchoqlar — ulgurji. Mashina, transport, hayvonlar.",
    products: "Mahsulot", cars: "Mashinalar", animals: "Hayvonlar", allItems: "Barchasi",
    carsFilter: "🚗 Mashina", animalsFilter: "🦁 Hayvon", search: "Qidirish...",
    showing: "Ko'rsatilmoqda", of: "dan", price: "Narx", age: "Yosh", color: "Rang",
    minOrder: "min. partiya", addToCart: "Savatga qo'shish", added: "✓ Qo'shildi!",
    cartTitle: "Sizning savatchingiz", cartEmpty: "Savatcha bo'sh", backToCatalog: "Katalogga qaytish",
    items: "ta mahsulot", total: "Jami", orderTg: "Telegram orqali buyurtma",
    orderWa: "WhatsApp orqali buyurtma", cartNote: "savatchada", viewCart: "Savatni ko'rish",
    orderBtn: "Buyurtma berish", contactTitle: "Buyurtma bermoqchimisiz?",
    notFound: "Hech narsa topilmadi", backBtn: "← Katalogga qaytish",
    article: "Artikul", category: "Kategoriya", material: "Material", allPhotos: "Barcha rasmlar",
  },
  ru: {
    tagline: "производитель", since: "с", officialCatalog: "Официальный каталог 2024",
    catalogTitle: "Каталог продукции", subtitle: "Пластиковые игрушки оптом. Машинки, транспорт, животные.",
    products: "Позиций", cars: "Машинки", animals: "Животные", allItems: "Все",
    carsFilter: "🚗 Машинки", animalsFilter: "🦁 Животные", search: "Поиск...",
    showing: "Показано", of: "из", price: "Цена", age: "Возраст", color: "Цвет",
    minOrder: "мин. партия", addToCart: "В корзину", added: "✓ Добавлено!",
    cartTitle: "Ваша корзина", cartEmpty: "Корзина пуста", backToCatalog: "Вернуться в каталог",
    items: "товаров", total: "Итого", orderTg: "Заказать через Telegram",
    orderWa: "Заказать через WhatsApp", cartNote: "в корзине", viewCart: "Корзина",
    orderBtn: "Оформить заказ", contactTitle: "Готовы оформить заказ?",
    notFound: "Ничего не найдено", backBtn: "← Назад в каталог",
    article: "Артикул", category: "Категория", material: "Материал", allPhotos: "Все фото",
  },
  en: {
    tagline: "manufacturer", since: "since", officialCatalog: "Official Catalog 2024",
    catalogTitle: "Product Catalog", subtitle: "Plastic toys wholesale. Cars, transport, animals.",
    products: "Products", cars: "Cars", animals: "Animals", allItems: "All",
    carsFilter: "🚗 Cars", animalsFilter: "🦁 Animals", search: "Search...",
    showing: "Showing", of: "of", price: "Price", age: "Age", color: "Color",
    minOrder: "min. order", addToCart: "Add to cart", added: "✓ Added!",
    cartTitle: "Your cart", cartEmpty: "Cart is empty", backToCatalog: "Back to catalog",
    items: "items", total: "Total", orderTg: "Order via Telegram",
    orderWa: "Order via WhatsApp", cartNote: "in cart", viewCart: "Cart",
    orderBtn: "Place order", contactTitle: "Ready to order?",
    notFound: "Nothing found", backBtn: "← Back to catalog",
    article: "Article", category: "Category", material: "Material", allPhotos: "All photos",
  },
};

const STD_COLORS = [
  { hex: "#e53e3e", label: "Qizil / Красный / Red" },
  { hex: "#3182CE", label: "Ko'k / Синий / Blue" },
  { hex: "#38a169", label: "Yashil / Зелёный / Green" },
  { hex: "#ECC94B", label: "Sariq / Жёлтый / Yellow" },
  { hex: "#F7FAFC", label: "Oq / Белый / White" },
];
const C5 = STD_COLORS.map(c => c.hex);

interface Product {
  id: string; name: string; article: string;
  category: "cars" | "animals";
  priceUZS: number; minOrder: number;
  colors: string[]; ageFrom?: number; material?: string;
  images: string[];
}

const PRODUCTS: Product[] = [
  { id: "ST-001", name: "Kamaro",        article: "CAR-K01",  category: "cars",    priceUZS: 2400,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/kamaro/2.jpg","/products/kamaro/1.jpg","/products/kamaro/3.jpg","/products/kamaro/4.jpg"] },
  { id: "ST-002", name: "Lodka",         article: "CAR-L02",  category: "cars",    priceUZS: 1200,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/lodka/1.jpg","/products/lodka/2.jpg","/products/lodka/3.jpg","/products/lodka/4.jpg"] },
  { id: "ST-003", name: "Police",        article: "CAR-P03",  category: "cars",    priceUZS: 1600,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/police/1.jpg","/products/police/2.jpg","/products/police/3.jpg","/products/police/4.jpg"] },
  { id: "ST-004", name: "Betmen",        article: "FIG-B04",  category: "animals", priceUZS: 1000,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/betmen/1.jpg","/products/betmen/2.jpg","/products/betmen/3.jpg","/products/betmen/4.jpg"] },
  { id: "ST-005", name: "Skuter mini",   article: "CAR-SM05", category: "cars",    priceUZS: 800,   minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/skuter/1.jpg","/products/skuter/2.jpg","/products/skuter/3.jpg","/products/skuter/4.jpg"] },
  { id: "ST-006", name: "Gonchik",       article: "CAR-G06",  category: "cars",    priceUZS: 800,   minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/gonchik/1.jpg","/products/gonchik/2.jpg","/products/gonchik/3.jpg","/products/gonchik/4.jpg"] },
  { id: "ST-007", name: "Makvin",        article: "CAR-MK07", category: "cars",    priceUZS: 1400,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/makvin/1.jpg","/products/makvin/2.jpg","/products/makvin/3.jpg","/products/makvin/4.jpg"] },
  { id: "ST-008", name: "Motosikl",      article: "CAR-MT08", category: "cars",    priceUZS: 1200,  minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/motosikl/1.jpg","/products/motosikl/2.jpg","/products/motosikl/3.jpg","/products/motosikl/4.jpg"] },
  { id: "ST-009", name: "Stroy moshina", article: "CAR-SM09", category: "cars",    priceUZS: 600,   minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/stroy-moshina/1.jpg","/products/stroy-moshina/2.jpg","/products/stroy-moshina/3.jpg","/products/stroy-moshina/4.jpg"] },
  { id: "ST-010", name: "Poezd",         article: "CAR-PZ10", category: "cars",    priceUZS: 1800,  minOrder: 6,  colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/poezd/1.jpg","/products/poezd/2.jpg","/products/poezd/3.jpg","/products/poezd/4.jpg"] },
  { id: "ST-011", name: "Kuchukcha",     article: "FIG-KC11", category: "animals", priceUZS: 600,   minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/kuchukcha/1.jpg","/products/kuchukcha/2.jpg","/products/kuchukcha/3.jpg","/products/kuchukcha/4.jpg"] },
  { id: "ST-012", name: "Tank nabor",    article: "MIL-TN12", category: "animals", priceUZS: 600,   minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: ["/products/tank-nabor/1.jpg","/products/tank-nabor/2.jpg","/products/tank-nabor/3.jpg"] },
  { id: "ST-013", name: "Лев",           article: "ANI-L13",  category: "animals", priceUZS: 16000, minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-014", name: "Слон",          article: "ANI-E14",  category: "animals", priceUZS: 20000, minOrder: 8,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-015", name: "T-Rex",         article: "DIN-T15",  category: "animals", priceUZS: 22000, minOrder: 8,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-016", name: "Стегозавр",     article: "DIN-S16",  category: "animals", priceUZS: 20000, minOrder: 8,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-017", name: "Набор динозавров", article: "DIN-SET17", category: "animals", priceUZS: 45000, minOrder: 4, colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-018", name: "Жираф",         article: "ANI-G18",  category: "animals", priceUZS: 18000, minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-019", name: "Крокодил",      article: "ANI-C19",  category: "animals", priceUZS: 15000, minOrder: 12, colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-020", name: "Акула",         article: "ANI-S20",  category: "animals", priceUZS: 25000, minOrder: 8,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-021", name: "Грузовик",      article: "CAR-T21",  category: "cars",    priceUZS: 22000, minOrder: 6,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-022", name: "Пожарная",      article: "CAR-F22",  category: "cars",    priceUZS: 25000, minOrder: 6,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-023", name: "Автобус",       article: "CAR-B23",  category: "cars",    priceUZS: 28000, minOrder: 6,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-024", name: "Экскаватор",    article: "CAR-E24",  category: "cars",    priceUZS: 32000, minOrder: 4,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-025", name: "Вертолёт",      article: "CAR-H25",  category: "cars",    priceUZS: 24000, minOrder: 8,  colors: C5, ageFrom: 3, material: "Plastik", images: [] },
  { id: "ST-026", name: "Набор животных", article: "ANI-SET26", category: "animals", priceUZS: 50000, minOrder: 4, colors: C5, ageFrom: 3, material: "Plastik", images: [] },
];

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23EEF4FF'/%3E%3Ctext x='150' y='155' text-anchor='middle' font-family='system-ui' font-size='64' fill='%232E5090' opacity='0.25'%3E🧸%3C/text%3E%3C/svg%3E";

type Currency = "uzs" | "usd";
type Category = "all" | "cars" | "animals";
interface CartItem { product: Product; qty: number; color: string; }

function fmtUZS(v: number) { return v.toLocaleString("ru-RU") + " сум"; }
function fmtUSD(v: number) { return "$" + (v / USD_RATE).toFixed(2); }
function fmt(v: number, cur: Currency) { return cur === "uzs" ? fmtUZS(v) : fmtUSD(v); }

function buildOrderMsg(cart: CartItem[], lang: Lang) {
  const total = cart.reduce((s, i) => s + i.product.priceUZS * i.qty, 0);
  let msg = "🛒 *" + (lang === "ru" ? "Новый заказ" : lang === "en" ? "New Order" : "Yangi buyurtma") + " — Sweet Toys*\n\n";
  cart.forEach(item => {
    const colorName = STD_COLORS.find(c => c.hex === item.color)?.label.split(" / ")[lang === "uz" ? 0 : lang === "ru" ? 1 : 2] ?? "";
    msg += `▪️ *${item.product.name}* (${item.product.article})\n`;
    msg += `  🎨 ${colorName} · ${item.qty} шт. × ${fmtUZS(item.product.priceUZS)} = *${fmtUZS(item.product.priceUZS * item.qty)}*\n\n`;
  });
  msg += `━━━━━━━━━━━━\n💰 *Jami / Итого: ${fmtUZS(total)}*`;
  return msg;
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onUpdateQty, onRemove, currency, lang }: {
  cart: CartItem[]; onClose: () => void;
  onUpdateQty: (id: string, qty: number, color: string) => void;
  onRemove: (id: string, color: string) => void;
  currency: Currency; lang: Lang;
}) {
  const t = T[lang];
  const total = cart.reduce((s, i) => s + i.product.priceUZS * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  function orderTg() {
    window.open(`https://t.me/${TG_USER}?text=${encodeURIComponent(buildOrderMsg(cart, lang))}`, "_blank");
  }
  function orderWa() {
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(buildOrderMsg(cart, lang))}`, "_blank");
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div style={{ width: "min(400px,100vw)", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-4px 0 32px rgba(0,0,0,0.18)" }}>
        <div style={{ background: "#1A2B4A", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16 }}>🛒 {t.cartTitle}</div>
            {cart.length > 0 && <div style={{ color: "#A0B8D8", fontSize: 11, marginTop: 2 }}>{totalItems} {t.items}</div>}
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "#A0AEC0", padding: 40 }}>
            <span style={{ fontSize: 48 }}>🛒</span>
            <span>{t.cartEmpty}</span>
            <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 8, background: "#2E5090", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{t.backToCatalog}</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {cart.map(item => (
                <div key={item.product.id + item.color} style={{ background: "#F7F9FD", borderRadius: 10, border: "1px solid #E2E8F0", padding: "11px 12px", display: "flex", gap: 10, alignItems: "center" }}>
                  <img src={item.product.images[0] || PLACEHOLDER} alt={item.product.name} style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 8, background: "#fff", border: "1px solid #E2E8F0", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: "#1A2B4A" }}>{item.product.name}</div>
                    <div style={{ fontSize: 11, color: "#718096", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: item.color, border: "1px solid rgba(0,0,0,0.15)", display: "inline-block" }} />
                      {STD_COLORS.find(c => c.hex === item.color)?.label.split(" / ")[lang === "uz" ? 0 : lang === "ru" ? 1 : 2]}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                      <button onClick={() => onUpdateQty(item.product.id, item.qty - 1, item.color)} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #CBD5E0", background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.product.id, item.qty + 1, item.color)} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #CBD5E0", background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <span style={{ marginLeft: "auto", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: "#276749" }}>{fmt(item.product.priceUZS * item.qty, currency)}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.product.id, item.color)} style={{ background: "none", border: "none", color: "#CBD5E0", cursor: "pointer", fontSize: 18, flexShrink: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#e53e3e")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#CBD5E0")}>×</button>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #E2E8F0", padding: "14px 16px 18px", flexShrink: 0 }}>
              <div style={{ marginBottom: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                {cart.map(item => (
                  <div key={item.product.id + item.color} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4A5568" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, border: "1px solid rgba(0,0,0,0.15)", display: "inline-block" }} />
                      {item.product.name} × {item.qty}
                    </span>
                    <span style={{ fontWeight: 600 }}>{fmtUZS(item.product.priceUZS * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 10, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15 }}>{t.total}:</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20, color: "#1A2B4A" }}>{fmtUZS(total)}</div>
                  <div style={{ fontSize: 11, color: "#718096" }}>{fmtUSD(total)}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={orderTg} style={{ width: "100%", background: "linear-gradient(135deg,#27A041,#1E8033)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
                  {t.orderTg}
                </button>
                <button onClick={orderWa} style={{ width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.orderWa}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Product Detail Page ──────────────────────────────────────────────────────
function ProductPage({ product, currency, lang, onAddToCart, onBack }: {
  product: Product; currency: Currency; lang: Lang;
  onAddToCart: (p: Product, qty: number, color: string) => void;
  onBack: () => void;
}) {
  const t = T[lang];
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(product.minOrder);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const hasImages = product.images.length > 0;

  function handleAdd() {
    onAddToCart(product, qty, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function orderDirect(channel: "tg" | "wa") {
    const msg = buildOrderMsg([{ product, qty, color: selectedColor }], lang);
    const url = channel === "tg"
      ? `https://t.me/${TG_USER}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  const colorName = STD_COLORS.find(c => c.hex === selectedColor)?.label.split(" / ")[lang === "uz" ? 0 : lang === "ru" ? 1 : 2] ?? "";

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 16px 40px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#2E5090", fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}>
        {t.backBtn}
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px,100%), 1fr))", gap: 28 }}>
        {/* Images */}
        <div>
          <div style={{ background: "#F7F9FD", borderRadius: 14, overflow: "hidden", position: "relative", paddingTop: "80%" }}>
            <img
              src={hasImages ? product.images[activeImg] : PLACEHOLDER}
              alt={product.name}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", padding: 20 }}
            />
            <div style={{ position: "absolute", top: 12, left: 12, background: product.category === "cars" ? "#2E5090" : "#276749", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, textTransform: "uppercase" }}>
              {product.category === "cars" ? t.carsFilter : t.animalsFilter}
            </div>
          </div>
          {hasImages && product.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: 64, height: 52, border: activeImg === i ? "2.5px solid #2E5090" : "1.5px solid #CBD5E0", borderRadius: 8, overflow: "hidden", padding: 0, cursor: "pointer", background: "#fff", flexShrink: 0 }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: "#718096", marginBottom: 4 }}>{t.article}: <strong style={{ color: "#2E5090" }}>{product.article}</strong></div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: "#1A2B4A", margin: 0, lineHeight: 1.2 }}>{product.name}</h1>
          </div>

          {/* Price */}
          <div style={{ background: "linear-gradient(135deg,#EEF4FF,#E8F0FC)", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: "#2E5090", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{t.price}</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 800, color: "#1A2B4A" }}>{fmt(product.priceUZS, currency)}</div>
            {currency === "uzs" && <div style={{ fontSize: 13, color: "#718096", marginTop: 2 }}>{fmtUSD(product.priceUZS)}</div>}
          </div>

          {/* Props */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {product.ageFrom !== undefined && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #EDF2F7", paddingBottom: 8 }}>
                <span style={{ color: "#718096" }}>{t.age}</span>
                <span style={{ fontWeight: 600, color: "#1A2B4A" }}>{product.ageFrom}+</span>
              </div>
            )}
            {product.material && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #EDF2F7", paddingBottom: 8 }}>
                <span style={{ color: "#718096" }}>{t.material}</span>
                <span style={{ fontWeight: 600, color: "#1A2B4A" }}>{product.material}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #EDF2F7", paddingBottom: 8 }}>
              <span style={{ color: "#718096" }}>{t.minOrder}</span>
              <span style={{ fontWeight: 600, color: "#1A2B4A" }}>{product.minOrder} шт.</span>
            </div>
          </div>

          {/* Color picker */}
          <div>
            <div style={{ fontSize: 12, color: "#718096", marginBottom: 8, fontWeight: 600 }}>
              {t.color}: <span style={{ color: "#1A2B4A" }}>{colorName}</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {STD_COLORS.map(c => (
                <button key={c.hex} onClick={() => setSelectedColor(c.hex)} title={c.label} style={{ width: 32, height: 32, borderRadius: "50%", background: c.hex, border: selectedColor === c.hex ? "3px solid #2E5090" : "2px solid #E2E8F0", cursor: "pointer", padding: 0, boxShadow: selectedColor === c.hex ? "0 0 0 2px #fff, 0 0 0 4px #2E5090" : "none", transition: "all 0.15s" }} />
              ))}
            </div>
          </div>

          {/* Qty */}
          <div>
            <div style={{ fontSize: 12, color: "#718096", marginBottom: 8, fontWeight: 600 }}>Miqdor / Количество</div>
            <div style={{ display: "flex", alignItems: "center", background: "#F7F9FD", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden", width: "fit-content" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 44, height: 44, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 20, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, minWidth: 48, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 44, height: 44, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 20, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              <div style={{ borderLeft: "1px solid #E2E8F0", padding: "0 14px", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: "#276749", whiteSpace: "nowrap" }}>
                = {fmt(product.priceUZS * qty, currency)}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={handleAdd} style={{ width: "100%", background: added ? "#27A041" : "linear-gradient(135deg,#2E5090,#1A3A78)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {added ? "✓ " + t.added : "🛒 " + t.addToCart}
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => orderDirect("tg")} style={{ flex: 1, background: "linear-gradient(135deg,#27A041,#1E8033)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
                Telegram
              </button>
              <button onClick={() => orderDirect("wa")} style={{ flex: 1, background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, currency, lang, onAddToCart, onOpenProduct }: {
  product: Product; currency: Currency; lang: Lang;
  onAddToCart: (p: Product, qty: number, color: string) => void;
  onOpenProduct: (p: Product) => void;
}) {
  const t = T[lang];
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(product.minOrder);
  const [flash, setFlash] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const hasImages = product.images.length > 0;

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    onAddToCart(product, qty, selectedColor);
    setFlash(true);
    setTimeout(() => setFlash(false), 1000);
  }

  const colorName = STD_COLORS.find(c => c.hex === selectedColor)?.label.split(" / ")[lang === "uz" ? 0 : lang === "ru" ? 1 : 2] ?? "";

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #CBD5E0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
      onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 8px 28px rgba(46,80,144,0.14)"; d.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; d.style.transform = "translateY(0)"; }}
      onClick={() => onOpenProduct(product)}
    >
      <div style={{ background: "#F7F9FD", position: "relative", paddingTop: "78%", overflow: "hidden" }}>
        <img src={hasImages ? product.images[activeImg] : PLACEHOLDER} alt={product.name} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", padding: 14 }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: product.category === "cars" ? "#2E5090" : "#276749", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase" }}>
          {product.category === "cars" ? t.carsFilter : t.animalsFilter}
        </div>
        {flash && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(39,160,65,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#27A041", color: "#fff", borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 700 }}>{t.added}</div>
          </div>
        )}
      </div>

      {hasImages && product.images.length > 1 && (
        <div style={{ display: "flex", gap: 5, padding: "7px 10px 4px", background: "#F7F9FD" }} onClick={e => e.stopPropagation()}>
          {product.images.map((img, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }} style={{ width: 40, height: 32, border: activeImg === i ? "2px solid #2E5090" : "1.5px solid #CBD5E0", borderRadius: 6, overflow: "hidden", padding: 0, cursor: "pointer", background: "#fff", flexShrink: 0 }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: "12px 13px 14px", flexGrow: 1, display: "flex", flexDirection: "column", gap: 7 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "#1A2B4A", margin: 0, cursor: "pointer" }} onClick={() => onOpenProduct(product)}>{product.name}</h3>
          <span style={{ fontSize: 10, color: "#2E5090", background: "#EEF4FF", padding: "2px 7px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{product.article}</span>
        </div>

        {/* Color picker */}
        <div>
          <div style={{ fontSize: 10, color: "#718096", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            {t.color}: <span style={{ color: "#1A2B4A" }}>{colorName}</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {STD_COLORS.map(c => (
              <button key={c.hex} onClick={e => { e.stopPropagation(); setSelectedColor(c.hex); }} title={c.label} style={{ width: 24, height: 24, borderRadius: "50%", background: c.hex, border: selectedColor === c.hex ? "3px solid #2E5090" : "2px solid #E2E8F0", cursor: "pointer", padding: 0, boxShadow: selectedColor === c.hex ? "0 0 0 2px #fff, 0 0 0 4px #2E5090" : "none", transition: "all 0.15s", flexShrink: 0 }} />
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #EDF2F7" }} />

        {/* Price only */}
        <div style={{ background: "#EEF4FF", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 9, color: "#2E5090", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.price}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1A2B4A", fontFamily: "'Sora',sans-serif" }}>{fmt(product.priceUZS, currency)}</div>
        </div>

        {/* Qty + calc */}
        <div style={{ display: "flex", alignItems: "center", background: "#F7F9FD", borderRadius: 8, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <button onClick={e => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }} style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 18, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>−</button>
          <span style={{ flex: 1, textAlign: "center", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, color: "#1A2B4A" }}>{qty}</span>
          <button onClick={e => { e.stopPropagation(); setQty(q => q + 1); }} style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 18, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
          <div style={{ borderLeft: "1px solid #E2E8F0", padding: "0 9px", fontSize: 11, color: "#718096", whiteSpace: "nowrap", flexShrink: 0 }}>= {fmt(product.priceUZS * qty, currency)}</div>
        </div>
        <div style={{ fontSize: 10, color: "#A0AEC0", textAlign: "center", marginTop: -3 }}>{t.minOrder}: {product.minOrder} шт.</div>

        <button onClick={handleAdd} style={{ width: "100%", background: "linear-gradient(135deg,#2E5090,#1A3A78)", color: "#fff", border: "none", borderRadius: 9, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          🛒 {t.addToCart}
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CatalogPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [currency, setCurrency] = useState<Currency>("uzs");
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProd, setActiveProd] = useState<Product | null>(null);

  const t = T[lang];
  const totalCartItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalCartSum = cart.reduce((s, i) => s + i.product.priceUZS * i.qty, 0);

  function addToCart(product: Product, qty: number, color: string) {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id && i.color === color);
      return ex
        ? prev.map(i => i.product.id === product.id && i.color === color ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { product, qty, color }];
    });
  }

  function updateQty(id: string, qty: number, color: string) {
    if (qty <= 0) setCart(prev => prev.filter(i => !(i.product.id === id && i.color === color)));
    else setCart(prev => prev.map(i => i.product.id === id && i.color === color ? { ...i, qty } : i));
  }

  function removeFromCart(id: string, color: string) {
    setCart(prev => prev.filter(i => !(i.product.id === id && i.color === color)));
  }

  function handleTgOrder() {
    window.open(`https://t.me/${TG_USER}?text=${encodeURIComponent(buildOrderMsg(cart, lang))}`, "_blank");
  }

  const filtered = PRODUCTS.filter(p =>
    (category === "all" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.article.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = { total: PRODUCTS.length, cars: PRODUCTS.filter(p => p.category === "cars").length, animals: PRODUCTS.filter(p => p.category === "animals").length };

  // ── Shared header
  const Header = (
    <header style={{ background: "#1A2B4A", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, gap: 10 }}>
        <div onClick={() => setActiveProd(null)} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, background: "#2E5090", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧸</div>
          <div style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontWeight: 700, fontSize: 16 }}>Sweet Toys</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
          <div style={{ display: "flex", gap: 3 }}>
            {(["uz","ru","en"] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: "4px 8px", borderRadius: 5, border: "1px solid", borderColor: lang === l ? "#fff" : "#3A5070", background: lang === l ? "#fff" : "transparent", color: lang === l ? "#1A2B4A" : "#A0B8D8", fontWeight: lang === l ? 700 : 400, fontSize: 11, cursor: "pointer", textTransform: "uppercase" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {(["uzs","usd"] as Currency[]).map(c => (
              <button key={c} onClick={() => setCurrency(c)} style={{ padding: "4px 8px", borderRadius: 5, border: "1px solid", borderColor: currency === c ? "#6FA8DC" : "#3A5070", background: currency === c ? "#6FA8DC" : "transparent", color: currency === c ? "#1A2B4A" : "#A0B8D8", fontWeight: currency === c ? 700 : 400, fontSize: 11, cursor: "pointer", textTransform: "uppercase" }}>{c.toUpperCase()}</button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: totalCartItems > 0 ? "#27A041" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "7px 11px", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
            🛒
            {totalCartItems > 0 && (
              <>
                <span style={{ background: "#e53e3e", color: "#fff", borderRadius: 9, fontSize: 10, fontWeight: 700, padding: "1px 5px", position: "absolute", top: -4, right: -4 }}>{totalCartItems}</span>
                <span style={{ fontSize: 12 }}>{fmtUZS(totalCartSum)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // ── Product detail view
  if (activeProd) {
    return (
      <div style={{ fontFamily: "'Inter',sans-serif", background: "#F7F9FD", minHeight: "100vh" }}>
        {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} currency={currency} lang={lang} />}
        {Header}
        <ProductPage product={activeProd} currency={currency} lang={lang} onAddToCart={addToCart} onBack={() => setActiveProd(null)} />
        <footer style={{ background: "#1A2B4A", padding: "16px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
            <div style={{ color: "#A0B8D8", fontSize: 12 }}>© {SINCE_YEAR}–2024 <strong style={{ color: "#fff" }}>Sweet Toys</strong></div>
            <div style={{ color: "#A0B8D8", fontSize: 11 }}>1 USD = {USD_RATE.toLocaleString("ru-RU")} UZS</div>
          </div>
        </footer>
      </div>
    );
  }

  // ── Catalog view
  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F7F9FD", minHeight: "100vh" }}>
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} currency={currency} lang={lang} />}
      {Header}

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1A2B4A 0%,#2E5090 100%)", padding: "36px 16px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#A0C8F0", padding: "3px 10px", borderRadius: 20, fontSize: 11, marginBottom: 10, fontWeight: 600 }}>{t.officialCatalog}</div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Sweet Toys<br /><span style={{ color: "#6FA8DC" }}>{t.catalogTitle}</span>
          </h1>
          <p style={{ color: "#A0B8D8", fontSize: 13, maxWidth: 440, lineHeight: 1.6, marginBottom: 20 }}>{t.subtitle}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ label: t.products, v: stats.total }, { label: t.cars, v: stats.cars }, { label: t.animals, v: stats.animals }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 16px" }}>
                <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700 }}>{s.v}</div>
                <div style={{ color: "#A0B8D8", fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 16px" }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{PHONE1}</div>
              <div style={{ color: "#A0B8D8", fontSize: 11 }}>{PHONE2}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 16px 0" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {([
              { key: "all" as Category, label: t.allItems, count: stats.total },
              { key: "cars" as Category, label: t.carsFilter, count: stats.cars },
              { key: "animals" as Category, label: t.animalsFilter, count: stats.animals },
            ]).map(tab => (
              <button key={tab.key} onClick={() => setCategory(tab.key)} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid", borderColor: category === tab.key ? "#2E5090" : "#CBD5E0", background: category === tab.key ? "#2E5090" : "#fff", color: category === tab.key ? "#fff" : "#4A5568", fontWeight: category === tab.key ? 700 : 400, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                {tab.label}
                <span style={{ background: category === tab.key ? "rgba(255,255,255,0.25)" : "#EEF4FF", color: category === tab.key ? "#fff" : "#2E5090", borderRadius: 8, padding: "1px 5px", fontSize: 10, fontWeight: 700 }}>{tab.count}</span>
              </button>
            ))}
          </div>
          <input type="text" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #CBD5E0", fontSize: 12, outline: "none", width: "min(180px,100%)", background: "#fff" }} />
        </div>
        <div style={{ color: "#718096", fontSize: 11, marginTop: 8 }}>{t.showing}: <strong style={{ color: "#1A2B4A" }}>{filtered.length}</strong> {t.of} {PRODUCTS.length}</div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 16px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px,100%), 1fr))", gap: 16 }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} currency={currency} lang={lang} onAddToCart={addToCart} onOpenProduct={setActiveProd} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#A0AEC0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div>{t.notFound}</div>
          </div>
        )}

        {/* Cart bar */}
        {cart.length > 0 && (
          <div style={{ marginTop: 24, background: "linear-gradient(135deg,#1B6B30,#27A041)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, boxShadow: "0 6px 24px rgba(39,160,65,0.3)" }}>
            <div>
              <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15 }}>🛒 {totalCartItems} {t.items} {t.cartNote}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>{t.total}: <strong>{fmtUZS(totalCartSum)}</strong></div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => setCartOpen(true)} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>{t.viewCart}</button>
              <button onClick={handleTgOrder} style={{ background: "#fff", color: "#1B6B30", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontWeight: 800, fontSize: 13, fontFamily: "'Sora',sans-serif" }}>
                {t.orderBtn}
              </button>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div style={{ marginTop: 24, background: "linear-gradient(135deg,#1A2B4A,#2E5090)", borderRadius: 12, padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 5 }}>{t.contactTitle}</h2>
            <p style={{ color: "#A0B8D8", fontSize: 12 }}>{PHONE1} · {PHONE2} · @{TG_USER}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href={`tel:${PHONE1}`} style={{ background: "#fff", color: "#1A2B4A", padding: "10px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>📞</a>
            <a href={`https://t.me/${TG_USER}`} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
              Telegram
            </a>
            <a href={`https://wa.me/${WA_PHONE}`} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <footer style={{ background: "#1A2B4A", padding: "16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
          <div style={{ color: "#A0B8D8", fontSize: 12 }}>© {SINCE_YEAR}–2024 <strong style={{ color: "#fff" }}>Sweet Toys</strong></div>
          <div style={{ color: "#A0B8D8", fontSize: 11 }}>1 USD = {USD_RATE.toLocaleString("ru-RU")} UZS</div>
        </div>
      </footer>
    </div>
  );
}
