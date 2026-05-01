"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const css = `
.lp-root { background: var(--cream); color: var(--charcoal); font-family: var(--font-body); }

.lp-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 56px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,247,242,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(168,213,186,0.25);
}
.lp-nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 22px;
  font-style: italic;
  font-weight: 400;
  color: var(--forest);
  letter-spacing: -0.01em;
}
.lp-nav-links { display: flex; gap: 36px; font-size: 13.5px; color: var(--bark); }
.lp-nav-links a { text-decoration: none; color: inherit; transition: color 0.2s; }
.lp-nav-links a:hover { color: var(--fern); }
.lp-nav-actions { display: flex; align-items: center; gap: 14px; }

.lp-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; border-radius: 6px; }
.lp-hamburger span { display: block; width: 22px; height: 2px; background: var(--forest); border-radius: 2px; transition: all 0.2s; }

.lp-mobile-menu {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid var(--foam);
  display: flex;
  flex-direction: column;
  padding: 12px 24px 20px;
  gap: 2px;
  box-shadow: var(--shadow-md);
  animation: fadeInUp 0.18s ease both;
}
.lp-mobile-menu a { padding: 11px 12px; font-size: 15px; color: var(--charcoal); text-decoration: none; border-radius: 8px; transition: background 0.15s; }
.lp-mobile-menu a:hover { background: var(--foam); }
.lp-mobile-menu-admin { margin-top: 8px; font-size: 12px !important; color: var(--mist) !important; letter-spacing: 0.04em; }

.lp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.16s ease, box-shadow 0.16s ease, background 0.2s;
}
.lp-btn:hover { transform: translateY(-1px); }
.lp-btn--sm { padding: 10px 18px; font-size: 13px; }
.lp-btn--lg { padding: 18px 34px; font-size: 15px; }
.lp-btn--primary { background: var(--fern); color: white; box-shadow: 0 2px 12px rgba(58,125,90,0.28); }
.lp-btn--primary:hover { background: var(--evergreen); box-shadow: 0 4px 20px rgba(58,125,90,0.36); }
.lp-btn--outline { background: transparent; color: var(--fern); box-shadow: inset 0 0 0 1.5px var(--fern); }
.lp-btn--outline:hover { background: var(--foam); }
.lp-btn--light { background: white; color: var(--forest); }
.lp-btn--light:hover { background: var(--cream); }
.lp-btn--ghost { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9); box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.3); }
.lp-btn--ghost:hover { background: rgba(255,255,255,0.2); }

.lp-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sage); }
.lp-eyebrow--light { color: var(--mint); }
.lp-eyebrow-line { display: block; width: 20px; height: 1.5px; background: currentColor; opacity: 0.6; border-radius: 2px; }

.lp-section-title { font-family: var(--font-display); font-size: 54px; font-weight: 400; line-height: 1.05; letter-spacing: -0.02em; color: var(--forest); margin: 16px 0 0; }
.lp-section-title em { font-style: italic; color: var(--fern); }
.lp-section-title--light { color: var(--cream); }
.lp-section-title--light em { color: var(--mint); }
.lp-section-sub { font-size: 16px; line-height: 1.65; color: var(--bark); margin: 18px auto 0; max-width: 540px; }
.lp-section-head { margin-bottom: 64px; }
.lp-section-head--center { text-align: center; }

.lp-container { max-width: 1200px; margin: 0 auto; padding: 0 56px; position: relative; }

.lp-leaf { position: absolute; pointer-events: none; color: var(--mint); }
.lp-leaf--tl { top: 80px; left: 48px; opacity: 0.35; transform: rotate(-30deg); }
.lp-leaf--tr { top: 180px; right: 64px; opacity: 0.28; transform: rotate(45deg); }
.lp-leaf--bl { bottom: 80px; left: 200px; opacity: 0.22; transform: rotate(15deg); }
.lp-leaf--esteira { top: 48px; right: 48px; opacity: 0.28; transform: rotate(20deg); color: var(--mint); }
.lp-leaf--cta-l { top: 36px; left: 64px; opacity: 0.22; transform: rotate(-20deg); color: var(--mint); }
.lp-leaf--cta-r { bottom: 36px; right: 64px; opacity: 0.22; transform: rotate(160deg); color: var(--mint); }

.lp-stars { display: inline-flex; gap: 2px; color: #c5893a; }

.lp-photo-wrap { position: relative; border-radius: 18px; overflow: hidden; background-color: var(--foam); }
.lp-photo-img { object-fit: cover; }

.lp-hero { padding: 72px 0 96px; text-align: center; position: relative; overflow: hidden; }
.lp-hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 56px; }
.lp-hero-title { font-family: var(--font-display); font-size: 80px; font-weight: 400; line-height: 1.0; letter-spacing: -0.025em; color: var(--forest); margin: 24px 0 0; }
.lp-hero-title em { font-style: italic; color: var(--fern); }
.lp-hero-sub { font-size: 18px; line-height: 1.6; color: var(--bark); max-width: 600px; margin: 28px auto 0; }
.lp-hero-ctas { display: flex; gap: 14px; justify-content: center; margin-top: 40px; flex-wrap: wrap; }
.lp-hero-proof {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 48px;
  padding: 16px 28px;
  background: white;
  border-radius: 999px;
  border: 1px solid var(--foam);
  font-size: 13px;
  color: var(--bark);
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  justify-content: center;
}
.lp-hero-proof strong { color: var(--forest); }
.lp-proof-sep { display: block; width: 1px; height: 14px; background: var(--foam); }
.lp-proof-stars { display: inline-flex; align-items: center; gap: 6px; }
.lp-hero-photos { display: grid; grid-template-columns: 1fr 1.6fr 1fr; gap: 14px; max-width: 1280px; margin: 64px auto 0; padding: 0 32px; }
.lp-photo--tall { aspect-ratio: 2/3; }
.lp-photo--feature { aspect-ratio: 3/4; }
.lp-photo--portrait { aspect-ratio: 4/5; }

.lp-para-quem { padding: 100px 0; background: var(--forest); border-radius: 32px 32px 0 0; margin-top: -2px; position: relative; }
.lp-dores-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.lp-dor-item { text-align: center; }
.lp-dor-number { font-family: var(--font-display); font-size: 44px; font-style: italic; color: var(--mint); line-height: 1; }
.lp-dor-title { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: white; margin: 18px 0 0; }
.lp-dor-desc { font-size: 14px; line-height: 1.65; color: rgba(168,213,186,0.75); margin: 10px 0 0; }

.lp-sobre { padding: 112px 0; background: white; }
.lp-sobre-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.lp-sobre-copy { display: flex; flex-direction: column; }
.lp-crn { font-family: monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin-top: 10px; }
.lp-sobre-text { font-size: 16.5px; line-height: 1.7; color: var(--bark); margin: 20px 0 0; }
.lp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
.lp-chip { font-size: 12.5px; padding: 7px 14px; border-radius: 999px; background: var(--foam); color: var(--fern); font-weight: 500; }

.lp-metodo { padding: 112px 0; background: var(--cream); }
.lp-steps-wrap { position: relative; }
.lp-steps-line { position: absolute; top: 36px; left: 12%; right: 12%; height: 0; border-top: 2px dashed var(--mint); pointer-events: none; }
.lp-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
.lp-step { text-align: center; padding: 0 16px; }
.lp-step-num { width: 72px; height: 72px; border-radius: 50%; background: var(--fern); color: white; display: grid; place-items: center; margin: 0 auto; font-family: var(--font-display); font-size: 24px; font-style: italic; border: 6px solid var(--cream); box-shadow: 0 0 0 2px var(--mint); }
.lp-step-title { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--forest); margin: 24px 0 0; }
.lp-step-desc { font-size: 14px; line-height: 1.65; color: var(--bark); margin: 10px auto 0; max-width: 220px; }

.lp-esteira { padding: 112px 0; background: white; position: relative; overflow: hidden; }
.lp-products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.lp-product-card { background: var(--cream); border: 1px solid var(--foam); border-radius: 28px; padding: 32px 32px 28px; display: flex; flex-direction: column; position: relative; transition: box-shadow 0.25s ease; }
.lp-product-card:hover { box-shadow: var(--shadow-md); }
.lp-product-card--hi { border: 2px solid var(--fern); background: white; }
.lp-product-badge { position: absolute; top: -12px; left: 28px; background: var(--fern); color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 14px; border-radius: 999px; font-family: var(--font-body); }
.lp-product-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); font-family: var(--font-body); }
.lp-product-name { font-family: var(--font-display); font-size: 28px; font-weight: 400; color: var(--forest); margin: 10px 0 0; letter-spacing: -0.01em; line-height: 1.15; }
.lp-product-desc { font-size: 14.5px; line-height: 1.6; color: var(--bark); margin: 12px 0 0; }
.lp-product-bullets { list-style: none; padding: 0; margin: 18px 0 24px; display: flex; flex-wrap: wrap; gap: 8px 18px; }
.lp-product-bullets li { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--bark); }
.lp-bullet-dot { display: block; width: 4px; height: 4px; border-radius: 50%; background: var(--sage); flex-shrink: 0; }

.lp-diferenciais { padding: 112px 0; background: white; }
.lp-diferenciais-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 56px; }
.lp-diferenciais-intro { font-size: 16px; line-height: 1.7; color: var(--bark); margin: 0; }
.lp-diferenciais-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; background: var(--foam); border-radius: 24px; overflow: hidden; border: 1px solid var(--foam); }
.lp-diferencial-item { background: white; padding: 36px 32px; display: flex; gap: 18px; }
.lp-diferencial-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--foam); color: var(--fern); display: grid; place-items: center; flex-shrink: 0; }
.lp-diferencial-title { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--forest); margin: 0; line-height: 1.2; }
.lp-diferencial-desc { font-size: 14.5px; color: var(--bark); line-height: 1.65; margin: 10px 0 0; }

.lp-depoimentos { padding: 112px 0; background: var(--foam); }
.lp-dep-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.lp-dep-card { background: white; padding: 32px 28px; border-radius: 24px; border: 1px solid rgba(168,213,186,0.3); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; }
.lp-dep-text { font-size: 16.5px; line-height: 1.6; color: var(--charcoal); margin: 18px 0 0; flex: 1; }
.lp-dep-footer { display: flex; align-items: center; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--foam); }
.lp-dep-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--foam); flex-shrink: 0; background-image: repeating-linear-gradient(135deg, rgba(58,125,90,0.08) 0 6px, rgba(58,125,90,0.03) 6px 12px); }
.lp-dep-name { font-size: 14px; font-weight: 600; color: var(--forest); }
.lp-dep-tag { font-size: 10.5px; color: var(--mist); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; font-family: monospace; }

.lp-cta-final { padding: 120px 0; background: var(--fern); text-align: center; position: relative; overflow: hidden; }
.lp-cta-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 0 56px; }
.lp-cta-title { font-family: var(--font-display); font-size: 64px; font-weight: 400; line-height: 1.0; letter-spacing: -0.02em; color: white; margin: 0; }
.lp-cta-title em { font-style: italic; color: var(--mint); }
.lp-cta-sub { font-size: 17px; color: rgba(255,255,255,0.8); margin: 18px 0 0; line-height: 1.6; }
.lp-cta-actions { display: flex; gap: 14px; justify-content: center; margin-top: 36px; flex-wrap: wrap; }
.lp-cta-wa-num { margin-top: 18px; font-size: 12.5px; color: rgba(255,255,255,0.55); letter-spacing: 0.08em; font-family: monospace; }

.lp-footer { background: white; padding: 52px 0 28px; }
.lp-footer-top { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 24px; border-bottom: 1px solid var(--foam); }
.lp-footer-logo { font-family: var(--font-display); font-size: 30px; font-style: italic; color: var(--forest); letter-spacing: -0.01em; }
.lp-footer-meta { font-size: 13px; color: var(--mist); margin-top: 6px; }
.lp-footer-links { display: flex; gap: 28px; align-items: center; font-size: 13.5px; color: var(--bark); }
.lp-footer-links a { text-decoration: none; color: inherit; transition: color 0.2s; }
.lp-footer-links a:hover { color: var(--fern); }
.lp-footer-ig { display: inline-flex; align-items: center; gap: 6px; }
.lp-footer-admin { font-size: 11.5px !important; color: var(--mist) !important; letter-spacing: 0.04em; }
.lp-footer-bottom { margin-top: 20px; font-size: 12px; color: var(--mist); text-align: center; }

@media (max-width: 1024px) {
  .lp-hero-title { font-size: 60px; }
  .lp-section-title { font-size: 42px; }
  .lp-cta-title { font-size: 48px; }
  .lp-dores-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
  .lp-steps-grid { grid-template-columns: repeat(2, 1fr); }
  .lp-steps-line { display: none; }
}
@media (max-width: 900px) {
  .lp-nav { padding: 16px 24px; flex-wrap: wrap; }
  .lp-nav-links { display: none; }
  .lp-nav-actions { display: none; }
  .lp-hamburger { display: flex; }
  .lp-hero-inner { padding: 0 24px; }
  .lp-hero-title { font-size: 44px; }
  .lp-hero-photos { padding: 0 24px; grid-template-columns: 1fr 1fr; }
  .lp-hero-photos .lp-photo-wrap:last-child { display: none; }
  .lp-hero-proof { gap: 12px; padding: 14px 20px; font-size: 12px; }
  .lp-proof-sep { display: none; }
  .lp-container { padding: 0 24px; }
  .lp-para-quem { padding: 72px 0; border-radius: 20px 20px 0 0; }
  .lp-dores-grid { grid-template-columns: 1fr 1fr; }
  .lp-sobre-grid { grid-template-columns: 1fr; gap: 40px; }
  .lp-sobre { padding: 72px 0; }
  .lp-metodo { padding: 72px 0; }
  .lp-steps-grid { grid-template-columns: 1fr 1fr; }
  .lp-steps-line { display: none; }
  .lp-esteira { padding: 72px 0; }
  .lp-products-grid { grid-template-columns: 1fr; }
  .lp-diferenciais { padding: 72px 0; }
  .lp-diferenciais-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
  .lp-diferenciais-grid { grid-template-columns: 1fr; }
  .lp-depoimentos { padding: 72px 0; }
  .lp-dep-grid { grid-template-columns: 1fr; }
  .lp-cta-final { padding: 80px 0; }
  .lp-cta-inner { padding: 0 24px; }
  .lp-cta-title { font-size: 38px; }
  .lp-footer { padding: 40px 0 20px; }
  .lp-footer-top { flex-direction: column; align-items: flex-start; gap: 24px; }
  .lp-footer-links { flex-direction: column; align-items: flex-start; gap: 14px; }
}
@media (max-width: 600px) {
  .lp-hero { padding: 48px 0 64px; }
  .lp-hero-title { font-size: 36px; }
  .lp-section-title { font-size: 34px; }
  .lp-hero-ctas { flex-direction: column; align-items: stretch; }
  .lp-hero-photos { grid-template-columns: 1fr; }
  .lp-hero-photos .lp-photo-wrap:last-child { display: none; }
  .lp-dores-grid { grid-template-columns: 1fr; gap: 28px; }
  .lp-steps-grid { grid-template-columns: 1fr; }
  .lp-product-card { padding: 28px 22px; }
  .lp-diferencial-item { padding: 28px 22px; }
  .lp-cta-actions { flex-direction: column; align-items: stretch; }
  .lp-leaf--tl, .lp-leaf--tr, .lp-leaf--bl { display: none; }
}
`;

const WA_LINK =
  "https://wa.me/5584999181160?text=Oi%20Vivi!%20Quero%20agendar%20uma%20consulta.";
const IG_LINK = "https://instagram.com/nutri.vivicardoso";

function IconLeaf({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-7 6-10 17-10-1 11-4 17-10 17Z" />
      <path d="M2 22c2-7 6-11 12-13" />
    </svg>
  );
}

function IconWhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.04zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.307 1.265.49 1.697.628.713.226 1.362.194 1.875.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function IconArrow({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`lp-eyebrow${light ? " lp-eyebrow--light" : ""}`}>
      <span className="lp-eyebrow-line" />
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="lp-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} />
      ))}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="lp-nav">
      <Link href="/" className="lp-nav-logo">
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
            fill="rgba(168,213,186,0.7)"
          />
          <path
            d="M16 30 C14 22 12 14 14 8"
            stroke="var(--fern)"
            strokeWidth="1.5"
          />
        </svg>
        <em>nutrivivi</em>
      </Link>

      <div className="lp-nav-links">
        <a href="#sobre">sobre</a>
        <a href="#metodo">método life</a>
        <a href="#planos">planos</a>
      </div>

      <div className="lp-nav-actions">
        <Link href="/login" className="lp-btn lp-btn--primary lp-btn--sm">
          Login
        </Link>
      </div>

      <button
        className="lp-hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="lp-mobile-menu">
          <a href="#sobre" onClick={() => setOpen(false)}>
            Sobre
          </a>
          <a href="#metodo" onClick={() => setOpen(false)}>
            Método Life
          </a>
          <a href="#planos" onClick={() => setOpen(false)}>
            Planos
          </a>
          <Link href="/anamnese" onClick={() => setOpen(false)}>
            Iniciar Anamnese
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="lp-mobile-menu-admin"
          >
            Área da nutricionista →
          </Link>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="lp-hero">
      <div className="lp-leaf lp-leaf--tl" aria-hidden="true">
        <IconLeaf size={160} />
      </div>
      <div className="lp-leaf lp-leaf--tr" aria-hidden="true">
        <IconLeaf size={110} />
      </div>
      <div className="lp-leaf lp-leaf--bl" aria-hidden="true">
        <IconLeaf size={88} />
      </div>

      <div className="lp-hero-inner">
        <Eyebrow>Nutrição clínica e funcional</Eyebrow>
        <h1 className="lp-hero-title">
          Um plano alimentar que <em>finalmente</em> respeita o seu corpo.
        </h1>
        <p className="lp-hero-sub">
          Acompanhamento humanizado, sem dieta restritiva, com foco em
          reeducação alimentar real para mulheres que cansaram de dietas que não
          funcionam.
        </p>
        <div className="lp-hero-ctas">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="lp-btn lp-btn--primary lp-btn--lg"
          >
            <IconWhatsApp size={17} />
            Quero agendar minha avaliação
          </a>
        </div>

        <div className="lp-hero-proof">
          <span>
            <strong>+600</strong> mulheres atendidas
          </span>
          <span className="lp-proof-sep" />
          <span className="lp-proof-stars">
            <Stars />
            <strong>4.9</strong> de avaliação
          </span>
          <span className="lp-proof-sep" />
          <span>Online · Brasil todo</span>
        </div>

        <div className="lp-hero-photos">
          <div className="lp-photo-wrap lp-photo--tall">
            <Image
              src="/images/prato-colorido.png"
              alt="Prato saudável e colorido"
              fill
              className="lp-photo-img"
              sizes="(max-width: 900px) 50vw, 30vw"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="lp-photo-wrap lp-photo--feature">
            <Image
              src="/images/foto-retrato.png"
              alt="Viviane Cardoso — nutricionista"
              fill
              className="lp-photo-img"
              sizes="(max-width: 900px) 50vw, 38vw"
              priority
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <div className="lp-photo-wrap lp-photo--tall">
            <Image
              src="/images/ervas-verde.png"
              alt="Ervas e ingredientes naturais"
              fill
              className="lp-photo-img"
              sizes="(max-width: 900px) 0vw, 30vw"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ParaQuem() {
  const dores = [
    {
      n: "01",
      t: "Metabolismo lento",
      d: "Mesma rotina, mesmas calorias — e o peso sobe. É fisiologia, não falta de força.",
    },
    {
      n: "02",
      t: "Dietas que falham",
      d: "Você já tentou todas. Funciona um mês, depois volta tudo (e um pouco mais).",
    },
    {
      n: "03",
      t: "Pré e menopausa",
      d: "Ciclo desregulado, calorões, sono ruim. Seu corpo pede outra estratégia.",
    },
    {
      n: "04",
      t: "Vida corrida",
      d: "Família, trabalho, casa. Você não tem tempo para marmita milimétrica.",
    },
  ];
  return (
    <section className="lp-para-quem">
      <div className="lp-container">
        <div className="lp-section-head lp-section-head--center">
          <Eyebrow light>Para quem é</Eyebrow>
          <h2 className="lp-section-title lp-section-title--light">
            Talvez você esteja <em>se reconhecendo</em> agora.
          </h2>
        </div>
        <div className="lp-dores-grid">
          {dores.map((d) => (
            <div key={d.n} className="lp-dor-item">
              <div className="lp-dor-number">{d.n}</div>
              <h3 className="lp-dor-title">{d.t}</h3>
              <p className="lp-dor-desc">{d.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  const chips = [
    "Nutrição clínica",
    "Nutrição funcional",
    "Mulheres 35+",
    "Online · Brasil todo",
  ];
  return (
    <section className="lp-sobre" id="sobre">
      <div className="lp-container">
        <div className="lp-sobre-grid">
          <div className="lp-photo-wrap lp-photo--portrait">
            <Image
              src="/images/foto-perfil.jpeg"
              alt="Viviane Cardoso de Souza — nutricionista"
              fill
              className="lp-photo-img"
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectPosition: "center 90%" }}
            />
          </div>
          <div className="lp-sobre-copy">
            <Eyebrow>Sua nutricionista</Eyebrow>
            <h2 className="lp-section-title">
              <em>Viviane</em> Cardoso de Souza
            </h2>
            <div className="lp-crn">CRN6 28817</div>
            <p className="lp-sobre-text">
              Atendo mulheres acima dos 35 que cansaram de planos genéricos e
              querem entender o que está acontecendo com o próprio corpo. Cada
              plano é construído a quatro mãos — nada de cardápio padrão.
            </p>
            <p className="lp-sobre-text">
              Acredito em comida real, em prazer à mesa e em consistência maior
              que perfeição. Acompanho cada paciente de perto, com WhatsApp
              ativo entre as consultas.
            </p>
            <div className="lp-chips">
              {chips.map((c) => (
                <span key={c} className="lp-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metodo() {
  const steps = [
    {
      n: "01",
      t: "Questionário pré-consulta",
      d: "Anamnese detalhada com histórico clínico, hábitos alimentares, exames, rotina e comportamento.",
    },
    {
      n: "02",
      t: "Consulta diferenciada",
      d: "Atendimento individual com escuta ativa — presencial ou online — usando o método Life.",
    },
    {
      n: "03",
      t: "Análise bioquímica",
      d: "Interpretação de exames laboratoriais para identificar carências e desequilíbrios reais.",
    },
    {
      n: "04",
      t: "Suplementação individualizada",
      d: "Quando necessário, prescrição de suplementos personalizada baseada nos seus resultados.",
    },
  ];
  return (
    <section className="lp-metodo" id="metodo">
      <div className="lp-container">
        <div className="lp-section-head lp-section-head--center">
          <Eyebrow>Método Life</Eyebrow>
          <h2 className="lp-section-title">
            Um processo claro, do primeiro <em>ao último encontro</em>.
          </h2>
        </div>
        <div className="lp-steps-wrap">
          <div className="lp-steps-line" aria-hidden="true" />
          <div className="lp-steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="lp-step">
                <div className="lp-step-num">{s.n}</div>
                <h3 className="lp-step-title">{s.t}</h3>
                <p className="lp-step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    id: "online",
    tag: "1:1",
    name: "Consulta Online",
    desc: "Atendimento individual por videochamada. Plano alimentar Life sob medida e acompanhamento por WhatsApp.",
    bullets: ["60 min de anamnese", "Plano em até 7 dias", "WhatsApp ativo"],
    cta: "Agendar online",
    highlight: false,
  },
  {
    id: "presencial",
    tag: "1:1 · Natal/RN",
    name: "Consulta Presencial",
    desc: "Atendimento no consultório com avaliação física e bioimpedância. Mesma profundidade do online, com toque humano.",
    bullets: ["Avaliação corporal", "Bioimpedância", "Plano Life completo"],
    cta: "Agendar presencial",
    highlight: true,
  },
  {
    id: "grupo",
    tag: "Em grupo",
    name: "Grupo de Emagrecimento",
    desc: "Jornada coletiva de 3 meses com encontros semanais, comunidade ativa e protocolos do método Life.",
    bullets: ["Encontros semanais", "Comunidade WhatsApp", "Custo reduzido"],
    cta: "Entrar no grupo",
    highlight: false,
  },
  {
    id: "express",
    tag: "Plano Econômico",
    name: "Cardápio Express",
    desc: "Sem consulta. Você responde um questionário detalhado e recebe um cardápio personalizado em até 5 dias.",
    bullets: [
      "Questionário guiado",
      "Cardápio personalizado",
      "Mais acessível",
    ],
    cta: "Quero o cardápio",
    highlight: false,
  },
];

function Esteira() {
  return (
    <section className="lp-esteira" id="planos">
      <div className="lp-leaf lp-leaf--esteira" aria-hidden="true">
        <IconLeaf size={130} />
      </div>
      <div className="lp-container">
        <div className="lp-section-head lp-section-head--center">
          <Eyebrow>Como trabalhar com a Vivi</Eyebrow>
          <h2 className="lp-section-title">
            Quatro caminhos, <em>um só método</em>.
          </h2>
          <p className="lp-section-sub">
            Do atendimento mais próximo ao plano mais acessível, todos rodam o
            mesmo Método Life.
          </p>
        </div>
        <div className="lp-products-grid">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`lp-product-card${p.highlight ? " lp-product-card--hi" : ""}`}
            >
              {p.highlight && (
                <div className="lp-product-badge">Mais escolhido</div>
              )}
              <div className="lp-product-tag">{p.tag}</div>
              <h3 className="lp-product-name">{p.name}</h3>
              <p className="lp-product-desc">{p.desc}</p>
              <ul className="lp-product-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>
                    <span className="lp-bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                className={`lp-btn lp-btn--sm${p.highlight ? " lp-btn--primary" : " lp-btn--outline"}`}
              >
                <IconWhatsApp size={14} />
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  const items = [
    {
      t: "Sem dieta restritiva",
      d: "Comida de verdade, pensada para o seu paladar e rotina. Nada de listas proibidas ou calorias obsessivas.",
    },
    {
      t: "Acompanhamento humanizado",
      d: "Acesso direto à Vivi pelo WhatsApp — você nunca está sozinha no processo.",
    },
    {
      t: "Foco em mulheres 35+",
      d: "Protocolos pensados para o corpo na perimenopausa e menopausa.",
    },
    {
      t: "Reeducação alimentar real",
      d: "Você aprende a comer pela vida toda. Resultados que sustentam.",
    },
  ];
  return (
    <section className="lp-diferenciais">
      <div className="lp-container">
        <div className="lp-diferenciais-header">
          <div>
            <Eyebrow>Diferenciais</Eyebrow>
            <h2 className="lp-section-title">
              Por que escolher <em>esse caminho</em>?
            </h2>
          </div>
          <p className="lp-diferenciais-intro">
            Trabalho desenhado para quem quer leveza no processo e profundidade
            no resultado. Sem promessas mágicas — só método, escuta e ciência
            aplicada à sua vida.
          </p>
        </div>
        <div className="lp-diferenciais-grid">
          {items.map((it) => (
            <div key={it.t} className="lp-diferencial-item">
              <div className="lp-diferencial-icon">
                <IconLeaf size={20} />
              </div>
              <div>
                <h3 className="lp-diferencial-title">{it.t}</h3>
                <p className="lp-diferencial-desc">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const dep = [
    {
      n: "Mariana, 42",
      d: "Em 4 meses perdi 7kg sem passar fome. Mas o melhor foi voltar a dormir bem e ter energia de novo.",
      t: "perimenopausa",
    },
    {
      n: "Renata, 47",
      d: "Já tinha tentado tudo. Com a Vivi entendi meu corpo na menopausa pela primeira vez na vida.",
      t: "menopausa",
    },
    {
      n: "Paula, 38",
      d: "O WhatsApp da Vivi salvou minhas viagens. Aprendi a comer fora sem culpa e sem abandono.",
      t: "reeducação alimentar",
    },
  ];
  return (
    <section className="lp-depoimentos">
      <div className="lp-container">
        <div className="lp-section-head lp-section-head--center">
          <Eyebrow>Histórias reais</Eyebrow>
          <h2 className="lp-section-title">
            O que dizem quem <em>já passou por aqui</em>.
          </h2>
        </div>
        <div className="lp-dep-grid">
          {dep.map((d) => (
            <div key={d.n} className="lp-dep-card">
              <Stars />
              <p className="lp-dep-text">"{d.d}"</p>
              <div className="lp-dep-footer">
                <div className="lp-dep-avatar" />
                <div>
                  <div className="lp-dep-name">{d.n}</div>
                  <div className="lp-dep-tag">{d.t}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="lp-cta-final">
      <div className="lp-leaf lp-leaf--cta-l" aria-hidden="true">
        <IconLeaf size={130} />
      </div>
      <div className="lp-leaf lp-leaf--cta-r" aria-hidden="true">
        <IconLeaf size={130} />
      </div>
      <div className="lp-cta-inner">
        <h2 className="lp-cta-title">
          Vamos conversar sobre <em>o seu próximo passo</em>?
        </h2>
        <p className="lp-cta-sub">
          Sem compromisso. Comece pelo questionário de anamnese e sua
          nutricionista vai entrar em contato.
        </p>
        <div className="lp-cta-actions">
          <Link href="/anamnese" className="lp-btn lp-btn--light lp-btn--lg">
            Preencher Anamnese
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="lp-btn lp-btn--ghost lp-btn--lg"
          >
            <IconWhatsApp size={17} />
            Falar pelo WhatsApp
          </a>
        </div>
        <div className="lp-cta-wa-num">(84) 99918-1160</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-top">
          <div>
            <div className="lp-footer-logo">nutrivivi</div>
            <div className="lp-footer-meta">
              Viviane Cardoso de Souza · CRN6 28817
            </div>
          </div>
          <div className="lp-footer-links">
            <a href="tel:+5584999181160">(84) 99918-1160</a>
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener"
              className="lp-footer-ig"
            >
              <IconInstagram size={15} />
              @nutri.vivicardoso
            </a>
            <Link href="/login" className="lp-footer-admin">
              Área da nutricionista →
            </Link>
          </div>
        </div>
        <div className="lp-footer-bottom">
          © 2025 Nutrivivi · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{css}</style>
      <div className="lp-root">
        <Nav />
        <Hero />
        <ParaQuem />
        <Sobre />
        <Metodo />
        <Esteira />
        <Diferenciais />
        <Depoimentos />
        <CTAFinal />
        <Footer />
      </div>
    </>
  );
}
