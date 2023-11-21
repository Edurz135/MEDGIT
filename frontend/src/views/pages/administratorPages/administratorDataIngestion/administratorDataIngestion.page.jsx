// import "./administratorMain.styles.css";
import { Row, Typography, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { LocalStorageServices } from "../../../../services";
import axios from "axios";
const { Title, Text } = Typography;
const { Dragger } = Upload;

async function sendData(file) {
  const accessToken = await LocalStorageServices.GetData("accessToken");
  await axios
    .post("http://localhost:3100/api/uploadAppointmentData", file, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
    });
}

const props = {
  accept: ".csv",
  name: "file",
  multiple: true,
  customRequest: sendData,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function AdministratorDataIngestionPage() {
  return (
    <div>
      <Title>Carga masiva de datos</Title>
      <Dragger {...props}>
        <Row justify="center">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
        </Row>
        <Row justify="center">
          <Text className="ant-upload-text">
            Clickee aquí o arrastre un archivo en esta área para subirlo
          </Text>
        </Row>
        <Row justify="center">
          <Text type="secondary">
            Soporta para carga única o masiva. Está estrictamente prohibido
            subir datos de la empresa u otros archivos prohibidos.
          </Text>
        </Row>
      </Dragger>
    </div>
  );
}
