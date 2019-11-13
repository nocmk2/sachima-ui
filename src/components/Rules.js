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
      const result = await axios(url);
      console.log(result.data);
      console.log(result.data.text);
      setData(result.data.text);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  // login
  useEffect(() => {
    const postData = async () => {
      const result = await axios({
        method: "post",
        url: "http://localhost:8000/login",
        data: {
          username: "admin",
          password: "admin"
        }
      });
      console.log(result);
    };

    postData();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setUrl("http://localhost:8000/test");
        }}
      >
        test api
      </Button>
      <Button
        onClick={() => {
          setUrl("http://localhost:8000/test2");
        }}
      >
        test2 api
      </Button>
      <div style={{ color: "red" }}>{data}</div>
    </>
  );
};

export default Rules;
