import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useStateValue } from "../utils/state"

const Rules = () => {
  const [data, setData] = useState("ddd");
  const [url, setUrl] = useState("http://localhost:8000/test");
  const [isLoading, setIsLoading] = useState(false);
  const [{ sachima }, dispatch] = useStateValue();

  // simple get
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios({
          method: "GET",
          url: url,
          headers: { Authorization: "Bearer " + localStorage.token }
        });
        console.log(result.data);
        console.log(result.data.text);
        setData(result.data.text);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        if (error.response.status === 401) {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "你没有权限,请登陆" } })
        }
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      <Button onClick={() => {
        dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
      }}>message</Button>
      <Button
        onClick={() => {
          setUrl(`${sachima.url}/test`);
        }}
      >
        test public api
      </Button>
      <Button
        onClick={() => {
          setUrl(`${sachima.url}/test2`);
        }}
      >
        test2 public api
      </Button>
      <Button
        onClick={() => {
          setUrl(`${sachima.url}/auth/hello`);
        }}
      >
        test private api {isLoading && "loading..."}
      </Button>
      <div style={{ color: "red" }}>{isLoading ? "loading..." : data}</div>
    </>
  );
};

export default Rules;
