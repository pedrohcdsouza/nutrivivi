"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
    <div
      className={`inline-flex items-center gap-2.5 font-body text-[10.5px] font-bold tracking-[0.18em] uppercase ${light ? "text-mint" : "text-sage"}`}
    >
      <span className="block w-5 h-[1.5px] bg-current opacity-60 rounded-sm" />
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="inline-flex gap-0.5 text-[#c5893a]">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} />
      ))}
    </div>
  );
}

const BTN_STYLES = {
  primary: {
    className: "!text-white",
    style: {
      backgroundColor: "#3a7d5a",
      boxShadow: "0 2px 12px rgba(58,125,90,0.28)",
    },
  },
  outline: {
    className: "!text-[#3a7d5a]",
    style: {
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 1.5px #3a7d5a",
    },
  },
  light: {
    className: "!text-[#1f3d2b]",
    style: { backgroundColor: "#ffffff" },
  },
  ghost: {
    className: "!text-white",
    style: {
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.3)",
    },
  },
} as const;

const BTN_SIZES = {
  sm: "px-[18px] py-2.5 text-[13px]",
  lg: "px-[34px] py-[18px] text-[15px]",
} as const;

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] whitespace-nowrap no-underline cursor-pointer border-0 transition-transform duration-150 ease-out hover:-translate-y-px";

function Btn({
  href,
  variant,
  size,
  children,
  external,
}: {
  href: string;
  variant: keyof typeof BTN_STYLES;
  size: keyof typeof BTN_SIZES;
  children: React.ReactNode;
  external?: boolean;
}) {
  const { className, style } = BTN_STYLES[variant];
  const cls = `${BTN_BASE} ${BTN_SIZES[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        style={style}
        target="_blank"
        rel="noopener"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between px-14 py-5 sticky top-0 z-[100] bg-cream/[0.92] backdrop-blur-xl border-b border-mint/25 max-md:px-6 max-md:py-4 flex-wrap relative">
      <Link
        href="/"
        className="flex items-center gap-2 no-underline font-display text-[22px] italic font-normal text-forest tracking-[-0.01em]"
      >
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
            stroke="var(--color-fern)"
            strokeWidth="1.5"
          />
        </svg>
        <em>nutrivivi</em>
      </Link>

      <div className="flex gap-9 text-[13.5px] text-bark max-md:hidden">
        <a
          href="#sobre"
          className="no-underline text-inherit transition-colors hover:text-fern"
        >
          sobre
        </a>
        <a
          href="#metodo"
          className="no-underline text-inherit transition-colors hover:text-fern"
        >
          método life
        </a>
        <a
          href="#planos"
          className="no-underline text-inherit transition-colors hover:text-fern"
        >
          planos
        </a>
      </div>

      <div className="flex items-center gap-3.5 max-md:hidden">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold text-[13px] px-[18px] py-2.5 no-underline bg-fern text-white shadow-[0_2px_12px_rgba(58,125,90,0.28)] transition-all hover:-translate-y-px hover:bg-evergreen"
        >
          Login
        </Link>
      </div>

      {/* hamburger */}
      <button
        className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5 rounded-md"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        <span className="block w-[22px] h-0.5 bg-forest rounded-sm transition-all" />
        <span className="block w-[22px] h-0.5 bg-forest rounded-sm transition-all" />
        <span className="block w-[22px] h-0.5 bg-forest rounded-sm transition-all" />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+1px)] left-0 right-0 bg-white border-b border-foam flex flex-col px-6 pb-5 pt-3 gap-0.5 shadow-md animate-fadeInUp z-50">
          <a
            href="#sobre"
            className="px-3 py-[11px] text-[15px] text-charcoal no-underline rounded-lg transition-colors hover:bg-foam"
            onClick={() => setOpen(false)}
          >
            Sobre
          </a>
          <a
            href="#metodo"
            className="px-3 py-[11px] text-[15px] text-charcoal no-underline rounded-lg transition-colors hover:bg-foam"
            onClick={() => setOpen(false)}
          >
            Método Life
          </a>
          <a
            href="#planos"
            className="px-3 py-[11px] text-[15px] text-charcoal no-underline rounded-lg transition-colors hover:bg-foam"
            onClick={() => setOpen(false)}
          >
            Planos
          </a>
          <Link
            href="/anamnese"
            className="px-3 py-[11px] text-[15px] text-charcoal no-underline rounded-lg transition-colors hover:bg-foam"
            onClick={() => setOpen(false)}
          >
            Iniciar Anamnese
          </Link>
          <Link
            href="/login"
            className="px-3 py-[11px] text-xs text-mist no-underline tracking-[0.04em]"
            onClick={() => setOpen(false)}
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
    <section className="py-[72px] pb-24 text-center relative overflow-hidden">
      {/* decorative leaves */}
      <div
        className="absolute top-20 left-12 opacity-35 text-mint -rotate-[30deg] pointer-events-none max-sm:hidden"
        aria-hidden="true"
      >
        <IconLeaf size={160} />
      </div>
      <div
        className="absolute top-[180px] right-16 opacity-[0.28] text-mint rotate-45 pointer-events-none max-sm:hidden"
        aria-hidden="true"
      >
        <IconLeaf size={110} />
      </div>
      <div
        className="absolute bottom-20 left-[200px] opacity-[0.22] text-mint rotate-[15deg] pointer-events-none max-sm:hidden"
        aria-hidden="true"
      >
        <IconLeaf size={88} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-14 max-md:px-6">
        <Eyebrow>Nutrição clínica e funcional</Eyebrow>
        <h1 className="font-display text-[80px] font-normal leading-[1.0] tracking-[-0.025em] text-forest mt-6 mb-0 max-lg:text-[60px] max-md:text-[44px] max-sm:text-[36px]">
          Um plano alimentar que{" "}
          <em className="italic text-fern">finalmente</em> respeita o seu corpo.
        </h1>
        <p className="text-lg leading-[1.6] text-bark max-w-[600px] mx-auto mt-7">
          Acompanhamento humanizado, sem dieta restritiva, com foco em
          reeducação alimentar real para mulheres que cansaram de dietas que não
          funcionam.
        </p>
        <div className="flex gap-3.5 justify-center mt-10 flex-wrap max-sm:flex-col max-sm:items-stretch">
          <Btn href={WA_LINK} variant="primary" size="lg" external>
            <IconWhatsApp size={17} />
            Quero agendar minha avaliação
          </Btn>
        </div>

        {/* proof bar */}
        {/* <div className="inline-flex items-center gap-5 mt-12 px-7 py-4 bg-white rounded-full border border-foam text-[13px] text-bark shadow-sm flex-wrap justify-center max-md:gap-3 max-md:px-5 max-md:text-xs">
          <span>
            <strong className="text-forest">+100</strong> mulheres atendidas
          </span>
          <span className="block w-px h-3.5 bg-foam max-md:hidden" />
          <span className="inline-flex items-center gap-1.5">
            <Stars />
            <strong className="text-forest">4.9</strong> de avaliação
          </span>
          <span className="block w-px h-3.5 bg-foam max-md:hidden" />
          <span>Online · Brasil todo</span>
        </div> */}

        {/* photo grid */}
        {/* <div className="grid grid-cols-[1fr_1.6fr_1fr] gap-3.5 max-w-[1280px] mx-auto mt-16 px-8 max-md:grid-cols-2 max-md:px-6 max-sm:grid-cols-1">
          <div
            className="relative rounded-[18px] overflow-hidden bg-foam"
            style={{ aspectRatio: "2/3" }}
          >
            <Image
              src="/images/prato-colorido.png"
              alt="Prato saudável e colorido"
              fill
              className="object-cover"
              sizes="(max-width:900px) 50vw, 30vw"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div
            className="relative rounded-[18px] overflow-hidden bg-foam"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src="/images/foto-retrato.png"
              alt="Viviane Cardoso — nutricionista"
              fill
              className="object-cover"
              sizes="(max-width:900px) 50vw, 38vw"
              priority
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <div
            className="relative rounded-[18px] overflow-hidden bg-foam max-md:hidden"
            style={{ aspectRatio: "2/3" }}
          >
            <Image
              src="/images/ervas-verde.png"
              alt="Ervas e ingredientes naturais"
              fill
              className="object-cover"
              sizes="30vw"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </div> */}
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
    <section className="py-[100px] bg-forest rounded-[32px_32px_0_0] -mt-px relative max-md:py-[72px] max-md:rounded-[20px_20px_0_0]">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="text-center mb-16">
          <Eyebrow light>Para quem é</Eyebrow>
          <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-cream mt-4 max-lg:text-[42px] max-sm:text-[34px]">
            Talvez você esteja{" "}
            <em className="italic text-mint">se reconhecendo</em> agora.
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-lg:gap-10 max-sm:grid-cols-1 max-sm:gap-7">
          {dores.map((d) => (
            <div key={d.n} className="text-center">
              <div className="font-display text-[44px] italic text-mint leading-none">
                {d.n}
              </div>
              <h3 className="font-display text-[22px] font-normal text-white mt-[18px] mb-0">
                {d.t}
              </h3>
              <p className="text-sm leading-[1.65] text-mint/75 mt-2.5 mb-0">
                {d.d}
              </p>
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
    "Mulheres 40+",
    "Online · Brasil todo",
  ];
  return (
    <section className="py-[112px] bg-white max-md:py-[72px]" id="sobre">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:gap-10">
          <div
            className="relative rounded-[18px] overflow-hidden bg-foam"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src="/images/foto-retrato.png"
              alt="Viviane Cardoso de Souza — nutricionista"
              fill
              className="object-cover"
              sizes="(max-width:900px) 100vw, 50vw"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <div className="flex flex-col">
            <Eyebrow>Sua nutricionista</Eyebrow>
            <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-forest mt-4 mb-0 max-lg:text-[42px] max-sm:text-[34px]">
              <em className="italic text-fern">Viviane</em> Cardoso de Souza
            </h2>
            <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-sage mt-2.5">
              CRN6 28817
            </div>
            <p className="text-[16.5px] leading-[1.7] text-bark mt-5 mb-0">
              Atendo mulheres acima dos 40 que cansaram de planos genéricos e
              querem entender o que está acontecendo com o próprio corpo. Cada
              plano é construído a quatro mãos, nada de cardápio padrão.
            </p>
            <p className="text-[16.5px] leading-[1.7] text-bark mt-5 mb-0">
              Acredito em comida real, em prazer à mesa e em consistência maior
              que perfeição. Acompanho cada paciente de perto, com WhatsApp
              ativo entre as consultas.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {chips.map((c) => (
                <span
                  key={c}
                  className="text-[12.5px] px-3.5 py-[7px] rounded-full bg-foam text-fern font-medium"
                >
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
    <section className="py-[112px] bg-cream max-md:py-[72px]" id="metodo">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="text-center mb-16">
          <Eyebrow>Método Life</Eyebrow>
          <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-forest mt-4 max-lg:text-[42px] max-sm:text-[34px]">
            Um processo claro, do primeiro{" "}
            <em className="italic text-fern">ao último encontro</em>.
          </h2>
        </div>
        <div className="relative">
          <div
            className="absolute top-9 left-[12%] right-[12%] border-t-2 border-dashed border-mint pointer-events-none max-lg:hidden"
            aria-hidden="true"
          />
          <div className="grid grid-cols-4 gap-6 relative max-lg:grid-cols-2 max-sm:grid-cols-1">
            {steps.map((s) => (
              <div key={s.n} className="text-center px-4">
                <div className="w-[72px] h-[72px] rounded-full bg-fern text-white grid place-items-center mx-auto font-display text-2xl italic border-[6px] border-cream shadow-[0_0_0_2px_var(--color-mint)]">
                  {s.n}
                </div>
                <h3 className="font-display text-[22px] font-normal text-forest mt-6 mb-0">
                  {s.t}
                </h3>
                <p className="text-sm leading-[1.65] text-bark mt-2.5 mx-auto max-w-[220px]">
                  {s.d}
                </p>
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
    bullets: ["60 min de anamnese", "Plano em até 4 dias", "WhatsApp ativo"],
    cta: "Agendar online",
    highlight: true,
  },
  {
    id: "presencial",
    tag: "1:1 · Natal/RN",
    name: "Consulta Presencial",
    desc: "Atendimento no consultório com avaliação física e bioimpedância. Mesma profundidade do online, com toque humano.",
    bullets: ["Avaliação corporal", "Bioimpedância", "Plano Life completo"],
    cta: "Agendar presencial",
    highlight: false,
  },
  {
    id: "grupo",
    tag: "Em grupo",
    name: "Grupo de Emagrecimento",
    desc: "Jornada coletiva por 1 mês, comunidade ativa e protocolos do método Life.",
    bullets: ["E-books gratuitos", "Comunidade WhatsApp", "Custo reduzido"],
    cta: "Entrar no grupo",
    highlight: false,
  },
  {
    id: "express",
    tag: "Plano Econômico",
    name: "Cardápio Express",
    desc: "Sem consulta. Você responde um questionário detalhado e recebe um cardápio personalizado em até 4 dias.",
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
    <section
      className="py-[112px] bg-white relative overflow-hidden max-md:py-[72px]"
      id="planos"
    >
      <div
        className="absolute top-12 right-12 opacity-[0.28] text-mint rotate-[20deg] pointer-events-none"
        aria-hidden="true"
      >
        <IconLeaf size={130} />
      </div>
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="text-center mb-16">
          <Eyebrow>Como trabalhar com a Vivi</Eyebrow>
          <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-forest mt-4 max-lg:text-[42px] max-sm:text-[34px]">
            Quatro caminhos, <em className="italic text-fern">um só método</em>.
          </h2>
          <p className="text-base leading-[1.65] text-bark mt-[18px] mx-auto max-w-[540px]">
            Do atendimento mais próximo ao plano mais acessível, todos rodam o
            mesmo Método Life.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-[28px] px-8 py-7 pb-7 transition-shadow duration-[250ms] hover:shadow-md max-sm:px-[22px] ${
                p.highlight
                  ? "bg-white border-2 border-fern"
                  : "bg-cream border border-foam"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-7 bg-fern text-white text-[10px] font-bold tracking-[0.14em] uppercase px-3.5 py-[5px] rounded-full font-body">
                  Mais escolhido
                </div>
              )}
              <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-sage font-body">
                {p.tag}
              </div>
              <h3 className="font-display text-[28px] font-normal text-forest mt-2.5 mb-0 tracking-[-0.01em] leading-[1.15]">
                {p.name}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-bark mt-3 mb-0">
                {p.desc}
              </p>
              <ul className="list-none p-0 mt-[18px] mb-6 flex flex-wrap gap-y-2 gap-x-[18px]">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-2 text-[13px] text-bark"
                  >
                    <span className="block w-1 h-1 rounded-full bg-sage shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Btn
                href={WA_LINK}
                variant={p.highlight ? "primary" : "outline"}
                size="sm"
                external
              >
                <IconWhatsApp size={14} />
                {p.cta}
              </Btn>
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
      t: "Foco em mulheres 40+",
      d: "Protocolos pensados para o corpo na perimenopausa e menopausa.",
    },
    {
      t: "Reeducação alimentar real",
      d: "Você aprende a comer pela vida toda. Resultados que sustentam.",
    },
  ];
  return (
    <section className="py-[112px] bg-white max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-2 gap-[60px] items-center mb-14 max-md:grid-cols-1 max-md:gap-6 max-md:mb-10">
          <div>
            <Eyebrow>Diferenciais</Eyebrow>
            <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-forest mt-4 max-lg:text-[42px] max-sm:text-[34px]">
              Por que escolher{" "}
              <em className="italic text-fern">esse caminho</em>?
            </h2>
          </div>
          <p className="text-base leading-[1.7] text-bark m-0">
            Trabalho desenhado para quem quer leveza no processo e profundidade
            no resultado. Sem promessas mágicas — só método, escuta e ciência
            aplicada à sua vida.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[3px] bg-foam rounded-3xl overflow-hidden border border-foam max-md:grid-cols-1">
          {items.map((it) => (
            <div
              key={it.t}
              className="bg-white px-8 py-9 flex gap-[18px] max-sm:px-[22px] max-sm:py-7"
            >
              <div className="w-11 h-11 rounded-full bg-foam text-fern grid place-items-center shrink-0">
                <IconLeaf size={20} />
              </div>
              <div>
                <h3 className="font-display text-[22px] font-normal text-forest m-0 leading-[1.2]">
                  {it.t}
                </h3>
                <p className="text-[14.5px] text-bark leading-[1.65] mt-2.5 mb-0">
                  {it.d}
                </p>
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
    <section className="py-[112px] bg-foam max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="text-center mb-16">
          <Eyebrow>Histórias reais</Eyebrow>
          <h2 className="font-display text-[54px] font-normal leading-[1.05] tracking-[-0.02em] text-forest mt-4 max-lg:text-[42px] max-sm:text-[34px]">
            O que dizem quem{" "}
            <em className="italic text-fern">já passou por aqui</em>.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-[22px] max-md:grid-cols-1">
          {dep.map((d) => (
            <div
              key={d.n}
              className="bg-white px-7 py-8 rounded-3xl border border-mint/30 shadow-sm flex flex-col"
            >
              <Stars />
              <p className="text-[16.5px] leading-[1.6] text-charcoal mt-[18px] mb-0 flex-1">
                "{d.d}"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-foam">
                <div
                  className="w-10 h-10 rounded-full bg-foam shrink-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(58,125,90,0.08) 0 6px, rgba(58,125,90,0.03) 6px 12px)",
                  }}
                />
                <div>
                  <div className="text-sm font-semibold text-forest">{d.n}</div>
                  <div className="text-[10.5px] text-mist tracking-[0.1em] uppercase mt-0.5 font-mono">
                    {d.t}
                  </div>
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
    <section className="py-[120px] bg-fern text-center relative overflow-hidden max-md:py-20">
      <div
        className="absolute top-9 left-16 opacity-[0.22] text-mint -rotate-[20deg] pointer-events-none"
        aria-hidden="true"
      >
        <IconLeaf size={130} />
      </div>
      <div
        className="absolute bottom-9 right-16 opacity-[0.22] text-mint rotate-[160deg] pointer-events-none"
        aria-hidden="true"
      >
        <IconLeaf size={130} />
      </div>
      <div className="relative z-10 max-w-[720px] mx-auto px-14 max-md:px-6">
        <h2 className="font-display text-[64px] font-normal leading-[1.0] tracking-[-0.02em] text-white m-0 max-lg:text-[48px] max-md:text-[38px]">
          Vamos conversar sobre{" "}
          <em className="italic text-mint">o seu próximo passo</em>?
        </h2>
        <p className="text-[17px] text-white/80 mt-[18px] mb-0 leading-[1.6]">
          Sem compromisso. Comece pelo questionário de anamnese e sua
          nutricionista vai entrar em contato.
        </p>
        <div className="flex gap-3.5 justify-center mt-9 flex-wrap max-sm:flex-col max-sm:items-stretch">
          <Btn href={WA_LINK} variant="ghost" size="lg" external>
            <IconWhatsApp size={17} />
            Falar pelo Whatsapp
          </Btn>
        </div>
        <div className="mt-[18px] text-[12.5px] text-white/55 tracking-[0.08em] font-mono">
          (84) 99918-1160
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-[52px] pb-7 max-md:pt-10 max-md:pb-5">
      <div className="max-w-[1200px] mx-auto px-14 max-md:px-6">
        <div className="flex justify-between items-end pb-6 border-b border-foam max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <div className="font-display text-[30px] italic text-forest tracking-[-0.01em]">
              nutrivivi
            </div>
            <div className="text-[13px] text-mist mt-1.5">
              Viviane Cardoso de Souza · CRN6 28817
            </div>
          </div>
          <div className="flex gap-7 items-center text-[13.5px] text-bark max-md:flex-col max-md:items-start max-md:gap-3.5">
            <a
              href="tel:+5584999181160"
              className="no-underline text-inherit transition-colors hover:text-fern"
            >
              (84) 99918-1160
            </a>
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 no-underline text-inherit transition-colors hover:text-fern"
            >
              <IconInstagram size={15} />
              @nutri.vivicardoso
            </a>
            <Link
              href="/login"
              className="text-[11.5px] text-mist no-underline tracking-[0.04em] transition-colors hover:text-bark"
            >
              Área da nutricionista →
            </Link>
          </div>
        </div>
        <div className="mt-5 text-xs text-mist text-center">
          © 2025 Nutrivivi · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-cream text-charcoal font-body">
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
  );
}
