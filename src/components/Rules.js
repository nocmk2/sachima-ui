import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../utils/state"
// import SendMessage from "../utils/message"
import TabList from "./TabList"
import * as API from "../apis/api"


const Now = () => {
  return Math.floor(Date.now() / 1000)
}

const Rules = () => {
  const [{ sachima }, dispatch] = useStateValue();
  const [{ data, isLoading }, get] = API.useDataApi(`${sachima.url}/sachima/featurelists`, { features: [] });

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
        }}>message</Button>
      {/* <Button
        variant="contained"
        onClick={() => {
          get(`${sachima.url}/test`);
        }}
      >
        test public api
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          get(`${sachima.url}/test2`);
        }}
      >
        test2 public api
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          get(`${sachima.url}/sachima/hello`);
        }}
      >
        test private api {isLoading && "loading..."}
      </Button> */}
      <Button
        variant="contained"
        onClick={() => {
          get(`${sachima.url}/sachima/featurelists?time=${Now()}`);
        }}
      >
        配置规则 {isLoading && "loading..."}
      </Button>

      {isLoading ? (<div>loading...</div>) : (
        <Card>
          {data.features.length > 0 ?
            < TabList items={data.features}></TabList>
            : <div>empty features</div>
          }
        </Card>
      )
      }
    </>)
};


export default Rules;
