import "./patientHistorialPage.styles.css";
import React, { Component } from "react";
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import { ConstantLocalStorage } from "../../../../utils/constant";

export default class PatientHistorialPage extends Component {
  state = {
    citasPasadas: [], // Variable para almacenar los datos de la solicitud
  };

  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let data = JSON.stringify({
      token: accessToken,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/patient/pastGetAppointments",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        this.setState({ citasPasadas:  response.data.result });
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

              {/* Renderiza la lista de citas pasadas */}
              <ul>
                {citasPasadas.map((cita, index) => (
                  <li key={index}>{cita.date}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    );
  }
}



