import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Select, DatePicker, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RegistrationForm } from "./registerform";

export interface Cadastro {
	tutor: string,
	telefone: string,
	cep: number,
	rua: string,
	cidade: string,
	uf: string,
	bairro: string,
	complemento: string,
	numeroEnd: string,
	paciente: string,
	sexo: string,
	especie: string,
	raca: string,
	nascimento: string
}

const PatientTable = () => {
	const [visible, setVisible] = useState(false);

	const [data, setData] = useState<Cadastro[]>([
		{ tutor: 'Vinicius', telefone: '49 98429-9161', cep: 89705470, rua: 'Emilia Simioni', cidade: 'Concórdia', uf: 'SC', bairro: 'Poente do Sol', complemento: 't', paciente: 'Max', sexo: 'Macho', especie: 'Cachorro', raca: 'vira lata', nascimento: '19/02/2015' },
		{ tutor: 'Ana', telefone: '49 98429-9161', cep: 89705470, rua: 'Emilia Simioni', cidade: 'Concórdia', uf: 'SC', bairro: 'Poente do Sol', complemento: 't', paciente: 'Noah', sexo: 'Macho', especie: 'Cachorro', raca: 'Pitbull', nascimento: '19/02/2020' },
		{ tutor: 'Mirian', telefone: '49 98429-9161', cep: 89705470, rua: 'Emilia Simioni', cidade: 'Concórdia', uf: 'SC', bairro: 'Poente do Sol', complemento: 't', paciente: 'Hurley', sexo: 'Fêmea', especie: 'Gato', raca: 'Praiana', nascimento: '19/02/2018' },
	]);

	const handleCreate = (values: Cadastro) => {
		setData([...data, values]);
		setVisible(false);
	};

	useEffect(() => {
		setData(Array(100).fill({ tutor: 'Vinicius', telefone: '49 98429-9161', cep: 89705470, rua: 'Emilia Simioni', cidade: 'Concórdia', uf: 'SC', bairro: 'Poente do Sol', complemento: 't', paciente: 'Max', sexo: 'Macho', especie: 'Cachorro', raca: 'vira lata', nascimento: '19/02/2015' }))
	}, [])

	const columns = [
		{ title: "Tutor", dataIndex: "tutor", key: "tutor" },
		{ title: "Nome do Animal", dataIndex: "paciente", key: "paciente" },
		{ title: "Sexo", dataIndex: "sexo", key: "sexo" },
		{ title: "Espécie", dataIndex: "especie", key: "especie" },
		{ title: "Raça", dataIndex: "raca", key: "raca" },
		{ title: "Nascimento", dataIndex: "nascimento", key: "nascimento" },
	];

	return (
		<>
			<h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
				Cadastro de Pacientes
			</h1>
			<Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
			<FloatButton icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)} />
			<RegistrationForm visible={visible} onCreate={handleCreate} onCancel={() => setVisible(false)} />
		</>
	);
};

export default PatientTable;
