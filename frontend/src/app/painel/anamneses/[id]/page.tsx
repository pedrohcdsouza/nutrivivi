"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { App, Spin, Button } from "antd";
import Link from "next/link";
import { getAnamneseById } from "@/lib/api/admin";
import AdminLayout from "@/components/layout/AdminLayout";

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

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-mist mb-1">{label}</p>
      <p className="text-[15px] text-charcoal font-medium leading-relaxed m-0">{value}</p>
    </div>
  );
}

function ScoreBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-mist">{label}</span>
        <span className="text-[13px] font-semibold text-charcoal">{value}/{max}</span>
      </div>
      <div className="h-1 bg-foam rounded-sm overflow-hidden">
        <div
          className="h-full rounded-sm transition-[width] duration-500 ease-out"
          style={{
            width: `${(value / max) * 100}%`,
            background: "linear-gradient(90deg, #52a678, #3a7d5a)",
          }}
        />
      </div>
    </div>
  );
}

function SectionCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-foam px-8 py-7 mb-4 shadow-sm max-sm:px-4 max-sm:py-5">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-foam">
        <span className="font-display text-[12px] font-semibold text-sage tracking-[0.08em] bg-foam px-2.5 py-1 rounded-full min-w-[44px] text-center shrink-0">
          {String(number).padStart(2, "0")}
        </span>
        <p className="font-display text-lg font-medium text-forest m-0 tracking-[-0.01em]">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function AnamneseDetalhe() {
  const { message } = App.useApp();
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (id) fetchData(id as string);
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center pt-20">
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <p className="text-bark">Anamnese não encontrada.</p>
      </AdminLayout>
    );
  }

  const notifStatus = STATUS_MAP[data.notification_status] ?? STATUS_MAP.pending;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-display text-[38px] font-normal text-forest m-0 mb-1 tracking-[-0.02em] leading-tight">
            {data.full_name}
          </p>
          <div className="w-14 h-[3px] rounded-sm bg-gradient-to-r from-fern to-mint" />
          <p className="text-[13px] text-bark mt-2.5 m-0">
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
              borderColor: "var(--color-mint)",
              color: "var(--color-bark)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ← Voltar
          </Button>
        </Link>
      </div>

      {/* 01 Informações Gerais */}
      <SectionCard number={1} title="Informações Gerais">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 max-sm:grid-cols-1">
          <InfoItem label="Nome Completo" value={data.full_name} />
          <InfoItem label="Idade" value={`${data.age_years} anos`} />
          <InfoItem label="Profissão" value={data.profession} />
          <InfoItem
            label="Notificação"
            value={<span className={notifStatus.className}>{notifStatus.label}</span>}
          />
          <div className="col-span-full">
            <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-mist mb-1">Motivo da Consulta</p>
            <p className="text-[15px] text-charcoal font-medium leading-relaxed m-0">{data.consultation_reason}</p>
          </div>
        </div>
      </SectionCard>

      {/* 02 Antropometria */}
      <SectionCard number={2} title="Antropometria Inicial">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          <InfoItem label="Peso Atual" value={`${data.weight_kg} kg`} />
          <InfoItem label="Altura" value={`${data.height_cm} cm`} />
          <InfoItem label="IMC" value={data.bmi} />
        </div>
      </SectionCard>

      {/* 03 Saúde e Estilo de Vida */}
      <SectionCard number={3} title="Saúde e Estilo de Vida">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          <ScoreBar label="Qualidade do Sono" value={data.sleep_quality} />
          <ScoreBar label="Nível de Ansiedade" value={data.anxiety_level} />
          <ScoreBar label="Nível de Estresse" value={data.stress_level} />
          <InfoItem
            label="Atividade Física"
            value={
              <span className={data.does_physical_activity ? STATUS_MAP.sent.className : STATUS_MAP.pending.className}>
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

      {/* 04 Suplementação */}
      <SectionCard number={4} title="Suplementação Atual">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          <InfoItem
            label="Usa Suplemento"
            value={
              <span className={data.uses_supplement ? STATUS_MAP.sent.className : STATUS_MAP.pending.className}>
                {data.uses_supplement ? "Sim" : "Não"}
              </span>
            }
          />
          {data.uses_supplement && (
            <div className="col-span-full">
              <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-mist mb-1">Suplementos</p>
              <p className="text-[15px] text-charcoal font-medium leading-relaxed m-0">{data.supplements}</p>
            </div>
          )}
        </div>
      </SectionCard>

      {/* 05 Recordatório */}
      <SectionCard number={5} title="Recordatório Alimentar">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5 max-sm:grid-cols-1">
          {[
            { meal: "Café da Manhã", key: "recall_breakfast" },
            { meal: "Almoço", key: "recall_lunch" },
            { meal: "Lanche", key: "recall_snack" },
            { meal: "Jantar", key: "recall_dinner" },
            { meal: "Ceia / Outros", key: "recall_supper_other" },
          ].map(({ meal, key }) => (
            <div key={key} className="bg-foam rounded-xl p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-sage mb-1.5 m-0">{meal}</p>
              <p className="text-sm text-charcoal leading-[1.55] whitespace-pre-wrap m-0">{data[key]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 06 Observações */}
      {data.additional_observations && (
        <SectionCard number={6} title="Observações Adicionais">
          <div className="bg-foam rounded-xl p-5 text-sm text-charcoal leading-[1.7] whitespace-pre-wrap">
            {data.additional_observations}
          </div>
        </SectionCard>
      )}
    </AdminLayout>
  );
}
