import { Table, Modal, Form, Input, Select, DatePicker, Space } from "antd";


export const RegistrationForm = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();

	return (
		<Modal
			open={visible}
			title="Cadastro de Paciente"
			okText="Salvar"
			cancelText="Cancelar"
			onCancel={onCancel}
			onOk={() => {
				form.validateFields()
					.then(values => {
						// Verificar se o campo nascimento está preenchido antes de formatá-lo
						if (values.nascimento) {
							values.nascimento = values.nascimento.format("DD/MM/YYYY");
						}
						form.resetFields(); // Limpa os campos do formulário após envio
						onCreate(values); // Envia os valores para o componente pai
					})
					.catch(info => console.log("Erro ao validar", info));
			}}
		>
			<Form form={form} layout="vertical">
				<Form.Item>

					<Space>
						{/* Nome do Tutor */}
						<Form.Item name="tutor" rules={[{ required: true, message: "Insira o nome do tutor" }]} noStyle>
							<Input placeholder="Nome do Tutor" />
						</Form.Item>

						{/* Telefone */}
						<Form.Item
							name="telefone"
							rules={[
								{ required: true, message: "Insira um telefone válido" },
								{ pattern: /^\(\d{2}\) \d{5}-\d{4}$/, message: "Formato inválido (XX) XXXXX-XXXX" }
							]}
							noStyle
						>
							<Input
								placeholder="Telefone"
								maxLength={15}
								onChange={(e) => {
									let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
									if (value.length > 2) value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
									if (value.length > 10) value = `${value.substring(0, 10)}-${value.substring(10, 15)}`;
									e.target.value = value;
								}}
							/>
						</Form.Item>
					</Space>
				</Form.Item>

				{/* Nome do Paciente */}
				<Form.Item name="paciente" rules={[{ required: true, message: "Insira o nome do animal" }]}>
					<Input placeholder="Digite o nome do animal" />
				</Form.Item>

				{/* Sexo */}
				<Form.Item name="sexo" rules={[{ required: true, message: "Selecione o sexo" }]}>
					<Select placeholder="Selecione o sexo">
						<Select.Option value="Macho">Macho</Select.Option>
						<Select.Option value="Fêmea">Fêmea</Select.Option>
					</Select>
				</Form.Item>

				{/* Espécie */}
				<Form.Item name="especie" rules={[{ required: true, message: "Insira a espécie" }]}>
					<Input placeholder="Digite a espécie" />
				</Form.Item>

				{/* Raça */}
				<Form.Item name="raca" rules={[{ required: true, message: "Insira a raça" }]}>
					<Input placeholder="Digite a raça" />
				</Form.Item>

				{/* Nascimento */}
				<Form.Item name="nascimento" rules={[{ required: true, message: "Selecione a data de nascimento" }]}>
					<DatePicker format="DD/MM/YYYY" placeholder="Selecione a data" />
				</Form.Item>
			</Form>
		</Modal>
	);
};
