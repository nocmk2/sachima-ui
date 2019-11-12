import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Rules = () => {
  const [data, setData] = useState("ddd");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8000/test");
      console.log(result.data);
      console.log(result.data.text);
      setData(result.data.text);
    };

    fetchData();
  }, []);

  return <Button>{data}</Button>;
};

export default Rules;
