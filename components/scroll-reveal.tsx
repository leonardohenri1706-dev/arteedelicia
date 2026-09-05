"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---- ScrollReveal: reveal entire block ----

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: "div" | "section" | "article" | "span";
}

export function ScrollReveal({
  children,
  className,
  delay,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        delay && `transition-delay-${delay * 100}`,
        className
      )}
      style={visible ? {} : delay ? { transitionDelay: `${delay * 0.1}s` } : {}}
    >
      {children}
    </Tag>
  );
}

// ---- WordReveal: each word animates in sequence on scroll ----

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  wordClassName?: string;
  delay?: number;
}

export function WordReveal({
  text,
  className,
  as: Tag = "p",
  wordClassName,
  delay = 0.05,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all duration-500",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3",
            wordClassName
          )}
          style={{
            transitionDelay: visible ? `${i * delay}s` : "0s",
            willChange: visible ? "auto" : "transform, opacity",
          }}
        >
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

// ---- CharReveal: each character animates in sequence ----

interface CharRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function CharReveal({
  text,
  className,
  as: Tag = "p",
  delay = 0.02,
}: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("inline", className)}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all duration-300",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2",
            char === " " ? "mr-1" : ""
          )}
          style={{
            transitionDelay: visible ? `${i * delay}s` : "0s",
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
