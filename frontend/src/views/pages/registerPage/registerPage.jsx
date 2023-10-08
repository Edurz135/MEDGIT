import React, { useState } from 'react';
import './register.style.css';
import { Form, Input, Button, Radio, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [isWorker, setIsWorker] = useState(false);
  const [isLaboratory, setIsLaboratory] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (isWorker) {
      sendWorkerRegistrationRequest(values);
    } else if (isLaboratory) {
      sendLaboratoryRegistrationRequest(values);
    } else {
      sendPatientRegistrationRequest(values);
    }

    setPopupVisible(true);

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falló la validación:', errorInfo);
  };

  const handleRadioChange = (e) => {
    setIsWorker(e.target.value === 'trabajador');
    setIsLaboratory(e.target.value === 'laboratorio');
  };

  const sendWorkerRegistrationRequest = (values) => {
    const formData = {
      name: values.nombre,
      lastName: values.apellido,
      email: values.email,
      password: values.password,
      gender: values.genero,
      identityDoc: values.dni,
      nroColegiatura: values.colegiatura || '',
    };

    axios
      .post('http://localhost:3100/api/registerDoctor', formData)
      .then((response) => {
        console.log('Respuesta del servidor (Trabajador):', response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud (Trabajador):', error);
      });
  };

  const sendLaboratoryRegistrationRequest = (values) => {
    const formData = {
      name: values.nombre,
      lastName: values.apellido,
      email: values.email,
      password: values.password,
      gender: values.genero,
      identityDoc: values.dni,
    };

    axios
      .post('http://localhost:3100/api/registerLabAnalyst', formData)
      .then((response) => {
        console.log('Respuesta del servidor (Laboratorio):', response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud (Laboratorio):', error);
      });
  };

  const sendPatientRegistrationRequest = (values) => {
    const formData = {
      name: values.nombre,
      lastName: values.apellido,
      email: values.email,
      password: values.password,
      gender: values.genero,
      identityDoc: values.dni,
    };

    axios
      .post('http://localhost:3100/api/registerPatient', formData)
      .then((response) => {
        console.log('Respuesta del servidor (Paciente):', response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud (Paciente):', error);
      });
  };

  return (
    <div className="center-container">
      <div className="register-card">
        <h2 className="register-title">Bienvenido a MedGit</h2>

        <Form
          name="register"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            remember: true,
            puesto: 'paciente',
          }}
          requiredMark="optional"
        >
          <Form.Item
            name="puesto"
            rules={[
              {
                message: 'Por favor, selecciona tu género',
              },
            ]}
          >
            <Radio.Group optionType="button" onChange={handleRadioChange}>
              <Radio value="paciente">Paciente</Radio>
              <Radio value="trabajador">Médico</Radio>
              <Radio value="laboratorio">Laboratorio</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa tu nombre',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa tu apellido',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Género"
            name="genero"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona tu género',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="masculino">Masculino</Radio>
              <Radio value="femenino">Femenino</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="DNI"
            name="dni"
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa tu DNI',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Por favor, ingresa un correo electrónico válido',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa tu contraseña',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {(isWorker || isLaboratory) && ( // Muestra el campo de colegiatura si es "Trabajador" o "Laboratorio"
            <Form.Item
              label="Número de Colegiatura"
              name="colegiatura"
              rules={[
                {
                  required: true,
                  message: 'Por favor, ingresa tu número de colegiatura',
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
          <Form.Item>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </Form.Item>
          <Form.Item>
            Únete a la plataforma de almacenaje de historias clínicas compartidas más grandes de Perú
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Usuario Registrado"
        visible={isPopupVisible}
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        ¡El usuario ha sido registrado con éxito!
      </Modal>
    </div>
  );
};

export default RegisterPage;
