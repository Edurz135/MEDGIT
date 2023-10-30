import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Typography, Drawer } from "antd";
import dayjs from "dayjs";
import { Calendar } from "antd";
import { LocalStorageServices } from "../../services";
import axios from "axios";
const { Text, Title } = Typography;

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

  const dateCellRender = (value) => {
    if (props.appointmentData == null) return <></>;
    const appointmentsGroupByDay = props.appointmentData;
    const calendarDay = value.format("DD/MM/YYYY");

    const appointmentsOfDay = appointmentsGroupByDay[calendarDay];
    if (appointmentsOfDay != null) {
      return (
        <Text
          style={{
            backgroundColor: "#1777fe",
            color: "white",
            padding: "2px 10px",
            borderRadius: "5px",
          }}
        >
          {appointmentsOfDay.length || 0} citas
        </Text>
      );
    }
    return <></>;
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current.valueOf() < Date.now();
  }

  const HandleBooking = async () => {
    if (selectedAppointment == null) return;
    bookAppointment(selectedAppointment.id).then((resp) => {
      console.log(resp)
      setModalText(resp.message || "Error");
      showModal();
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Drawer
      title={"Generar cita con: " + getFullName()}
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
          {props.data.Specialty.name}
          <Calendar
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
            mode="month"
            disabledDate={disabledDate}
          />
          <Title level={4}>Citas del día: </Title>
          {dataSelected.length == 0 ? (
            <div>Seleccione una fecha</div>
          ) : (
            dataSelected.map((appointment, idx) => {
              const startTime = dayjs(appointment.startDate).format("HH:mm");
              const endTime = dayjs(appointment.endDate).format("HH:mm");
              const intervalTime = startTime + " - " + endTime;
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
            })
          )}
        </>
      )}
      {selectedAppointment == null ? (
        <></>
      ) : (
        <Col>
          <Title level={4}> Cita: </Title>
          <Typography>
            Día: {dayjs(selectedAppointment.startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            Hora inicio: {dayjs(selectedAppointment.startDate).format("HH:mm")}
          </Typography>
          <Typography>
            Hora fin: {dayjs(selectedAppointment.endDate).format("HH:mm")}
          </Typography>
          <Button onClick={HandleBooking} type="primary">
            Reservar
          </Button>
        </Col>
      )}
    </Drawer>
  );
}
