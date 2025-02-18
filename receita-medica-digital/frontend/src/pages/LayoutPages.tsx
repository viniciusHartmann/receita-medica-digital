import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

interface Receita {
  id: number;
  paciente: string;
  tipopaciente: string;
}

const NewRecipe: React.FC = () => {
  // Dados fictícios das receitas
  const [receitas, setReceitas] = useState<Receita[]>([
    { id: 1, paciente: 'João Silva', tipopaciente: 'Cachorro' },
    { id: 2, paciente: 'Maria Oliveira', tipopaciente: 'Gato' },
    { id: 3, paciente: 'Carlos Souza', tipopaciente: 'Capivara' },
  ]);

  // Função para excluir uma receita
  const handleDelete = (id: number) => {
    setReceitas((prevReceitas) => prevReceitas.filter((receita) => receita.id !== id));
  };

  // Função para editar uma receita (apenas um alerta como exemplo)
  const handleEdit = (id: number) => {
    alert(`Editar receita #${id}`);
  };

  const handleDisplay = (id: number) => {
    alert(`Gerando QRCode #${id}`)
  }

  // Colunas da tabela
  const columns = [
    {
      title: 'Número',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do Paciente',
      dataIndex: 'paciente',
      key: 'paciente',
    },
    {
      title: 'Tipo Paciente',
      dataIndex: 'tipopaciente',
      key: 'tipopaciente'
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
      <h1>Receitas Digitais</h1>
      <Table dataSource={receitas} columns={columns} rowKey="id" pagination={false} />
    </div>
  );
};

export default NewRecipe;
