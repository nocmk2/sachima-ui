import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const Maps = () => {
  const [count, setCount] = useState(0)

  const alertcount = () => {
    setTimeout(() => {
      alert(count)
    }, 2000)
  }

  useEffect(() => {
    document.title = `clicked ${count} times`
    setTimeout(() => {
      console.log(`clicked ${count} times`)
    }, 3000)
  });

  return (
    <div>
      <p>You clicked {count} Times</p>
      <Button variant="contained" color="secondary" onClick={() => { setCount(count + 1) }}>+1</Button>
      <Button variant="contained" color="primary" onClick={alertcount}>alert</Button>
    </div >
  )
};

export default Maps;
