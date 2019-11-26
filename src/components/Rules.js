import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useStateValue } from "../utils/state"
// import SendMessage from "../utils/message"
import TabList from "./TabList"


const Now = () => {
  return Math.floor(Date.now() / 1000)
}

const Rules = () => {
  const [data, setData] = useState("no data");
  const [url, setUrl] = useState("http://localhost:8000/test");
  const [isLoading, setIsLoading] = useState(false);
  const [{ sachima }, dispatch] = useStateValue();
  const [querytime, setQueryTime] = useState(Now());
  const [features, setFeatures] = useState([]);

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
        if (url === `${sachima.url}/auth/rules`) {
          setFeatures(result.data.text)
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        if (error.response.status === 401) {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
        }
        return error
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [url, querytime]);

  return (
    <>
      <Button>{Now()}</Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
        }}>message</Button>
      <Button
        variant="contained"
        onClick={() => {
          setUrl(`${sachima.url}/test`);
          setQueryTime(Now())
        }}
      >
        test public api
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setUrl(`${sachima.url}/test2`);
          setQueryTime(Now())
        }}
      >
        test2 public api
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setUrl(`${sachima.url}/auth/hello`);
          setQueryTime(Now())
        }}
      >
        test private api {isLoading && "loading..."}
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setUrl(`${sachima.url}/auth/rules`);
          setQueryTime(Now())
        }}
      >
        test rules {isLoading && "loading..."}
      </Button>
      <div style={{ color: "red" }}>{isLoading ? "loading..." : data}</div>
      <TabList items={features}></TabList>
    </>
  );
};

export default Rules;
