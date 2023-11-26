/* import React, { Component } from 'react';
import axios from 'axios';

class PatientPendingDetails extends Component {
  state = {
    citaDetails: null,
  };

  componentDidMount() {
    const { appointmentId } = this.props.match.params;
    axios.get(`/api/patient/getAppointmentDetails/${appointmentId}`)
      .then(response => {
        this.setState({ citaDetails: response.data });
      })
      .catch(error => {
        console.error('Error fetching appointment details:', error);
      });
  }

  render() {
    const { citaDetails } = this.state;

    if (!citaDetails) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{citaDetails.tipo} - {citaDetails.doctor}</h2>
        <p>{citaDetails.fecha} de {citaDetails.horaInicio} a {citaDetails.horaFin}</p>
        <p>Diagnóstico: {citaDetails.diagnostico}</p>
      </div>
    );
  }
}

export default PatientPendingDetails; */
// Dentro de PatientPendingDetails.js
/*import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import { LocalStorageServices } from "../../../../services";
import { useParams } from 'react-router-dom';

const PatientPendingDetails2 = async (AppointmentId)=>{
  const accessToken = await LocalStorageServices.GetData("accessToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/patient/getAppointmentDetails",
      headers: {
        Authorization: accessToken,
      },
      AppointmentId:AppointmentId
    }
    
      const resp =await axios
      .request(config)
      .then((response) => {
        return (response.data.result);
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos de la cita:", error);
      });
      return resp;

    
    
}
export default function PatientCitasDetails(){
  const [citaDetails, setCitaDetails] = useState(null);
  useEffect(()=>{
    const fetchAppointmentDetails = async ()=>{
      return await PatientPendingDetails2();
    }
    fetchAppointmentDetails().then((citaDetails)=>{
      setCitaDetails(citaDetails);
    });
  },[]);
  return (
    <div>
      <h2>AAAAAAAAAAAAAaas - {citaDetails}</h2>
      
    </div>
  );
}

const PatientPendingDetails = () => {
  const [citaDetails, setCitaDetails] = useState(null);
  const { appointmentId } = useParams();
  console.log(appointmentId);
  useEffect(() => {
    axios.get(`/api/patient/getAppointmentDetails/${appointmentId}`)
      .then(response => {
        setCitaDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointment details:', error);
      });
  }, [appointmentId]);

  if (!citaDetails) {
    return <div>Loading mis citas ...</div>;
  }

  return (
    <div>
      <h2>{citaDetails.tipo} - {citaDetails.doctor}</h2>
      <p>{citaDetails.fecha} de {citaDetails.horaInicio} a {citaDetails.horaFin}</p>
      <p>Diagnóstico: {citaDetails.diagnostico}</p>
    </div>
  );
}*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LocalStorageServices } from "../../../../services";

export default function PatientCitasDetails() {
  const [citaDetails, setCitaDetails] = useState(null);
  const { appointmentId } = useParams();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const accessToken = await LocalStorageServices.GetData("accessToken");
        const response = await axios.get(`http://localhost:3100/api/patient/getAppointmentDetails/${appointmentId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setCitaDetails(response.data.result);
      } catch (error) {
        console.error("Error al obtener datos de la cita:", error);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  if (!citaDetails) {
    return <div>Loading mis citas ...</div>;
  }

  return (
    <div>
      <h2>Cita con doctor: {citaDetails.doctorId}</h2>
      <p>{/*{citaDetails.fecha} de*/} {citaDetails.startDate} a {citaDetails.endDate}</p>
      <p>Diagnóstico: </p>
      <p>Aún no se realiza</p>
    </div>
  );
}
