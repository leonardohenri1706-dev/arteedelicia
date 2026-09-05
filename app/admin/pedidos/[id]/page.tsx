"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, cn } from "@/lib/utils";

interface Pedido {
  id: string;
  created_at: string;
  cliente_nome: string;
  cliente_telefone: string;
  cliente_endereco: string;
  tipo_entrega: string;
  forma_pagamento: string;
  itens: any[];
  total: number;
  status: string;
  observacao: string;
}

export default function PedidoDetalhePage() {
  const { id } = useParams();
  const router = useRouter();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pedidos/" + id)
      .then((res) => res.json())
      .then((data) => {
        setPedido(data.pedido);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const updateStatus = async (status: string) => {
    await fetch("/api/pedidos/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setPedido((prev) => prev ? { ...prev, status } : prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pedido) {
    return <p className="text-brand-text-muted">Pedido não encontrado</p>;
  }

  return (
    <div className="max-w-2xl">
      <button onClick={() => router.push("/admin/pedidos")} className="text-sm text-brand-accent hover:underline mb-4">&larr; Voltar</button>

      <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-brand-text">{pedido.cliente_nome}</h1>
          <span className={cn("px-3 py-1 rounded-lg text-sm font-medium",
            pedido.status === "pendente" ? "bg-brand-accent/15 text-brand-accent" :
            pedido.status === "preparando" ? "bg-blue-500/15 text-blue-400" :
            pedido.status === "saiu" ? "bg-green-500/15 text-green-400" :
            "bg-brand-border/40 text-brand-text-muted")}>{pedido.status || "pendente"}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-brand-text-muted">Telefone:</span> <span className="text-brand-text ml-2">{pedido.cliente_telefone}</span></div>
          <div><span className="text-brand-text-muted">Endereço:</span> <span className="text-brand-text ml-2">{pedido.cliente_endereco || "Retirada"}</span></div>
          <div><span className="text-brand-text-muted">Pagamento:</span> <span className="text-brand-text ml-2">{pedido.forma_pagamento}</span></div>
          <div><span className="text-brand-text-muted">Data:</span> <span className="text-brand-text ml-2">{new Date(pedido.created_at).toLocaleString("pt-BR")}</span></div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-brand-text mb-2">Itens:</h2>
          {pedido.itens?.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-brand-border/30 last:border-0">
              <span className="text-brand-text-muted">{item.nome} ({item.tamanho}) x{item.quantidade}</span>
              <span className="text-brand-text">{formatCurrency((item.preco || 0) * (item.quantidade || 1))}</span>
            </div>
          ))}
          <div className="flex justify-between font-display font-bold text-base pt-3">
            <span className="text-brand-text">Total</span>
            <span className="text-brand-accent">{formatCurrency(pedido.total)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {["pendente", "preparando", "saiu", "entregue"].map((s) => (
            <button key={s} onClick={() => updateStatus(s)}
              className={cn("px-3 py-1.5 rounded-lg text-xs transition-all",
                pedido.status === s ? "bg-brand-accent/15 text-brand-accent font-medium" : "bg-brand-border/30 text-brand-text-muted hover:bg-brand-border/50")}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}