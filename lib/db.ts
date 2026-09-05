import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql() {
  if (!_sql) {
    const conn = process.env.DATABASE_URL || "";
    if (!conn) {
      // During build, DATABASE_URL is not set - return a mock
      throw new Error("DATABASE_URL not configured");
    }
    _sql = neon(conn);
  }
  return _sql;
}

// Tagged template SQL function - only connects when called
export function sql(strings: TemplateStringsArray | string, ...values: any[]) {
  const fn = getSql();
  return fn(strings as any, ...values);
}

export interface Cliente {
  id: string;
  telefone: string;
  nome: string;
  endereco: string;
  complemento?: string;
  bairro?: string;
  forma_pagamento?: string;
  created_at: string;
}

export interface Pedido {
  id: string;
  cliente_id?: string;
  cliente_nome: string;
  cliente_telefone: string;
  cliente_endereco?: string;
  tipo_entrega: "delivery" | "retirada";
  forma_pagamento: string;
  itens: any[];
  total: number;
  observacao?: string;
  created_at: string;
}
