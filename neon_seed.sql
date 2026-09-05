-- Inserir alguns clientes de exemplo
INSERT INTO clientes (telefone, nome, endereco) VALUES
('88999999999', 'Cliente Teste', 'Rua Principal, Centro, Itaiçaba')
ON CONFLICT (telefone) DO NOTHING;

-- Inserir pedido de exemplo
INSERT INTO pedidos (cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, forma_pagamento, itens, total, status)
VALUES ('Cliente Teste', '88999999999', 'Rua Principal, Centro, Itaiçaba', 'delivery', 'PIX',
'[{"nome":"Calabresa","tamanho":"M","quantidade":1,"preco":34}]'::jsonb, 34, 'pendente');