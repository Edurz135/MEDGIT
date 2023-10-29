// import "./patientPerfilPage.styles.css";
import { Row, Typography, Select, Divider, Drawer, Button } from "antd";
import AppointmentCard from "../../../../components/appointmentCard/AppointmentCard";
import { useEffect, useState } from "react";
import { LocalStorageServices } from "../../../../services";
import axios from "axios";
import AppointmentDrawer from "../../../../components/appointmentDrawer/AppointmentDrawer";
const { Title, Text } = Typography;

// ENDPOINTS
// NOOOOOO getDoctores
// getEspecialidades
// getDiasAtención
// getCitas(diasDeAtencion, Especialidad, Doctor)
async function getListOfDoctors() {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/patient/listDoctors",
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

async function getListOfSpecialties() {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/patient/listSpecialties",
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

async function getAvailabilityList(doctorId, specialtyId) {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/patient/availabilityList",
    headers: {
      Authorization: accessToken,
    },
    data: {
      doctorId: doctorId,
      specialtyId: specialtyId,
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

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function PatientAppointmentBookingPage() {
  const [listSpecialties, setListSpecialties] = useState([]);
  const [specialtyId, setSpecialtyId] = useState(-1);
  const [listDoctors, setListDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(-1);
  const [availabilityList, setAvailabilityList] = useState([]);

  const [curAppointmentData, setCurAppointmentData] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const UpdateDoctorSelect = (result) => {
    const data = result.map((doctor) => {
      return {
        value: String(doctor.id),
        label: doctor.name + " " + doctor.lastName,
      };
    });
    let temp = [
      {
        value: "-1",
        label: "Todos",
      },
    ];
    temp = temp.concat(data);
    setListDoctors(temp);
  };

  const UpdateSpecialtySelect = (result) => {
    const data = result.map((specialty) => {
      return {
        value: String(specialty.id),
        label: specialty.name,
      };
    });
    let temp = [
      {
        value: "-1",
        label: "Todos",
      },
    ];
    temp = temp.concat(data);
    setListSpecialties(temp);
  };

  const UpdateAvailabilityList = async (doctorId, specialtyId) => {
    const data = await getAvailabilityList(doctorId, specialtyId);
    setAvailabilityList(data);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
    setCurAppointmentData(null);
  };

  const handleSpecialtySelect = (value) => {
    setSpecialtyId(value);
    UpdateAvailabilityList(doctorId, value);
  };
  const HandleDoctorSelect = (value) => {
    setDoctorId(value);
    UpdateAvailabilityList(value, specialtyId);
  };
  const HandleAppointmentCardSelected = (value, id) => {
    setCurAppointmentData(value);
    console.log(value)
    showDrawer();
  };

  useEffect(() => {
    getListOfDoctors().then(UpdateDoctorSelect);
    getListOfSpecialties().then(UpdateSpecialtySelect);
    UpdateAvailabilityList(doctorId, specialtyId);
  }, []);

  return (
    <div>
      <AppointmentDrawer
        data={curAppointmentData}
        open={openDrawer}
        onClose={onClose}
      />
      <Title>Generar nueva cita</Title>
      <Text strong>Especialidades: </Text>
      <Select
        showSearch
        style={{
          marginLeft: "1rem",
          width: 200,
        }}
        defaultValue="Todos"
        placeholder="Especialidades"
        optionFilterProp="children"
        filterOption={filterOption}
        options={listSpecialties}
        onChange={handleSpecialtySelect}
      />
      <br />
      <Text strong>Doctores: </Text>
      <Select
        showSearch
        style={{
          marginLeft: "1rem",
          width: 200,
        }}
        defaultValue="Todos"
        placeholder="Doctor"
        optionFilterProp="children"
        filterOption={filterOption}
        options={listDoctors}
        onChange={HandleDoctorSelect}
      />
      <Divider />
      <Row gutter={[24, 24]}>
        {availabilityList.length > 0 ? (
          availabilityList.map((temp, idx) => {
            return (
              <AppointmentCard
                key={idx}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={8}
                id={temp.id}
                data={temp}
                name={temp.name + " " + temp.lastName}
                specialty={temp.Specialty.name}
                onClick={HandleAppointmentCardSelected}
              />
            );
          })
        ) : (
          <div>Vacio </div>
        )}
      </Row>
    </div>
  );
}
