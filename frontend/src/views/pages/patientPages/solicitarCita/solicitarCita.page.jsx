// import "./patientPerfilPage.styles.css";
import { Row, Typography, Select, Divider } from "antd";
import AppointmentCard from "../../../../components/appointmentCard/AppointmentCard";
import { useEffect, useState } from "react";
import { LocalStorageServices } from "../../../../services";
import axios from "axios";
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

export default function SolicitarCitaPage() {
  const [listSpecialties, setListSpecialties] = useState([]);
  const [specialtyId, setSpecialtyId] = useState(-1);
  const [listDoctors, setListDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(-1);
  const [availabilityList, setAvailabilityList] = useState([]);

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

  const handleSpecialtySelect = (value) => {
    setSpecialtyId(value);
    UpdateAvailabilityList(doctorId, value);
  };
  const HandleDoctorSelect = (value) => {
    setDoctorId(value);
    UpdateAvailabilityList(value, specialtyId);
  };

  useEffect(() => {
    getListOfDoctors().then(UpdateDoctorSelect);
    getListOfSpecialties().then(UpdateSpecialtySelect);
    UpdateAvailabilityList(doctorId, specialtyId);
  }, []);

  return (
    <div>
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
      <br/>
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
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={8}
                id={idx}
                name={temp.name + " " + temp.lastName}
                specialty={temp.Specialty.name}
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
