"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spin, Button, message } from "antd";
import Link from "next/link";
import { getAnamneseById } from "@/lib/api/admin";
import AdminLayout from "@/components/layout/AdminLayout";

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="detail-item">
      <p className="detail-item-label">{label}</p>
      <p className="detail-item-value">{value}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="detail-card">
      <p className="detail-section-label">{title}</p>
      {children}
    </div>
  );
}

export default function AnamneseDetalhe() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData(id as string);
  }, [id]);

  const fetchData = async (anamnesesId: string) => {
    setLoading(true);
    try {
      const result = await getAnamneseById(anamnesesId);
      setData(result);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusMap: Record<string, { cls: string; label: string }> = {
    sent: { cls: "status-badge status-sent", label: "Enviado" },
    failed: { cls: "status-badge status-failed", label: "Falha" },
    pending: { cls: "status-badge status-pending", label: "Pendente" },
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <p style={{ color: "var(--bark)" }}>Anamnese não encontrada.</p>
      </AdminLayout>
    );
  }

  const notifStatus = statusMap[data.notification_status] ?? {
    cls: "status-badge status-pending",
    label: data.notification_status,
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="detail-header">
        <div>
          <p className="detail-patient-name">{data.full_name}</p>
          <p className="detail-meta">
            Enviado em{" "}
            {new Date(data.created_at).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Link href="/painel/anamneses">
          <Button
            style={{
              borderColor: "var(--mint)",
              color: "var(--bark)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ← Voltar
          </Button>
        </Link>
      </div>

      {/* Informações Gerais */}
      <SectionCard title="Informações Gerais">
        <div className="detail-grid">
          <InfoItem label="Nome Completo" value={data.full_name} />
          <InfoItem
            label="Data de Nascimento"
            value={new Date(data.birth_date).toLocaleDateString("pt-BR")}
          />
          <InfoItem label="Idade" value={`${data.age_years} anos`} />
          <InfoItem label="Profissão" value={data.profession} />
          <InfoItem
            label="Notificação"
            value={<span className={notifStatus.cls}>{notifStatus.label}</span>}
          />
          <div className="detail-item detail-grid-wide">
            <p className="detail-item-label">Motivo da Consulta</p>
            <p className="detail-item-value">{data.consultation_reason}</p>
          </div>
        </div>
      </SectionCard>

      {/* Antropometria */}
      <SectionCard title="Antropometria Inicial">
        <div className="detail-grid">
          <InfoItem label="Peso Atual" value={`${data.weight_kg} kg`} />
          <InfoItem label="Altura" value={`${data.height_cm} cm`} />
          <InfoItem label="IMC" value={data.bmi} />
        </div>
      </SectionCard>

      {/* Saúde */}
      <SectionCard title="Saúde e Estilo de Vida">
        <div className="detail-grid">
          <InfoItem label="Qualidade do Sono" value={`${data.sleep_quality} / 5`} />
          <InfoItem label="Nível de Ansiedade" value={`${data.anxiety_level} / 5`} />
          <InfoItem label="Nível de Estresse" value={`${data.stress_level} / 5`} />
          <InfoItem
            label="Atividade Física"
            value={
              <span className={`status-badge ${data.does_physical_activity ? "status-sent" : "status-pending"}`}>
                {data.does_physical_activity ? "Sim" : "Não"}
              </span>
            }
          />
          {data.does_physical_activity && (
            <>
              <InfoItem label="Modalidade" value={data.activity_modality} />
              <InfoItem label="Frequência Semanal" value={`${data.activity_weekly_frequency}×/semana`} />
              <InfoItem label="Duração" value={`${data.activity_duration_minutes} min`} />
              <InfoItem label="Horário" value={data.activity_workout_time} />
            </>
          )}
        </div>
      </SectionCard>

      {/* Suplementação */}
      <SectionCard title="Suplementação Atual">
        <div className="detail-grid">
          <InfoItem
            label="Usa Suplemento"
            value={
              <span className={`status-badge ${data.uses_supplement ? "status-sent" : "status-pending"}`}>
                {data.uses_supplement ? "Sim" : "Não"}
              </span>
            }
          />
          {data.uses_supplement && (
            <div className="detail-item detail-grid-wide">
              <p className="detail-item-label">Suplementos</p>
              <p className="detail-item-value">{data.supplements}</p>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Recordatório */}
      <SectionCard title="Recordatório Alimentar">
        <div className="detail-food-grid">
          {[
            { meal: "Café da Manhã", key: "recall_breakfast" },
            { meal: "Almoço", key: "recall_lunch" },
            { meal: "Lanche", key: "recall_snack" },
            { meal: "Jantar", key: "recall_dinner" },
            { meal: "Ceia / Outros", key: "recall_supper_other" },
          ].map(({ meal, key }) => (
            <div key={key} className="detail-food-item">
              <p className="detail-food-meal">{meal}</p>
              <p className="detail-food-text">{data[key]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Observações */}
      {data.additional_observations && (
        <SectionCard title="Observações Adicionais">
          <div className="detail-obs-block">{data.additional_observations}</div>
        </SectionCard>
      )}
    </AdminLayout>
  );
}
