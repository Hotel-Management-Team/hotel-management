import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const CardFeature = ({ feature }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{ width: "15rem", cursor: "pointer" }}
        onClick={() => {
          console.log("Clicked");
          navigate(feature.href);
        }}
      >
        <Card.Img
          variant="top"
          src={feature.img}
          style={{ width: 150, height: 150, margin: "auto" }}
        />
        <Card.Footer className="d-flex justify-content-center bg-white">
          {feature.name}
        </Card.Footer>
      </Card>
    </>
  );
};
export default CardFeature;
