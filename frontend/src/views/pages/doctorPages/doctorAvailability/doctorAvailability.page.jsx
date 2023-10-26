// import "./doctorCitasPage.styles.css";

import { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { LocalStorageServices } from "../../../../services";
import axios from "axios";
import { Intervals } from "../../../../utils/constant";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton.component";
const { Title, Text } = Typography;

async function getAvailability() {
  const accessToken = LocalStorageServices.GetData("accessToken");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getAvailability",
    headers: {
      Authorization: accessToken,
    },
  };

  const resp = await axios
    .request(config)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
  return resp;
}

const Headers = [
  "HORARIO",
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

export default function DoctorAvailabilityPage() {
  const [availability, setAvailability] = useState({});

  const HandleToggle = (key, idx, state) => {
    console.log(key, idx, state)
  }

  useEffect(() => {
    const fetchAvailability = async () => {
      return await getAvailability();
    };

    fetchAvailability().then((availability) => {
      setAvailability(availability);
    });
  }, []);
  return (
    <div>
      <Title>Disponibilidad de atención</Title>
      <Row gutter={16}>
        {Headers.map((val, idx) => {
          return (
            <Col span={3}>
              <Button type="text" block>
                <Text strong>{val}</Text>
              </Button>
            </Col>
          );
        })}
      </Row>
      <Divider style={{ marginTop: "5px", marginBottom: "15px" }} />
      <Row gutter={16}>
        <Col span={3}>
          {Intervals.map((val, idx) => {
            return (
              <Button type="text" block>
                {val}
              </Button>
            );
          })}
        </Col>
        {availability == {} ? (
          <div>Cargando...</div>
        ) : (
          Object.keys(availability).map((key, idx) => {
            const curAvailability = availability[key];
            const chars = curAvailability.split("");
            return (
              <Col span={3}>
                {chars.map((char, idx) => {
                  const curState = char == "1" ? true : false;
                  return (
                    <ToggleButton
                      defaultState={curState}
                      onToggle={(state) => {
                        HandleToggle(key, idx, state);
                      }}
                    />
                  );
                })}
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
}
