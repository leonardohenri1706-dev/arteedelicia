import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@artedelicia.com.br';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Email nao autorizado" }, { status: 401 });
    }
    const response = NextResponse.json({ success: true, email });
    response.cookies.set("admin_session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (session === ADMIN_EMAIL) {
    return NextResponse.json({ authenticated: true, email: session });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return response;
}
