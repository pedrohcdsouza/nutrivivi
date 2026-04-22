"use client";

import { Typography, Button, Space, Card, Row, Col } from "antd";
import { FormOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <Title level={1} style={{ color: "#52c41a" }}>
        Bem-vindo ao Nutrivivi
      </Title>
      
      <Paragraph style={{ fontSize: "18px", color: "#666", maxWidth: "600px", margin: "0 auto 48px" }}>
        Uma plataforma completa para acompanhamento nutricional e melhoria da sua saúde.
        O primeiro passo para o seu plano alimentar é nos fornecer alguns detalhes através
        da nossa anamnese online.
      </Paragraph>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            title="Para Pacientes" 
            bordered={false}
            style={{ borderRadius: '12px' }}
          >
            <Paragraph>
              Envie suas informações preliminares para que possamos montar o melhor plano.
            </Paragraph>
            <Link href="/anamnese">
              <Button type="primary" size="large" icon={<FormOutlined />} block>
                Preencher Anamnese
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            title="Para a Nutricionista" 
            bordered={false}
            style={{ borderRadius: '12px' }}
          >
            <Paragraph>
              Acesso exclusivo para gerenciamento e acompanhamento de anamneses recebidas.
            </Paragraph>
            <Link href="/painel/anamneses">
              <Button size="large" icon={<LoginOutlined />} block>
                Acessar Painel
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
