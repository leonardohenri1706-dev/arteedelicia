export interface PizzaTamanhos {
  P: number;
  M: number;
  G: number;
  GG: number;
}

export interface Pizza {
  id: string;
  nome: string;
  ingredientes: string[];
  imagem?: string;
  tamanhos: PizzaTamanhos;
  borda?: {
    inclusa: true;
    upgrades: { nome: string; acrescimo: number }[];
  };
}

export interface Adicional {
  nome: string;
  preco: number;
}

export interface Bebida {
  id: string;
  nome: string;
  tipo: "refrigerante" | "agua" | "suco";
  imagem?: string;
  tamanhos: { nome: string; preco: number }[];
}

// ----- Adicionais / Extra Toppings -----
export const adicionaisDisponiveis: Adicional[] = [
  { nome: "Cheddar extra", preco: 5 },
  { nome: "Catupiry extra", preco: 5 },
  { nome: "Mussarela extra", preco: 4 },
  { nome: "Bacon extra", preco: 6 },
  { nome: "Calabresa extra", preco: 5 },
  { nome: "Frango extra", preco: 5 },
  { nome: "Tomate extra", preco: 3 },
  { nome: "Cebola extra", preco: 3 },
  { nome: "Azeitona extra", preco: 3 },
  { nome: "Milho", preco: 3 },
  { nome: "Ervilha", preco: 3 },
  { nome: "Palmito", preco: 4 },
  { nome: "Ovo de codorna", preco: 4 },
  { nome: "Orégano extra", preco: 1 },
  { nome: "Molho extra", preco: 2 },
];

// ----- Pizzas Clássicas -----
export const classicas: Pizza[] = [
  { id: "calabresa", nome: "Calabresa",
    ingredientes: ["Molho","Mussarela","Calabresa","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 29, G: 36, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "frango", nome: "Frango",
    ingredientes: ["Molho","Mussarela","Frango","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 21, M: 28, G: 35, GG: 58 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "portuguesa", nome: "Portuguesa",
    ingredientes: ["Molho","Mussarela","Presunto","Ovo","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 21, M: 28, G: 35, GG: 58 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "queijo", nome: "Queijo",
    ingredientes: ["Molho","Queijo Mussarela","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 20, M: 27, G: 33, GG: 55 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "mista", nome: "Mista",
    ingredientes: ["Molho","Mussarela","Presunto","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 21, M: 28, G: 35, GG: 58 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "odelicia", nome: "Ó Delícia",
    ingredientes: ["Molho","Mussarela","Presunto","Batata Palha","Cebola","Tomate","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 29, G: 36, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "marguerita", nome: "Marguerita",
    ingredientes: ["Molho","Mussarela","Tomate","Manjericão","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 29, G: 36, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
];

// ----- Pizzas Especiais -----
export const especiais: Pizza[] = [
  { id: "nordestina", nome: "Nordestina",
    ingredientes: ["Molho","Mussarela","Carne de Sol","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 34, G: 40, GG: 65 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "calabresa-cheddar", nome: "Calabresa c/ Cheddar ou Catupiry",
    ingredientes: ["Molho","Mussarela","Calabresa","Cheddar ou Catupiry","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 32, G: 38, GG: 63 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "moda-casa", nome: "À Moda da Casa",
    ingredientes: ["Molho","Mussarela","Calabresa","Presunto","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 34, G: 40, GG: 65 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "frango-catupiry", nome: "Frango Catupiry",
    ingredientes: ["Molho","Mussarela","Frango","Catupiry","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 32, G: 38, GG: 63 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "4queijos", nome: "4 Queijos",
    ingredientes: ["Molho","Mussarela","Coalho","Catupiry","Cheddar","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 22, M: 32, G: 38, GG: 63 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "franbacon", nome: "Franbacon",
    ingredientes: ["Molho","Mussarela","Frango","Bacon","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 23, M: 33, G: 40, GG: 65 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "camarao", nome: "Camarão",
    ingredientes: ["Molho","Mussarela","Camarão","Tomate","Cebola","Azeitona","Orégano"],
    tamanhos: { P: 24, M: 34, G: 41, GG: 67 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
];

// ----- Pizzas Doces -----
export const doces: Pizza[] = [
  { id: "banana", nome: "Banana Canela",
    ingredientes: ["Banana","Canela","Açúcar","Mussarela"],
    tamanhos: { P: 22, M: 30, G: 38, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "chocolate-mm", nome: "Chocolate c/ MM",
    ingredientes: ["Chocolate Preto","MM","Mussarela"],
    tamanhos: { P: 22, M: 30, G: 38, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "chocolate-preto", nome: "Chocolate Preto",
    ingredientes: ["Chocolate Preto","Mussarela"],
    tamanhos: { P: 22, M: 30, G: 38, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
  { id: "chocolate-branco", nome: "Chocolate Branco",
    ingredientes: ["Chocolate Branco","Mussarela"],
    tamanhos: { P: 22, M: 30, G: 38, GG: 60 }, borda: { inclusa: true, upgrades: [{ nome: "Cheddar", acrescimo: 4 }, { nome: "Doce", acrescimo: 4 }] } },
];

// ----- Bebidas -----
export const bebidas: Bebida[] = [
  { id: "coca-2l", nome: "Coca-Cola 2L", tipo: "refrigerante", tamanhos: [{ nome: "2L", preco: 16 }] },
  { id: "coca-zero-2l", nome: "Coca-Cola Zero 2L", tipo: "refrigerante", tamanhos: [{ nome: "2L", preco: 16 }] },
  { id: "guarana-2l", nome: "Guaraná 2L", tipo: "refrigerante", tamanhos: [{ nome: "2L", preco: 14 }] },
  { id: "pepsi-2l", nome: "Pepsi 2L", tipo: "refrigerante", tamanhos: [{ nome: "2L", preco: 14 }] },
  { id: "pepsi-1l", nome: "Pepsi 1L", tipo: "refrigerante", tamanhos: [{ nome: "1L", preco: 10 }] },
  { id: "cajuina-1l", nome: "Cajuina 1L", tipo: "refrigerante", tamanhos: [{ nome: "1L", preco: 10 }] },
  { id: "cajuina-2l", nome: "Cajuina 2L", tipo: "refrigerante", tamanhos: [{ nome: "2L", preco: 16 }] },
  { id: "coca-lata", nome: "Coca-Cola Lata", tipo: "refrigerante", tamanhos: [{ nome: "Lata", preco: 7 }] },
  { id: "pepsi-lata", nome: "Pepsi Lata", tipo: "refrigerante", tamanhos: [{ nome: "Lata", preco: 6 }] },
  { id: "agua-500", nome: "Água Mineral", tipo: "agua", tamanhos: [{ nome: "500ml", preco: 3 }] },
  { id: "agua-gas", nome: "Água com Gás", tipo: "agua", tamanhos: [{ nome: "500ml", preco: 4 }] },
];

// All pizzas combined for Montar Pizza feature
export const todasPizzas: Pizza[] = [...classicas, ...especiais, ...doces];
