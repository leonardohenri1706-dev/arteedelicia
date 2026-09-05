"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface CartItem {
  uniqueId: string;
  id: string;
  nome: string;
  categoria: "classica" | "especial" | "bebida";
  tamanho: string;
  preco: number;
  quantidade: number;
  ingredientes: string[];
  personalizacao?: string;
  bordaUpgrade: string | null;
  bordaAcrescimo: number;
  imagem?: string;
  /** Ingredientes que o cliente pediu para remover */
  ingredientesRemovidos: string[];
  /** Metade do sabor (meia pizza) */
  meia: { id: string; nome: string } | null;
  /** Adicionais extra pagos */
  adicionais: { nome: string; preco: number }[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "uniqueId" | "quantidade" | "ingredientesRemovidos" | "meia" | "adicionais"> & { ingredientesRemovidos?: string[]; meia?: { id: string; nome: string } | null; adicionais?: { nome: string; preco: number }[] }) => void;
  removeItem: (uniqueId: string) => void;
  updateQty: (uniqueId: string, qty: number) => void;
  updatePersonalizacao: (uniqueId: string, obs: string) => void;
  updateBordaUpgrade: (uniqueId: string, upgrade: string | null, acrescimo: number) => void;
  updateIngredientesRemovidos: (uniqueId: string, removidos: string[]) => void;
  updateMeia: (uniqueId: string, meia: { id: string; nome: string } | null) => void;
  toggleAdicional: (uniqueId: string, adicional: { nome: string; preco: number }) => void;
  clearCart: () => void;
  total: number;
  totalItens: number;
}

const CartContext = createContext<CartContextType | null>(null);

let _uid = 0;
function uid() { return "ci_" + (++_uid); }

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((
    item: Omit<CartItem, "uniqueId" | "quantidade" | "ingredientesRemovidos" | "meia" | "adicionais"> & {
      ingredientesRemovidos?: string[];
      meia?: { id: string; nome: string } | null;
      adicionais?: { nome: string; preco: number }[];
    }
  ) => {
    const newId = uid();
    setItems((prev) => [...prev, {
      ...item,
      uniqueId: newId,
      quantidade: 1,
      ingredientesRemovidos: item.ingredientesRemovidos ?? [],
      meia: item.meia ?? null,
      adicionais: item.adicionais ?? [],
    }]);
  }, []);

  const removeItem = useCallback((uniqueId: string) => {
    setItems((prev) => prev.filter((i) => i.uniqueId !== uniqueId));
  }, []);

  const updateQty = useCallback((uniqueId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.uniqueId === uniqueId ? { ...i, quantidade: qty } : i))
    );
  }, []);

  const updatePersonalizacao = useCallback((uniqueId: string, obs: string) => {
    setItems((prev) =>
      prev.map((i) => (i.uniqueId === uniqueId ? { ...i, personalizacao: obs } : i))
    );
  }, []);

  const updateBordaUpgrade = useCallback((uniqueId: string, upgrade: string | null, acrescimo: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.uniqueId === uniqueId ? { ...i, bordaUpgrade: upgrade, bordaAcrescimo: acrescimo } : i
      )
    );
  }, []);

  const updateIngredientesRemovidos = useCallback((uniqueId: string, removidos: string[]) => {
    setItems((prev) =>
      prev.map((i) =>
        i.uniqueId === uniqueId ? { ...i, ingredientesRemovidos: removidos } : i
      )
    );
  }, []);

  const updateMeia = useCallback((uniqueId: string, meia: { id: string; nome: string } | null) => {
    setItems((prev) =>
      prev.map((i) =>
        i.uniqueId === uniqueId ? { ...i, meia } : i
      )
    );
  }, []);

  const toggleAdicional = useCallback((uniqueId: string, adicional: { nome: string; preco: number }) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.uniqueId !== uniqueId) return i;
        const exists = i.adicionais.find((a) => a.nome === adicional.nome);
        if (exists) {
          return { ...i, adicionais: i.adicionais.filter((a) => a.nome !== adicional.nome) };
        }
        return { ...i, adicionais: [...i.adicionais, adicional] };
      })
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const calcItemTotal = (i: CartItem) =>
    (i.preco + i.bordaAcrescimo + i.adicionais.reduce((s, a) => s + a.preco, 0)) * i.quantidade;

  const total = items.reduce((acc, i) => acc + calcItemTotal(i), 0);
  const totalItens = items.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQty,
        updatePersonalizacao, updateBordaUpgrade,
        updateIngredientesRemovidos, updateMeia, toggleAdicional,
        clearCart, total, totalItens
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}