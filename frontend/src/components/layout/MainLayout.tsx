"use client";

import React from "react";
import { Layout, Typography, Space } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          zIndex: 1,
          padding: "0 24px",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Space>
            <HeartOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
            <Title level={4} style={{ margin: 0, color: "#2f54eb" }}>
              Nutrivivi
            </Title>
          </Space>
        </Link>
      </Header>

      <Content style={{ padding: "24px", margin: "0 auto", width: "100%", maxWidth: "1200px", flex: 1 }}>
        <div
          style={{
            background: "#fff",
            minHeight: 280,
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: "center", background: "transparent" }}>
        Nutrivivi ©{new Date().getFullYear()} Desenvolvido para transformar sua saúde.
      </Footer>
    </Layout>
  );
}
