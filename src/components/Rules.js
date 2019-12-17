import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../utils/state"
// import SendMessage from "../utils/message"
import FeatureLists from "./FeatureLists"
import * as API from "../apis/api"


const Now = () => {
  return Math.floor(Date.now() / 1000)
}


const Rules = () => {
  const [{ sachima }, dispatch] = useStateValue();
  const [{ data, isLoading }, get] = API.useDataApi(`${sachima.url}/sachima/features`, { features: {} });

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
          get(`${sachima.url}/sachima/features?time=${Now()}`);
        }}
      >
        配置规则 {isLoading && "loading..."}
      </Button>
      {/* <div>{data.features["1PD7_pct"] ? JSON.stringify(data.features["1PD7_pct"]["bintype"]) : "b"}</div> */}
      {/* <div>{data.features["1PD7_pct"] ? JSON.stringify(data.features) : "b"}</div> */}
      {isLoading ? (<div>loading...</div>) : (
        <Card>
          {data ?
            <FeatureLists features={data.features}></FeatureLists>
            : <div>empty features</div>
          }
        </Card>
      )
      }
    </>)
};


export default Rules;
