import "./doctorHistorialPage.styles.css";
import React, { Component } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import {Table} from 'antd';
import dayjs from "dayjs";

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
    title: 'Paciente',
    dataIndex: 'paciente',
    key: 'paciente',
    width: 250,
  },
  {
    title: 'Diagnóstico',
    dataIndex: 'diagnostico',
    key: 'diagnostico',
  },
];

const handleButtonClick = (cita) => {
  // Lógica para manejar el clic en el botón aquí
  console.log('Botón clickeado para la cita:', cita);
};


export default class DoctorHistorialPage extends Component {
  state = {
    citasPasadas: [], // Variable para almacenar los datos de la solicitud
  };

  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/doctor/getPastAppointments",
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
      fecha: cita.startDate.substring(0, 10),
      hora: dayjs(cita.startDate).format("HH:mm") + " - " + dayjs(cita.endDate).format("HH:mm"),
      paciente: cita.Patient.name + " " + cita.Patient.lastName,
      diagnostico: (
        <div className="contenedorDiagnostico">
          <p>{cita.diagnostic}</p>
          <button className="btnDetalles" onClick={() => handleButtonClick(cita)}>Ver detalles</button>
        </div>
      ),
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
