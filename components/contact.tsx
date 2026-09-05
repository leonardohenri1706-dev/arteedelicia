"use client";
import { ScrollReveal } from "@/components/scroll-reveal";

const contatos = [
  {
    title: "WhatsApp",
    info: "(88) 9933-45987",
    href: "https://wa.me/5588993345987",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
  },
  {
    title: "Endereco",
    info: "Beira Rio, Itaicaba - CE",
    href: "https://maps.google.com/?q=Itaicaba+CE",
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z"
  },
  {
    title: "Instagram",
    info: "@artedelicia",
    href: "https://instagram.com/artedelicia",
    icon: "M9 19c-5 0-7-2-7-7V7c0-5 2-7 7-7h6c5 0 7 2 7 7v5c0 5-2 7-7 7H9zM12 16a4 4 0 100-8 4 4 0 000 8zM17.5 6.5a.5.5 0 100-1 .5.5 0 000 1z"
  },
];

export default function Contact() {
  return (
    <section id="contato" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block w-8 h-0.5 bg-brand-accent mb-4 rounded-full" />
            <h2 className="font-display font-bold text-h2 text-brand-text mb-3">Entre em <span className="text-gradient">contato</span></h2>
            <p className="text-brand-text-muted max-w-lg mx-auto">Faca seu pedido ou venha nos visitar</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {contatos.map((c, i) => (
            <ScrollReveal key={c.title} delay={(i + 1) as any}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-brand-surface border border-brand-border/60 rounded-xl p-6 text-center hover:border-brand-accent/30 hover:shadow-warm transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-accent">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-sm text-brand-text mb-1">{c.title}</h3>
                <p className="text-sm text-brand-text-muted group-hover:text-brand-accent transition-colors">{c.info}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}