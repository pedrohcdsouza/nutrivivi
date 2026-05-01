"use client";

import { useState, useRef, useEffect } from "react";
import { App, Form, Input, InputNumber, Select, Switch, Button } from "antd";
import { submitAnamnese } from "@/lib/api/anamneses";
import Link from "next/link";

const { TextArea } = Input;
const { Option } = Select;

function BotanicalIllustration() {
  return (
    <svg viewBox="0 0 280 420" fill="none" className="w-[200px] h-auto opacity-[0.85] animate-leafDrift" aria-hidden="true">
      <path d="M140 410 C140 410 138 310 142 210 C146 130 140 70 140 48" stroke="rgba(168,213,186,0.35)" strokeWidth="1.5" />
      <path d="M140 230 C98 210 58 178 48 136 C38 92 76 80 108 100 C128 114 138 190 140 230Z" fill="rgba(168,213,186,0.12)" stroke="rgba(168,213,186,0.30)" strokeWidth="1.5" />
      <path d="M140 230 C118 198 80 158 56 136" stroke="rgba(168,213,186,0.20)" strokeWidth="1" />
      <path d="M140 290 C188 262 234 224 242 178 C250 130 210 118 180 140 C160 158 143 248 140 290Z" fill="rgba(168,213,186,0.10)" stroke="rgba(168,213,186,0.25)" strokeWidth="1.5" />
      <path d="M140 290 C168 256 214 218 242 178" stroke="rgba(168,213,186,0.16)" strokeWidth="1" />
      <path d="M140 168 C112 150 84 122 82 96 C80 72 106 66 126 82 C137 94 140 148 140 168Z" fill="rgba(168,213,186,0.08)" stroke="rgba(168,213,186,0.22)" strokeWidth="1" />
      <path d="M140 138 C164 118 192 94 196 68 C200 44 172 38 155 56 C145 70 140 120 140 138Z" fill="rgba(168,213,186,0.08)" stroke="rgba(168,213,186,0.22)" strokeWidth="1" />
      <path d="M140 348 C106 326 70 298 68 264 C66 228 98 222 124 242 C136 255 140 320 140 348Z" fill="rgba(168,213,186,0.07)" stroke="rgba(168,213,186,0.18)" strokeWidth="1" />
      <circle cx="50" cy="136" r="3" fill="rgba(168,213,186,0.40)" />
      <circle cx="242" cy="178" r="3" fill="rgba(168,213,186,0.30)" />
      <circle cx="82" cy="95" r="2" fill="rgba(168,213,186,0.35)" />
      <circle cx="196" cy="67" r="2" fill="rgba(168,213,186,0.28)" />
    </svg>
  );
}

function SectionCard({
  number,
  title,
  children,
  delay = 0,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-foam p-8 mb-5 shadow-sm transition-shadow duration-300 hover:shadow-md animate-fadeInUp max-sm:px-4 max-sm:py-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3.5 mb-7 pb-5 border-b border-foam">
        <span className="font-display text-[12px] font-semibold text-sage tracking-[0.08em] bg-foam px-2.5 py-1 rounded-full min-w-[44px] text-center">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-medium text-forest m-0 tracking-[-0.01em]">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function AnamnesePage() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await submitAnamnese(values);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start min-h-screen max-md:flex-col">
      {/* ── Left Panel ── */}
      <aside
        className="w-[360px] min-w-[300px] shrink-0 sticky top-0 h-screen overflow-hidden flex flex-col px-9 py-10 max-md:w-full max-md:min-w-0 max-md:h-auto max-md:static max-md:px-6 max-md:py-7"
        style={{
          background: "linear-gradient(158deg, #1b3a2d 0%, #2d5a3d 55%, #243e2e 100%)",
        }}
      >
        {/* pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8d5ba' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 flex flex-col h-full max-md:flex-row max-md:flex-wrap max-md:items-center max-md:gap-4 max-md:h-auto">
          {/* brand */}
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z" fill="rgba(168,213,186,0.55)" />
              <path d="M16 30 C14 22 12 14 14 8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
            </svg>
            <Link href="/" className="font-display text-[22px] font-medium text-white/95 tracking-[0.04em] no-underline">
              Nutrivivi
            </Link>
          </div>

          {/* illustration — hidden on mobile */}
          <div className="flex-1 flex items-center justify-center py-2 max-md:hidden">
            <BotanicalIllustration />
          </div>

          {/* tagline — hidden on mobile */}
          <div className="mb-6 max-md:mb-0">
            <h1 className="font-display text-[44px] font-normal leading-[1.08] text-white m-0 mb-4 tracking-[-0.01em] max-md:text-[28px]">
              Nutrição que<br /><em className="italic text-mint">transforma</em><br />vidas.
            </h1>
            <p className="text-[13px] leading-[1.75] text-mint/75 m-0 max-md:hidden">
              Preencha a anamnese para que sua nutricionista elabore um plano
              alimentar totalmente personalizado para você.
            </p>
          </div>

          {/* admin link — desktop only */}
          <Link
            href="/login"
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-mint/55 no-underline py-2 inline-block transition-colors hover:text-mint max-md:hidden"
          >
            Área da nutricionista →
          </Link>

          {/* mobile kebab menu */}
          <div className="hidden max-md:block relative ml-auto" ref={menuRef}>
            <button
              className="flex flex-col items-center justify-center gap-1 bg-transparent border-none p-2.5 cursor-pointer rounded-lg transition-colors hover:bg-mint/15"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              <span className="block w-1 h-1 rounded-full bg-mint/85" />
              <span className="block w-1 h-1 rounded-full bg-mint/85" />
              <span className="block w-1 h-1 rounded-full bg-mint/85" />
            </button>
            {menuOpen && (
              <div
                className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl p-1.5 shadow-lg border border-foam min-w-[220px] z-[200] animate-fadeInUp"
                role="menu"
              >
                <Link
                  href="/login"
                  className="block px-4 py-3 text-[13px] font-medium text-charcoal no-underline rounded-lg transition-colors hover:bg-foam hover:text-fern"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar como nutricionista
                </Link>
                <Link
                  href="/painel/anamneses"
                  className="block px-4 py-3 text-[13px] font-medium text-charcoal no-underline rounded-lg transition-colors hover:bg-foam hover:text-fern"
                  onClick={() => setMenuOpen(false)}
                >
                  Painel administrativo
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Right Panel: Form ── */}
      <main className="flex-1 min-h-screen px-16 py-14 bg-cream max-md:px-6 max-md:py-8 max-sm:px-4 max-sm:py-6">
        {success ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-scaleIn">
            <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#3a7d5a" strokeWidth="2" />
                <path d="M18 32 L28 42 L46 22" stroke="#3a7d5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-[40px] font-normal text-forest m-0 mb-3">Anamnese enviada!</h2>
            <p className="text-[15px] text-bark max-w-[440px] leading-[1.75] m-0 mb-8">
              Sua nutricionista já recebeu seus dados e irá analisá-los em
              breve. Aguarde o contato para iniciar sua jornada de saúde.
            </p>
            <button
              className="bg-transparent border-[1.5px] border-mint text-fern px-7 py-2.5 rounded-lg font-body text-[13px] font-medium cursor-pointer tracking-[0.04em] transition-all hover:bg-foam hover:border-fern"
              onClick={() => {
                setSuccess(false);
                form.resetFields();
              }}
            >
              Enviar outra resposta
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h1 className="font-display text-[42px] font-normal text-forest m-0 mb-2 tracking-[-0.02em] animate-fadeInUp max-md:text-[30px]">
                Anamnese Nutricional
              </h1>
              <p
                className="text-sm text-bark m-0 mb-6 animate-fadeInUp"
                style={{ animationDelay: "0.08s" }}
              >
                Suas respostas são confidenciais e essenciais para um
                atendimento verdadeiramente personalizado.
              </p>
              <div
                className="w-14 h-[3px] rounded-sm bg-gradient-to-r from-fern to-mint animate-fadeInUp"
                style={{ animationDelay: "0.14s" }}
              />
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                does_physical_activity: false,
                uses_supplement: false,
                sleep_quality: 3,
                anxiety_level: 3,
                stress_level: 3,
              }}
            >
              {/* 01 */}
              <SectionCard number={1} title="Identificação do Paciente" delay={0.2}>
                <Form.Item name="full_name" label="Nome Completo" rules={[{ required: true, message: "Obrigatório" }]}>
                  <Input size="large" placeholder="Seu nome completo" />
                </Form.Item>
                <div className="form-row flex gap-4 flex-wrap">
                  <Form.Item name="age_years" label="Idade" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <InputNumber size="large" style={{ width: "100%" }} min={0} placeholder="Sua idade" />
                  </Form.Item>
                  <Form.Item name="profession" label="Profissão" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <Input size="large" placeholder="Sua profissão" />
                  </Form.Item>
                </div>
                <Form.Item name="consultation_reason" label="Motivo da Consulta" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={3} placeholder="Por que você busca uma consulta nutricional?" />
                </Form.Item>
              </SectionCard>

              {/* 02 */}
              <SectionCard number={2} title="Antropometria Inicial" delay={0.3}>
                <div className="form-row flex gap-4 flex-wrap">
                  <Form.Item name="weight_kg" label="Peso Atual (kg)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <InputNumber size="large" min={1} max={500} step={0.1} style={{ width: "100%" }} placeholder="Ex: 70.5" />
                  </Form.Item>
                  <Form.Item name="height_cm" label="Altura (cm)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <InputNumber size="large" min={30} max={300} style={{ width: "100%" }} placeholder="Ex: 170" />
                  </Form.Item>
                </div>
              </SectionCard>

              {/* 03 */}
              <SectionCard number={3} title="Saúde e Estilo de Vida" delay={0.38}>
                <div className="form-row-three flex gap-4 flex-wrap">
                  <Form.Item name="sleep_quality" label="Qualidade do Sono" rules={[{ required: true }]}>
                    <Select size="large">
                      <Option value={1}>1 — Muito ruim</Option>
                      <Option value={2}>2 — Ruim</Option>
                      <Option value={3}>3 — Regular</Option>
                      <Option value={4}>4 — Boa</Option>
                      <Option value={5}>5 — Excelente</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="anxiety_level" label="Nível de Ansiedade" rules={[{ required: true }]}>
                    <Select size="large">
                      <Option value={1}>1 — Muito baixo</Option>
                      <Option value={2}>2 — Baixo</Option>
                      <Option value={3}>3 — Moderado</Option>
                      <Option value={4}>4 — Alto</Option>
                      <Option value={5}>5 — Muito alto</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="stress_level" label="Nível de Estresse" rules={[{ required: true }]}>
                    <Select size="large">
                      <Option value={1}>1 — Muito baixo</Option>
                      <Option value={2}>2 — Baixo</Option>
                      <Option value={3}>3 — Moderado</Option>
                      <Option value={4}>4 — Alto</Option>
                      <Option value={5}>5 — Muito alto</Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item name="does_physical_activity" label="Pratica Atividade Física?" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item noStyle shouldUpdate={(prev, curr) => prev.does_physical_activity !== curr.does_physical_activity}>
                  {({ getFieldValue }) =>
                    getFieldValue("does_physical_activity") ? (
                      <div className="bg-foam rounded-xl p-5 mb-4 border border-mint/45 animate-[fadeIn_0.3s_ease_both]">
                        <div className="form-row flex gap-4 flex-wrap">
                          <Form.Item name="activity_modality" label="Modalidade" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                            <Input placeholder="Ex: Musculação, Corrida" />
                          </Form.Item>
                          <Form.Item name="activity_weekly_frequency" label="Frequência Semanal" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                            <InputNumber min={1} max={14} style={{ width: "100%" }} placeholder="Vezes/semana" />
                          </Form.Item>
                        </div>
                        <div className="form-row flex gap-4 flex-wrap">
                          <Form.Item name="activity_workout_time" label="Horário do Treino" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                            <Input placeholder="Ex: 18:30" />
                          </Form.Item>
                          <Form.Item name="activity_duration_minutes" label="Duração (minutos)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                            <InputNumber min={1} max={300} style={{ width: "100%" }} placeholder="Ex: 60" />
                          </Form.Item>
                        </div>
                      </div>
                    ) : null
                  }
                </Form.Item>
              </SectionCard>

              {/* 04 */}
              <SectionCard number={4} title="Suplementação Atual" delay={0.44}>
                <Form.Item name="uses_supplement" label="Utiliza Algum Suplemento?" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item noStyle shouldUpdate={(prev, curr) => prev.uses_supplement !== curr.uses_supplement}>
                  {({ getFieldValue }) =>
                    getFieldValue("uses_supplement") ? (
                      <Form.Item name="supplements" label="Quais suplementos?" rules={[{ required: true, message: "Obrigatório" }]}>
                        <TextArea rows={3} placeholder="Liste os suplementos que você utiliza" />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </SectionCard>

              {/* 05 */}
              <SectionCard number={5} title="Recordatório Alimentar" delay={0.5}>
                <p className="text-[13px] text-bark mb-5 italic">Descreva o que você costuma comer em cada refeição.</p>
                <Form.Item name="recall_breakfast" label="Café da Manhã" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={2} placeholder="O que você costuma comer no café da manhã?" />
                </Form.Item>
                <Form.Item name="recall_lunch" label="Almoço" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={2} placeholder="O que você costuma almoçar?" />
                </Form.Item>
                <Form.Item name="recall_snack" label="Lanche" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={2} placeholder="Lanche da tarde ou outros?" />
                </Form.Item>
                <Form.Item name="recall_dinner" label="Jantar" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={2} placeholder="O que você costuma jantar?" />
                </Form.Item>
                <Form.Item name="recall_supper_other" label="Ceia / Outros" rules={[{ required: true, message: "Obrigatório" }]}>
                  <TextArea rows={2} placeholder="Ceia ou outras refeições?" />
                </Form.Item>
              </SectionCard>

              {/* 06 */}
              <SectionCard number={6} title="Observações Adicionais" delay={0.56}>
                <Form.Item name="additional_observations" label="Há algo mais que gostaria de compartilhar? (Opcional)">
                  <TextArea rows={4} placeholder="Alergias, intolerâncias, medicamentos, ou qualquer informação relevante..." />
                </Form.Item>
              </SectionCard>

              <div className="pt-8 pb-6 text-center animate-fadeInUp" style={{ animationDelay: "0.62s" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                  style={{ maxWidth: 420, height: 52, fontSize: 13, borderRadius: 8 }}
                >
                  Enviar Anamnese
                </Button>
                <p className="text-xs text-mist mt-3.5 m-0">
                  Seus dados são protegidos e utilizados exclusivamente para fins nutricionais.
                </p>
              </div>
            </Form>
          </>
        )}
      </main>
    </div>
  );
}
