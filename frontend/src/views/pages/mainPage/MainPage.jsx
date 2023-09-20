import React from "react";
import { Button, Row, Col, Divider } from "antd";
import landingImageSmall from "../../../imgs/landingImageSmall.png";
import "./main.style.css";

export default function MainPage({ ...props }) {
  return (
    <div className="container">
      <div className="bg">
        <img src={landingImageSmall}></img>
      </div>
      <Col className="content" span={12}>
        <Row>
          <Col className="logo">MedGit</Col>
        </Row>
        <Row justify="center">
          <Col span={16} className="title">
            La Plataforma Dedicada a tu Cuidado
          </Col>
          <Col span={16} className="description">
            Una plataforma que centraliza los historiales clínicos para los
            doctores
          </Col>
          <Divider />
          <Col span={16}>
            <Button type="primary">Sign In</Button>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
