import React, { useEffect } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";

export default function HistorialClinico(props) {

  useEffect(() => {
    console.log(props.data)
    // hacer una consulta de citas pasadas
  }, [])
  return (
    <div>
      <p></p>
      <Card
        title="Tipo de Cita"
        bordered={true}
        headStyle={{
          background: "#3E5BA5",
          color: "white",
        }}
        style={{
          boxShadow: "0px 6px 8px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>Cita en (especialidad)</p>
        <p>#informacion del examen medico</p>
      </Card>
    </div>
  );
}
