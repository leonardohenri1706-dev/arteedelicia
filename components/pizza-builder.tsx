"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { todasPizzas, bebidas } from "@/data/cardapio";

interface PizzaBuilderProps {
  open: boolean;
  onClose: () => void;
}

const tamanhos = [
  { key: "P" as const, label: "P", desc: "Pequena (até 2 sabores)" },
  { key: "M" as const, label: "M", desc: "Média (até 2 sabores)" },
  { key: "G" as const, label: "G", desc: "Grande (até 2 sabores)" },
  { key: "GG" as const, label: "GG", desc: "Gigante (até 3 sabores)" },
];

const coresSabores = [
  "bg-brand-accent/80",
  "bg-brand-primary/80",
  "bg-brand-accent-light/80",
  "bg-brand-primary-light/80",
];

export default function PizzaBuilder({ open, onClose }: PizzaBuilderProps) {
  const { addItem } = useCart();
  const [step, setStep] = useState<"tamanho" | "sabores" | "bebidas">("tamanho");
  const [selectedSize, setSelectedSize] = useState<"P" | "M" | "G" | "GG" | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<{ id: string; nome: string; tamanho: string; preco: number }[]>([]);

  const maxSabores = selectedSize === "GG" ? 3 : 2;

  const selectTamanho = (key: "P" | "M" | "G" | "GG") => {
    setSelectedSize(key);
    setStep("sabores");
  };

  const toggleFlavor = (id: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : prev.length < maxSabores ? [...prev, id] : prev
    );
  };

  const toggleDrink = (bebida: typeof bebidas[0], tamanhoIdx: number) => {
    const t = bebida.tamanhos[tamanhoIdx];
    const key = bebida.id + "-" + t.nome;
    setSelectedDrinks((prev) =>
      prev.find((d) => d.id + "-" + d.tamanho === key)
        ? prev.filter((d) => d.id + "-" + d.tamanho !== key)
        : [...prev, { id: bebida.id, nome: bebida.nome, tamanho: t.nome, preco: t.preco }]
    );
  };

  const precoMedio = useMemo(() => {
    if (selectedFlavors.length === 0) return 0;
    const precos = selectedFlavors.map((id) => {
      const pizza = todasPizzas.find((p) => p.id === id);
      return pizza ? pizza.tamanhos[selectedSize || "M"] : 0;
    });
    return precos.reduce((a, b) => a + b, 0) / precos.length;
  }, [selectedFlavors, selectedSize]);

  const drinksTotal = selectedDrinks.reduce((s, d) => s + d.preco, 0);

  const handleAdd = () => {
    if (selectedFlavors.length < 2) return;
    const saboresData = selectedFlavors.map((id) => {
      const pizza = todasPizzas.find((p) => p.id === id);
      return { id, nome: pizza?.nome || id };
    });
    const idUnica = "montar-" + saboresData.map(s => s.id).sort().join("-") + "-" + selectedSize;

    addItem({
      id: idUnica,
      nome: saboresData.map(s => s.nome).join(" + ") + " (" + selectedSize + ")",
      categoria: "classica",
      tamanho: selectedSize || "M",
      preco: precoMedio,
      ingredientes: [],
      bordaUpgrade: null,
      bordaAcrescimo: 0,
    });

    // Add drinks too
    selectedDrinks.forEach((d) => {
      addItem({
        id: d.id,
        nome: d.nome + " " + d.tamanho,
        categoria: "bebida",
        tamanho: d.tamanho,
        preco: d.preco,
        ingredientes: [],
        bordaUpgrade: null,
        bordaAcrescimo: 0,
      });
    });

    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-brand-surface rounded-xl shadow-warm-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header with step progress */}
          <div className="sticky top-0 bg-brand-surface z-10 px-6 md:px-8 pt-6 pb-4 border-b border-brand-border/60">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-brand-text">Montar Pedido</h2>
              <button onClick={onClose} className="p-1.5 text-brand-text-muted hover:text-brand-text rounded-lg hover:bg-white/5 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex gap-2">
              <div className={cn("flex-1 h-1.5 rounded-full transition-all duration-500", step === "tamanho" ? "bg-brand-accent" : selectedFlavors.length > 0 ? "bg-brand-accent/30" : "bg-brand-border/60")} />
              <div className={cn("flex-1 h-1.5 rounded-full transition-all duration-500", step === "sabores" ? "bg-brand-accent" : step === "bebidas" ? "bg-brand-accent/30" : "bg-brand-border/60")} />
              <div className={cn("flex-1 h-1.5 rounded-full transition-all duration-500", step === "bebidas" ? "bg-brand-accent" : "bg-brand-border/60")} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] uppercase tracking-wider text-brand-text-muted/50 font-medium">Tamanho</span>
              <span className="text-[10px] uppercase tracking-wider text-brand-text-muted/50 font-medium">Sabores</span>
              <span className="text-[10px] uppercase tracking-wider text-brand-text-muted/50 font-medium">Bebidas</span>
            </div>
          </div>

          <div className="px-6 md:px-8 py-6">
            {/* STEP 1: Size */}
            {step === "tamanho" && (
              <div className="space-y-6">
                <p className="font-body text-brand-text-muted text-sm">Escolha o tamanho da sua pizza personalizada:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tamanhos.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => selectTamanho(t.key)}
                      className="group bg-brand-surface-2/80 border border-brand-border/60 rounded-xl p-5 text-center hover:border-brand-accent/40 hover:shadow-warm transition-all duration-300"
                    >
                      <span className={cn("font-display text-3xl block font-bold", t.key === "GG" ? "text-brand-accent" : "text-brand-primary")}>{t.label}</span>
                      <p className="font-body text-xs text-brand-text-muted/70 mt-2">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Flavors */}
            {step === "sabores" && selectedSize && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm text-brand-text-muted">
                    Escolha <strong>{maxSabores} sabores</strong> para pizza <strong>{selectedSize}</strong>
                  </p>
                  <button onClick={() => setStep("tamanho")} className="text-xs text-brand-accent hover:text-brand-accent-light underline">Trocar tamanho</button>
                </div>

                {/* Preview combinação */}
                {selectedFlavors.length >= 2 && (
                  <div className="flex items-center gap-4 p-4 bg-brand-bg rounded-xl border border-brand-border/40">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-brand-accent/30 flex items-center justify-center bg-brand-surface-2">
                      <div className="flex flex-wrap gap-0.5 z-10 px-1">
                        {selectedFlavors.map((id, i) => (
                          <span key={id} className={cn("w-6 h-6 rounded-full border border-white/30", coresSabores[i % coresSabores.length])} />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-brand-text">Combinação</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedFlavors.map((id) => {
                          const pizza = todasPizzas.find((p) => p.id === id);
                          return <span key={id} className="inline-block px-2 py-0.5 text-[10px] bg-brand-bg border border-brand-border/50 rounded-md text-brand-text-muted">{pizza?.nome || id}</span>;
                        })}
                      </div>
                      <p className="font-body text-xs text-brand-text-muted mt-2">Média: <strong className="text-brand-accent">{formatCurrency(precoMedio)}</strong></p>
                    </div>
                  </div>
                )}

                <p className="font-body text-xs text-brand-text-muted">{selectedFlavors.length}/{maxSabores} selecionados</p>

                {/* Classic pizzas */}
                <div>
                  <h3 className="font-body text-sm font-medium text-brand-text mb-2.5">Clássicas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {todasPizzas.filter(p => ["calabresa","frango","portuguesa","queijo","mista","odelicia","marguerita"].includes(p.id)).map((pizza) => (
                      <button key={pizza.id} onClick={() => toggleFlavor(pizza.id)} disabled={!selectedFlavors.includes(pizza.id) && selectedFlavors.length >= maxSabores}
                        className={cn("px-3 py-2.5 rounded-lg text-left border text-sm transition-all",
                          selectedFlavors.includes(pizza.id) ? "border-brand-primary bg-brand-primary/10 text-brand-primary font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-primary/40",
                          !selectedFlavors.includes(pizza.id) && selectedFlavors.length >= maxSabores && "opacity-40 cursor-not-allowed")}
                      >
                        <span className="block text-xs font-medium">{pizza.nome}</span>
                        <span className="block text-[11px] mt-0.5 opacity-60">R$ {pizza.tamanhos[selectedSize].toFixed(2).replace(".", ",")}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special pizzas */}
                <div>
                  <h3 className="font-body text-sm font-medium text-brand-text mb-2.5">Especiais</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {todasPizzas.filter(p => !["calabresa","frango","portuguesa","queijo","mista","odelicia","marguerita"].includes(p.id)).map((pizza) => (
                      <button key={pizza.id} onClick={() => toggleFlavor(pizza.id)} disabled={!selectedFlavors.includes(pizza.id) && selectedFlavors.length >= maxSabores}
                        className={cn("px-3 py-2.5 rounded-lg text-left border text-sm transition-all",
                          selectedFlavors.includes(pizza.id) ? "border-brand-accent bg-brand-accent/10 text-brand-accent font-medium" : "border-brand-border/60 text-brand-text-muted hover:border-brand-accent/40",
                          !selectedFlavors.includes(pizza.id) && selectedFlavors.length >= maxSabores && "opacity-40 cursor-not-allowed")}
                      >
                        <span className="block text-xs font-medium">{pizza.nome}</span>
                        <span className="block text-[11px] mt-0.5 opacity-60">R$ {pizza.tamanhos[selectedSize].toFixed(2).replace(".", ",")}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Continue button */}
                {selectedFlavors.length >= 2 && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep("bebidas")} className="flex-1 py-3 bg-brand-accent hover:bg-brand-accent-light text-black font-medium rounded-xl transition-all duration-300 text-sm">
                      Continuar para Bebidas
                      <svg className="inline-block ml-1.5 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Drinks */}
            {step === "bebidas" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm text-brand-text-muted">Adicione bebidas ao seu pedido <span className="opacity-50">(opcional)</span></p>
                  <button onClick={() => setStep("sabores")} className="text-xs text-brand-accent hover:text-brand-accent-light underline">Voltar aos sabores</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {bebidas.map((bebida) => {
                    const t = bebida.tamanhos[0];
                    const isSelected = selectedDrinks.some(d => d.id === bebida.id && d.tamanho === t.nome);
                    return (
                      <button
                        key={bebida.id}
                        onClick={() => toggleDrink(bebida, 0)}
                        className={cn("p-3 rounded-xl border text-center transition-all",
                          isSelected ? "bg-brand-accent/10 border-brand-accent/40" : "bg-brand-surface-2/80 border-brand-border/60 hover:border-brand-accent/20")}
                      >
                        <span className={cn("block text-xs font-medium", isSelected ? "text-brand-accent" : "text-brand-text")}>{bebida.nome}</span>
                        <span className="block text-[11px] mt-1 text-brand-text-muted/70">{t.nome} · R$ {t.preco.toFixed(2).replace(".", ",")}</span>
                        {isSelected && <span className="block text-xs text-brand-accent mt-1">✓ Adicionado</span>}
                      </button>
                    );
                  })}
                </div>

                {selectedDrinks.length > 0 && (
                  <div className="bg-brand-bg rounded-xl p-4 border border-brand-border/40">
                    <p className="text-xs font-medium text-brand-text mb-2">Bebidas selecionadas:</p>
                    {selectedDrinks.map((d) => (
                      <div key={d.id + d.tamanho} className="flex justify-between text-sm py-1">
                        <span className="text-brand-text-muted">{d.nome} ({d.tamanho})</span>
                        <span className="text-brand-text">{formatCurrency(d.preco)}</span>
                      </div>
                    ))}
                    {drinksTotal > 0 && (
                      <div className="flex justify-between text-sm font-medium pt-2 mt-2 border-t border-brand-border/40">
                        <span className="text-brand-text">Total bebidas</span>
                        <span className="text-brand-accent">{formatCurrency(drinksTotal)}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("sabores")} className="flex-1 py-3 border border-brand-border/60 text-brand-text-muted hover:text-brand-text rounded-xl transition-all text-sm">Voltar</button>
                  <button onClick={handleAdd} className="flex-1 py-3 bg-brand-primary hover:bg-brand-primary-light text-white font-medium rounded-xl transition-all duration-300 text-sm shadow-glow">
                    Finalizar Pedido
                    <span className="block text-[10px] opacity-80 mt-0.5">Pizza + Bebidas</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}