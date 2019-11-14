import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Rules = () => {
  const [data, setData] = useState("ddd");
  const [url, setUrl] = useState("http://localhost:8000/test");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [logStatus, setLogStatus] = useState(true);

  // simple get
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios({
        method: "GET",
        url: url,
        headers: { Authorization: "Bearer " + token }
      });
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
      console.log(result.data.token);
      console.log(result.data.expire);
      console.log(result.data.code);
      setToken(result.data.token);
    };

    postData();
  }, []);

  const handleLogClick = () => {
    if (logStatus) {
      setToken("");
      setLogStatus(false);
    } else {
      // TODO: popup login page
      alert("login page");
    }
  };

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
      <Button onClick={handleLogClick}>{logStatus ? "LogOut" : "LogIn"}</Button>
      <div style={{ color: "red" }}>{data}</div>
      <div style={{ color: "gray" }}>{token}</div>
    </>
  );
};

export default Rules;
