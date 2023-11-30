import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  SnippetsOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, Button, Input, Space, Select, Typography } from "antd";
import axios from "axios";
import { LocalStorageServices } from "../../services";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Text, Title } = Typography;

const RecetaMedicaCard = ({ receta, onDelete, fondoGris }) => (
  <Card
    bordered={true}
    style={{
      marginBottom: 8,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
    bodyStyle={{padding: "2px 10px"}}
  >
    <Text strong>Receta: </Text>
    <Text>{receta.name}</Text>
    <br />
    <Text strong>Dosis: </Text>
    <Text>{receta.dose}</Text>
    <br />
    <Text strong>Instrucción: </Text>
    <Text>{receta.instruction}</Text>
    <br />
    <Text strong>Descripción: </Text>
    <Text>{receta.description}</Text>
    <Button onClick={onDelete} style={{ fontWeight: "bold", border: "none" }}>
      <CloseOutlined />
    </Button>
  </Card>
);

const ExamenLabCard = ({ examenLab, onDelete, fondoGris }) => (
  <Card
    bordered={true}
    style={{
      marginBottom: 8,
      padding: 0,
      height: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <p style={{ margin: 0 }}>{examenLab}</p>
      <Button onClick={onDelete} style={{ fontWeight: "bold", border: "none" }}>
        <CloseOutlined />
      </Button>
    </Space>
  </Card>
);

async function getListOfTypeMedicExam() {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getListTypesMedicalExams",
    headers: {
      Authorization: accessToken,
    },
  };

  const resp = await axios
    .request(config)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
  return resp;
}

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function RealizarDiagnostico(props) {
  const [diagnostico, setDiagnostico] = useState("");

  const [mostrarRecetaMedica, setMostrarRecetaMedica] = useState(false);
  const [recetaMedica, setRecetaMedica] = useState("");

  const [nombreRecetaMedica, setNombreRecetaMedica] = useState("");
  const [dosisRecetaMedica, setDosisRecetaMedica] = useState("");
  const [instruccionRecetaMedica, setInstruccionRecetaMedica] = useState("");
  const [descripcionRecetaMedica, setDescripcionRecetaMedica] = useState("");

  const [recetasGuardadas, setRecetasGuardadas] = useState([]);

  const [mostrarExamenLab, setMostrarExamenLab] = useState(false);
  const [examenLab, setExamenLab] = useState("");
  const [examenLabGuardadas, setExamenLabGuardadas] = useState([]);

  const [listTypeMedicExam, setListTypeMedicExam] = useState([]);

  const navigate = useNavigate();

  const handleGuardarDiagnostico = async (data) => {
    try {
      const accessToken = LocalStorageServices.GetData("accessToken");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:3100/api/doctor/updateAppointment",
        headers: {
          Authorization: accessToken,
        },
        data: {
          data: data,
        },
      };
      const resp = await axios
        .request(config)
        .then((response) => {
          return response.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Diagnóstico actualizado en la base de datos");
      return resp;
    } catch (error) {
      console.error("Error al actualizar el diagnóstico:", error);
    }
  };

  const handleAgregarRecetaMedica = () => {
    setMostrarRecetaMedica(true);
  };

  const handleGuardarRecetaMedica = () => {
    console.log("Receta guardada:", recetaMedica);
    const nuevaRecetaMedica = {
      name: nombreRecetaMedica,
      dose: dosisRecetaMedica,
      instruction: instruccionRecetaMedica,
      description: descripcionRecetaMedica,
    };
    setRecetasGuardadas((prevRecetas) => [...prevRecetas, nuevaRecetaMedica]);
    setMostrarRecetaMedica(false);

    setNombreRecetaMedica("");
    setDosisRecetaMedica("");
    setInstruccionRecetaMedica("");
    setDescripcionRecetaMedica("");
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
    setMostrarExamenLab(false);
    console.log(examenLabGuardadas);
    setExamenLab("");
  };

  const handleBorrarExamenLab = (index) => {
    const nuevasExamenLabGuardadas = [...examenLabGuardadas];
    nuevasExamenLabGuardadas.splice(index, 1);
    setExamenLabGuardadas(nuevasExamenLabGuardadas);
  };

  const handleTerminarConsulta = () => {
    const data = {
      appointmentId: props.data[0].id,
      diagnostico: diagnostico,
      receta: recetasGuardadas,
      examenesLab: examenLabGuardadas,
    };
    handleGuardarDiagnostico(data);
    console.log("Datos de la consulta:", data);
    navigate("/auth/doctor/inicio");
  };

  const UpdateTypeMedicExamSelect = (result) => {
    if (result == null) return;
    const data = result.map((typeMedicExam) => {
      return {
        value: String(typeMedicExam.id),
        label: typeMedicExam.name,
      };
    });
    setListTypeMedicExam(data);
  };

  useEffect(() => {
    console.log(props.data);
    getListOfTypeMedicExam().then(UpdateTypeMedicExamSelect);
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
              placeholder="Diagnóstico médico"
              maxLength={500}
              style={{ height: "100%" }}
              value={diagnostico}
              onChange={(e) => {
                setDiagnostico(e.target.value);
              }}
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
                <Input
                  placeholder="Nombre"
                  prefix={<MedicineBoxOutlined />}
                  onChange={(e) => {
                    setNombreRecetaMedica(e.target.value);
                  }}
                />
                <Input
                  placeholder="Dosis"
                  prefix={<CalendarOutlined />}
                  onChange={(e) => setDosisRecetaMedica(e.target.value)}
                />
                <Input
                  placeholder="Instrucción"
                  prefix={<SnippetsOutlined />}
                  onChange={(e) => setInstruccionRecetaMedica(e.target.value)}
                />
                <Input
                  placeholder="Descripción"
                  prefix={<MenuOutlined />}
                  onChange={(e) => setDescripcionRecetaMedica(e.target.value)}
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
                <Select
                  showSearch
                  style={{
                    marginLeft: "1rem",
                    width: 200,
                  }}
                  defaultValue="Seleccione"
                  placeholder="Examen médico"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={listTypeMedicExam}
                  onChange={(value, label) => {
                    setExamenLab(label);
                  }}
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
                    examenLab={examenLab.label}
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
      <br />
      <Button onClick={handleTerminarConsulta} type="primary">
        Terminar consulta
      </Button>
    </div>
  );
}
