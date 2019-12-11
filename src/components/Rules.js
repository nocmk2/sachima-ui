import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../utils/state"
// import SendMessage from "../utils/message"
import TabList from "./TabList"
import * as API from "../apis/api"


const Rules = () => {
  const [{ sachima }, dispatch] = useStateValue();
  const [{ data, features, isLoading, querytime }, get] = API.useDataApi();

  return (
    <>
      <Button>{querytime}</Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
        }}>message</Button>
      <Button
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
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          get(`${sachima.url}/sachima/featurelists`);
        }}
      >
        配置规则 {isLoading && "loading..."}
      </Button>
      <div style={{ color: "gray" }}>{isLoading ? "loading..." : data}</div>
      <Card>
        {
          features.length !== 0
            ?
            <>
              < TabList items={features}></TabList>
            </>
            : <></>
        }</Card>
    </>
  );
};

export default Rules;
