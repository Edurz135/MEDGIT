import "./patientHistorialPage.styles.css";
import React, { Component } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";

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

    return (
      <div>
        <div className="content-info">
          <h1>Historial</h1>
        </div>

        <div>
          {citasPasadas ? (
            <div>
            <p>Historial clínico:</p>

            {/* Renderiza una tabla con los atributos "date", "time", "type" y "diagnostic" */}
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Tipo</th>
                  <th>Diagnóstico</th>
                </tr>
              </thead>
              <tbody>
                {citasPasadas.map((cita, index) => (
                  <tr key={index}>
                    <td>{cita.date}</td>
                    <td>{cita.time}</td>
                    <td>{cita.type}</td>
                    <td>{cita.diagnostic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    );
  }
}
