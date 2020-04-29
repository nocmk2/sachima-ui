import React, { useReducer, createContext } from "react";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../../utils/state"
// import SendMessage from "../utils/message"
import FeatureLists from "./FeatureLists"
import * as API from "../../apis/api"
import RuleCards from './RuleCards'
import { makeStyles } from '@material-ui/core/styles';
import { reducer } from './Reducer'
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

const initData = [
  { id: 0, title: '商户评分卡 v1.23' },
  { id: 1, title: 'Ccard stable v2.3' },
  { id: 2, title: 'Acard stable v0.1' },
  { id: 3, title: 'Bcard stable v0.1' },
]

// const Init = (data) => {
//   // const [{ sachima }] = useStateValue();
//   // const [{ data: rules, isloading: rulesIsLoading }, getRules] = API.useReadApi(`${sachima.url}/sachima/rules`, { rules: [] });
//   // const [{ data: features, isloading: featuresIsLoading }, getFeatures] = API.useReadApi(`${sachima.url}/sachima/features?ruleid=0`, { features: {} });
//   // return { rules: initData, features: [] }
//   return <></>
// }

const init = (initData) => {
  return {
    rules: initData,
    features: {}
  }
}

const Doparse = (s) => {
  console.log(s)
  if (!s) return {}
  return JSON.parse(s).feature
}

const Rules = () => {
  const [{ sachima }] = useStateValue();
  const [rules, getRules] = API.useReadApi(`${sachima.url}/sachima/rules`, []);
  const [rule, getRule] = API.useReadApi(`${sachima.url}/sachima/rule/商户评分卡/v0.1`, {});
  // const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    rules: [],
    features: []
  }, init)
  const features = Doparse(rule.data.rule)

  // dispatch()

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
      {(rule.isLoading && rules.isLoading) ? (<div>loading...</div>) : (
        <ctx.Provider value={{ dispatch: dispatch, notifier: { getRules, getRule } }}>
          <div
          // className={classes.root}
          >
            <Card>
              <RuleCards datas={rules.data} />
            </Card>
            {rule.data ?
              <FeatureLists features={features}></FeatureLists>
              // <div>{
              //   Doparse(rule.data.rule).feature
              // }</div>
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
