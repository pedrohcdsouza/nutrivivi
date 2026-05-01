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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-forest via-evergreen to-[#243e30] p-6 overflow-hidden">
      {/* decorative circles */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(168,213,186,0.08)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,213,186,0.06)_0%,transparent_65%)]" />

      <div className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl px-12 py-[52px] shadow-[0_32px_80px_rgba(0,0,0,0.28)] animate-scaleIn max-sm:px-6 max-sm:py-10">
        {/* brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
                fill="#a8d5ba"
              />
              <path d="M16 30 C14 22 12 14 14 8" stroke="#2d5a3d" strokeWidth="1.5" />
            </svg>
            <span className="font-display text-[30px] font-medium text-forest tracking-wide">
              Nutrivivi
            </span>
          </div>
          <p className="text-[11px] text-mist tracking-[0.08em] uppercase font-semibold">
            Painel Administrativo
          </p>
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

        <Link
          href="/"
          className="block text-center mt-5 text-[12px] text-mist no-underline tracking-[0.04em] transition-colors hover:text-bark"
        >
          ← Voltar para o formulário
        </Link>
      </div>
    </div>
  );
}
