
import React, { useState } from 'react';
import './doctorCitasDetails.styles.css';
import { Card, Button, Input, Space } from 'antd';
import axios from "axios";
import { LocalStorageServices } from "../../../../services";


const { TextArea } = Input;

const RecetaMedicaCard = ({ receta, onDelete, fondoGris }) => (
  <Card
    bordered={false}
    style={{
      marginBottom: 8,
      padding: 0,
      border: 'none',
      background: fondoGris ? 'lightgrey' : 'transparent',
      height: '50px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <p style={{ margin: 0 }}>{receta}</p>
      <Button onClick={onDelete} type="link" style={{ fontWeight: 'bold' }}>
        X
      </Button>
    </Space>
  </Card>
);

const ExamenLabCard = ({ examenLab, onDelete, fondoGris }) => (
  <Card bordered={false}
    style={{
      marginBottom: 8,
      padding: 0,
      border: 'none',
      background: fondoGris ? 'lightgrey' : 'transparent',
      height: '50px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <p style={{ margin: 0 }}>{examenLab}</p>
      <Button onClick={onDelete} type="link" style={{ fontWeight: 'bold' }}>
        X
      </Button>
    </Space>
  </Card>
);

export default function DoctorCitasDetails() {
  const [selectedOption, setSelectedOption] = useState('Historial Clínico');

  const [diagnostico, setDiagnostico] = useState('');

  const [mostrarRecetaMedica, setMostrarRecetaMedica] = useState(false);
  const [recetaMedica, setRecetaMedica] = useState('');
  const [recetasGuardadas, setRecetasGuardadas] = useState([]);

  const [mostrarExamenLab, setMostrarExamenLab] = useState(false);
  const [examenLab, setExamenLab] = useState('');
  const [examenLabGuardadas, setExamenLabGuardadas] = useState([]);

  const [datosConsulta, setDatosConsulta] = useState({
    diagnostico: '',
    recetas: recetasGuardadas,
    examenesLab: examenLabGuardadas,
  });

  const renderHistorialClinico = () => {
    return (
      <div>
        <p>
        </p>
        <Card
          title="Tipo de Cita"
          bordered={false}
          style={{
            width: 800,
            marginBottom: 16,
          }}
        >
          <p>Cita en (especialidad)</p>
          <p>#informacion del examen medico</p>


        </Card>

      </div>
    );
  };


  const handleGuardarDiagnostico = () => {
    console.log('Diagnóstico guardado:', diagnostico);
    
    try {
      const accessToken = LocalStorageServices.GetData("accessToken");
      //const appointmentId = ;
      axios.put(`http://localhost:3100/api/appointment/${id}`, 
      { diagnostic: diagnostico },
      { headers: { Authorization: accessToken } });

      console.log('Diagnóstico actualizado en la base de datos');
    } catch (error) {
      console.error('Error al actualizar el diagnóstico:', error);
    }

    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      diagnostico: diagnostico,
    }));
  };

  const handleAgregarRecetaMedica = () => {
    setMostrarRecetaMedica(true);
  };

  const handleGuardarRecetaMedica = () => {    
    console.log('Receta guardada:', recetaMedica);
    setRecetasGuardadas((prevRecetas) => [...prevRecetas, recetaMedica]);
    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      recetas: [...prevDatosConsulta.recetas, recetaMedica],
    }));
    setMostrarRecetaMedica(false);
    setRecetaMedica('');
  };

  const handleBorrarReceta = (index) => {
    const nuevasRecetasGuardadas = [...recetasGuardadas];
    nuevasRecetasGuardadas.splice(index, 1);
    setRecetasGuardadas(nuevasRecetasGuardadas);
  };

  const handleAgregarExamenLab = () => {
    setMostrarExamenLab(true);
  };

  const handleGuardarExamenLab = () => {
    console.log('ExamenLab guardada:', examenLab);
    setExamenLabGuardadas((prevExamenLab) => [...prevExamenLab, examenLab]);
    setDatosConsulta((prevDatosConsulta) => ({
      ...prevDatosConsulta,
      examenesLab: [...prevDatosConsulta.examenesLab, examenLab],
    }));
    setMostrarExamenLab(false);
    setExamenLab('');
  };

  const handleBorrarExamenLab = (index) => {
    const nuevasExamenLabGuardadas = [...examenLabGuardadas];
    nuevasExamenLabGuardadas.splice(index, 1);
    setExamenLabGuardadas(nuevasExamenLabGuardadas);
  };

  const handleTerminarConsulta = () => {
    handleGuardarDiagnostico();
    console.log('Datos de la consulta:', datosConsulta);
    // setDatosConsulta({ diagnostico: '', recetas: [], examenesLab: [] });
    // setRecetasGuardadas([]);
    // setExamenLabGuardadas([]);
  };

  
  const renderRealizarDiagnostico = () => {
    return (
      <div>
        <Card
          title="DIAGNÓSTICO"
          bordered={false}
          headStyle={{
            background: '#3E5BA5',
            color: 'white',
            borderBottom: '3px solid black',
          }}
          style={{
            width: '100%',
            marginBottom: '16px',
            marginTop: '10px',
            border: '3px solid black',
          }}
        >
          <TextArea
            rows={4}
            style={{ height: '100%' }}
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />
        </Card>
      </div>
    );
  };

  const renderRecetaMedicaSolicitarExamen = () => {
    return (

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Card
          title="RECETA MÉDICA"
          bordered={false}
          headStyle={{
            background: '#3E5BA5',
            color: 'white',
            borderBottom: '3px solid black',
          }}
          style={{
            width: 'calc(50% - 8px)',
            marginBottom: 16,
            marginRight: 8,
            border: '3px solid black',
          }}
        >
          {mostrarRecetaMedica ? (
            <>
              <TextArea
                value={recetaMedica}
                onChange={(e) => setRecetaMedica(e.target.value)}
                rows={2}
                placeholder="Ingrese la receta médica"
              />
              <Button style={{ marginTop: 8 }} onClick={handleGuardarRecetaMedica}>
                Guardar Receta
              </Button>
            </>
          ) : (
            <div>
              {recetasGuardadas.map((receta, index) => (
                <RecetaMedicaCard
                  key={index}
                  receta={receta}
                  onDelete={() => handleBorrarReceta(index)}
                  fondoGris={true}
                />
              ))}
              <Button onClick={handleAgregarRecetaMedica}>Agregar Receta</Button>
            </div>
          )}
        </Card>
        <Card
          title="SOLICITAR EXAMEN A LABORATORIO"
          headStyle={{
            background: '#3E5BA5',
            color: 'white',
            borderBottom: '3px solid black',
          }}
          style={{
            width: 'calc(50% - 8px)',
            marginBottom: 16,
            marginRight: 8,
            border: '3px solid black',
          }}
        >
          {mostrarExamenLab ? (
            <>
              <TextArea
                value={examenLab}
                onChange={(e) => setExamenLab(e.target.value)}
                rows={2}
                placeholder="Ingrese el examen de laboratorio"
              />
              <Button style={{ marginTop: 8 }} onClick={handleGuardarExamenLab}>
                Guardar Examen Laboratorio
              </Button>
            </>
          ) : (
            <div>
              {examenLabGuardadas.map((examenLab, index) => (
                <ExamenLabCard
                  key={index}
                  examenLab={examenLab}
                  onDelete={() => handleBorrarExamenLab(index)}
                  fondoGris={true}
                />
              ))}
              <Button onClick={handleAgregarExamenLab}>Agregar Examen Laboratorio</Button>
            </div>
          )}
        </Card>
      </div>

    );
  };

  return (
    <div className="container">
      <h1>Cita con Paciente</h1>
      <table className="custom-breadcrumb">
        <tbody>
          <tr>
            <td>
              <a
                href="#"
                className={selectedOption === 'Historial Clínico' ? 'selected' : ''}
                onClick={() => setSelectedOption('Historial Clínico')}
              >
                Historial Clínico
              </a>
            </td>
            <td>
              <a
                href="#"
                className={selectedOption === 'Realizar Diagnóstico' ? 'selected' : ''}
                onClick={() => setSelectedOption('Realizar Diagnóstico')}
              >
                Realizar Diagnóstico
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Renderiza el contenido según la opción seleccionada */}
      {selectedOption === 'Historial Clínico' && renderHistorialClinico()}
      {selectedOption === 'Realizar Diagnóstico' && (
        <>
          {renderRealizarDiagnostico()}
          {renderRecetaMedicaSolicitarExamen()}
          <Button onClick={handleTerminarConsulta} type="primary">
            Terminar consulta
          </Button>
        </>
      )}
    </div>
  );
}