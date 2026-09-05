"use client";
import { ScrollReveal, WordReveal } from "@/components/scroll-reveal";

const testimonials = [
  {
    nome: "Maria José",
    texto: "A melhor pizza da região! O sabor é incomparável, parece pizza feita em forno a lenha da nona. O atendimento da Simonny é sempre com um sorriso.",
    nota: 5,
  },
  {
    nome: "Carlos Oliveira",
    texto: "Peço toda sexta-feira. A entrega é rápida e a pizza chega quentinha. A Nordestina com carne de sol é sensacional!",
    nota: 5,
  },
  {
    nome: "Ana Beatriz",
    texto: "Ambiente acolhedor, pizzas artesanais e um atendimento que faz você se sentir em casa. Recomendo de olhos fechados.",
    nota: 5,
  },
  {
    nome: "João Santos",
    texto: "13 anos de tradição não é pra qualquer um. A qualidade é consistente, o preço justo. Pizza de calabresa com cheddar é meu vício.",
    nota: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section-padding bg-brand-surface/60 border-y border-brand-border/40">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block w-8 h-0.5 bg-brand-accent mb-4 rounded-full" />
            <h2 className="font-display font-bold text-h2 text-brand-text mb-3">
              Quem prova <span className="text-gradient">volta</span>
            </h2>
            <p className="text-brand-text-muted max-w-lg mx-auto">
              O que nossos clientes dizem sobre a Arte & Delícia
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={(i + 1) as any}>
              <div className="bg-brand-surface-2/80 border border-brand-border/40 rounded-xl p-6 md:p-7 hover:border-brand-accent/20 hover:shadow-warm transition-all duration-400">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.nota }, (_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-accent">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-sm md:text-base text-brand-text-muted leading-relaxed mb-4 italic">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-sm font-bold text-brand-accent">
                    {t.nome.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-brand-text">{t.nome}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}