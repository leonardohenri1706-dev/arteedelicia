export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-surface-2/80 border-t border-white/5 py-12 md:py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center overflow-hidden">
                <img src="/logo.jpg" alt="Arte & Delicia" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-wide text-brand-text">Arte & Delicia</span>
                <span className="block text-[10px] text-brand-text-muted/60 tracking-wider uppercase">Pizzaria Artesanal</span>
              </div>
            </div>
            <p className="text-sm text-brand-text-muted leading-relaxed max-w-xs">
              Mais de 13 anos de tradicao e sabor servindo Itaicaba com carinho.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-brand-text mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#cardapio" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">Cardapio</a></li>
              <li><a href="#montar" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">Montar Pizza</a></li>
              <li><a href="#contato" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display font-bold text-sm text-brand-text mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-brand-text-muted">
              <li>(88) 9933-45987</li>
              <li>Beira Rio, Itaicaba - CE</li>
              <li>Todos os dias, 18h as 23h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-text-muted/50">&copy; {year} Arte & Delicia. Todos os direitos reservados.</p>
          <p className="text-xs text-brand-text-muted/30">Feito com carinho em Itaicaba - CE</p>
        </div>
      </div>
    </footer>
  );
}