"use client";

import { useEffect, useState } from "react";
import { Table, Input, Button, message } from "antd";
import Link from "next/link";
import { getAnamneses } from "@/lib/api/admin";
import AdminLayout from "@/components/layout/AdminLayout";

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

  const columns = [
    {
      title: "Paciente",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => <span className="patient-name">{text}</span>,
    },
    {
      title: "Enviado em",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        new Date(date).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Idade",
      dataIndex: "age_years",
      key: "age_years",
      render: (v: number) => `${v} anos`,
      width: 100,
    },
    {
      title: "IMC",
      dataIndex: "bmi",
      key: "bmi",
      width: 90,
    },
    {
      title: "Notificação",
      dataIndex: "notification_status",
      key: "notification_status",
      render: (status: string) => {
        const map: Record<string, { cls: string; label: string }> = {
          sent: { cls: "status-badge status-sent", label: "Enviado" },
          failed: { cls: "status-badge status-failed", label: "Falha" },
          pending: { cls: "status-badge status-pending", label: "Pendente" },
        };
        const s = map[status] ?? { cls: "status-badge status-pending", label: status };
        return <span className={s.cls}>{s.label}</span>;
      },
      width: 130,
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/painel/anamneses/${record.id}`}>
          <Button
            type="link"
            size="small"
            style={{
              color: "var(--fern)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.04em",
              padding: 0,
            }}
          >
            Ver detalhes →
          </Button>
        </Link>
      ),
      width: 130,
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1 className="admin-page-title">Anamneses</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--bark)" }}>
              Gerencie os questionários recebidos
            </p>
          </div>
          <Search
            placeholder="Buscar por nome do paciente..."
            allowClear
            onSearch={setSearchText}
            onChange={(e) => { if (!e.target.value) setSearchText(""); }}
            style={{ width: 280 }}
            size="large"
          />
        </div>
      </div>

      <div className="admin-table-wrap">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 12,
            showSizeChanger: false,
            style: { padding: "12px 24px" },
          }}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>
    </AdminLayout>
  );
}
