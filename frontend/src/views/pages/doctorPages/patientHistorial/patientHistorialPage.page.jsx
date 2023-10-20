import "./patientHistorialPage.styles.css";
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
    title: 'Tipo de Cita',
    dataIndex: 'tipo',
    key: 'tipo',
  },
  {
    title: 'Diagnóstico',
    dataIndex: 'diagnostico',
    key: 'diagnostico',
  },
];




export default class PatientHistorialPage extends Component {
  state = {
    citasPasadas: [], // Variable para almacenar los datos de la solicitud
  };

  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/patient/pastGetAppointments",
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        this.setState({ citasPasadas: response.data.result });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

      

    
  }

  render() {
    const { citasPasadas } = this.state;

    const data = citasPasadas.map((cita, index) => ({
      key: index.toString(), // Puedes usar un valor único como índice para "key".
      fecha: cita.date,
      hora: cita.time,
      tipo: cita.type,
      diagnostico: cita.diagnostic,
    }));

    return (
      <div>
        <div className="content-info">
          <h1>Historial</h1>
        </div>

        <div>
          {citasPasadas ? (
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
