import "./patientHistorialPage.styles.css";
import React, { Component } from 'react';
import axios from 'axios';
import { LocalStorageServices } from "../../../../services";
import { ConstantLocalStorage } from "../../../../utils/constant";


export default class PatientHistorialPage extends Component {
  state = {
    citasPasadas: null, // Variable para almacenar los datos de la solicitud
  };


  componentDidMount() {
    const token = LocalStorageServices.GetData(ConstantLocalStorage.token_key);
    axios.get('/api/patient/pastGetAppointments', token)
      .then(response => {
        this.setState({ citasPasadas: response.data });
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
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
