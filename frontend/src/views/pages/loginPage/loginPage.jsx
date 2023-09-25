import React from 'react';
import './login.style.css'
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { Link } from 'react-router-dom';

const loginPage = () => {
    const onFinish = (values) => {
        console.log('Valores del formulario:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Falló la validación:', errorInfo);
      };
    
      return (
        <div className="center-container">
          <div className="register-card">
            <h2 className="register-title">Bienvenido a MedGit</h2>

            <Form
              name="register"
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
                    <Radio.Group optionType='button'>
                        <Radio value="paciente">Paciente</Radio>
                        <Radio value="trabajador">Trabajador</Radio>
                    </Radio.Group>
                </Form.Item>
              <Form.Item
                label="DNI"
                name="dni"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingresa tu dni',
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
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Continuar
                </Button>
              </Form.Item>
              <Form.Item>
                        ¿No tiene una cuenta? <Link to="/register">Registre su usuario aquí</Link>
              </Form.Item>
              <Form.Item>
                        Únete a la plataforma de almacenaje de historias clínicas compartidas más grandes de Perú
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    };

export default loginPage;