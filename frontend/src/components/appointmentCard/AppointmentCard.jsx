import React from "react";
import { Button, Card, Col, Typography } from "antd";
const { Text } = Typography;

export default function AppointmentCard(props) {
  return (
    <Col span={8}>
      <Card title={props.name}>
        <Text strong>Especialidad: </Text>
        <Text
          style={{
            backgroundColor: "rgba(20,116,251, 0.3)",
            borderRadius: "1rem",
            padding: "2px 10px",
          }}
        >
          {props.specialty}
        </Text>
        <br />
        <Text strong>Días de atención: </Text>
        <Text
          style={{
            backgroundColor: "rgba(112,142,238, 0.3)",
            borderRadius: "1rem",
            padding: "2px 10px",
          }}
        >
          Lunes
        </Text>
        <Text
          style={{
            backgroundColor: "rgba(112,142,238, 0.3)",
            borderRadius: "1rem",
            padding: "2px 10px",
          }}
        >
          Martes
        </Text>
        <Text
          style={{
            backgroundColor: "rgba(112,142,238, 0.3)",
            borderRadius: "1rem",
            padding: "2px 10px",
          }}
        >
          Miércoles
        </Text>
        <div>
          <Button type="primary">Seleccionar</Button>
        </div>
      </Card>
    </Col>
  );
}
