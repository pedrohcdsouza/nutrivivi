"use client";

import { useState, useRef, useEffect } from "react";
import {
  App,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
} from "antd";
import { submitAnamnese } from "@/lib/api/anamneses";
import Link from "next/link";

const { TextArea } = Input;
const { Option } = Select;

function BotanicalIllustration() {
  return (
    <svg
      viewBox="0 0 280 420"
      fill="none"
      className="botanical-svg"
      aria-hidden="true"
    >
      <path
        d="M140 410 C140 410 138 310 142 210 C146 130 140 70 140 48"
        stroke="rgba(168,213,186,0.35)"
        strokeWidth="1.5"
      />
      <path
        d="M140 230 C98 210 58 178 48 136 C38 92 76 80 108 100 C128 114 138 190 140 230Z"
        fill="rgba(168,213,186,0.12)"
        stroke="rgba(168,213,186,0.30)"
        strokeWidth="1.5"
      />
      <path
        d="M140 230 C118 198 80 158 56 136"
        stroke="rgba(168,213,186,0.20)"
        strokeWidth="1"
      />
      <path
        d="M140 290 C188 262 234 224 242 178 C250 130 210 118 180 140 C160 158 143 248 140 290Z"
        fill="rgba(168,213,186,0.10)"
        stroke="rgba(168,213,186,0.25)"
        strokeWidth="1.5"
      />
      <path
        d="M140 290 C168 256 214 218 242 178"
        stroke="rgba(168,213,186,0.16)"
        strokeWidth="1"
      />
      <path
        d="M140 168 C112 150 84 122 82 96 C80 72 106 66 126 82 C137 94 140 148 140 168Z"
        fill="rgba(168,213,186,0.08)"
        stroke="rgba(168,213,186,0.22)"
        strokeWidth="1"
      />
      <path
        d="M140 138 C164 118 192 94 196 68 C200 44 172 38 155 56 C145 70 140 120 140 138Z"
        fill="rgba(168,213,186,0.08)"
        stroke="rgba(168,213,186,0.22)"
        strokeWidth="1"
      />
      <path
        d="M140 348 C106 326 70 298 68 264 C66 228 98 222 124 242 C136 255 140 320 140 348Z"
        fill="rgba(168,213,186,0.07)"
        stroke="rgba(168,213,186,0.18)"
        strokeWidth="1"
      />
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
        <span className="section-number">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function HomePage() {
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
      const payload = {
        ...values,
      };
      await submitAnamnese(payload);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      {/* ── Left Panel ── */}
      <aside className="left-panel">
        <div className="left-content">
          <div className="brand">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
                fill="rgba(168,213,186,0.55)"
              />
              <path
                d="M16 30 C14 22 12 14 14 8"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
              />
            </svg>
            <span className="brand-name">Nutrivivi</span>
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

          {/* Kebab menu — visível apenas no mobile */}
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
                <Link
                  href="/login"
                  className="mobile-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar como nutricionista
                </Link>
                <Link
                  href="/painel/anamneses"
                  className="mobile-menu-item"
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
      <main className="right-panel">
        {success ? (
          <div className="success-state">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="#3a7d5a"
                  strokeWidth="2"
                />
                <path
                  d="M18 32 L28 42 L46 22"
                  stroke="#3a7d5a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <SectionCard
                number={1}
                title="Identificação do Paciente"
                className="anim-1"
              >
                <Form.Item
                  name="full_name"
                  label="Nome Completo"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <Input size="large" placeholder="Seu nome completo" />
                </Form.Item>
                <div className="form-row">
                  <Form.Item
                    name="age_years"
                    label="Idade"
                    rules={[{ required: true, message: "Obrigatório" }]}
                    style={{ flex: 1 }}
                  >
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="Sua idade"
                    />
                  </Form.Item>
                  <Form.Item
                    name="profession"
                    label="Profissão"
                    rules={[{ required: true, message: "Obrigatório" }]}
                    style={{ flex: 1 }}
                  >
                    <Input size="large" placeholder="Sua profissão" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="consultation_reason"
                  label="Motivo da Consulta"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Por que você busca uma consulta nutricional?"
                  />
                </Form.Item>
              </SectionCard>

              {/* 02 */}
              <SectionCard
                number={2}
                title="Antropometria Inicial"
                className="anim-2"
              >
                <div className="form-row">
                  <Form.Item
                    name="weight_kg"
                    label="Peso Atual (kg)"
                    rules={[{ required: true, message: "Obrigatório" }]}
                    style={{ flex: 1 }}
                  >
                    <InputNumber
                      size="large"
                      min={1}
                      max={500}
                      step={0.1}
                      style={{ width: "100%" }}
                      placeholder="Ex: 70.5"
                    />
                  </Form.Item>
                  <Form.Item
                    name="height_cm"
                    label="Altura (cm)"
                    rules={[{ required: true, message: "Obrigatório" }]}
                    style={{ flex: 1 }}
                  >
                    <InputNumber
                      size="large"
                      min={30}
                      max={300}
                      style={{ width: "100%" }}
                      placeholder="Ex: 170"
                    />
                  </Form.Item>
                </div>
              </SectionCard>

              {/* 03 */}
              <SectionCard
                number={3}
                title="Saúde e Estilo de Vida"
                className="anim-3"
              >
                <div className="form-row-three">
                  <Form.Item
                    name="sleep_quality"
                    label="Qualidade do Sono"
                    rules={[{ required: true }]}
                  >
                    <Select size="large">
                      <Option value={1}>1 — Muito ruim</Option>
                      <Option value={2}>2 — Ruim</Option>
                      <Option value={3}>3 — Regular</Option>
                      <Option value={4}>4 — Boa</Option>
                      <Option value={5}>5 — Excelente</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="anxiety_level"
                    label="Nível de Ansiedade"
                    rules={[{ required: true }]}
                  >
                    <Select size="large">
                      <Option value={1}>1 — Muito baixo</Option>
                      <Option value={2}>2 — Baixo</Option>
                      <Option value={3}>3 — Moderado</Option>
                      <Option value={4}>4 — Alto</Option>
                      <Option value={5}>5 — Muito alto</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="stress_level"
                    label="Nível de Estresse"
                    rules={[{ required: true }]}
                  >
                    <Select size="large">
                      <Option value={1}>1 — Muito baixo</Option>
                      <Option value={2}>2 — Baixo</Option>
                      <Option value={3}>3 — Moderado</Option>
                      <Option value={4}>4 — Alto</Option>
                      <Option value={5}>5 — Muito alto</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  name="does_physical_activity"
                  label="Pratica Atividade Física?"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prev, curr) =>
                    prev.does_physical_activity !== curr.does_physical_activity
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("does_physical_activity") ? (
                      <div className="conditional-block">
                        <div className="form-row">
                          <Form.Item
                            name="activity_modality"
                            label="Modalidade"
                            rules={[{ required: true, message: "Obrigatório" }]}
                            style={{ flex: 1 }}
                          >
                            <Input placeholder="Ex: Musculação, Corrida" />
                          </Form.Item>
                          <Form.Item
                            name="activity_weekly_frequency"
                            label="Frequência Semanal"
                            rules={[{ required: true, message: "Obrigatório" }]}
                            style={{ flex: 1 }}
                          >
                            <InputNumber
                              min={1}
                              max={14}
                              style={{ width: "100%" }}
                              placeholder="Vezes/semana"
                            />
                          </Form.Item>
                        </div>
                        <div className="form-row">
                          <Form.Item
                            name="activity_workout_time"
                            label="Horário do Treino"
                            rules={[{ required: true, message: "Obrigatório" }]}
                            style={{ flex: 1 }}
                          >
                            <Input placeholder="Ex: 18:30" />
                          </Form.Item>
                          <Form.Item
                            name="activity_duration_minutes"
                            label="Duração (minutos)"
                            rules={[{ required: true, message: "Obrigatório" }]}
                            style={{ flex: 1 }}
                          >
                            <InputNumber
                              min={1}
                              max={300}
                              style={{ width: "100%" }}
                              placeholder="Ex: 60"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    ) : null
                  }
                </Form.Item>
              </SectionCard>

              {/* 04 */}
              <SectionCard
                number={4}
                title="Suplementação Atual"
                className="anim-4"
              >
                <Form.Item
                  name="uses_supplement"
                  label="Utiliza Algum Suplemento?"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prev, curr) =>
                    prev.uses_supplement !== curr.uses_supplement
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("uses_supplement") ? (
                      <Form.Item
                        name="supplements"
                        label="Quais suplementos?"
                        rules={[{ required: true, message: "Obrigatório" }]}
                      >
                        <TextArea
                          rows={3}
                          placeholder="Liste os suplementos que você utiliza"
                        />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </SectionCard>

              {/* 05 */}
              <SectionCard
                number={5}
                title="Recordatório Alimentar"
                className="anim-5"
              >
                <p className="section-note">
                  Descreva o que você costuma comer em cada refeição.
                </p>
                <Form.Item
                  name="recall_breakfast"
                  label="Café da Manhã"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea
                    rows={2}
                    placeholder="O que você costuma comer no café da manhã?"
                  />
                </Form.Item>
                <Form.Item
                  name="recall_lunch"
                  label="Almoço"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea
                    rows={2}
                    placeholder="O que você costuma almoçar?"
                  />
                </Form.Item>
                <Form.Item
                  name="recall_snack"
                  label="Lanche"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea rows={2} placeholder="Lanche da tarde ou outros?" />
                </Form.Item>
                <Form.Item
                  name="recall_dinner"
                  label="Jantar"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea rows={2} placeholder="O que você costuma jantar?" />
                </Form.Item>
                <Form.Item
                  name="recall_supper_other"
                  label="Ceia / Outros"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
                  <TextArea rows={2} placeholder="Ceia ou outras refeições?" />
                </Form.Item>
              </SectionCard>

              {/* 06 */}
              <SectionCard
                number={6}
                title="Observações Adicionais"
                className="anim-6"
              >
                <Form.Item
                  name="additional_observations"
                  label="Há algo mais que gostaria de compartilhar? (Opcional)"
                >
                  <TextArea
                    rows={4}
                    placeholder="Alergias, intolerâncias, medicamentos, ou qualquer informação relevante..."
                  />
                </Form.Item>
              </SectionCard>

              <div className="submit-area">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                >
                  Enviar Anamnese
                </Button>
                <p className="submit-note">
                  Seus dados são protegidos e utilizados exclusivamente para
                  fins nutricionais.
                </p>
              </div>
            </Form>
          </>
        )}
      </main>
    </div>
  );
}
