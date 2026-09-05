"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { adicionaisDisponiveis, classicas } from "@/data/cardapio";
import type { Pizza } from "@/data/cardapio";

interface PizzaCardProps {
  item: Pizza;
  index: number;
  category: string;
}

const tamanhos = ["P", "M", "G", "GG"] as const;
type Tamanho = typeof tamanhos[number];

export default function PizzaCard({ item, index, category }: PizzaCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Tamanho>("M");
  const [showModal, setShowModal] = useState(false);
  const [meiaAtiva, setMeiaAtiva] = useState(false);
  const [meiaSabor, setMeiaSabor] = useState<string>("");
  const [showAdicionais, setShowAdicionais] = useState(false);
  const [selectedAdicionais, setSelectedAdicionais] = useState<string[]>([]);
  const [bordaUpgrade, setBordaUpgrade] = useState<string | null>(null);

  const hasGG = item.tamanhos.GG !== undefined;
  const availableSizes: Tamanho[] = hasGG ? [...tamanhos] : (["P", "M", "G"] as Tamanho[]);

  // Only classicas can be "metade"
  const classicasParaMeia = classicas.filter(c => c.id !== item.id);

  const toggleAdicional = (nome: string) => {
    setSelectedAdicionais(prev =>
      prev.includes(nome) ? prev.filter(a => a !== nome) : [...prev, nome]
    );
  };

  const handleAdd = () => {
    const adicionaisData = selectedAdicionais.map(nome => {
      const a = adicionaisDisponiveis.find(ad => ad.nome === nome);
      return { nome, preco: a?.preco || 0 };
    });

    const meiaData = (meiaAtiva && meiaSabor)
      ? { id: meiaSabor, nome: classicas.find(c => c.id === meiaSabor)?.nome || meiaSabor }
      : null;

    const precoFinal = item.tamanhos[selectedSize]
      + adicionaisData.reduce((s, a) => s + a.preco, 0)
      + (bordaUpgrade === "Cheddar" ? 4 : bordaUpgrade === "Doce" ? 4 : 0);

    addItem({
      id: item.id,
      nome: item.nome + (meiaData ? " + " + meiaData.nome : ""),
      categoria: category as any,
      tamanho: selectedSize,
      preco: precoFinal,
      ingredientes: item.ingredientes,
      bordaUpgrade,
      bordaAcrescimo: bordaUpgrade ? 4 : 0,
      meia: meiaData,
      adicionais: adicionaisData,
    });
    setShowModal(false);
    resetState();
  };

  const resetState = () => {
    setMeiaAtiva(false);
    setMeiaSabor("");
    setShowAdicionais(false);
    setSelectedAdicionais([]);
    setBordaUpgrade(null);
    setSelectedSize("M");
  };

  // Calculate preco display
  const precoExtraAdicionais = selectedAdicionais.reduce((s, n) => {
    const a = adicionaisDisponiveis.find(ad => ad.nome === n);
    return s + (a?.preco || 0);
  }, 0) + (bordaUpgrade ? 4 : 0);

  const precoTotal = item.tamanhos[selectedSize] + precoExtraAdicionais;

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group"
      >
        <div onClick={() => { resetState(); setShowModal(true); }} className="relative bg-brand-surface border border-brand-border/60 rounded-xl overflow-hidden cursor-pointer hover:border-brand-accent/30 hover:shadow-card-hover transition-all duration-400">
          {/* Image area */}
          <div className="relative h-44 md:h-48 overflow-hidden bg-brand-surface-2">
            {item.imagem ? (
              <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-brand-border" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
            )}
            <span className="absolute top-2 left-2 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-brand-bg/70 backdrop-blur-sm text-brand-text-muted rounded-md border border-white/5">
              {category === "classicas" || category === "especiais" || category === "doces" ? "Pizza" : category}
            </span>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="font-display font-bold text-base text-brand-text group-hover:text-brand-accent transition-colors">{item.nome}</h3>
            <p className="text-xs text-brand-text-muted/70 leading-relaxed line-clamp-2">{item.ingredientes?.join(", ")}</p>
            <div className="flex items-center gap-1.5">
              {availableSizes.map((size) => (
                <button key={size} onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                  className={cn("flex-1 py-1.5 text-xs font-medium rounded-md border transition-all",
                    selectedSize === size ? "bg-brand-accent/15 border-brand-accent/40 text-brand-accent" : "border-brand-border/60 text-brand-text-muted/60 hover:border-brand-text-muted/30")}
                >{size}</button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-display font-bold text-lg text-brand-accent">{formatCurrency(item.tamanhos[selectedSize])}</span>
              <button onClick={(e) => { e.stopPropagation(); resetState(); setShowModal(true); }} className="p-2 rounded-lg bg-brand-primary hover:bg-brand-primary-light text-white transition-colors" aria-label="Personalizar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MODAL com metade + adicionais */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()} className="bg-brand-surface border border-brand-border/60 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-warm-lg">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-brand-text">{item.nome}</h2>
                    <p className="text-sm text-brand-text-muted/70 mt-1">{item.ingredientes?.join(", ")}</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-1.5 text-brand-text-muted hover:text-brand-text rounded-lg hover:bg-white/5 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>

                {/* Tamanhos */}
                <div>
                  <label className="text-xs font-medium text-brand-text-muted uppercase tracking-wider mb-2 block">Tamanho</label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={cn("py-3 rounded-lg border text-center transition-all",
                          selectedSize === size ? "bg-brand-accent/15 border-brand-accent/40 text-brand-accent font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-text-muted/30")}
                      >
                        <span className="block text-sm font-bold">{size}</span>
                        <span className="block text-xs mt-0.5 opacity-70">{formatCurrency(item.tamanhos[size])}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Borda */}
                <div>
                  <label className="text-xs font-medium text-brand-text-muted uppercase tracking-wider mb-2 block">Borda</label>
                  <div className="flex gap-2">
                    {["Tradicional", "Cheddar", "Doce"].map((b) => (
                      <button key={b} onClick={() => setBordaUpgrade(b === "Tradicional" ? null : b)}
                        className={cn("flex-1 py-2 rounded-lg border text-xs transition-all",
                          (bordaUpgrade === b || (b === "Tradicional" && !bordaUpgrade)) ? "bg-brand-accent/15 border-brand-accent/40 text-brand-accent font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-text-muted/30")}
                      >{b}{b !== "Tradicional" ? " +R$4" : ""}</button>
                    ))}
                  </div>
                </div>

                {/* MEIO A MEIO toggle */}
                <div className="border-t border-brand-border/40 pt-4">
                  <button onClick={() => setMeiaAtiva(!meiaAtiva)} className="flex items-center gap-2 text-sm font-medium text-brand-text hover:text-brand-accent transition-colors">
                    <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", meiaAtiva ? "bg-brand-accent border-brand-accent" : "border-brand-text-muted/40")}>
                      {meiaAtiva && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5l9-9"/></svg>}
                    </div>
                    <span>Meio a meio?</span>
                    <span className="text-xs text-brand-text-muted/60">(adicione outra metade)</span>
                  </button>

                  {meiaAtiva && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 overflow-hidden">
                      <p className="text-xs text-brand-text-muted mb-2">Escolha a outra metade:</p>
                      <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
                        {classicasParaMeia.map((c) => (
                          <button key={c.id} onClick={() => setMeiaSabor(c.id)}
                            className={cn("px-3 py-2 rounded-lg border text-xs text-left transition-all",
                              meiaSabor === c.id ? "bg-brand-primary/10 border-brand-primary/40 text-brand-primary font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-primary/30")}
                          >
                            <span className="block">{c.nome}</span>
                            <span className="block mt-0.5 opacity-60">{formatCurrency(c.tamanhos[selectedSize])} (metade)</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ADICIONAIS - collapsed by default */}
                <div className="border-t border-brand-border/40 pt-4">
                  <button onClick={() => setShowAdicionais(!showAdicionais)} className="flex items-center gap-2 text-sm font-medium text-brand-text hover:text-brand-accent transition-colors">
                    <svg className={cn("w-3.5 h-3.5 transition-transform", showAdicionais && "rotate-45")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    <span>Adicionar extras</span>
                    {selectedAdicionais.length > 0 && <span className="text-xs text-brand-accent">({selectedAdicionais.length} selecionado{selectedAdicionais.length > 1 ? "s" : ""})</span>}
                  </button>

                  {showAdicionais && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 overflow-hidden">
                      <div className="grid grid-cols-2 gap-1.5">
                        {adicionaisDisponiveis.map((a) => (
                          <button key={a.nome} onClick={() => toggleAdicional(a.nome)}
                            className={cn("px-3 py-2 rounded-lg border text-xs text-left transition-all flex justify-between",
                              selectedAdicionais.includes(a.nome) ? "bg-brand-accent/10 border-brand-accent/40 text-brand-accent font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-accent/30")}
                          >
                            <span>{a.nome}</span>
                            <span className="opacity-60">+R${a.preco}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Resumo + Adicionar */}
                <div className="border-t border-brand-border/40 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-muted">Pizza {selectedSize}</span>
                    <span className="text-brand-text">{formatCurrency(item.tamanhos[selectedSize])}</span>
                  </div>
                  {bordaUpgrade && (
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-text-muted">Borda {bordaUpgrade}</span>
                      <span className="text-brand-text">+R$4,00</span>
                    </div>
                  )}
                  {meiaAtiva && meiaSabor && (
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-text-muted">½ {classicas.find(c => c.id === meiaSabor)?.nome}</span>
                      <span className="text-brand-text">+{formatCurrency(classicas.find(c => c.id === meiaSabor)?.tamanhos[selectedSize] || 0)}</span>
                    </div>
                  )}
                  {selectedAdicionais.length > 0 && (
                    <div className="text-sm">
                      <span className="text-brand-text-muted block mb-1">Extras:</span>
                      {selectedAdicionais.map(n => {
                        const a = adicionaisDisponiveis.find(ad => ad.nome === n);
                        return (
                          <div key={n} className="flex justify-between text-xs pl-2">
                            <span className="text-brand-text-muted">+ {n}</span>
                            <span className="text-brand-text">+R${a?.preco},00</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex justify-between font-display text-base font-bold pt-2 border-t border-brand-border/40">
                    <span>Total</span>
                    <span className="text-brand-accent">{formatCurrency(precoTotal)}</span>
                  </div>

                  <button onClick={handleAdd} className="w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white font-medium rounded-xl transition-all duration-300 shadow-glow">
                    Adicionar ao Carrinho — {formatCurrency(precoTotal)}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------- BebidaCard ----------

interface BebidaCardProps {
  item: {
    id: string;
    nome: string;
    tipo: string;
    imagem?: string;
    tamanhos: { nome: string; preco: number }[];
  };
  index: number;
}

export function BebidaCard({ item, index }: BebidaCardProps) {
  const { addItem } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const t = item.tamanhos[selectedIdx];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: (index % 4) * 0.06 }} className="group">
      <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-4 hover:border-brand-accent/20 hover:shadow-card-hover transition-all duration-300">
        <h3 className="font-display font-bold text-sm text-brand-text text-center mb-2">{item.nome}</h3>
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {item.tamanhos.map((t2, i) => (
            <button key={t2.nome} onClick={() => setSelectedIdx(i)}
              className={cn("px-2.5 py-1 text-xs rounded-md border transition-all", selectedIdx === i ? "bg-brand-accent/15 border-brand-accent/40 text-brand-accent" : "border-brand-border/60 text-brand-text-muted/60 hover:border-brand-text-muted/30")}
            >{t2.nome}</button>
          ))}
        </div>
        <button onClick={() => {
          addItem({ id: item.id, nome: item.nome, categoria: "bebida", tamanho: t.nome, preco: t.preco, ingredientes: [], bordaUpgrade: null, bordaAcrescimo: 0 });
        }} className="w-full py-2 text-xs font-medium bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary-light rounded-lg transition-colors flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          {formatCurrency(t.preco)}
        </button>
      </div>
    </motion.div>
  );
}