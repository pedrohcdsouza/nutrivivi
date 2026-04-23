"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Layout } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      message.success("Login efetuado com sucesso!");
      router.push("/painel/anamneses");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={3} style={{ margin: 0 }}>Nutrivivi</Title>
            <Text type="secondary">Painel Administrativo</Text>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Por favor, insira seu usuário/e-mail!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Usuário ou E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
