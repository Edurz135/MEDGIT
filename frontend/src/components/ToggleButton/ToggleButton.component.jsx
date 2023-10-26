import React, { useState } from "react";
import "./ToggleButton.styles.css";
import { Button } from "antd";
export default function ToggleButton({
  defaultState = false,
  onToggle,
  keyEntry,
  digit,
}) {
  const [isToggled, setIsToggled] = useState(defaultState);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (onToggle) {
      onToggle(!isToggled);
    }
  };

  return (
    <>
      {isToggled ? (
        <Button type="primary" block onClick={handleToggle}>
          DISPONIBLE
        </Button>
      ) : (
        <Button block onClick={handleToggle}>
          OCUPADO
        </Button>
      )}
    </>
  );
}
