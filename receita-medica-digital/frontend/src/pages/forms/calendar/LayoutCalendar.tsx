import React, { useState } from "react";
import { Table, Modal, Calendar, FloatButton, Button } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";

const CalendarGrid = () => {
	const [visible, setVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [calendarVisible, setCalendarVisible] = useState(false);

	const dataSource = [
		{ key: "1", codigo: "001", tutor: "Vinicius", paciente: "Max" },
		{ key: "2", codigo: "002", tutor: "Ana", paciente: "Noah" },
		{ key: "3", codigo: "003", tutor: "Mirian", paciente: "Hurley" },
	];

	const columns = [
		{ title: "Código", dataIndex: "codigo", key: "codigo" },
		{ title: "Nome do Tutor", dataIndex: "tutor", key: "tutor" },
		{ title: "Nome do Paciente", dataIndex: "paciente", key: "paciente" },
		{
			title: "Ações",
			key: "actions",
			render: (_, record) => (
				<Button icon={<EyeOutlined />} onClick={() => setCalendarVisible(true)} />
			),
		},
	];

	return (
		<>
			<h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
				Calendário de Medicamentos
			</h1>
			<Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
			<FloatButton icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)} />

			<Modal
				title="Calendário de Anotações"
				open={visible}
				onCancel={() => setVisible(false)}
				footer={null}
			>
				<Calendar onSelect={(date) => setSelectedDate(date)} />
			</Modal>

			<Modal
				title="Visualizar Calendário"
				open={calendarVisible}
				onCancel={() => setCalendarVisible(false)}
				footer={null}
			>
				<Calendar onSelect={(date) => setSelectedDate(date)} />
			</Modal>
		</>
	);
};

export default CalendarGrid;
