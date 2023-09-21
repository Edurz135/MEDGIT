import React from "react";
import { Button, Row, Col, Divider } from "antd";
import landingImageSmall from "../../../imgs/landingImageSmall.png";
import "./main.style.css";

export default function MainPage({ ...props }) {
  return (
    <Row className="container">
      <div className="bg">
        <img src={landingImageSmall}></img>
      </div>

      <Col span={24} className="header">
        <p className="logo">MedGit</p>
      </Col>
      <Col span={12} className="content">
        <Col span={24} className="title">
          <span>La Plataforma Dedicada a tu Cuidado</span>
        </Col>
        <Col span={24} className="description">
          <span>
            Una plataforma que centraliza los historiales clínicos para los
            doctores
          </span>
        </Col>
        <Divider/>
        <Col span={24}>
          <Button type="primary">Sign In</Button>
        </Col>
      </Col>
    </Row>
  );
}
