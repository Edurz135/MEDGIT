import "./laboratoryExamenPage.styles.css";
import {Tabs } from 'antd';
import React, { Component } from "react";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import {Table} from 'antd';
import axios from "axios";
import { LocalStorageServices } from "../../../../services";
import dayjs from "dayjs";

const columns = [
  {
    title: 'Tipo',
    dataIndex: 'tipo',
    key: 'tipo',
    width: 250,
  },
  {
    title: 'Comentario',
    dataIndex: 'com',
    key: 'com',
  },
];

const handleButtonClick = (cita) => {
  // Lógica para manejar el clic en el botón aquí
  console.log('Botón clickeado para la cita:', cita);
};

export default class LaboratoryCitasPage extends Component{

  state = {
    citasPasadas: [], // Variable para almacenar los datos de la solicitud
    citasPasadas2: [],
  };



  async componentDidMount() {
    const accessToken = await LocalStorageServices.GetData("accessToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/labAnalyst/getPendingExaMeds",
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        this.setState({ citasPasadas: response.data.result });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

      

    
  }

  

  render(){

    const { citasPasadas } = this.state;

    const data = citasPasadas.map((cita, index) => ({
      key: index.toString(), // Puedes usar un valor único como índice para "key".
      tipo: cita.TipExMed.name, 
      com: cita.comment, 
    }));

  

  return (
    <div>
     
        <div class="content-info">
          <h1>Examenes</h1>
        </div>
     
  
    
      <div>
        <p>Esta es su página de examenes </p>
      </div>

      <Table columns={columns} dataSource={data} />

      
    </div>

    
    
  );

  }
}