"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuth(true);
      return;
    }
    fetch("/api/auth")
      .then((res) => {
        if (!res.ok) router.push("/admin/login");
        else setAuth(true);
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-brand-bg flex">
      <aside className="w-56 bg-brand-surface border-r border-brand-border/60 p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full border border-brand-accent/30 overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-medium text-brand-text">Arte & Delícia</span>
        </div>
        <nav className="space-y-1">
          <a href="/admin/pedidos" className={cn("block px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/admin/pedidos" ? "bg-brand-accent/10 text-brand-accent font-medium" : "text-brand-text-muted hover:text-brand-text hover:bg-white/5")}>Pedidos</a>
        </nav>
        <button onClick={handleLogout} className="mt-6 px-3 py-2 text-sm text-brand-text-muted hover:text-brand-primary transition-colors">Sair</button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}