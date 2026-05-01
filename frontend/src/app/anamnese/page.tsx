"use client";

import { useState, useRef, useEffect } from "react";
import { App, Form, Input, InputNumber, Select, Switch, Button } from "antd";
import { submitAnamnese } from "@/lib/api/anamneses";
import Link from "next/link";

const css = `
.page-root { display: flex; align-items: flex-start; min-height: 100vh; }

.left-panel {
  width: 360px;
  min-width: 300px;
  background: linear-gradient(158deg, var(--forest) 0%, var(--evergreen) 55%, #243e2e 100%);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 40px 36px;
  flex-shrink: 0;
}
.left-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8d5ba' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.left-content { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; }

.brand { display: flex; align-items: center; gap: 10px; }
.brand-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  letter-spacing: 0.04em;
}
.brand-illustration { flex: 1; display: flex; align-items: center; justify-content: center; padding: 8px 0; }
.botanical-svg { width: 200px; height: auto; opacity: 0.85; animation: leafDrift 9s ease-in-out infinite; }

.brand-copy { margin-bottom: 24px; }
.brand-tagline {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 400;
  line-height: 1.08;
  color: white;
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}
.brand-tagline em { font-style: italic; color: var(--mint); }
.brand-desc { font-size: 13px; line-height: 1.75; color: rgba(168,213,186,0.75); margin: 0; }

.admin-link {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(168,213,186,0.55);
  text-decoration: none;
  transition: color 0.2s;
  padding: 8px 0;
  display: inline-block;
}
.admin-link:hover { color: var(--mint); }

.right-panel { flex: 1; min-height: 100vh; padding: 56px 64px; background: var(--cream); }

.form-header { margin-bottom: 40px; }
.form-main-title {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 400;
  color: var(--forest);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.7s ease both;
}
.form-subtitle {
  font-size: 14px;
  color: var(--bark);
  margin: 0 0 24px;
  animation: fadeInUp 0.7s ease 0.08s both;
  opacity: 0;
}
.form-divider {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, var(--fern), var(--mint));
  border-radius: 2px;
  animation: fadeInUp 0.7s ease 0.14s both;
  opacity: 0;
}

.section-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--foam);
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.65s ease both;
}
.section-card:hover { box-shadow: var(--shadow-md); }
.section-card.anim-1 { animation-delay: 0.2s; }
.section-card.anim-2 { animation-delay: 0.3s; }
.section-card.anim-3 { animation-delay: 0.38s; }
.section-card.anim-4 { animation-delay: 0.44s; }
.section-card.anim-5 { animation-delay: 0.5s; }
.section-card.anim-6 { animation-delay: 0.56s; }

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--foam);
}
.section-number {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--sage);
  letter-spacing: 0.08em;
  background: var(--foam);
  padding: 4px 10px;
  border-radius: 20px;
  min-width: 44px;
  text-align: center;
}
.section-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  color: var(--forest);
  margin: 0;
  letter-spacing: -0.01em;
}
.section-note { font-size: 13px; color: var(--bark); margin: 0 0 20px; font-style: italic; }

.form-row { display: flex; gap: 16px; flex-wrap: wrap; }
.form-row > .ant-form-item { flex: 1; min-width: 140px; }
.form-row-three { display: flex; gap: 16px; flex-wrap: wrap; }
.form-row-three > .ant-form-item { flex: 1; min-width: 120px; }

.conditional-block {
  background: var(--foam);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid rgba(168,213,186,0.45);
  animation: fadeIn 0.3s ease both;
}

.submit-area { padding: 32px 0 24px; text-align: center; animation: fadeInUp 0.65s ease 0.62s both; opacity: 0; }
.submit-area .ant-btn { max-width: 420px; height: 52px !important; font-size: 13px !important; border-radius: 8px !important; }
.submit-note { font-size: 12px; color: var(--mist); margin: 14px 0 0; }

.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  animation: scaleIn 0.5s ease both;
}
.success-icon { margin-bottom: 24px; animation: fadeIn 0.6s ease 0.3s both; opacity: 0; }
.success-title { font-family: var(--font-display); font-size: 40px; font-weight: 400; color: var(--forest); margin: 0 0 12px; }
.success-desc { font-size: 15px; color: var(--bark); max-width: 440px; line-height: 1.75; margin: 0 0 32px; }

.btn-outline {
  background: none;
  border: 1.5px solid var(--mint);
  color: var(--fern);
  padding: 10px 28px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: all 0.2s;
}
.btn-outline:hover { background: var(--foam); border-color: var(--fern); }

.mobile-menu-wrap { display: none; position: relative; margin-left: auto; }
.kebab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 10px 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}
.kebab-btn:hover { background: rgba(168,213,186,0.15); }
.kebab-dot { display: block; width: 4px; height: 4px; border-radius: 50%; background: rgba(168,213,186,0.85); }

.mobile-admin-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 14px;
  padding: 6px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--foam);
  min-width: 220px;
  z-index: 200;
  animation: fadeInUp 0.18s ease both;
}
.mobile-menu-item {
  display: block;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--charcoal);
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  letter-spacing: 0.01em;
}
.mobile-menu-item:hover { background: var(--foam); color: var(--fern); }

@media (max-width: 900px) {
  .page-root { flex-direction: column; }
  .left-panel { width: 100%; min-width: unset; height: auto; position: relative; padding: 28px 24px; }
  .left-content { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 16px; height: auto; }
  .brand-illustration { display: none; }
  .brand-copy { margin-bottom: 0; }
  .brand-tagline { font-size: 28px; }
  .brand-desc { display: none; }
  .admin-link { display: none; }
  .mobile-menu-wrap { display: block; }
  .right-panel { padding: 32px 24px; }
  .form-main-title { font-size: 30px; }
}
@media (max-width: 600px) {
  .section-card { padding: 24px 18px; }
  .right-panel { padding: 24px 16px; }
}
`;

const { TextArea } = Input;
const { Option } = Select;

function BotanicalIllustration() {
  return (
    <svg viewBox="0 0 280 420" fill="none" className="botanical-svg" aria-hidden="true">
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
  className = "",
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-card ${className}`}>
      <div className="section-header">
        <span className="section-number">{String(number).padStart(2, "0")}</span>
        <h2 className="section-title">{title}</h2>
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
    <>
      <style>{css}</style>
      <div className="page-root">
        {/* ── Left Panel ── */}
        <aside className="left-panel">
          <div className="left-content">
            <div className="brand">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z" fill="rgba(168,213,186,0.55)" />
                <path d="M16 30 C14 22 12 14 14 8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
              </svg>
              <Link href="/" className="brand-name" style={{ textDecoration: "none" }}>
                Nutrivivi
              </Link>
            </div>

            <div className="brand-illustration">
              <BotanicalIllustration />
            </div>

            <div className="brand-copy">
              <h1 className="brand-tagline">
                Nutrição que
                <br />
                <em>transforma</em>
                <br />
                vidas.
              </h1>
              <p className="brand-desc">
                Preencha a anamnese para que sua nutricionista elabore um plano
                alimentar totalmente personalizado para você.
              </p>
            </div>

            <Link href="/login" className="admin-link">
              Área da nutricionista →
            </Link>

            <div className="mobile-menu-wrap" ref={menuRef}>
              <button
                className="kebab-btn"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Abrir menu"
                aria-expanded={menuOpen}
              >
                <span className="kebab-dot" />
                <span className="kebab-dot" />
                <span className="kebab-dot" />
              </button>
              {menuOpen && (
                <div className="mobile-admin-menu" role="menu">
                  <Link href="/login" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                    Entrar como nutricionista
                  </Link>
                  <Link href="/painel/anamneses" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                    Painel administrativo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── Right Panel: Form ── */}
        <main className="right-panel">
          {success ? (
            <div className="success-state">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="#3a7d5a" strokeWidth="2" />
                  <path d="M18 32 L28 42 L46 22" stroke="#3a7d5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="success-title">Anamnese enviada!</h2>
              <p className="success-desc">
                Sua nutricionista já recebeu seus dados e irá analisá-los em
                breve. Aguarde o contato para iniciar sua jornada de saúde.
              </p>
              <button
                className="btn-outline"
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
              <div className="form-header">
                <h1 className="form-main-title">Anamnese Nutricional</h1>
                <p className="form-subtitle">
                  Suas respostas são confidenciais e essenciais para um
                  atendimento verdadeiramente personalizado.
                </p>
                <div className="form-divider" />
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
                <SectionCard number={1} title="Identificação do Paciente" className="anim-1">
                  <Form.Item name="full_name" label="Nome Completo" rules={[{ required: true, message: "Obrigatório" }]}>
                    <Input size="large" placeholder="Seu nome completo" />
                  </Form.Item>
                  <div className="form-row">
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
                <SectionCard number={2} title="Antropometria Inicial" className="anim-2">
                  <div className="form-row">
                    <Form.Item name="weight_kg" label="Peso Atual (kg)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                      <InputNumber size="large" min={1} max={500} step={0.1} style={{ width: "100%" }} placeholder="Ex: 70.5" />
                    </Form.Item>
                    <Form.Item name="height_cm" label="Altura (cm)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                      <InputNumber size="large" min={30} max={300} style={{ width: "100%" }} placeholder="Ex: 170" />
                    </Form.Item>
                  </div>
                </SectionCard>

                {/* 03 */}
                <SectionCard number={3} title="Saúde e Estilo de Vida" className="anim-3">
                  <div className="form-row-three">
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
                        <div className="conditional-block">
                          <div className="form-row">
                            <Form.Item name="activity_modality" label="Modalidade" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                              <Input placeholder="Ex: Musculação, Corrida" />
                            </Form.Item>
                            <Form.Item name="activity_weekly_frequency" label="Frequência Semanal" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                              <InputNumber min={1} max={14} style={{ width: "100%" }} placeholder="Vezes/semana" />
                            </Form.Item>
                          </div>
                          <div className="form-row">
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
                <SectionCard number={4} title="Suplementação Atual" className="anim-4">
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
                <SectionCard number={5} title="Recordatório Alimentar" className="anim-5">
                  <p className="section-note">Descreva o que você costuma comer em cada refeição.</p>
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
                <SectionCard number={6} title="Observações Adicionais" className="anim-6">
                  <Form.Item name="additional_observations" label="Há algo mais que gostaria de compartilhar? (Opcional)">
                    <TextArea rows={4} placeholder="Alergias, intolerâncias, medicamentos, ou qualquer informação relevante..." />
                  </Form.Item>
                </SectionCard>

                <div className="submit-area">
                  <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                    Enviar Anamnese
                  </Button>
                  <p className="submit-note">
                    Seus dados são protegidos e utilizados exclusivamente para fins nutricionais.
                  </p>
                </div>
              </Form>
            </>
          )}
        </main>
      </div>
    </>
  );
}
