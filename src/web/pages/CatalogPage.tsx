import { useState, useEffect } from "react";

const USD_RATE = 12700;
const TG_USER = "ib_sss";
const PHONE1 = "+998909088824";
const PHONE2 = "+998951338824";
const SINCE_YEAR = 2018;

interface Product {
  id: string;
  name: string;
  article: string;
  category: "cars" | "animals";
  retailUZS: number;
  wholesaleUZS: number;
  minOrder: number;
  colors?: string[];
  ageFrom?: number;
  material?: string;
  images: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "ST-001", name: "Kamaro", article: "CAR-K01", category: "cars",
    retailUZS: 2400, wholesaleUZS: 1600, minOrder: 12,
    colors: ["#e53e3e", "#2d3748", "#276749"], ageFrom: 3, material: "Xavfsiz plastik",
    images: ["/products/kamaro/2.jpg", "/products/kamaro/1.jpg", "/products/kamaro/3.jpg", "/products/kamaro/4.jpg"],
  },
  {
    id: "ST-002", name: "Lodka", article: "CAR-L02", category: "cars",
    retailUZS: 1200, wholesaleUZS: 800, minOrder: 12,
    colors: ["#e53e3e", "#fff"], ageFrom: 3, material: "Xavfsiz plastik",
    images: ["/products/lodka/1.jpg", "/products/lodka/2.jpg", "/products/lodka/3.jpg", "/products/lodka/4.jpg"],
  },
  { id: "ST-003", name: "Гоночная Formula", article: "CAR-F03", category: "cars", retailUZS: 18000, wholesaleUZS: 12000, minOrder: 12, colors: ["#e53e3e", "#F6E05E", "#3182CE"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-004", name: "Грузовик самосвал", article: "CAR-T04", category: "cars", retailUZS: 22000, wholesaleUZS: 15000, minOrder: 6, colors: ["#F6AD55", "#FC8181"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-005", name: "Пожарная машина", article: "CAR-F05", category: "cars", retailUZS: 25000, wholesaleUZS: 17000, minOrder: 6, colors: ["#e53e3e"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-006", name: "Полицейский авто", article: "CAR-P06", category: "cars", retailUZS: 20000, wholesaleUZS: 13500, minOrder: 12, colors: ["#2B6CB0", "#1A202C"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-007", name: "Автобус городской", article: "CAR-B07", category: "cars", retailUZS: 28000, wholesaleUZS: 19000, minOrder: 6, colors: ["#F6E05E", "#68D391"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-008", name: "Экскаватор", article: "CAR-E08", category: "cars", retailUZS: 32000, wholesaleUZS: 22000, minOrder: 4, colors: ["#F6AD55"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-009", name: "Вертолёт", article: "CAR-H09", category: "cars", retailUZS: 24000, wholesaleUZS: 16000, minOrder: 8, colors: ["#e53e3e", "#68D391"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-010", name: "Трактор с прицепом", article: "CAR-TR10", category: "cars", retailUZS: 30000, wholesaleUZS: 20000, minOrder: 6, colors: ["#68D391", "#F6AD55"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-011", name: "Лев большой", article: "ANI-L01", category: "animals", retailUZS: 16000, wholesaleUZS: 10500, minOrder: 12, colors: ["#F6AD55"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-012", name: "Слон со слонёнком", article: "ANI-E02", category: "animals", retailUZS: 20000, wholesaleUZS: 13500, minOrder: 8, colors: ["#718096"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-013", name: "Тираннозавр Рекс", article: "DIN-T03", category: "animals", retailUZS: 22000, wholesaleUZS: 15000, minOrder: 8, colors: ["#276749"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-014", name: "Стегозавр", article: "DIN-S04", category: "animals", retailUZS: 20000, wholesaleUZS: 13500, minOrder: 8, colors: ["#276749", "#68D391"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-015", name: "Набор динозавров 6 шт.", article: "DIN-SET05", category: "animals", retailUZS: 45000, wholesaleUZS: 31000, minOrder: 4, colors: ["#276749", "#F6AD55", "#e53e3e"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-016", name: "Жираф", article: "ANI-G06", category: "animals", retailUZS: 18000, wholesaleUZS: 12000, minOrder: 12, colors: ["#F6AD55"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-017", name: "Крокодил", article: "ANI-C07", category: "animals", retailUZS: 15000, wholesaleUZS: 10000, minOrder: 12, colors: ["#276749"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-018", name: "Бронтозавр", article: "DIN-B08", category: "animals", retailUZS: 21000, wholesaleUZS: 14000, minOrder: 8, colors: ["#276749"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-019", name: "Набор животных фермы", article: "ANI-SET09", category: "animals", retailUZS: 50000, wholesaleUZS: 34000, minOrder: 4, colors: ["#F6AD55", "#FC8181", "#68D391"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
  { id: "ST-020", name: "Акула большая", article: "ANI-SH10", category: "animals", retailUZS: 25000, wholesaleUZS: 17000, minOrder: 8, colors: ["#3182CE"], ageFrom: 3, material: "Xavfsiz plastik", images: [] },
];

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23EEF4FF'/%3E%3Ctext x='150' y='155' text-anchor='middle' font-family='system-ui' font-size='60' fill='%232E5090' opacity='0.3'%3E🧸%3C/text%3E%3C/svg%3E";

type Currency = "uzs" | "usd";
type Category = "all" | "cars" | "animals";

interface CartItem { product: Product; qty: number; }

function fmtUZS(v: number) { return v.toLocaleString("ru-RU") + " сум"; }
function fmtUSD(v: number) { return "$" + (v / USD_RATE).toFixed(2); }
function fmt(v: number, cur: Currency) { return cur === "uzs" ? fmtUZS(v) : fmtUSD(v); }

// ─── Cart Drawer ─────────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onUpdateQty, onRemove, currency }: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  currency: Currency;
}) {
  const total = cart.reduce((s, i) => s + i.product.wholesaleUZS * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  function buildTgMessage() {
    let msg = "🛒 *Yangi buyurtma — Sweet Toys*\n\n";
    cart.forEach((item) => {
      const lineTotal = item.product.wholesaleUZS * item.qty;
      msg += `▪️ *${item.product.name}* (${item.product.article})\n`;
      msg += `  ${item.qty} шт. × ${fmtUZS(item.product.wholesaleUZS)} = *${fmtUZS(lineTotal)}*\n\n`;
    });
    msg += `━━━━━━━━━━━━━\n`;
    msg += `📦 Jami miqdor: *${totalItems} шт.*\n`;
    msg += `💰 *Jami summa: ${fmtUZS(total)}*`;
    if (currency === "usd") msg += ` (${fmtUSD(total)})`;
    return msg;
  }

  function handleOrder() {
    const msg = buildTgMessage();
    const url = `https://t.me/${TG_USER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  if (cart.length === 0) return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.45)" }} onClick={onClose} />
      <div style={{ width: 380, maxWidth: "95vw", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)" }}>
        <div style={{ background: "#1A2B4A", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 17 }}>🛒 Savatcha</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#A0B8D8", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "#A0AEC0", padding: 32 }}>
          <span style={{ fontSize: 52 }}>🛒</span>
          <span style={{ fontSize: 15 }}>Savatcha bo'sh</span>
          <button onClick={onClose} style={{ marginTop: 8, padding: "10px 24px", borderRadius: 8, background: "#2E5090", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            Katalogga qaytish
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.45)" }} onClick={onClose} />
      <div style={{ width: 400, maxWidth: "95vw", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-4px 0 32px rgba(0,0,0,0.18)" }}>
        {/* Header */}
        <div style={{ background: "#1A2B4A", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 17 }}>🛒 Sizning savatchingiz</div>
            <div style={{ color: "#A0B8D8", fontSize: 12, marginTop: 2 }}>{totalItems} ta mahsulot</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", borderRadius: 6, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => {
            const lineTotal = item.product.wholesaleUZS * item.qty;
            const img = item.product.images[0] || PLACEHOLDER;
            return (
              <div key={item.product.id} style={{ background: "#F7F9FD", borderRadius: 10, border: "1px solid #E2E8F0", padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
                <img src={img} alt={item.product.name} style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "#fff", border: "1px solid #E2E8F0", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: "#1A2B4A", marginBottom: 2 }}>{item.product.name}</div>
                  <div style={{ fontSize: 11, color: "#718096" }}>{item.product.article} · опт: {fmtUZS(item.product.wholesaleUZS)}/шт.</div>
                  {/* Qty control */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <button onClick={() => onUpdateQty(item.product.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #CBD5E0", background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, minWidth: 28, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.product.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #CBD5E0", background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <span style={{ marginLeft: "auto", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: "#276749" }}>{fmt(lineTotal, currency)}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(item.product.id)} style={{ background: "none", border: "none", color: "#CBD5E0", cursor: "pointer", fontSize: 18, padding: "0 4px", flexShrink: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#e53e3e")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#CBD5E0")}>×</button>
              </div>
            );
          })}
        </div>

        {/* Summary + Order */}
        <div style={{ borderTop: "1px solid #E2E8F0", padding: "16px 20px 20px", flexShrink: 0, background: "#fff" }}>
          {/* Line items summary */}
          <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {cart.map(item => (
              <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4A5568" }}>
                <span>{item.product.name} × {item.qty} шт.</span>
                <span style={{ fontWeight: 600 }}>{fmtUZS(item.product.wholesaleUZS * item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 12, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: "#1A2B4A" }}>Jami:</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20, color: "#1A2B4A" }}>{fmtUZS(total)}</div>
                <div style={{ fontSize: 12, color: "#718096" }}>{fmtUSD(total)}</div>
              </div>
            </div>
          </div>
          <button onClick={handleOrder} style={{
            width: "100%", background: "linear-gradient(135deg, #27A041 0%, #1E8033 100%)",
            color: "#fff", border: "none", borderRadius: 10, padding: "14px 0",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 12px rgba(39,160,65,0.3)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(39,160,65,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(39,160,65,0.3)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
            Telegram orqali buyurtma berish
          </button>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "#A0AEC0" }}>
            @{TG_USER} · {PHONE1}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, currency, onAddToCart }: {
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product, qty: number) => void;
}) {
  const hasImages = product.images.length > 0;
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(product.minOrder);

  const mainImg = hasImages ? product.images[activeImg] : PLACEHOLDER;

  function changeQty(delta: number) {
    setQty(q => Math.max(1, q + delta));
  }

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #CBD5E0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(46,80,144,0.14)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
    >
      {/* Image area */}
      <div style={{ background: "#F7F9FD", position: "relative", paddingTop: "78%", overflow: "hidden" }}>
        <img src={mainImg} alt={product.name} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", padding: 14 }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: product.category === "cars" ? "#2E5090" : "#276749", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: "0.4px", textTransform: "uppercase" }}>
          {product.category === "cars" ? "🚗 Mashina" : "🦁 Hayvon"}
        </div>
      </div>

      {/* Thumbs */}
      {hasImages && product.images.length > 1 && (
        <div style={{ display: "flex", gap: 5, padding: "8px 10px 4px", background: "#F7F9FD" }}>
          {product.images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{ width: 42, height: 34, border: activeImg === i ? "2px solid #2E5090" : "1.5px solid #CBD5E0", borderRadius: 6, overflow: "hidden", padding: 0, cursor: "pointer", background: "#fff", flexShrink: 0 }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <div style={{ padding: "12px 13px 14px", flexGrow: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "#1A2B4A", margin: 0, lineHeight: 1.3 }}>{product.name}</h3>
          <span style={{ fontSize: 10, color: "#2E5090", background: "#EEF4FF", padding: "2px 7px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{product.article}</span>
        </div>

        {/* Props */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {product.ageFrom !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4A5568" }}>
              <span style={{ color: "#2E5090", fontWeight: 700 }}>›</span> Yosh: {product.ageFrom}+
            </div>
          )}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4A5568" }}>
              <span style={{ color: "#2E5090", fontWeight: 700 }}>›</span> Rangi:
              {product.colors.map((c, i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)", display: "inline-block" }} />
              ))}
            </div>
          )}
          {product.material && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4A5568" }}>
              <span style={{ color: "#2E5090", fontWeight: 700 }}>›</span> {product.material}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid #EDF2F7", marginTop: 2 }} />

        {/* Prices */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, background: "#EEF4FF", borderRadius: 8, padding: "7px 9px" }}>
            <div style={{ fontSize: 9, color: "#2E5090", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.5px" }}>Розница</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A2B4A", fontFamily: "'Sora',sans-serif" }}>{fmt(product.retailUZS, currency)}</div>
          </div>
          <div style={{ flex: 1, background: "#EAF5EA", borderRadius: 8, padding: "7px 9px" }}>
            <div style={{ fontSize: 9, color: "#276749", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.5px" }}>Опт</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#276749", fontFamily: "'Sora',sans-serif" }}>{fmt(product.wholesaleUZS, currency)}</div>
          </div>
        </div>

        {/* Quantity selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, background: "#F7F9FD", borderRadius: 8, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <button onClick={() => changeQty(-1)} style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 18, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
          <div style={{ flex: 1, textAlign: "center", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, color: "#1A2B4A" }}>{qty}</div>
          <button onClick={() => changeQty(1)} style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 18, color: "#2E5090", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          <div style={{ borderLeft: "1px solid #E2E8F0", padding: "0 10px", fontSize: 11, color: "#718096", whiteSpace: "nowrap" }}>
            = {fmt(product.wholesaleUZS * qty, currency)}
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#A0AEC0", textAlign: "center", marginTop: -4 }}>мин. партия: {product.minOrder} шт.</div>

        {/* Add to cart */}
        <button onClick={() => onAddToCart(product, qty)} style={{ width: "100%", background: "linear-gradient(135deg, #2E5090 0%, #1A3A78 100%)", color: "#fff", border: "none", borderRadius: 9, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "opacity 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          🛒 Savatga qo'shish
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CatalogPage() {
  const [currency, setCurrency] = useState<Currency>("uzs");
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const totalCartItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalCartSum = cart.reduce((s, i) => s + i.product.wholesaleUZS * i.qty, 0);

  function addToCart(product: Product, qty: number) {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) setCart(prev => prev.filter(i => i.product.id !== id));
    else setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(i => i.product.id !== id));
  }

  function handleTgOrder() {
    if (cart.length === 0) { setCartOpen(true); return; }
    const total = cart.reduce((s, i) => s + i.product.wholesaleUZS * i.qty, 0);
    let msg = "🛒 *Yangi buyurtma — Sweet Toys*\n\n";
    cart.forEach((item) => {
      msg += `▪️ *${item.product.name}* (${item.product.article})\n`;
      msg += `  ${item.qty} шт. × ${fmtUZS(item.product.wholesaleUZS)} = *${fmtUZS(item.product.wholesaleUZS * item.qty)}*\n\n`;
    });
    msg += `━━━━━━━━━━━━━\n💰 *Jami: ${fmtUZS(total)}*`;
    window.open(`https://t.me/${TG_USER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const filtered = PRODUCTS.filter(p =>
    (category === "all" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.article.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = { total: PRODUCTS.length, cars: PRODUCTS.filter(p => p.category === "cars").length, animals: PRODUCTS.filter(p => p.category === "animals").length };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F7F9FD", minHeight: "100vh" }}>
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} currency={currency} />}

      {/* HEADER */}
      <header style={{ background: "#1A2B4A", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, background: "#2E5090", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧸</div>
            <div>
              <div style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontWeight: 700, fontSize: 18 }}>Sweet Toys</div>
              <div style={{ color: "#A0B8D8", fontSize: 10 }}>ishlab chiqaruvchi · {SINCE_YEAR} yildan</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {(["uzs", "usd"] as Currency[]).map(c => (
                <button key={c} onClick={() => setCurrency(c)} style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid", borderColor: currency === c ? "#fff" : "#3A5070", background: currency === c ? "#fff" : "transparent", color: currency === c ? "#1A2B4A" : "#A0B8D8", fontWeight: currency === c ? 700 : 400, fontSize: 12, cursor: "pointer" }}>
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Cart button */}
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: totalCartItems > 0 ? "#27A041" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 9, padding: "8px 14px", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", gap: 7, transition: "background 0.2s" }}>
              🛒
              {totalCartItems > 0 && (
                <span style={{ background: "#e53e3e", color: "#fff", borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "1px 6px", position: "absolute", top: -4, right: -4 }}>{totalCartItems}</span>
              )}
              {totalCartItems > 0 && <span>{fmtUZS(totalCartSum)}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #1A2B4A 0%, #2E5090 100%)", padding: "44px 20px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#A0C8F0", padding: "4px 12px", borderRadius: 20, fontSize: 11, marginBottom: 12, fontWeight: 600 }}>
            {SINCE_YEAR} yildan beri · Rasmiy katalog 2024
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontSize: 30, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Sweet Toys<br /><span style={{ color: "#6FA8DC" }}>Mahsulotlar katalogi</span>
          </h1>
          <p style={{ color: "#A0B8D8", fontSize: 13, maxWidth: 440, lineHeight: 1.6, marginBottom: 24 }}>
            Plastik o'yinchoqlar — ulgurji va chakana. Mashina, transport, hayvonlar va dinozavrlar.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[{ label: "Mahsulot", v: stats.total }, { label: "Mashina", v: stats.cars }, { label: "Hayvonlar", v: stats.animals }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 18px" }}>
                <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700 }}>{s.v}</div>
                <div style={{ color: "#A0B8D8", fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 18px" }}>
              <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700 }}>{PHONE1}</div>
              <div style={{ color: "#A0B8D8", fontSize: 11 }}>{PHONE2}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 20px 0" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {([
              { key: "all", label: "Barchasi", count: stats.total },
              { key: "cars", label: "🚗 Mashina va transport", count: stats.cars },
              { key: "animals", label: "🦁 Hayvon va dinozavrlar", count: stats.animals },
            ] as { key: Category; label: string; count: number }[]).map(tab => (
              <button key={tab.key} onClick={() => setCategory(tab.key)} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid", borderColor: category === tab.key ? "#2E5090" : "#CBD5E0", background: category === tab.key ? "#2E5090" : "#fff", color: category === tab.key ? "#fff" : "#4A5568", fontWeight: category === tab.key ? 700 : 400, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                {tab.label}
                <span style={{ background: category === tab.key ? "rgba(255,255,255,0.25)" : "#EEF4FF", color: category === tab.key ? "#fff" : "#2E5090", borderRadius: 8, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{tab.count}</span>
              </button>
            ))}
          </div>
          <input type="text" placeholder="Qidirish..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "7px 13px", borderRadius: 8, border: "1px solid #CBD5E0", fontSize: 12, color: "#1A2B4A", outline: "none", width: 200, background: "#fff" }} />
        </div>
        <div style={{ color: "#718096", fontSize: 11, marginTop: 10 }}>
          Ko'rsatilmoqda: <strong style={{ color: "#1A2B4A" }}>{filtered.length}</strong> / {PRODUCTS.length}
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
          {filtered.map(product => (
            <div key={product.id} style={{ position: "relative" }}>
              {addedId === product.id && (
                <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "#27A041", color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, zIndex: 10, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(39,160,65,0.4)" }}>
                  ✓ Savatga qo'shildi
                </div>
              )}
              <ProductCard product={product} currency={currency} onAddToCart={addToCart} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#A0AEC0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div>Hech narsa topilmadi</div>
          </div>
        )}

        {/* BUY BUTTON — after products */}
        {cart.length > 0 && (
          <div style={{ marginTop: 28, background: "linear-gradient(135deg, #1B6B30 0%, #27A041 100%)", borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, boxShadow: "0 6px 24px rgba(39,160,65,0.3)" }}>
            <div>
              <div style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 17 }}>🛒 Savatchangizda: {totalCartItems} ta mahsulot</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 3 }}>Umumiy summa: <strong>{fmtUZS(totalCartSum)}</strong></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setCartOpen(true)} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 9, padding: "11px 20px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                Savatni ko'rish
              </button>
              <button onClick={handleTgOrder} style={{ background: "#fff", color: "#1B6B30", border: "none", borderRadius: 9, padding: "11px 22px", cursor: "pointer", fontWeight: 800, fontSize: 14, fontFamily: "'Sora',sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1B6B30"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
                Buyurtma berish
              </button>
            </div>
          </div>
        )}

        {/* Conditions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginTop: 36 }}>
          {[
            { icon: "📦", title: "Yetkazib berish", items: ["O'z olish — bepul", "Shahar bo'ylab — individual", "Viloyatlarga — kelishuv bo'yicha"] },
            { icon: "💳", title: "To'lov", items: ["Yangi mijozlar uchun 100% oldindan to'lov", "Doimiy mijozlar uchun keyingi to'lov", "Naqd va o'tkazma qabul qilinadi"] },
            { icon: "✅", title: "Sifat", items: ["Sertifikatlangan materiallar", "3 yoshdan kattalar uchun xavfsiz", "Zavod nuqsoni bo'lsa kafolat"] },
          ].map(block => (
            <div key={block.title} style={{ background: "#fff", borderRadius: 10, border: "1px solid #CBD5E0", padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>{block.icon}</span>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#1A2B4A" }}>{block.title}</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {block.items.map(item => (
                  <li key={item} style={{ padding: "5px 0", borderBottom: "1px solid #EDF2F7", color: "#4A5568", fontSize: 12, display: "flex", gap: 7 }}>
                    <span style={{ color: "#2E5090", fontWeight: 700 }}>›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop: 28, background: "linear-gradient(135deg, #1A2B4A 0%, #2E5090 100%)", borderRadius: 12, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18 }}>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Buyurtma bermoqchimisiz?</h2>
            <p style={{ color: "#A0B8D8", fontSize: 13 }}>{PHONE1} · {PHONE2}<br />@{TG_USER} · {SINCE_YEAR} yildan beri</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`tel:${PHONE1}`} style={{ background: "#fff", color: "#1A2B4A", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>📞 Qo'ng'iroq</a>
            <a href={`https://t.me/${TG_USER}`} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "11px 22px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>✉️ Telegram</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1A2B4A", marginTop: 40, padding: "22px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ color: "#A0B8D8", fontSize: 12 }}>© {SINCE_YEAR}–2024 <strong style={{ color: "#fff" }}>Sweet Toys</strong> — Plastik o'yinchoqlar ishlab chiqaruvchisi</div>
          <div style={{ color: "#A0B8D8", fontSize: 11 }}>O'zbekiston · 1 USD = {USD_RATE.toLocaleString("ru-RU")} UZS</div>
        </div>
      </footer>
    </div>
  );
}
