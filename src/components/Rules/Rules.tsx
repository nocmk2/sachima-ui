import React, { useState, useReducer, createContext, useEffect } from "react";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "utils/state"
// import SendMessage from "../utils/message"
import Rule from "./Rule"
import RuleCards from './RuleCards'
import { makeStyles } from '@material-ui/core/styles';


import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { fetchRuleSummarys, fetchRule } from 'components/Rules/rulesSlice'


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
  const [curSelectedIndex, setCurSelectedIndex] = useState(0)
  const dispatch = useDispatch()

  // const rule = useSelector((state: RootState) => {
  //   return state.rules.currentRule
  // })

  const { rulesLoading, rulesError, rules, rule } = useSelector((state: RootState) => {
    return {
      rulesLoading: state.rules.isLoading,
      rulesError: state.rules.error,
      rules: state.rules.ruleSummarys,
      rule: state.rules.currentRule
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(fetchRuleSummarys())
  }, [dispatch])


  // TODO: 切换的时候如果key一样 score不会变化 deep diff?
  const changeRuleCard = (index: number) => {
    setCurSelectedIndex(index)
    const name = rules[index].name
    const version = rules[index].version
    dispatch(fetchRule(name, version))
  }

  let ruleComp
  if (rule.rule.feature) {
    ruleComp = <div>
      <Rule
        ruleindex={curSelectedIndex}
        name={rule.name}
        version={rule.version}
        comment={rule.comment}
        {...rule.rule}
      > </Rule>
    </div>
  } else if (rulesLoading) {
    ruleComp = (
      <div className="rule--loading">
        <p>Loading comments...</p>
      </div>
    )
  } else if (rulesError) {
    ruleComp = (
      <div className="rule--error">
        <h1>Could not load rule for issue #{curSelectedIndex}</h1>
        <p>{rulesError.toString()}</p>
      </div>
    )
  }

  return (
    <div>
      {JSON.stringify(rule)}
      <Card>
        <RuleCards datas={rules} callback={changeRuleCard} />
      </Card>
      {ruleComp}
    </div >
  )
};

export const ctx = createContext({})
export default Rules;
