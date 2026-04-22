"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Typography, Button, Space, message, Card, Input } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getAnamneses } from "@/lib/api/admin";

const { Title } = Typography;
const { Search } = Input;

export default function PainelAnamneses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData(searchText);
  }, [searchText]);

  const fetchData = async (search: string = "") => {
    setLoading(true);
    try {
      const response = await getAnamneses(search);
      setData(response.results || response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={2} style={{ margin: 0 }}>Gerenciar Anamneses</Title>
          <Search
            placeholder="Buscar paciente por nome..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </div>
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
