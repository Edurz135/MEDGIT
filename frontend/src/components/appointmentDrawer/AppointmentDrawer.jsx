import React, { useEffect } from "react";
import { Button, Card, Col, Divider, Row, Typography, Drawer } from "antd";
const { Text, Title } = Typography;
import dayjs from 'dayjs';
import { Calendar } from 'antd';

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

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        }
      ];
      break;
    default:
  }
  return listData || [];
};

export default function AppointmentDrawer(props) {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
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
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Drawer
      title={"Generar cita con: " + getFullName()}
      placement="right"
      onClose={props.onClose}
      open={props.open}
      size="large"
    >
      {props.data == undefined ? <>Null</> :
        <>
          {props.data.Specialty.name}
          <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} cellRender={dateCellRender} />
        </>
      }
    </Drawer>
  );
}
