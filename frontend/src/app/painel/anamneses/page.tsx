"use client";

import { useEffect, useState } from "react";
import { App, Table, Input, Button } from "antd";
import Link from "next/link";
import { getAnamneses } from "@/lib/api/admin";
import AdminLayout from "@/components/layout/AdminLayout";

const { Search } = Input;

const STATUS_MAP: Record<string, { className: string; label: string }> = {
  sent: {
    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase bg-[#e8f5ee] text-[#2d6a4f]",
    label: "Enviado",
  },
  failed: {
    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase bg-[#fde8e8] text-[#9b3a3a]",
    label: "Falha",
  },
  pending: {
    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase bg-[#fef3e2] text-[#92610a]",
    label: "Pendente",
  },
};

export default function PainelAnamneses() {
  const { message } = App.useApp();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [total, setTotal] = useState<number | null>(null);

  const fetchData = async (search: string = "") => {
    setLoading(true);
    try {
      const response = await getAnamneses(search);
      if (response.results) {
        setData(response.results);
        setTotal(response.count ?? response.results.length);
      } else {
        setData(response);
        setTotal(response.length);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchText);
  }, [searchText]);

  const columns = [
    {
      title: "Paciente",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => (
        <span className="font-semibold text-forest text-sm">{text}</span>
      ),
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
        const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
        return <span className={s.className}>{s.label}</span>;
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
              color: "var(--color-fern)",
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
      <div className="mb-8">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="font-display text-[38px] font-normal text-forest tracking-[-0.015em] m-0 leading-tight">
              Anamneses
            </h1>
            <p className="text-[13px] text-bark mt-1.5 m-0">
              {total !== null
                ? `${total} ${total === 1 ? "registro" : "registros"} encontrados`
                : "Gerencie os questionários recebidos"}
            </p>
          </div>
          <Search
            placeholder="Buscar por nome do paciente..."
            allowClear
            onSearch={setSearchText}
            onChange={(e) => {
              if (!e.target.value) setSearchText("");
            }}
            style={{ width: 280 }}
            size="large"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-foam overflow-hidden shadow-sm">
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
          scroll={{ x: 800 }}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>
    </AdminLayout>
  );
}
