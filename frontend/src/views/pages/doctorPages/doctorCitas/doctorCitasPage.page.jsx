import "./doctorCitasPage.styles.css";
import React, { Component } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import { Table } from "antd";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';

const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha",
    width: 250,
  },
  {
    title: "Hora",
    dataIndex: "hora",
    key: "hora",
    width: 150,
  },
  {
    title: "Paciente",
    dataIndex: "paciente",
    key: "paciente",
    width: 250,
  },
  {
    title: "Detalle",
    dataIndex: "detalle",
    key: "detalle",
    width: 100,
  },
];

export default class DoctorCitasPage extends Component {
  state = {
    citasProximas: [], // Variable para almacenar los datos de la solicitud
  };

  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/doctor/getFutureAppointments",
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        this.setState({ citasProximas: response.data.result });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }

  render() {
    const { citasProximas } = this.state;

    const data = citasProximas.map((cita, index) => ({
      key: cita.id,
      fecha: cita.startDate.substring(0, 10),
      hora: dayjs(cita.startDate).format("HH:mm") + " - " + dayjs(cita.endDate).format("HH:mm"),
      paciente: cita.Patient.name + " " + cita.Patient.lastName,
      detalle: <Link to={`/auth/doctor/citaDetail?citaId=${cita.id}`}>Ver Detalle</Link>,
    }));
    console.log(citasProximas);
    return (
      <div>
        <div className="content-info">
          <h1>Citas Pendientes</h1>
        </div>

        <div>
          {citasProximas ? (
            <div>
              <Table columns={columns} dataSource={data} />
            </div>
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    );
  }
}

