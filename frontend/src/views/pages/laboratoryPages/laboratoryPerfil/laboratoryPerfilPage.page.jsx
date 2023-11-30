import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import { Card, Descriptions, Modal, Form, Input, Button } from "antd";
import "./laboratoryPerfilPage.styles.css";

const { Meta } = Card;

const LaboratoryPerfilPage = () => {
  const [laboratoryData, setLaboratoryData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await LocalStorageServices.GetData("accessToken");
        const apiUrl = "http://localhost:3100/api/labAnalyst/getVisualiseLabAnalyst";
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: apiUrl,
          headers: {
            Authorization: accessToken,
          },
        };

        const response = await axios.request(config);
        setLaboratoryData(response.data.result);
      } catch (error) {
        console.log("Error al obtener datos del paciente:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      email: laboratoryData.email,
      phone: laboratoryData.phone,
      password: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const accessToken = await LocalStorageServices.GetData("accessToken");
      const apiUrl = "http://localhost:3100/api/labAnalyst/updateGetlabAnalyst";
      const config = {
        method: "put",
        url: apiUrl,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        data: {
          email: values.email,
          phone: values.phone,
          password: values.password,
        },
      };

      const response = await axios.request(config);
      setLaboratoryData(response.data.result);

      setIsEditing(false);
    } catch (error) {
      console.log("Error al validar el formulario o al enviar la solicitud:", error);
    }
  };

  return (
    <div className="laboratory-profile-container">
      <h2>Perfil del Paciente</h2>
      {laboratoryData && (
        <Card className="laboratory-profile-card" title="Detalles del Paciente">
          <Descriptions bordered>
            <Descriptions.Item label="Nombre">{laboratoryData.name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{laboratoryData.lastName}</Descriptions.Item>
            <Descriptions.Item label="DNI">{laboratoryData.identityDoc}</Descriptions.Item>
            <Descriptions.Item label="Género">{laboratoryData.gender}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{laboratoryData.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{laboratoryData.email}</Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={handleEdit}>
            Editar
          </Button>
        </Card>
      )}

      <Modal
        title="Editar Perfil"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Por favor ingresa un email válido" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Teléfono" name="phone" rules={[{ required: true, message: "Por favor ingresa un número de teléfono válido" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nueva Contraseña" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LaboratoryPerfilPage;
