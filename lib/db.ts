import { neon } from "@neondatabase/serverless";

// Get connection string from env
const connectionString = process.env.DATABASE_URL || "";

// Create a SQL executor
export const sql = neon(connectionString);

// Database types
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
