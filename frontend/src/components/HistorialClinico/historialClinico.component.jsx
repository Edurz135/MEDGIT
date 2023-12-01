import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LocalStorageServices } from "../../services";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function HistorialClinico() {
  const [citaInfo, setCitaInfo] = useState(null);
  let query = useQuery();
  const citaId = query.get("citaId");

  useEffect(() => {
    const fetchCitaInfo = async () => {
      try {
        const accessToken = await LocalStorageServices.GetData("accessToken");
        const response = await axios.get(`http://localhost:3100/api/citas/${citaId}`, {
          headers: { Authorization: accessToken },
        });
        setCitaInfo(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la cita:", error);
      }
    };

    if (citaId) {
      fetchCitaInfo();
    }
  }, [citaId]);

  if (!citaInfo) {
    return <div>Cargando información de la cita...</div>;
  }

  return (
    <div>
      <Card
        title={`Tipo de Cita: ${citaInfo.tipoCita}`}
        bordered={true}
        headStyle={{
          background: "#3E5BA5",
          color: "white",
        }}
        style={{
          boxShadow: "0px 6px 8px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>Cita en: {citaInfo.especialidad}</p>
        <p>Información del examen médico: {citaInfo.informacionExamenMedico}</p>
      </Card>
    </div>
  );
}
