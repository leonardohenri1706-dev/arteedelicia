import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, forma_pagamento, itens, total, observacao } = body;
    if (!cliente_nome || !cliente_telefone || !itens) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO pedidos (cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, forma_pagamento, itens, total, observacao)
      VALUES (
        ${cliente_nome},
        ${cliente_telefone},
        ${cliente_endereco || null},
        ${tipo_entrega || 'delivery'},
        ${forma_pagamento || ''},
        ${JSON.stringify(itens)},
        ${total},
        ${observacao || null}
      )
      RETURNING id, created_at
    `;
    return NextResponse.json({ pedido: result[0] });
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const pedidos = await sql`
      SELECT * FROM pedidos
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const total = await sql`SELECT COUNT(*) as count FROM pedidos`;
    return NextResponse.json({ pedidos, total: total[0]?.count || 0 });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
