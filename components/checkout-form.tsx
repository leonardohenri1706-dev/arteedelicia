"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency, formatWhatsAppMessage } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface CheckoutFormProps {
  open: boolean;
  onClose: () => void;
}

type PaymentMethod = "dinheiro" | "cartao" | "pix" | null;

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_SIMONY || "5588993345987";

export default function CheckoutForm({ open, onClose }: CheckoutFormProps) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<"endereco" | "pagamento" | "revisao">("endereco");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    complemento: "",
    observacao: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!payment) return;
    const itensStr = items.map((i) => {
      const nomeLimpo = i.nome.replace(/\s*\([^)]+\)$/, "").trim(); let line = "\u2022 " + nomeLimpo + " (" + i.tamanho + ") x" + i.quantidade + " = " + formatCurrency((i.preco + i.bordaAcrescimo) * i.quantidade);
      if (i.bordaUpgrade) line += " | borda " + i.bordaUpgrade;
      if (i.meia) line += " | metade " + i.meia.nome;
      if (i.ingredientesRemovidos.length > 0) line += " [sem " + i.ingredientesRemovidos.join(", ") + "]";
      if (i.adicionais.length > 0) line += " | +" + i.adicionais.map(a => a.nome).join(", ");
      if (i.personalizacao) line += " | obs: " + i.personalizacao;
      return line;
    });

    const paymentLabels: Record<string, string> = {
      dinheiro: "Dinheiro",
      cartao: "Cart\u00e3o",
      pix: "PIX",
    };

    const msg = formatWhatsAppMessage({
      itens: itensStr,
      total,
      cliente: form,
      formaPagamento: paymentLabels[payment] || payment,
    });

    clearCart();
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-brand-surface rounded-lg shadow-brand-lg p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-brand-text-muted hover:text-brand-text">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-display text-h2 text-brand-text">Finalizar Pedido</h2>
        </div>

        <div className="flex gap-2 mb-6">
          {["endereco", "pagamento", "revisao"].map((s, i) => (
            <div
              key={s}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                s === step || (["endereco", "pagamento", "revisao"].indexOf(step) > i)
                  ? "bg-brand-primary"
                  : "bg-brand-border"
              )}
            />
          ))}
        </div>

        {step === "endereco" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body text-brand-text mb-1">Nome *</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-brand-border font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-brand-text mb-1">Telefone *</label>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => updateField("telefone", e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-brand-border font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="(11) 99999-8888"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body text-brand-text mb-1">Endereço *</label>
              <input
                type="text"
                value={form.endereco}
                onChange={(e) => updateField("endereco", e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-brand-border font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Rua, número, bairro"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-brand-text mb-1">Complemento</label>
              <input
                type="text"
                value={form.complemento}
                onChange={(e) => updateField("complemento", e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-brand-border font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Apto, bloco, ponto de referência"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="saveAddr" checked={saved} onChange={(e) => setSaved(e.target.checked)} className="rounded border-brand-border" />
              <label htmlFor="saveAddr" className="text-sm font-body text-brand-text-muted">Salvar endereço para próximas compras</label>
            </div>
            <button
              onClick={() => setStep("pagamento")}
              disabled={!form.nome || !form.telefone || !form.endereco}
              className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {step === "pagamento" && (
          <div className="space-y-4">
            <p className="font-body text-brand-text-muted text-sm mb-4">
              Escolha a forma de pagamento. Você combina o pagamento diretamente com a Simony no WhatsApp.
            </p>
            <div className="grid gap-3">
              {[
                { key: "dinheiro", icon: "\u{1F4B5}", label: "Dinheiro", desc: "Pague na entrega ou retirada" },
                { key: "cartao", icon: "\u{1F4B3}", label: "Cartão", desc: "Débito ou crédito na entrega" },
                { key: "pix", icon: "\u{1F4F2}", label: "PIX", desc: "Chave enviada junto com o pedido" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setPayment(opt.key as PaymentMethod)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-md border transition-all text-left",
                    payment === opt.key
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-brand-border hover:border-brand-primary/50"
                  )}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <span className="font-body font-medium text-brand-text">{opt.label}</span>
                    <p className="font-body text-xs text-brand-text-muted">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("endereco")} className="btn-outline flex-1">Voltar</button>
              <button
                onClick={() => setStep("revisao")}
                disabled={!payment}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Revisar Pedido
              </button>
            </div>
          </div>
        )}

        {step === "revisao" && (
          <div className="space-y-4">
            <div className="card space-y-2">
              <p className="font-body text-xs text-brand-text-muted uppercase tracking-wider">Dados do Cliente</p>
              <p className="font-body text-sm"><strong>{form.nome}</strong> {"\u00b7"} {form.telefone}</p>
              <p className="font-body text-sm">{form.endereco}{form.complemento ? " \u00b7 " + form.complemento : ""}</p>
            </div>
            <div className="card space-y-2">
              <p className="font-body text-xs text-brand-text-muted uppercase tracking-wider">Itens ({total} itens)</p>
              {items.map((i) => {
                const addPreco = i.adicionais.reduce((s, a) => s + a.preco, 0);
                return (
                <div key={i.uniqueId} className="text-sm font-body">
                  <div className="flex justify-between">
                    <span>{i.nome} ({i.tamanho}) x{i.quantidade}</span>
                    <span className="font-medium">{formatCurrency((i.preco + i.bordaAcrescimo + addPreco) * i.quantidade)}</span>
                  </div>
                  <div className="text-[11px] text-brand-text-muted space-y-0.5 mt-0.5">
                    {i.bordaUpgrade && <span>borda {i.bordaUpgrade} · </span>}
                    {i.meia && <span>metade {i.meia.nome} · </span>}
                    {i.ingredientesRemovidos.length > 0 && <span>sem {i.ingredientesRemovidos.join(", ")} · </span>}
                    {i.adicionais.length > 0 && <span>+{i.adicionais.map(a => a.nome).join(", ")}</span>}
                  </div>
                </div>
              );})}
              <div className="border-t border-brand-border pt-2 flex justify-between font-display text-base">
                <span>Total</span>
                <span className="text-brand-accent">{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="card space-y-2">
              <p className="font-body text-xs text-brand-text-muted uppercase tracking-wider">Pagamento</p>
              <p className="font-body text-base">
                {payment === "dinheiro" ? "\u{1F4B5} Dinheiro" : payment === "cartao" ? "\u{1F4B3} Cart\u00e3o" : "\u{1F4F2} PIX"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-body text-brand-text mb-1">Observações</label>
              <input
                type="text"
                value={form.observacao}
                onChange={(e) => updateField("observacao", e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-brand-border font-body text-sm focus:outline-none focus:border-brand-primary"
                placeholder="Algum detalhe adicional?"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("pagamento")} className="btn-outline flex-1">Voltar</button>
              <button onClick={handleSubmit} className="btn-primary flex-1 text-base py-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                Enviar Pedido via WhatsApp
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}