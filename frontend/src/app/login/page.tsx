"use client";

import { useState } from "react";
import { App, Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";

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
    <div className="login-root">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
                fill="#a8d5ba"
              />
              <path
                d="M16 30 C14 22 12 14 14 8"
                stroke="#2d5a3d"
                strokeWidth="1.5"
              />
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
  );
}
