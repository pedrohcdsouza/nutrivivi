"use client";

import { useState } from "react";
import { App, Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";

const css = `
.login-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--forest) 0%, var(--evergreen) 50%, #243e30 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.login-root::before {
  content: "";
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,213,186,0.08) 0%, transparent 65%);
  top: -160px;
  right: -160px;
  pointer-events: none;
}
.login-root::after {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,213,186,0.06) 0%, transparent 65%);
  bottom: -80px;
  left: -80px;
  pointer-events: none;
}
.login-card {
  background: white;
  border-radius: 24px;
  padding: 52px 48px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.28);
  position: relative;
  z-index: 1;
  animation: scaleIn 0.5s ease both;
}
.login-brand {
  text-align: center;
  margin-bottom: 40px;
}
.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.login-logo-name {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 500;
  color: var(--forest);
  letter-spacing: 0.02em;
}
.login-subtitle-text {
  font-size: 11px;
  color: var(--mist);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
}
.login-back {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: var(--mist);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.login-back:hover { color: var(--bark); }
@media (max-width: 600px) {
  .login-card { padding: 40px 24px; }
}
`;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      router.push("/painel/anamneses");
    } catch (error: any) {
      message.error(error.message || "Usuário ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="login-root">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
                  fill="#a8d5ba"
                />
                <path d="M16 30 C14 22 12 14 14 8" stroke="#2d5a3d" strokeWidth="1.5" />
              </svg>
              <span className="login-logo-name">Nutrivivi</span>
            </div>
            <p className="login-subtitle-text">Painel Administrativo</p>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              label="Usuário"
              rules={[{ required: true, message: "Por favor, insira seu usuário" }]}
            >
              <Input placeholder="Usuário ou e-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: true, message: "Por favor, insira sua senha" }]}
            >
              <Input.Password placeholder="Sua senha" />
            </Form.Item>

            <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <Link href="/" className="login-back">
            ← Voltar para o formulário
          </Link>
        </div>
      </div>
    </>
  );
}
