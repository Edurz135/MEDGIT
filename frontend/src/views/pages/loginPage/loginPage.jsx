import React, { useState } from "react";
import "./login.style.css";
import { Form, Input, Button, Radio, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageServices } from "../../../services";
import axios from "axios";

const LoginPage = () => {
  const [selectedPuesto, setSelectedPuesto] = useState("paciente");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const requestData = {
      email: values.email,
      password: values.password,
      puesto: selectedPuesto,
    };

    let loginRoute = "";

    if (selectedPuesto === "paciente") {
      loginRoute = "http://localhost:3100/api/loginPatient";
    } else if (selectedPuesto === "medico") {
      loginRoute = "http://localhost:3100/api/loginDoctor";
    } else if (selectedPuesto === "laboratorio") {
      loginRoute = "http://localhost:3100/api/loginLabAnalyst";
    }

    axios
      .post(loginRoute, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Inicio de sesión exitoso:", JSON.stringify(response.data));
        if ((response.status = 200)) {
          LocalStorageServices.SetData("isLoggedIn", true);
          LocalStorageServices.SetData(
            "accessToken",
            response.status.accessToken
          );
          var loggedRoute = "";
          if (selectedPuesto === "paciente") {
            loggedRoute = "/auth/patient/inicio";
          } else if (selectedPuesto === "medico") {
            loggedRoute = "/auth/doctor/inicio";
          } else if (selectedPuesto === "laboratorio") {
            loggedRoute = "/auth/laboratory/inicio";
          }

          navigate(loggedRoute);
          setError(null);
        } else {
          LocalStorageServices.SetData("isLoggedIn", false);
          LocalStorageServices.SetData("accessToken", "");
        }
      })
      .catch((error) => {
        console.log("Error en el inicio de sesión:", error);
        setError("Inicio de sesión fallido. Verifica tus credenciales.");
      });
  };

  return (
    <div className="center-container">
      <div className="register-card">
        <h2 className="register-title">Bienvenido a MedGit</h2>

        {error && <Alert message={error} type="error" showIcon />}

        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{
            remember: true,
            puesto: "paciente",
          }}
          requiredMark="optional"
        >
          <Form.Item
            name="puesto"
            rules={[
              {
                message: "Por favor, selecciona tu puesto",
              },
            ]}
          >
            <Radio.Group
              optionType="button"
              onChange={(e) => setSelectedPuesto(e.target.value)}
              value={selectedPuesto}
            >
              <Radio value="paciente">Paciente</Radio>
              <Radio value="medico">Médico</Radio>
              <Radio value="laboratorio">Laboratorio</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Por favor, ingresa un correo electrónico válido",
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
                message: "Por favor, ingresa tu contraseña",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
          <Form.Item>
            ¿No tienes una cuenta?{" "}
            <Link to="/register">Registra tu usuario aquí</Link>
          </Form.Item>
          <Form.Item>
            Únete a la plataforma de almacenamiento de historias clínicas
            compartidas más grandes de Perú
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
