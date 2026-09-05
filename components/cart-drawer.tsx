"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { adicionaisDisponiveis } from "@/data/cardapio";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, totalItens } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand-surface border-l border-brand-border/60 shadow-warm-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border/60">
              <div>
                <h2 className="font-display font-bold text-lg text-brand-text">Carrinho</h2>
                <p className="text-xs text-brand-text-muted/70 mt-0.5">{totalItens} item{totalItens !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-text rounded-lg hover:bg-white/5 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-h-[calc(100vh-220px)]">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 mx-auto text-brand-border mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                  <p className="text-brand-text-muted/60 text-sm">Seu carrinho está vazio</p>
                  <p className="text-xs text-brand-text-muted/40 mt-1">Adicione pizzas e bebidas</p>
                </div>
              ) : (
                items.map((item) => <CartItemRow key={item.uniqueId} item={item} removeItem={removeItem} updateQty={updateQty} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-border/60 px-6 py-4 space-y-3 bg-brand-surface-2/50">
                <div className="flex justify-between font-display font-bold text-lg">
                  <span className="text-brand-text">Total</span>
                  <span className="text-brand-accent">{formatCurrency(total)}</span>
                </div>
                <button onClick={onCheckout} className="w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white font-medium rounded-xl transition-all duration-300 shadow-glow">
                  Finalizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CartItemRowProps {
  item: ReturnType<typeof useCart>["items"][0];
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
}

function CartItemRow({ item, removeItem, updateQty }: CartItemRowProps) {
  const [showExtras, setShowExtras] = useState(false);

  const precoItem = (item.preco + item.bordaAcrescimo) * item.quantidade;
  const adicionaisTotal = item.adicionais.reduce((s, a) => s + a.preco, 0) * item.quantidade;
  const totalLinha = (item.preco + item.bordaAcrescimo + adicionaisTotal) * item.quantidade;

  const nomeBase = item.nome.split(" + ")[0]; // Pega o nome base sem a metade
  const temMeia = item.meia && item.nome.includes(" + ");

  return (
    <motion.div layout className="bg-brand-surface-2/50 border border-brand-border/40 rounded-xl p-3.5 hover:border-brand-accent/20 transition-all">
      {/* Linha principal */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brand-text truncate">
            {item.nome}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            <span className="text-[11px] text-brand-text-muted/60">{item.tamanho}</span>
            {item.bordaUpgrade && <span className="text-[11px] text-brand-accent/70">borda {item.bordaUpgrade}</span>}
            {item.meia && <span className="text-[11px] text-brand-primary/70">½ {item.meia.nome}</span>}
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-sm font-medium text-brand-text">{formatCurrency(totalLinha)}</span>
        </div>
      </div>

      {/* Qty + Remove + Extras toggle */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center gap-1.5">
          <button onClick={() => updateQty(item.uniqueId, item.quantidade - 1)} className="w-7 h-7 flex items-center justify-center rounded-md border border-brand-border/60 text-brand-text-muted hover:text-brand-text hover:border-brand-text-muted/30 text-sm transition-all">−</button>
          <span className="w-7 text-center text-sm font-medium text-brand-text">{item.quantidade}</span>
          <button onClick={() => updateQty(item.uniqueId, item.quantidade + 1)} className="w-7 h-7 flex items-center justify-center rounded-md border border-brand-border/60 text-brand-text-muted hover:text-brand-text hover:border-brand-text-muted/30 text-sm transition-all">+</button>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão Extras - só aparece se tiver adicionais disponíveis ou já tiver */}
          {item.adicionais.length > 0 ? (
            <button onClick={() => setShowExtras(!showExtras)} className={cn("text-[11px] px-2 py-1 rounded-md border transition-all", showExtras ? "bg-brand-accent/10 border-brand-accent/30 text-brand-accent" : "border-brand-border/60 text-brand-text-muted/60 hover:border-brand-accent/30")}>
              {item.adicionais.length} extra{item.adicionais.length > 1 ? "s" : ""} {showExtras ? "▲" : "▼"}
            </button>
          ) : (
            <button onClick={() => setShowExtras(!showExtras)} className="text-[11px] px-2 py-1 rounded-md border border-brand-border/60 text-brand-text-muted/40 hover:text-brand-accent hover:border-brand-accent/30 transition-all">
              + extras {showExtras ? "▲" : "▼"}
            </button>
          )}
          <button onClick={() => removeItem(item.uniqueId)} className="p-1.5 text-brand-text-muted/40 hover:text-brand-primary transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
        </div>
      </div>

      {/* Extras expandido */}
      <AnimatePresence>
        {showExtras && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 pt-3 border-t border-brand-border/30 space-y-2">
              {/* Adicionais atuais */}
              {item.adicionais.length > 0 && (
                <div>
                  <p className="text-[11px] text-brand-text-muted/60 mb-1.5 uppercase tracking-wider">Extras adicionados:</p>
                  {item.adicionais.map((a, i) => (
                    <div key={i} className="flex justify-between text-xs py-0.5">
                      <span className="text-brand-text-muted">+ {a.nome}</span>
                      <span className="text-brand-text">+R${a.preco},00</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Se não tiver adicionais, pergunta se quer */}
              {item.adicionais.length === 0 && (
                <p className="text-xs text-brand-text-muted/50 italic">Nenhum extra adicionado. Volte ao cardápio para personalizar.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
