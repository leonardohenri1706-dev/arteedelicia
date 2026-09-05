-- Supabase Migration: Arte & Delícia
-- Rodar no SQL Editor do Supabase

-- 1. CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telefone    TEXT UNIQUE NOT NULL,
  nome        TEXT NOT NULL,
  endereco    TEXT NOT NULL,
  complemento TEXT,
  bairro      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id      UUID REFERENCES clientes(id) ON DELETE SET NULL,
  cliente_nome    TEXT NOT NULL,
  cliente_tel     TEXT NOT NULL,
  cliente_end     TEXT NOT NULL,
  forma_pagamento TEXT NOT NULL CHECK (forma_pagamento IN ('dinheiro', 'cartao', 'pix')),
  status          TEXT DEFAULT 'recebido' CHECK (status IN ('recebido', 'preparando', 'pronto', 'entregue')),
  total           DECIMAL(10,2) NOT NULL,
  observacoes     TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 3. ITENS DO PEDIDO
CREATE TABLE IF NOT EXISTS itens_pedido (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id    UUID REFERENCES pedidos(id) ON DELETE CASCADE NOT NULL,
  nome_item    TEXT NOT NULL,
  categoria    TEXT,
  tamanho      TEXT,
  quantidade   INTEGER NOT NULL DEFAULT 1,
  preco_unit   DECIMAL(10,2) NOT NULL,
  personalizacao TEXT,
  borda_upgrade TEXT
);

-- INDICES
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_tel ON pedidos(cliente_tel);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_clientes_telefone ON clientes(telefone);
CREATE INDEX IF NOT EXISTS idx_itens_pedido_id ON itens_pedido(pedido_id);

-- RLS: habilitar segurança
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;

-- RLS Policies: apenas admin pode ler/escrever
CREATE POLICY "Admin full access on clientes" ON clientes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on pedidos" ON pedidos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on itens_pedido" ON itens_pedido
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS: API anônima pode INSERT em clientes e pedidos (para receber pedidos)
-- Descomente se quiser permitir inserção anônima:
-- CREATE POLICY "Anon insert on clientes" ON clientes FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Anon insert on pedidos" ON pedidos FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Anon insert on itens_pedido" ON itens_pedido FOR INSERT WITH CHECK (true);
