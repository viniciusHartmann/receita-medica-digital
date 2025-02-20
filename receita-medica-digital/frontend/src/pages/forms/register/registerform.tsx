import { Table, Modal, Form, Input, Select, DatePicker, Space, Row, Col, Button } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { Cadastro } from "./LayoutRegister";

interface RegistrationFormProps {
	visible: boolean;
	onCreate: (values: Cadastro) => void;
	onCancel: () => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ visible, onCancel, onCreate }): ReactElement => {
	const [form] = Form.useForm<Cadastro>();

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
		console.log('##', value)
	};

	const handleSubmit = (values: Cadastro) => {
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
		<Modal
			open={visible}
			title="Cadastro de Paciente"
			onCancel={handleCancel}
			footer={null}
		>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Row gutter={10} justify={'end'}>
					<Col xs={24} md={12} >
						<Form.Item name="tutor" label="Tutor" rules={[{ required: true, message: "Insira o nome do tutor" }]} >
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
							<Input
								onChange={handleTelefoneChange}
								placeholder="Telefone"
								maxLength={15}
							/>
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item name="paciente" label="Nome Paciente" rules={[{ required: true, message: "Insira o nome do paciente" }]}>
							<Input placeholder="Digite o nome do paciente" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: "Selecione o sexo" }]}>
							<Select placeholder="Selecione o sexo">
								<Select.Option value="Macho">Macho</Select.Option>
								<Select.Option value="Fêmea">Fêmea</Select.Option>
							</Select>
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item name="especie" label="Espécie" rules={[{ required: true, message: "Insira a espécie" }]}>
							<Input placeholder="Digite a espécie" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="raca" label="Raça" rules={[{ required: true, message: "Insira a raça" }]}>
							<Input placeholder="Digite a raça" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="nascimento" label="Nascimento" rules={[{ required: true, message: "Selecione a data de nascimento" }]}>
							<DatePicker format="DD/MM/YYYY" placeholder="Selecione a data" />
						</Form.Item>
					</Col>

					<Col>
						<Button onClick={handleCancel}>
							Cancelar
						</Button>
					</Col>

					<Col>
						<Button type="primary" htmlType="submit">
							Enviar
						</Button>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
