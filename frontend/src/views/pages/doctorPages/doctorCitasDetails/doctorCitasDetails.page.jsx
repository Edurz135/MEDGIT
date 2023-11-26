import React, { useEffect, useState } from "react";
import "./doctorCitasDetails.styles.css";
import { Card, Tabs, Button, Input, Space } from "antd";

import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import HistorialClinico from "../../../../components/HistorialClinico/historialClinico.component";
import RealizarDiagnostico from "../../../../components/realizarDiagnostico/realizarDiagnostico.component";
import { useSearchParams } from "react-router-dom";

const { TextArea } = Input;

async function getAppointmentDetail(id) {
  const accessToken = LocalStorageServices.GetData("accessToken");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getFutureAppointmentDetail",
    headers: {
      Authorization: accessToken,
    },
    data: {
      appointmentId: id,
    },
  };

  const resp = await axios
    .request(config)
    .then((response) => {
      console.log(response.data.result);
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
  return resp;
}

export default function DoctorCitasDetails() {
  const [searchParams] = useSearchParams();
  const citaId = searchParams.get("citaId");

  const [data, setData] = useState({});

  const tabItems = [
    {
      key: "1",
      label: "Historial Clínico",
      children: <HistorialClinico data={data} />,
    },
    {
      key: "2",
      label: "Realizar Diagnóstico",
      children: <RealizarDiagnostico data={data}/>,
    },
  ];

  const onChange = (key) => {
    // console.log(key);
  };

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      return await getAppointmentDetail(citaId);
    };

    fetchAppointmentDetail().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Cita con Paciente</h1>
      <br />
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />

      {/* Renderiza el contenido según la opción seleccionada */}
      {/* {selectedOption === "Historial Clínico" && renderHistorialClinico()}
      {selectedOption === "Realizar Diagnóstico" && (
        <>
          {renderRealizarDiagnostico()}
          {renderRecetaMedicaSolicitarExamen()}
          <Button onClick={handleTerminarConsulta} type="primary">
            Terminar consulta
          </Button>
        </>
      )} */}
    </div>
  );
}
