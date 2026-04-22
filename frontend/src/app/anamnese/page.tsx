"use client";

import { useState } from "react";
import { Form, Input, DatePicker, InputNumber, Select, Switch, Button, Typography, Result, Card, message } from "antd";
import { submitAnamnese } from "@/lib/api/anamneses";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AnamnesePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Format date for backend (YYYY-MM-DD)
      const payload = {
        ...values,
        birth_date: values.birth_date.format("YYYY-MM-DD"),
      };

      await submitAnamnese(payload);
      setSuccess(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Result
        status="success"
        title="Anamnese enviada com sucesso!"
        subTitle="Sua nutricionista já recebeu seus dados e os analisará em breve."
        extra={[
          <Button type="primary" key="home" href="/">
            Voltar para o início
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#52c41a", marginBottom: 32 }}>
        Anamnese Nutricional
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          does_physical_activity: false,
          uses_supplement: false,
          sleep_quality: 3,
          anxiety_level: 3,
          stress_level: 3,
        }}
      >
        <Title level={4}>1. Identificação do Paciente</Title>
        <Form.Item name="full_name" label="Nome Completo" rules={[{ required: true, message: "Obrigatório" }]}>
          <Input size="large" />
        </Form.Item>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Form.Item name="birth_date" label="Data de Nascimento" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
            <DatePicker size="large" style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="profession" label="Profissão" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
            <Input size="large" />
          </Form.Item>
        </div>
        <Form.Item name="consultation_reason" label="Motivo da Consulta" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Title level={4}>2. Antropometria Inicial</Title>
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item name="weight_kg" label="Peso Atual (kg)" rules={[{ required: true, message: "Obrigatório" }]}>
            <InputNumber size="large" min={1} max={500} step={0.1} style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="height_cm" label="Altura (cm)" rules={[{ required: true, message: "Obrigatório" }]}>
            <InputNumber size="large" min={30} max={300} style={{ width: 120 }} />
          </Form.Item>
        </div>

        <Title level={4}>3. Perfil de Saúde e Estilo de Vida</Title>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Form.Item name="sleep_quality" label="Qualidade do Sono (1 a 5)" rules={[{ required: true }]} style={{ flex: 1 }}>
            <Select size="large">
              <Option value={1}>1 - Muito ruim</Option>
              <Option value={2}>2 - Ruim</Option>
              <Option value={3}>3 - Regular</Option>
              <Option value={4}>4 - Boa</Option>
              <Option value={5}>5 - Excelente</Option>
            </Select>
          </Form.Item>
          <Form.Item name="anxiety_level" label="Nível de Ansiedade (1 a 5)" rules={[{ required: true }]} style={{ flex: 1 }}>
            <Select size="large">
              <Option value={1}>1 - Muito baixo</Option>
              <Option value={2}>2 - Baixo</Option>
              <Option value={3}>3 - Moderado</Option>
              <Option value={4}>4 - Alto</Option>
              <Option value={5}>5 - Muito alto</Option>
            </Select>
          </Form.Item>
          <Form.Item name="stress_level" label="Nível de Estresse (1 a 5)" rules={[{ required: true }]} style={{ flex: 1 }}>
            <Select size="large">
              <Option value={1}>1 - Muito baixo</Option>
              <Option value={2}>2 - Baixo</Option>
              <Option value={3}>3 - Moderado</Option>
              <Option value={4}>4 - Alto</Option>
              <Option value={5}>5 - Muito alto</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="does_physical_activity" label="Pratica Atividade Física?" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.does_physical_activity !== currentValues.does_physical_activity}
        >
          {({ getFieldValue }) =>
            getFieldValue("does_physical_activity") ? (
              <div style={{ background: "#fafafa", padding: 16, borderRadius: 8, marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Form.Item name="activity_modality" label="Modalidade" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="activity_weekly_frequency" label="Frequência Semanal (vezes)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <InputNumber min={1} max={14} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Form.Item name="activity_workout_time" label="Horário do Treino" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <Input placeholder="Ex: 18:30" />
                  </Form.Item>
                  <Form.Item name="activity_duration_minutes" label="Duração (minutos)" rules={[{ required: true, message: "Obrigatório" }]} style={{ flex: 1 }}>
                    <InputNumber min={1} max={300} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </div>
            ) : null
          }
        </Form.Item>

        <Title level={4}>4. Suplementação Atual</Title>
        <Form.Item name="uses_supplement" label="Usa Suplemento?" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.uses_supplement !== currentValues.uses_supplement}
        >
          {({ getFieldValue }) =>
            getFieldValue("uses_supplement") ? (
              <Form.Item name="supplements" label="Quais suplementos?" rules={[{ required: true, message: "Obrigatório" }]}>
                <TextArea rows={2} />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Title level={4}>5. Recordatório Alimentar</Title>
        <p style={{ color: "#666", marginBottom: 16 }}>Descreva o que você costuma comer em cada refeição.</p>
        <Form.Item name="recall_breakfast" label="Café da Manhã" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="recall_lunch" label="Almoço" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="recall_snack" label="Lanche" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="recall_dinner" label="Jantar" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="recall_supper_other" label="Ceia/Outros" rules={[{ required: true, message: "Obrigatório" }]}>
          <TextArea rows={2} />
        </Form.Item>

        <Title level={4}>6. Observações adicionais</Title>
        <Form.Item name="additional_observations" label="Deseja adicionar mais alguma informação? (Opcional)">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ height: 48, fontSize: 18 }}>
            Enviar Anamnese
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
