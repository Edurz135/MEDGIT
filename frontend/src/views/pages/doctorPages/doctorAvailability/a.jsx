// const intervals = [
//   "8:00 - 8:30",
//   "8:30 - 9:00",
//   "9:00 - 9:30",
//   "9:30 - 10:00",
//   "10:00 - 10:30",
//   "10:30 - 11:00",
//   "11:00 - 11:30",
//   "11:30 - 12:00",
//   "12:00 - 12:30",
//   "12:30 - 13:00",
//   "13:00 - 13:30",
//   "13:30 - 14:00",
//   "14:00 - 14:30",
//   "14:30 - 15:00",
//   "15:00 - 15:30",
//   "15:30 - 16:00",
//   "16:00 - 16:30",
//   "16:30 - 17:00",
//   "17:00 - 17:30",
//   "17:30 - 18:00",
//   "18:00 - 18:30",
//   "18:30 - 19:00",
//   "19:00 - 19:30",
//   "19:30 - 20:00",
//   "20:00 - 20:30",
//   "20:30 - 21:00",
//   "21:00 - 21:30",
//   "21:30 - 22:00",
// ];

// const columns = [
//   {
//     title: "Horario",
//     dataIndex: "hour",
//     key: "hour",
//   },
//   {
//     title: "Lunes",
//     dataIndex: "mondayDisponibility",
//     key: "mondayDisponibility",
//   },
//   {
//     title: "Martes",
//     dataIndex: "tuesdayDisponibility",
//     key: "tuesdayDisponibility",
//   },
//   {
//     title: "Miércoles",
//     dataIndex: "wednesdayDisponibility",
//     key: "wednesdayDisponibility",
//   },
//   {
//     title: "Jueves",
//     dataIndex: "thursdayDisponibility",
//     key: "thursdayDisponibility",
//   },
//   {
//     title: "Viernes",
//     dataIndex: "fridayDisponibility",
//     key: "fridayDisponibility",
//   },
//   {
//     title: "Sábado",
//     dataIndex: "saturdayDisponibility",
//     key: "saturdayDisponibility",
//   },
//   {
//     title: "Domingo",
//     dataIndex: "sundayDisponibility",
//     key: "sundayDisponibility",
//   },
// ];

// function DoctorPerfilPage() {
//   const [dataSource, setDataSource] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       return await getDisponibility();
//     };

//     fetchData().then(async (disponibilityData) => {
//       const data = await intervals.map((interval, index) => {
//         const dataSourceItem = { key: (index + 1).toString(), hour: interval };

//         for (const day of [
//           "monday",
//           "tuesday",
//           "wednesday",
//           "thursday",
//           "friday",
//           "saturday",
//           "sunday",
//         ]) {
//           dataSourceItem[`${day}Disponibility`] =
//             disponibilityData[`${day}Disponibility`][index] == "1";
//         }

//         return dataSourceItem;
//       });
//       await setDataSource(data);
//     });
//   }, []);

//   const handleCheckboxChange = (day, index) => {
//     setDataSource((prevDataSource) => {
//       const updatedDataSource = [...prevDataSource];
//       updatedDataSource[index][day] =
//         !updatedDataSource[index][`${day}Disponibility`];
//       return updatedDataSource;
//     });
//   };

//   const handleSaveChanges = async () => {
//     const updatedDisponibilityData = await {
//       mondayDisponibility: dataSource
//         .map((item) => (item.mondayDisponibility ? "1" : "0"))
//         .join(""),
//       tuesdayDisponibility: dataSource
//         .map((item) => (item.tuesdayDisponibility ? "1" : "0"))
//         .join(""),
//       wednesdayDisponibility: dataSource
//         .map((item) => (item.wednesdayDisponibility ? "1" : "0"))
//         .join(""),
//       thursdayDisponibility: dataSource
//         .map((item) => (item.thursdayDisponibility ? "1" : "0"))
//         .join(""),
//       fridayDisponibility: dataSource
//         .map((item) => (item.fridayDisponibility ? "1" : "0"))
//         .join(""),
//       saturdayDisponibility: dataSource
//         .map((item) => (item.saturdayDisponibility ? "1" : "0"))
//         .join(""),
//       sundayDisponibility: dataSource
//         .map((item) => (item.sundayDisponibility ? "1" : "0"))
//         .join(""),
//     };
//     console.log(dataSource);
//     console.log(updatedDisponibilityData);
//     // Now you can send updatedDisponibilityData to your server
//     // updateDisponibility(updatedDisponibilityData);
//   };

//   return (
//     <div>
//       <div class="content-info">
//         <h1>Perfil</h1>
//       </div>

//       <div>
//         <p>Esta es su página de perfil</p>
//       </div>
//       <Title>Disponibilidad Semanal</Title>
//       {dataSource.length > 0 ? (
//         <div>
//           <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
//           <Table
//             pagination={{ pageSize: 50 }}
//             size="small"
//             dataSource={dataSource}
//             columns={columns.map((column) => {
//               if (column.key !== "hour") {
//                 return {
//                   ...column,
//                   render: (text, record, index) => (
//                     <Checkbox
//                       defaultChecked={text}
//                       onChange={() => handleCheckboxChange(column.key, index)}
//                     />
//                   ),
//                 };
//               }
//               return column;
//             })}
//           />
//         </div>
//       ) : (
//         <div>Loading ... </div>
//       )}
//     </div>
//   );
// }
