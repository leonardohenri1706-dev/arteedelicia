"use client";
import { useState, useEffect } from "react";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";

interface Pedido {
  id: string;
  created_at: string;
  cliente_nome: string;
  cliente_telefone: string;
  total: number;
  status: string;
  forma_pagamento: string;
  tipo_entrega: string;
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pedidos?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data.pedidos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-text mb-6">Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-brand-text-muted">Nenhum pedido ainda.</p>
      ) : (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <Link
              key={pedido.id}
              href={"/admin/pedidos/" + pedido.id}
              className="block bg-brand-surface border border-brand-border/60 rounded-xl p-5 hover:border-brand-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium",
                      pedido.status === "pendente" ? "bg-brand-accent/15 text-brand-accent" :
                      pedido.status === "preparando" ? "bg-blue-500/15 text-blue-400" :
                      pedido.status === "saiu" ? "bg-green-500/15 text-green-400" :
                      "bg-brand-border/40 text-brand-text-muted")
                    }>{pedido.status || "pendente"}</span>
                    <span className="text-sm font-medium text-brand-text">{pedido.cliente_nome}</span>
                  </div>
                  <p className="text-xs text-brand-text-muted mt-1">{pedido.cliente_telefone}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-brand-accent">{formatCurrency(pedido.total)}</p>
                  <p className="text-[11px] text-brand-text-muted/60 mt-1">{new Date(pedido.created_at).toLocaleString("pt-BR")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}