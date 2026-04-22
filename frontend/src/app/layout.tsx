import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutrivivi - Atendimento Nutricional",
  description: "Plataforma de anamnese para sua nutricionista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            locale={ptBR}
            theme={{
              token: {
                colorPrimary: "#52c41a", // Verde claro predominante
                colorInfo: "#52c41a",
                borderRadius: 6,
                fontFamily: inter.style.fontFamily,
              },
              components: {
                Layout: {
                  headerBg: "#fff",
                  headerColor: "#333",
                  footerBg: "#f0f2f5",
                },
              },
            }}
          >
            <MainLayout>{children}</MainLayout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
