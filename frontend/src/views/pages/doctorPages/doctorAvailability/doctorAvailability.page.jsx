import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Divider, Modal } from "antd";
import { LocalStorageServices } from "../../../../services";
import axios from "axios";
import { Intervals } from "../../../../utils/constant";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton.component";
const { Title, Text } = Typography;

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

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

async function updateAvailability(data) {
  const accessToken = LocalStorageServices.GetData("accessToken");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/updateAvailability",
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };

  const resp = await axios
    .request(config)
    .then((response) => {
      return response.data;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const navigate = useNavigate();

  const HandleReturn = () => {
    navigate("/auth/doctor/perfil");
  };

  const HandleToggle = (key, idx, state) => {
    const modifiedDay = availability[key].replaceAt(idx, state ? "1" : "0");
    const newAvailability = { ...availability, [key]: modifiedDay };
    setAvailability(newAvailability);
  };

  const HandleSave = async () => {
    updateAvailability(availability).then((resp) => {
      setModalText(resp.message);
      showModal();
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

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
      <Modal
        title="Disponibilidad de atención"
        open={isModalOpen}
        onCancel={handleOk}
        footer={
          <Button type="primary" onClick={handleOk}>
            Ok
          </Button>
        }
      >
        {modalText}
      </Modal>
      <Title>Disponibilidad de atención semanal</Title>
      <Text>
        Tenga en cuenta que la disponibilidad de citas se actualiza todos los
        domingos conforme a la programación que se muestra aquí.
      </Text>
      <br />
      <br />
      <Row gutter={16}>
        <Col>
          <Button type="primary" onClick={HandleSave}>
            Guardar Cambios
          </Button>
        </Col>
        <Col>
          <Button onClick={HandleReturn}>Regresar</Button>
        </Col>
      </Row>
      <br />
      <Row gutter={10}>
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
      <Row gutter={10}>
        <Col span={3}>
          {Intervals.map((val, idx) => {
            return (
              <Button type="text" block style={{ margin: "4px 0px" }}>
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
