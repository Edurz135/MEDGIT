import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Typography,
  Drawer,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { Calendar } from "antd";
import { LocalStorageServices } from "../../services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AppointmentDrawer.css";
const { Text, Title } = Typography;

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

async function bookAppointment(appointmentId) {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/patient/bookAppointment",
    headers: {
      Authorization: accessToken,
    },
    data: {
      appointmentId: appointmentId,
    },
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

export default function AppointmentDrawer(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState(() => dayjs());
  const [dataSelected, setDataSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const onSelect = (newValue) => {
    setValue(newValue);
    const calendarDay = newValue.format("DD/MM/YYYY");
    if (props.appointmentData == null) {
      setDataSelected([]);
    } else {
      setDataSelected(props.appointmentData[calendarDay] || []);
    }
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  function getFullName() {
    if (props.data == null) return "";
    return props.data.name + " " + props.data.lastName;
  }

  function getSpecialty() {
    if (props.data == null) return "";
    return props.data.Specialty.name;
  }

  const dateCellRender = (value) => {
    if (props.appointmentData == null) return <></>;
    const appointmentsGroupByDay = props.appointmentData;
    const calendarDay = value.format("DD/MM/YYYY");

    const appointmentsOfDay = appointmentsGroupByDay[calendarDay];
    if (appointmentsOfDay != null) {
      return (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Text
            style={{
              backgroundColor: "#1777fe",
              color: "white",
              padding: "0px 10px",
              borderRadius: "5px",
            }}
          >
            {appointmentsOfDay.length || 0} citas
          </Text>
        </div>
      );
    }
    return <></>;
  };

  // Retornar los días no permitidos (desde ayer hacia el pasado)
  function disabledDate(current) {
    const yesterday = dayjs().subtract(1, "day").endOf("day").valueOf();
    return current.valueOf() < yesterday;
  }

  const HandleBooking = async () => {
    if (selectedAppointment == null) return;
    bookAppointment(selectedAppointment.id).then((resp) => {
      console.log(resp);
      setModalText(resp.message || "Error");
      showModal();
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate(0);
  };

  return (
    <Drawer
      title={"Generar cita con: " + getFullName() + " - " + getSpecialty()}
      placement="right"
      onClose={props.onClose}
      open={props.open}
      size="large"
    >
      <Modal
        title="Reserva de cita"
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
      {props.data == undefined ? (
        <>Null</>
      ) : (
        <>
          <Calendar
            fullscreen={true}
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
            mode="month"
            disabledDate={disabledDate}
          />
          <Divider />
          <Title level={4}>Citas del día: </Title>
          {dataSelected.length == 0 ? (
            <div>Seleccione una fecha</div>
          ) : (
            dataSelected.map((appointment, idx) => {
              const startTime = dayjs(appointment.startDate).format("HH:mm");
              const endTime = dayjs(appointment.endDate).format("HH:mm");
              const intervalTime = startTime + " - " + endTime;
              console.log(appointment);
              if (appointment.state == 0) {
                return (
                  <Button
                    style={{ margin: "5px 10px" }}
                    onClick={() => {
                      setSelectedAppointment(appointment);
                    }}
                  >
                    {intervalTime}
                  </Button>
                );
              } else {
                return (
                  <Button style={{ margin: "5px 10px" }} disabled>
                    {intervalTime}
                  </Button>
                );
              }
            })
          )}
        </>
      )}
      {selectedAppointment == null ? (
        <></>
      ) : (
        <Col>
          <Divider />

          <Title level={4}> Reservar cita: </Title>
          <Typography>
            Día: {dayjs(selectedAppointment.startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            Hora inicio: {dayjs(selectedAppointment.startDate).format("HH:mm")}
          </Typography>
          <Typography>
            Hora fin: {dayjs(selectedAppointment.endDate).format("HH:mm")}
          </Typography>
          <br/>
          <Button onClick={HandleBooking} type="primary">
            Reservar
          </Button>
        </Col>
      )}
    </Drawer>
  );
}
