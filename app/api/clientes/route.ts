import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telefone, nome, endereco, complemento } = body;
    if (!telefone || !nome) {
      return NextResponse.json({ error: "Telefone e nome obrigatorios" }, { status: 400 });
    }
    
    // Dynamic import to avoid build-time errors
    const { sql } = await import("@/lib/db");
    
    const result = await sql`
      INSERT INTO clientes (telefone, nome, endereco, complemento)
      VALUES (${telefone}, ${nome}, ${endereco || null}, ${complemento || null})
      ON CONFLICT (telefone) DO UPDATE SET
        nome = EXCLUDED.nome,
        endereco = EXCLUDED.endereco,
        complemento = EXCLUDED.complemento,
        updated_at = NOW()
      RETURNING id, telefone, nome
    `;
    return NextResponse.json({ cliente: result[0] });
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}