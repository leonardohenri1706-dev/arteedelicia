import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pedidos = await sql`SELECT * FROM pedidos WHERE id = ${id} LIMIT 1`;
    if (pedidos.length === 0) {
      return NextResponse.json({ error: "Pedido nao encontrado" }, { status: 404 });
    }
    return NextResponse.json({ pedido: pedidos[0] });
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;
    await sql`UPDATE pedidos SET status = ${status} WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
