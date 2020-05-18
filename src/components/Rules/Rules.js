import React, { useState, useReducer, createContext, useEffect } from "react";
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

// const initData = [
//   { id: 0, title: '商户评分卡 v1.23' },
//   { id: 1, title: 'Ccard stable v2.3' },
//   { id: 2, title: 'Acard stable v0.1' },
//   { id: 3, title: 'Bcard stable v0.1' },
// ]

// const Init = (data) => {
//   // const [{ sachima }] = useStateValue();
//   // const [{ data: rules, isloading: rulesIsLoading }, getRules] = API.useReadApi(`${sachima.url}/sachima/rules`, { rules: [] });
//   // const [{ data: features, isloading: featuresIsLoading }, getFeatures] = API.useReadApi(`${sachima.url}/sachima/features?ruleid=0`, { features: {} });
//   // return { rules: initData, features: [] }
//   return <></>
// }

// const init = (initData) => {
//   return {
//     rules: initData,
//     features: {}
//   }
// }

// TODO: 完成rulecard切换逻辑
const Rules = () => {
  const [{ sachima }] = useStateValue();
  const [name, setName] = useState('商户评分卡');
  const [version, setVersion] = useState('v0.1');
  const [index, setIndex] = useState(0)
  const [rulesAPI, getRules] = API.useReadApi(`${sachima.url}/sachima/rules`, []);
  const [ruleAPI, getRule] = API.useReadApi(`${sachima.url}/sachima/rule/${name}/${version}`, null);

  const changeRuleCard = (name, version, index) => {
    console.log('changeRuleCard called')
    setIndex(index)
    // setName(name)
    // setVersion(version)
    getRule(`${sachima.url}/sachima/rule/${name}/${version}`)
  }
  // const [state, dispatch] = useReducer(reducer, {
  //   rules: [],
  //   features: []
  // })

  // useEffect(() => {
  //   dispatch({ type: "GET_RULES", payload: rules.data })
  //   dispatch({ type: "GET_FEATURES", payload: rule.data })
  // }, [rule, rules])
  // console.log(Object.keys(rule))
  // rule ["isLoading", "isError", "data"]

  // const d = Do(rule.data.rule)
  // console.log(d)
  // const features = d.features


  // const catalog =DoparseCatalog(rule.data.ru)

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
      {(ruleAPI.isLoading && rulesAPI.isLoading) ? (<div>loading...</div>) : (
        <ctx.Provider value={{ notifier: { getRules, getRule } }}>
          <div
          // className={classes.root}
          >
            <Card>
              <RuleCards datas={rulesAPI.data} callback={changeRuleCard} />
            </Card>
            {ruleAPI.data ?
              <div>
                <FeatureLists
                  ruleindex={index}
                  name={ruleAPI.data.name}
                  version={ruleAPI.data.version}
                  comment={ruleAPI.data.comment}
                  {...JSON.parse(ruleAPI.data.rule)}
                ></FeatureLists>
                {/* {JSON.stringify(ruleAPI.data.rule)} */}
              </div>
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
