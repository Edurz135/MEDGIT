import "./doctorPerfilPage.styles.css";
import { Table, Typography, Checkbox, Button, TimePicker } from "antd";
import { LocalStorageServices } from "../../../../services";
import { useEffect, useState } from "react";
import axios from "axios";
const { Title, Text } = Typography;
const dayjs = require("dayjs");

async function getDisponibility() {
  const accessToken = LocalStorageServices.GetData("accessToken");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getDisponibility",
    headers: {
      Authorization: accessToken,
    },
  };

  const resp = axios
    .request(config)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
  return resp;
}

async function updateDisponibility(data) {
  const accessToken = LocalStorageServices.GetData("accessToken");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/updateDisponibility",
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const initialData = {
  mondayDisponibility: "1111111111111111000000000000",
  tuesdayDisponibility: "1111111111111111000000000000",
  wednesdayDisponibility: "1111111111111110000000000000",
  thursdayDisponibility: "1111111111111111000000000000",
  fridayDisponibility: "1111111111111111000000000000",
  saturdayDisponibility: "0000000000000000000000000000",
  sundayDisponibility: "0000000000000000000000000000",
};

function DoctorPerfilPage() {
  const [dataSource, setDataSource] = useState([]);
  const [disponibility, setDisponibility] = useState(initialData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDisponibility();
      return await data;
    };

    fetchData().then(() => {
      const initialDisponibility = {};
      for (const day in initialData) {
        initialDisponibility[day] = parseDisponibilityToTime(initialData[day]);
      }
      setDisponibility(initialDisponibility);
    });
  }, []);

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 8).concat(range(23, 24)),
    };
  }
  const saveChanges = () => {
    // You can now send the updated disponibility object to your API
    // for example, using the `updateDisponibility` function
    console.log("Updated Disponibility:", disponibility);
  };

  const handleTimePickerChange = (day, value) => {
    setDisponibility((prevDisponibility) => ({
      ...prevDisponibility,
      [day]: value,
    }));
  };

  const parseDisponibilityToTime = (disponibilityStr) => {
    const timeArray = [];
    for (let i = 0; i < disponibilityStr.length; i++) {
      if (disponibilityStr[i] === "1") {
        timeArray.push(8 + i / 2); // Convert index to hours (e.g., 0 => 8, 1 => 8.5, 2 => 9, etc.)
      }
    }
    return timeArray.map((hour) => `${Math.floor(hour)}:${(hour % 1) * 60}`);
  };

  return (
    <div>
      <div class="content-info">
        <h1>Perfil</h1>
      </div>

      <div>
        <p>Esta es su página de perfil</p>
      </div>
      <Title>Disponibilidad Semanal</Title>

      {Object.keys(disponibility).map((day) => {
        console.log("ASDFASDF", dayjs(disponibility[day][0]));
        return (
          <div key={day}>
            <Text strong>{day}</Text>
            <TimePicker.RangePicker
              minuteStep={30}
              format={"HH:mm"}
              disabledTime={disabledDateTime}
              hideDisabledOptions
              inputReadOnly={true}
              onChange={(value) => handleTimePickerChange(day, value)}
              defaultValue={dayjs(disponibility[day][0], "HH:mm")}
            />
          </div>
        );
      })}
      <div>
        <Button onClick={saveChanges}>Guardar Cambios</Button>
      </div>
      {/* <Text>Lunes</Text>
      <TimePicker.RangePicker
        id="Lunes"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker>
      <br />
      <Text>Martes</Text>
      <TimePicker.RangePicker
        id="Martes"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker>
      <br />
      <Text>Miércoles</Text>
      <TimePicker.RangePicker
        id="Miércoles"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker>
      <br />
      <Text>Jueves</Text>
      <TimePicker.RangePicker
        id="Jueves"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker>
      <br />
      <Text>Sábado</Text>
      <TimePicker.RangePicker
        id="Sábado"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker>
      <br />
      <Text>Domingo</Text>
      <TimePicker.RangePicker
        id="Domingo"
        minuteStep={30}
        format={"HH:mm"}
        disabledTime={disabledDateTime}
        hideDisabledOptions
        inputReadOnly={true}
      ></TimePicker.RangePicker> */}
      {dataSource.length > 0 ? (
        <div>
          <Button onClick={() => {}}>Guardar Cambios</Button>
        </div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
}
