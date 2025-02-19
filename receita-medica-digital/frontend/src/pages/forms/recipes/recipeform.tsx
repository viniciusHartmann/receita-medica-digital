import React from 'react';
import { Form, Input, Tabs } from 'antd';

interface RecipeFormProps {
	form: any; // O objeto do formulário vindo do Ant Design
	activeTab: string;
	setActiveTab: (key: string) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ form, activeTab, setActiveTab }) => {
	return (
		<Tabs activeKey={activeTab} onChange={setActiveTab}>
			{/* Aba de Informações */}
			<Tabs.TabPane tab="Informações" key="1">
				<Form form={form} layout="vertical">
					<Form.Item
						name="tutor"
						rules={[{ required: true, message: 'Por favor, insira o nome do tutor!' }]}
					>
						<Input placeholder="Nome do Tutor" />
					</Form.Item>

					<Form.Item
						name="paciente"
						rules={[{ required: true, message: 'Por favor, insira o nome do paciente!' }]}
					>
						<Input placeholder="Nome do Paciente" />
					</Form.Item>

					<Form.Item
						name="especie"
						rules={[{ required: true, message: 'Por favor, insira o tipo de paciente!' }]}
					>
						<Input placeholder="Espécie" />
					</Form.Item>

					<Form.Item name="observacoes">
						<Input.TextArea rows={5} placeholder="Digite aqui as observações do animal..." />
					</Form.Item>
				</Form>
			</Tabs.TabPane>

			{/* Aba de Medicamentos */}
			<Tabs.TabPane tab="Medicamentos" key="2">
				<Form form={form} layout="vertical">
					<Form.Item
						name="medicamento"
						rules={[{ required: true, message: 'Por favor, insira o nome do medicamento!' }]}
					>
						<Input placeholder="Medicamento" />
					</Form.Item>

					<Form.Item
						name="dosagem"
						rules={[{ required: true, message: 'Por favor, insira a dosagem e instruções de uso!' }]}
					>
						<Input.TextArea rows={4} placeholder="Digite a dosagem e instruções de uso..." />
					</Form.Item>
				</Form>
			</Tabs.TabPane>
		</Tabs>
	);
};

export default RecipeForm;
