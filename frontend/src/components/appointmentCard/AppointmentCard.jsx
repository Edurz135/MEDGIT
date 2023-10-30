import React from "react";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
const { Text, Title } = Typography;
const { Meta } = Card;

const Label = (props) => {
  return (
    <Text
      style={{
        backgroundColor: props.color,
        borderRadius: "1rem",
        padding: "3px 10px",
      }}
    >
      {props.content}
    </Text>
  );
};

export default function AppointmentCard(props) {
  return (
    <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Card
        style={{
          boxShadow: "0px 10px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Title
          level={4}
          style={{
            color: "rgba(22,119,255,255)",
            lineHeight: "1rem",
            marginBottom: "1rem",
            marginTop: "0rem",
          }}
        >
          Médico: {props.name}
        </Title>
        <Row>
          <Label content={props.specialty} color="rgba(112,142,238, 0.3)" />
        </Row>
        {/* <Row style={{ marginTop: "0.5rem" }}>
          <Text>Días de atención: </Text>
        </Row> */}
        {/* <Row style={{ marginTop: "0.5rem" }}>
          <Label content="lunes" color="#f5f5f5" />
        </Row> */}
        <Divider style={{ margin: "10px 0px" }} />
        <Row justify="center">
          <Col>
            <Button
              type="primary"
              style={{ minWidth: "160px" }}
              onClick={() => {
                props.onClick(props.data, props.id);
              }}
            >
              Seleccionar
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
