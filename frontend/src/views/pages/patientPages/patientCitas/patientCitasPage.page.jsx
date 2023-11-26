import "./patientCitasPage.styles.css";
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
    width: 200,
  },
  {
    title: "Hora",
    dataIndex: "hora",
    key: "hora",
    width: 150,
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
    width: 200,
  },
  {
    title: "Detalle",
    dataIndex: "detalle",
    key: "detalle",
    width: 100,
    render: (text, record) => (
    <Link to={`../patientCitasDetails/patientCitasDetails.page`}>Ver Detalle</Link>    ),
    /*<Link to={`/patientCitasDetails/${record.key}`}>Ver Detalle</Link>),*/
  },
];

export default class PatientCitasPage extends Component {
  state = {
    citasProximas: [], // Variable para almacenar los datos de la solicitud
  };

  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/patient/getFutureAppointments",
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
      doctor: cita.Doctor.name + " " + cita.Doctor.lastName,
      //detalle: cita.id
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
