import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Rules = () => {
  const [data, setData] = useState("ddd");
  const [url, setUrl] = useState("http://localhost:8000/test");
  const [isLoading, setIsLoading] = useState(false);

  // simple get
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios({
        method: "GET",
        url: url,
        headers: { Authorization: "Bearer " + localStorage.token }
      });
      console.log(result.data);
      console.log(result.data.text);
      setData(result.data.text);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <>
      <Button
        onClick={() => {
          setUrl("http://localhost:8000/test");
        }}
      >
        test public api
      </Button>
      <Button
        onClick={() => {
          setUrl("http://localhost:8000/test2");
        }}
      >
        test2 public api
      </Button>
      <Button
        onClick={() => {
          setUrl("http://localhost:8000/auth/hello");
        }}
      >
        test private api
      </Button>
      <div style={{ color: "red" }}>{data}</div>
    </>
  );
};

export default Rules;
