import React, { useEffect, useState } from "react";

import { Card, Row, Col, Tabs, Button, Input, Space } from "antd";
import axios from "axios";
import { LocalStorageServices } from "../../services";
const { TextArea } = Input;
const RecetaMedicaCard = ({ receta, onDelete, fondoGris }) => (
  <Card
    bordered={false}
    style={{
      marginBottom: 8,
      padding: 0,
      border: "none",
      background: fondoGris ? "lightgrey" : "transparent",
      height: "50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <p style={{ margin: 0 }}>{receta}</p>
      <Button onClick={onDelete} type="link" style={{ fontWeight: "bold" }}>
        X
      </Button>
    </Space>
  </Card>
);

const ExamenLabCard = ({ examenLab, onDelete, fondoGris }) => (
  <Card
    bordered={false}
    style={{
      marginBottom: 8,
      padding: 0,
      border: "none",
      background: fondoGris ? "lightgrey" : "transparent",
      height: "50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <p style={{ margin: 0 }}>{examenLab}</p>
      <Button onClick={onDelete} type="link" style={{ fontWeight: "bold" }}>
        X
      </Button>
    </Space>
  </Card>
);

export default function RealizarDiagnostico(props) {
  const [diagnostico, setDiagnostico] = useState("");

  const [mostrarRecetaMedica, setMostrarRecetaMedica] = useState(false);
  const [recetaMedica, setRecetaMedica] = useState("");
  const [recetasGuardadas, setRecetasGuardadas] = useState([]);

  const [mostrarExamenLab, setMostrarExamenLab] = useState(false);
  const [examenLab, setExamenLab] = useState("");
  const [examenLabGuardadas, setExamenLabGuardadas] = useState([]);

  const [datosConsulta, setDatosConsulta] = useState({
    diagnostico: "",
    recetas: recetasGuardadas,
    examenesLab: examenLabGuardadas,
  });

  const handleGuardarDiagnostico = () => {
    console.log("Diagnóstico guardado:", diagnostico);
    let id = 0;
    try {
      const accessToken = LocalStorageServices.GetData("accessToken");
      //const appointmentId = ;
      axios.put(
        `http://localhost:3100/api/appointment/${id}`,
        { diagnostic: diagnostico },
        { headers: { Authorization: accessToken } }
      );

      console.log("Diagnóstico actualizado en la base de datos");
    } catch (error) {
      console.error("Error al actualizar el diagnóstico:", error);
    }

    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      diagnostico: diagnostico,
    }));
  };

  const handleAgregarRecetaMedica = () => {
    setMostrarRecetaMedica(true);
  };

  const handleGuardarRecetaMedica = () => {
    console.log("Receta guardada:", recetaMedica);
    setRecetasGuardadas((prevRecetas) => [...prevRecetas, recetaMedica]);
    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      recetas: [...prevDatosConsulta.recetas, recetaMedica],
    }));
    setMostrarRecetaMedica(false);
    setRecetaMedica("");
  };

  const handleBorrarReceta = (index) => {
    const nuevasRecetasGuardadas = [...recetasGuardadas];
    nuevasRecetasGuardadas.splice(index, 1);
    setRecetasGuardadas(nuevasRecetasGuardadas);
  };

  const handleAgregarExamenLab = () => {
    setMostrarExamenLab(true);
  };

  const handleGuardarExamenLab = () => {
    console.log("ExamenLab guardada:", examenLab);
    setExamenLabGuardadas((prevExamenLab) => [...prevExamenLab, examenLab]);
    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      examenesLab: [...prevDatosConsulta.examenesLab, examenLab],
    }));
    setMostrarExamenLab(false);
    setExamenLab("");
  };

  const handleBorrarExamenLab = (index) => {
    const nuevasExamenLabGuardadas = [...examenLabGuardadas];
    nuevasExamenLabGuardadas.splice(index, 1);
    setExamenLabGuardadas(nuevasExamenLabGuardadas);
  };

  const handleTerminarConsulta = () => {
    handleGuardarDiagnostico();
    console.log("Datos de la consulta:", datosConsulta);
    // setDatosConsulta({ diagnostico: '', recetas: [], examenesLab: [] });
    // setRecetasGuardadas([]);
    // setExamenLabGuardadas([]);
  };

  useEffect(() => {
    console.log(props.data);
    // hacer una consulta de citas pasadas
  }, []);

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title="DIAGNÓSTICO"
            bordered={true}
            headStyle={{
              background: "#3E5BA5",
              color: "white",
            }}
            style={{
              boxShadow: "0px 6px 8px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextArea
              rows={4}
              style={{ height: "100%" }}
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="RECETA MÉDICA"
            bordered={true}
            headStyle={{
              background: "#3E5BA5",
              color: "white",
            }}
            style={{
              boxShadow: "0px 6px 8px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            {mostrarRecetaMedica ? (
              <>
                <TextArea
                  value={recetaMedica}
                  onChange={(e) => setRecetaMedica(e.target.value)}
                  rows={2}
                  placeholder="Ingrese la receta médica"
                />
                <Button
                  style={{ marginTop: 8 }}
                  onClick={handleGuardarRecetaMedica}
                >
                  Guardar Receta
                </Button>
              </>
            ) : (
              <div>
                {recetasGuardadas.map((receta, index) => (
                  <RecetaMedicaCard
                    key={index}
                    receta={receta}
                    onDelete={() => handleBorrarReceta(index)}
                    fondoGris={true}
                  />
                ))}
                <Button onClick={handleAgregarRecetaMedica}>
                  Agregar Receta
                </Button>
              </div>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="SOLICITAR EXAMEN A LABORATORIO"
            bordered={true}
            headStyle={{
              background: "#3E5BA5",
              color: "white",
            }}
            style={{
              boxShadow: "0px 6px 8px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            {mostrarExamenLab ? (
              <>
                <TextArea
                  value={examenLab}
                  onChange={(e) => setExamenLab(e.target.value)}
                  rows={2}
                  placeholder="Ingrese el examen de laboratorio"
                />
                <Button
                  style={{ marginTop: 8 }}
                  onClick={handleGuardarExamenLab}
                >
                  Guardar Examen Laboratorio
                </Button>
              </>
            ) : (
              <div>
                {examenLabGuardadas.map((examenLab, index) => (
                  <ExamenLabCard
                    key={index}
                    examenLab={examenLab}
                    onDelete={() => handleBorrarExamenLab(index)}
                    fondoGris={true}
                  />
                ))}
                <Button onClick={handleAgregarExamenLab}>
                  Agregar Examen Laboratorio
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <br/>
      <Button onClick={handleTerminarConsulta} type="primary">
        Terminar consulta
      </Button>
    </div>
  );
}
