"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Typography, Button, Space, message, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getAnamneses } from "@/lib/api/admin";

const { Title } = Typography;

export default function PainelAnamneses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAnamneses();
      // Em DRF ListAPIView sem paginação, ele retorna uma lista direta.
      // Se usar pagination, ele retornaria { count, next, previous, results }.
      // Aqui tratamos se é lista ou objeto paginado:
      setData(response.results || response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Paciente",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Data de Envio",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleString("pt-BR"),
    },
    {
      title: "Idade",
      dataIndex: "age_years",
      key: "age_years",
    },
    {
      title: "IMC",
      dataIndex: "bmi",
      key: "bmi",
    },
    {
      title: "Notificação",
      dataIndex: "notification_status",
      key: "notification_status",
      render: (status: string) => {
        let color = status === "sent" ? "green" : status === "failed" ? "red" : "orange";
        let text = status === "sent" ? "Enviado" : status === "failed" ? "Falha" : "Pendente";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ações",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/painel/anamneses/${record.id}`}>
          <Button type="link" icon={<EyeOutlined />}>
            Ver Detalhes
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Title level={2}>Gerenciar Anamneses</Title>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </Card>
  );
}
