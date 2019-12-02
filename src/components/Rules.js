import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
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

  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      //place your reentry code
      dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
    }
    return error;
  });

  // simple get
  useEffect(() => {
    // const abortController = new AbortController()
    // const signal = abortController.signal
    const signal = axios.CancelToken.source();


    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios({
          method: "GET",
          url: url,
          headers: { Authorization: "Bearer " + localStorage.token }
        }, { cancelToken: signal.token });
        // console.log(result.data);
        // console.log(result.data.text);
        setData(result.data.text);
        if (url === `${sachima.url}/sachima/featurelists`) {
          setFeatures(result.data.text)
        }
        setIsLoading(false);
      } catch (error) {

        console.log(error)
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message); // => prints: Api is being canceled
        } else {
          setIsLoading(false);
        }
        // if (error.response.status === 401) {
        //   dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
        // }
        return error
      }
    };

    fetchData();
    return function cleanup() {
      signal.cancel("Cancelling in cleanup")
    }
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
          setUrl(`${sachima.url}/sachima/hello`);
          setQueryTime(Now())
        }}
      >
        test private api {isLoading && "loading..."}
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setUrl(`${sachima.url}/sachima/featurelists`);
          setQueryTime(Now())
        }}
      >
        test rules {isLoading && "loading..."}
      </Button>
      <div style={{ color: "gray" }}>{isLoading ? "loading..." : data}</div>
      <Card>
        {
          features.length !== 0
            ?
            <>
              {
                console.log(features
                  // + " data => " + data
                  // + " url => " + url
                )
              }
              < TabList items={features}></TabList>
            </>
            : <></>
        }</Card>
    </>
  );
};

export default Rules;
