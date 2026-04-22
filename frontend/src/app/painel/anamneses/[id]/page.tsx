"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Descriptions, Spin, Tag, Typography, Button, Space, Divider, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getAnamneseById } from "@/lib/api/admin";

const { Title, Text } = Typography;

export default function AnamneseDetalhe() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchData(id as string);
    }
  }, [id]);

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const result = await getAnamneseById(id);
      setData(result);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <Card>Anamnese não encontrada.</Card>;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2} style={{ margin: 0 }}>Detalhes da Anamnese</Title>
        <Link href="/painel/anamneses">
          <Button icon={<ArrowLeftOutlined />}>Voltar para Lista</Button>
        </Link>
      </div>

      <Card bordered={false}>
        <Descriptions title="Informações Gerais" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Nome Completo">{data.full_name}</Descriptions.Item>
          <Descriptions.Item label="Data de Nascimento">{new Date(data.birth_date).toLocaleDateString('pt-BR')}</Descriptions.Item>
          <Descriptions.Item label="Idade">{data.age_years} anos</Descriptions.Item>
          <Descriptions.Item label="Profissão">{data.profession}</Descriptions.Item>
          <Descriptions.Item label="Motivo da Consulta" span={2}>{data.consultation_reason}</Descriptions.Item>
          <Descriptions.Item label="Data de Envio do Formulário">{new Date(data.created_at).toLocaleString('pt-BR')}</Descriptions.Item>
          <Descriptions.Item label="Status da Notificação (Email)">
            <Tag color={data.notification_status === 'sent' ? 'green' : data.notification_status === 'failed' ? 'red' : 'orange'}>
              {data.notification_status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Antropometria Inicial" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Peso Atual">{data.weight_kg} kg</Descriptions.Item>
          <Descriptions.Item label="Altura">{data.height_cm} cm</Descriptions.Item>
          <Descriptions.Item label="IMC">{data.bmi}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Perfil de Saúde e Estilo de Vida" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Qualidade do Sono">{data.sleep_quality}/5</Descriptions.Item>
          <Descriptions.Item label="Nível de Ansiedade">{data.anxiety_level}/5</Descriptions.Item>
          <Descriptions.Item label="Nível de Estresse">{data.stress_level}/5</Descriptions.Item>
          <Descriptions.Item label="Pratica Atividade Física?" span={3}>
            <Tag color={data.does_physical_activity ? 'blue' : 'default'}>
              {data.does_physical_activity ? 'Sim' : 'Não'}
            </Tag>
          </Descriptions.Item>
          {data.does_physical_activity && (
            <>
              <Descriptions.Item label="Modalidade">{data.activity_modality}</Descriptions.Item>
              <Descriptions.Item label="Frequência Semanal">{data.activity_weekly_frequency}x</Descriptions.Item>
              <Descriptions.Item label="Duração">{data.activity_duration_minutes} min</Descriptions.Item>
              <Descriptions.Item label="Horário">{data.activity_workout_time}</Descriptions.Item>
            </>
          )}
        </Descriptions>

        <Divider />

        <Descriptions title="Suplementação Atual" bordered column={1}>
          <Descriptions.Item label="Usa Suplemento?">
            <Tag color={data.uses_supplement ? 'blue' : 'default'}>
              {data.uses_supplement ? 'Sim' : 'Não'}
            </Tag>
          </Descriptions.Item>
          {data.uses_supplement && (
            <Descriptions.Item label="Quais suplementos">{data.supplements}</Descriptions.Item>
          )}
        </Descriptions>

        <Divider />

        <Descriptions title="Recordatório Alimentar" bordered column={1}>
          <Descriptions.Item label="Café da Manhã"><Text style={{ whiteSpace: "pre-wrap" }}>{data.recall_breakfast}</Text></Descriptions.Item>
          <Descriptions.Item label="Almoço"><Text style={{ whiteSpace: "pre-wrap" }}>{data.recall_lunch}</Text></Descriptions.Item>
          <Descriptions.Item label="Lanche"><Text style={{ whiteSpace: "pre-wrap" }}>{data.recall_snack}</Text></Descriptions.Item>
          <Descriptions.Item label="Jantar"><Text style={{ whiteSpace: "pre-wrap" }}>{data.recall_dinner}</Text></Descriptions.Item>
          <Descriptions.Item label="Ceia/Outros"><Text style={{ whiteSpace: "pre-wrap" }}>{data.recall_supper_other}</Text></Descriptions.Item>
        </Descriptions>

        {data.additional_observations && (
          <>
            <Divider />
            <Descriptions title="Observações Adicionais" bordered column={1}>
              <Descriptions.Item label="Observações">
                <Text style={{ whiteSpace: "pre-wrap" }}>{data.additional_observations}</Text>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Card>
    </Space>
  );
}
