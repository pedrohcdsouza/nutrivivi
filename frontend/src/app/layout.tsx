import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutrivivi – Nutrição Personalizada",
  description: "Plataforma de anamnese nutricional",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <ConfigProvider
            locale={ptBR}
            theme={{
              token: {
                colorPrimary: "#3a7d5a",
                colorLink: "#3a7d5a",
                colorSuccess: "#52a678",
                borderRadius: 8,
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                colorBgContainer: "#ffffff",
                colorBorder: "#a8d5ba",
                colorText: "#1a2319",
                colorTextSecondary: "#4a6357",
                colorBorderSecondary: "#d1ead9",
              },
              components: {
                Button: {
                  borderRadius: 8,
                  controlHeight: 44,
                  paddingContentHorizontal: 28,
                },
                Input: { borderRadius: 8 },
                Select: { borderRadius: 8 },
                DatePicker: { borderRadius: 8 },
                InputNumber: { borderRadius: 8 },
                Table: {
                  headerBg: "#f0ece3",
                  headerColor: "#1b3a2d",
                  rowHoverBg: "#f5faf7",
                },
              },
            }}
          >
            <App>
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
