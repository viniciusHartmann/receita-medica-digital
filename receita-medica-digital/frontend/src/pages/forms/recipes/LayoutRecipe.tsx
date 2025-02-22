import React, { useState } from 'react';
import { Table, Button, Modal, Form, FloatButton } from 'antd';
import { QrcodeOutlined, PlusOutlined } from '@ant-design/icons';
import RecipeForm from './recipeform';
interface Receita {
  id: number;
  tutor: string;
  paciente: string;
  tipopaciente: string;
}

export const NewRecipe: React.FC = () => {
  // Estado para armazenar receitas
  const [receitas, setReceitas] = useState<Receita[]>([
    { id: 1, tutor: 'Vinicius', paciente: 'João Silva', tipopaciente: 'Cachorro' },
    { id: 2, tutor: 'Ana', paciente: 'Maria Oliveira', tipopaciente: 'Gato' },
    { id: 3, tutor: 'Mirian', paciente: 'Carlos Souza', tipopaciente: 'Capivara' },
  ]);

  // Estado para abrir/fechar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para o formulário
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1"); // Aba ativa

  // Função para excluir uma receita
  const handleDelete = (id: number) => {
    setReceitas((prevReceitas) => prevReceitas.filter((receita) => receita.id !== id));
  };

  // Função para editar uma receita (apenas um alerta como exemplo)
  const handleEdit = (id: number) => {
    alert(`Editar receita #${id}`);
  };

  // Função para exibir o QR Code
  const handleDisplay = (id: number) => {
    alert(`Gerando QRCode #${id}`);
  };

  // Função para abrir o modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Limpar o formulário ao fechar
  };

  // Função para salvar a nova receita
  const handleSave = async () => {
    try {
      // Lista manualmente TODOS os campos obrigatórios
      await form.validateFields(["tutor", "paciente", "tipopaciente", "medicamento", "dosagem"]);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      const errorFields = error?.errorFields?.map((err: any) => err.name[0]);

      // Se houver erro na aba "Medicamentos", mudamos para ela
      if (errorFields.includes("medicamento") || errorFields.includes("dosagem")) {
        setActiveTab("2");
      } else {
        setActiveTab("1");
      }
    }
  };

  // Colunas da tabela
  const columns = [
    {
      title: 'Número',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do Tutor',
      dataIndex: 'tutor',
      key: 'paciente',
    },
    {
      title: 'Nome do Paciente',
      dataIndex: 'paciente',
      key: 'paciente',
    },
    {
      title: 'Tipo Paciente',
      dataIndex: 'tipopaciente',
      key: 'tipopaciente',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Receita) => (
        <>
          <Button type="primary" icon={<QrcodeOutlined />} onClick={() => handleDisplay(record.id)} style={{ marginRight: 10 }} />
          <Button type="primary" onClick={() => handleEdit(record.id)} style={{ marginRight: 10 }}>
            Editar
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Receitas Digitais
      </h1>

      {/* Tabela de receitas */}
      <Table dataSource={receitas} columns={columns} rowKey="id" pagination={false} />

      {/* Botão flutuante de adicionar nova receita */}
      <FloatButton icon={<PlusOutlined />} onClick={showModal} type="primary" style={{ right: 24, bottom: 24 }} />

      {/* Modal para adicionar nova receita */}
      <Modal
        title="Adicionar Nova Receita"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <RecipeForm form={form} activeTab={activeTab} setActiveTab={setActiveTab} />
      </Modal>
    </div>
  );
};


