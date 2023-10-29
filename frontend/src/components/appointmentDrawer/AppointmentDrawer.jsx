import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Row, Typography, Drawer } from "antd";
import dayjs from "dayjs";
import { Calendar } from "antd";
const { Text, Title } = Typography;

// {
//     "id": 464,
//     "name": "Miguel",
//     "lastName": "Condori",
//     "email": "Miguel@gmail.com",
//     "password": "$2b$10$jnxPwaPM067JAQycXg0vlOAdQ7B5uzgX2DGoPq7y9t10aX0f8ZAwO",
//     "identityDoc": 12345678,
//     "nroColegiatura": null,
//     "gender": "Masculino",
//     "phone": 999999999,
//     "mondayDisponibility": "001110110000",
//     "tuesdayDisponibility": "001110110000",
//     "wednesdayDisponibility": "001110110000",
//     "thursdayDisponibility": "001110110000",
//     "fridayDisponibility": "001110110000",
//     "saturdayDisponibility": "000000000000",
//     "sundayDisponibility": "000000000000",
//     "createdAt": "2023-10-28T13:31:35.992Z",
//     "updatedAt": "2023-10-28T13:31:35.992Z",
//     "SpecialtyId": 4,
//     "Specialty": {
//         "name": "Gineco obstetricia"
//     },
//     "Appointments": [
//         {
//             "id": 2007,
//             "startDate": "2023-10-23T15:00:49.344Z",
//             "endDate": "2023-10-23T16:00:49.344Z",
//             "intervalDigit": 2,
//             "state": 0,
//             "diagnostic": null,
//             "createdAt": "2023-10-28T13:31:49.345Z",
//             "updatedAt": "2023-10-28T13:31:49.345Z",
//             "PatientId": null,
//             "DoctorId": 464
//         },
//         {
//             "id": 2009,
//             "startDate": "2023-10-23T17:00:49.344Z",
//             "endDate": "2023-10-23T18:00:49.344Z",
//             "intervalDigit": 4,
//             "state": 0,
//             "diagnostic": null,
//             "createdAt": "2023-10-28T13:31:49.345Z",
//             "updatedAt": "2023-10-28T13:31:49.345Z",
//             "PatientId": null,
//             "DoctorId": 464
//         },
//     ]
// }

export default function AppointmentDrawer(props) {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());

  const getListData = (value) => {
    if (props.data == null) return "";
    // console.log(props)
    let listData;
    switch (value.format('DD/MM/YYYY')) {
      case "28/10/2023":
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  function getFullName() {
    if (props.data == null) return "";
    return props.data.name + " " + props.data.lastName;
  }

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return listData.map((item) => <Typography>{item.content}</Typography>);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current.valueOf() < Date.now();
  }

  return (
    <Drawer
      title={"Generar cita con: " + getFullName()}
      placement="right"
      onClose={props.onClose}
      open={props.open}
      size="large"
    >
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
        </>
      )}
    </Drawer>
  );
}
