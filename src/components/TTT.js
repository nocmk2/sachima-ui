import React, { useState } from "react";
import Button from "@material-ui/core/Button";

// TTT test1
const TTT = () => {
  const [c, setC] = useState(0);
  const step = 10;
  return (
    <>
      <Button onClick={() => setC(c + step)} style={{ color: "red" }}>
        {c}
      </Button>
      <Button onClick={() => setC(c - step)}>{c}</Button>
    </>
  );
};

const BHoc = WrappedComponent => {
  const hocComponent = ({ ...props }) => {
    if (props.visible === false) return null;
    return (
      <>
        <div>123</div>
        <WrappedComponent {...props} />
      </>
    );
  };
  return hocComponent;
};

export default BHoc(TTT);
