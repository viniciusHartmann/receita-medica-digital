import { Table, Modal, Form, Input, Select, DatePicker, Space, Row, Col, Button, message, Tabs } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { Cadastro } from "./LayoutRegister";

interface RegistrationFormProps {
	visible: boolean;
	onCreate: (values: Cadastro) => void;
	onCancel: () => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ visible, onCancel, onCreate }): ReactElement => {
	const [form] = Form.useForm<Cadastro>();
	const [activeTab, setActiveTab] = useState("tutor");

	const handleTelefoneChange = (e) => {
		let value = e.target.value.replace(/\D/g, ''); // Remove tudo o que não for número
		if (value.length <= 2) {
			value = `(${value}`;
		} else if (value.length <= 7) {
			value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
		} else {
			value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
		}
		form.setFieldsValue({ telefone: value });
	};

	const handleCepChange = (e) => {
		let value = e.target.value.replace(/\D/g, '');

		if (value.length > 5) {
			value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
		}
		form.setFieldsValue({ cep: value });
	}

	const checkCep = (e) => {
		const cep = e.target.value.replace(/\D/g, '')
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then(res => res.json()).then(data => {
				if (data.erro) {
					message.error('CEP inválido!'); // Exibe o popup de erro
					return;
				}
				form.setFieldsValue({
					rua: data.logradouro,
					cidade: data.localidade,
					uf: data.uf,
					bairro: data.bairro
				});
			}).catch(error => {
				console.error('Erro ao buscar CEP:', error);
				message.error('Erro ao buscar CEP. Tente novamente.');
			});;
	}

	const handleSubmit = (values: Cadastro) => {
		console.log(values)
		onCreate(values)
		form.resetFields()
	}

	const handleCancel = () => {
		onCancel()
		form.resetFields()
	}

	useEffect(() => {
		form.resetFields()
	}, [])
	return (
		<Modal open={visible} title="Cadastro de Paciente" onCancel={handleCancel} footer={null}>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Tabs activeKey={activeTab} onChange={setActiveTab}>
					{/* ABA TUTOR */}
					<Tabs.TabPane tab="Tutor" key="tutor">
						<Row gutter={10}>
							<Col xs={24} md={12}>
								<Form.Item name="tutor" label="Tutor" rules={[{ required: true, message: "Insira o nome do tutor" }]}>
									<Input placeholder="Nome do Tutor" />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item
									name="telefone"
									label="Telefone"
									rules={[
										{ required: true, message: "Insira um telefone válido" },
										{ pattern: /^\(\d{2}\) \d{5}-\d{4}$/, message: "Formato inválido (XX) XXXXX-XXXX" },
									]}
								>
									<Input onChange={handleTelefoneChange} placeholder="Telefone" maxLength={15} />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="cep" label="CEP" rules={[{ required: true, message: "Insira um CEP válido" }]}>
									<Input onChange={handleCepChange} placeholder="CEP" maxLength={10} onBlur={checkCep} />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="rua" label="Rua" rules={[{ required: true, message: "Insira a Rua" }]}>
									<Input placeholder="Rua" readOnly />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="cidade" label="Cidade" rules={[{ required: true, message: "Insira a Cidade" }]}>
									<Input placeholder="Cidade" readOnly />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="uf" label="Estado" rules={[{ required: true, message: "Insira o Estado" }]}>
									<Input placeholder="Estado" readOnly />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="bairro" label="Bairro" rules={[{ required: true, message: "Insira o Bairro" }]}>
									<Input placeholder="Bairro" readOnly />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="numeroEnd" label="Número" rules={[{ required: true, message: "Insira o Número" }]}>
									<Input
										placeholder="Número"
										inputMode="numeric"
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
											form.setFieldsValue({ numeroEnd: value });
										}}
									/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item name="complemento" label="Complemento" rules={[{ message: "Insira o Complemento" }]}>
									<Input.TextArea placeholder="Complemento" rows={3} maxLength={100} />
								</Form.Item>
							</Col>
						</Row>
					</Tabs.TabPane>

					{/* ABA PACIENTE */}
					<Tabs.TabPane tab="Paciente" key="paciente">
						<Row gutter={10}>
							<Col span={24}>
								<Form.Item name="paciente" label="Nome Paciente" rules={[{ required: true, message: "Insira o nome do paciente" }]}>
									<Input placeholder="Digite o nome do paciente" />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: "Selecione o sexo" }]}>
									<Select placeholder="Selecione o sexo">
										<Select.Option value="Macho">Macho</Select.Option>
										<Select.Option value="Fêmea">Fêmea</Select.Option>
									</Select>
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="especie" label="Espécie" rules={[{ required: true, message: "Insira a espécie" }]}>
									<Input placeholder="Digite a espécie" />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="raca" label="Raça" rules={[{ required: true, message: "Insira a raça" }]}>
									<Input placeholder="Digite a raça" />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name="nascimento" label="Nascimento" rules={[{ required: true, message: "Selecione a data de nascimento" }]}>
									<DatePicker format="DD/MM/YYYY" placeholder="Selecione a data" />
								</Form.Item>
							</Col>
						</Row>
					</Tabs.TabPane>
				</Tabs>

				{/* BOTÕES */}
				<Row justify="end" gutter={10}>
					<Col>
						<Button onClick={handleCancel}>Cancelar</Button>
					</Col>
					<Col>
						<Button type="primary" htmlType="submit">Enviar</Button>
					</Col>
					<Col>
						<Button onClick={() => message.error('Teste de erro')}>Testar Popup</Button>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
