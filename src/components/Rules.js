import React, { useReducer, createContext } from "react";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../utils/state"
// import SendMessage from "../utils/message"
import FeatureLists from "./Features/FeatureLists"
import * as API from "../apis/api"
import RuleCards from './Features/RuleCards'
import { makeStyles } from '@material-ui/core/styles';
import { reducer } from './Features/Reducer'
// import classes from '*.module.css';
// import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

// const Now = () => {
//   return Math.floor(Date.now() / 1000)
// }
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));


const Rules = () => {
  const [{ sachima }] = useStateValue();
  const [{ data, isLoading }, get] = API.useReadApi(`${sachima.url}/sachima/features`, { features: {} });
  // const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, {
    rules: [
      { title: '商户评分卡 v1.23', img: 'tech_orange.jpg' },
      { title: 'Ccard stable v2.3', img: 'tech_pink.jpg' },
      { title: 'Acard stable v0.1', img: 'tech_gold.jpg' },
      { title: 'Ccard stable v2.3', img: 'tech_pink.jpg' },
    ]
  })


  // useReducer()

  return (
    <>
      {/* <Button
        // variant="contained"
        onClick={() => {
          dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
        }}>message</Button>
      <Button
        // variant="contained"
        startIcon={<RefreshRoundedIcon />}
        onClick={() => {
          get(`${sachima.url}/sachima/features?time=${Now()}`);
        }}
      >
        {isLoading && "loading..."}
      </Button> */}
      {/* <div>{data.features["1PD7_pct"] ? JSON.stringify(data.features["1PD7_pct"]["bintype"]) : "b"}</div> */}
      {/* <div>{data.features["1PD7_pct"] ? JSON.stringify(data.features) : "b"}</div> */}
      {isLoading ? (<div>loading...</div>) : (
        <ctx.Provider value={{ dispatch: dispatch }}>
          <div
          // className={classes.root}
          >
            <Card>
              <RuleCards datas={state.rules} />
            </Card>
            {data ?
              <FeatureLists features={data.features}></FeatureLists>
              : <div>empty features</div>
            }
          </div >
        </ctx.Provider>
      )
      }
    </>)
};

export const ctx = createContext({})
export default Rules;
