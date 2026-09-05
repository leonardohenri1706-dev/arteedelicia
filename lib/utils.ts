import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatWhatsAppMessage(params: {
  itens: string[];
  total: number;
  cliente: { nome: string; telefone: string; endereco: string; complemento?: string; observacao?: string };
  formaPagamento: string;
}): string {
  let msg = "\ud83c\udf55 *NOVO PEDIDO - Arte & Delicia*\n\n";
  msg += "\ud83d\udccd *Cliente:* " + params.cliente.nome + "\n";
  msg += "\ud83d\udcf1 *Tel:* " + params.cliente.telefone + "\n";
  msg += "\ud83d\udccd *Endereco:* " + params.cliente.endereco;
  if (params.cliente.complemento) msg += " - " + params.cliente.complemento;
  msg += "\n\n";
  msg += "\ud83c\udf55 *Itens do Pedido:*\n";
  msg += params.itens.join("\n") + "\n\n";
  msg += "\ud83d\udcb5 *Total:* " + formatCurrency(params.total) + "\n\n";
  msg += "\ud83d\udcb5 *Pagamento:* " + params.formaPagamento + "\n";
  msg += "\ud83d\udcdd *OBS:* " + (params.cliente.observacao || "Nenhuma") + "\n\n";
  msg += "\u2705 \u2728 Obrigado por escolher a Arte & Delicia!";
  return msg;
}

export function generateOrderNumber(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  return day + seq;
}
