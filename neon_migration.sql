-- Neon Migration: Arte & Delicia
-- Rodar no Neon SQL Editor ou via psql

CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telefone TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  endereco TEXT,
  complemento TEXT,
  bairro TEXT,
  forma_pagamento TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id),
  cliente_nome TEXT NOT NULL,
  cliente_telefone TEXT NOT NULL,
  cliente_endereco TEXT,
  tipo_entrega TEXT DEFAULT 'delivery',
  forma_pagamento TEXT,
  itens JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pendente',
  observacao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pedidos_created ON pedidos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);