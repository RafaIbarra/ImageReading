import { notification } from "antd";
import {
  WarningOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const showErrorMessage = (message, placement = "top") => {
  showAlert("error", message, placement);
};

const showSuccessMessage = (message, placement = "top") => {
  showAlert("success", message, placement);
};

const showInfoMessage = (message, placement = "top") => {
  showAlert("info", message, placement);
};

const showAlert = (type, message, placement) => {
  const notificationConfig = {
    error: {
      icon: <WarningOutlined style={{ color: "red" }} />,
      message: "ERROR",
    },
    success: {
      icon: <CheckCircleOutlined style={{ color: "green" }} />,
      message: "¡ÉXITO!",
    },
    info: {
      icon: <InfoCircleOutlined style={{ color: "blue" }} />,
      message: "INFORMACIÓN",
    },
  };

  const { icon, message: defaultMessage } = notificationConfig[type] || {};
  notification.open({
    message: defaultMessage,
    description: message,
    placement,
    icon,
  });
};

export { showErrorMessage, showSuccessMessage, showInfoMessage };
