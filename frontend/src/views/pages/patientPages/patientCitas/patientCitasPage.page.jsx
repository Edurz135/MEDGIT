import "./patientCitasPage.styles.css";
import React, { Component } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import {Table} from 'antd';

const columns = [
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha',
    width: 250,
  },
  {
    title: 'Hora',
    dataIndex: 'hora',
    key: 'hora',
    width: 150,
  },
  {
    title: 'Doctor',
    dataIndex: 'doctor',
    key: 'doctor',
    width: 250,
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
      fecha: cita.startDate.substring(0, 10),
      hora: cita.startDate,
      doctor: cita.Doctor.name + " " + cita.Doctor.lastName,
    }));

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
