import { useNavigate } from "react-router-dom";
import "./doctorPerfilPage.styles.css";
import { Button } from "antd";

export default function DoctorPerfilPage() {
  const navigate = useNavigate();
  const handleDoctorAvailability = () => {
    navigate("/auth/doctor/availability");
  };
  return (
    <div>
      <div class="content-info">
        <h1>Perfil</h1>
      </div>

      <div>
        <p>Esta es su página de perfil</p>
      </div>
      <Button type="primary" onClick={handleDoctorAvailability}>Modificar disponibilidad</Button>
    </div>
  );
}
