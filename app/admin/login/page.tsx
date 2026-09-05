"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      router.push("/admin/pedidos");
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao autenticar");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-8 w-full max-w-sm shadow-warm-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-brand-accent/30 mx-auto mb-4 overflow-hidden">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display text-xl font-bold text-brand-text">Admin</h1>
          <p className="text-sm text-brand-text-muted mt-1">Acesso a administração da Arte & Delícia</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-text mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-lg border border-brand-border/60 bg-brand-bg text-brand-text font-body text-sm focus:outline-none focus:border-brand-primary transition-colors"
              required
            />
          </div>

          {error && <p className="text-sm text-brand-primary">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}