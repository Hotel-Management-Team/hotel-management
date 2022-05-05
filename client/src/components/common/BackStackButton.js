import { Button } from "react-bootstrap";

const BackStackButton = () => {
  return (
    <Button
      className="m-3"
      variant="outline-success"
      onClick={() => window.history.back()}
    >
      Trở về
    </Button>
  );
};

export default BackStackButton;
