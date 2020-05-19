import React, { useState, useReducer, createContext, useEffect } from "react";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "utils/state"
// import SendMessage from "../utils/message"
import Rule from "./Rule"
import * as API from "apis/api"
import RuleCards from './RuleCards'
import { makeStyles } from '@material-ui/core/styles';
// import { reducer } from './Reducer'

import { useRecoilValue, useRecoilState } from 'recoil'
import { ruleListsQuery, ruleQuery } from 'model/atom';

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
  const [name, setName] = useState('商户评分卡');
  const [version, setVersion] = useState('v0.1');
  const [index, setIndex] = useState(0)
  // const [rulesAPI, getRules] = API.useReadApi(`${process.env.REACT_APP_BASE_URL}/sachima/rules`, []);
  const [ruleAPI, getRule] = API.useReadApi(`${process.env.REACT_APP_BASE_URL}/sachima/rule/${name}/${version}`, null);
  const rules = useRecoilValue(ruleListsQuery)

  // TODO: 切换的时候如果key一样 score不会变化 deep diff?
  const changeRuleCard = (name, version, index) => {
    console.log('changeRuleCard called')
    setIndex(index)
    getRule(`${sachima.url}/sachima/rule/${name}/${version}`)
  }

  return (
    <>
      {(ruleAPI.isLoading) ? (<div>loading...</div>) : (
        // <ctx.Provider value={{ notifier: { getRules, getRule } }}>
        <div >
          <Card>
            <RuleCards datas={rules} callback={changeRuleCard} />
          </Card>
          {ruleAPI.data ?
            <div>
              <Rule
                ruleindex={index}
                name={ruleAPI.data.name}
                version={ruleAPI.data.version}
                comment={ruleAPI.data.comment}
                {...JSON.parse(ruleAPI.data.rule)}
              ></Rule>
            </div>
            : <div>empty features</div>
          }
        </div >
        // </ctx.Provider>
      )
      }
    </>)
};

export const ctx = createContext({})
export default Rules;
