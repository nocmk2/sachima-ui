import React, { useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoomInside';
import Search from './Search';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { formulaState, charCountState } from 'atoms/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(12),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Me = () => {
    const classes = useStyles();
    // const [formula, setFormula] = useState('');
    const [formula, setFormula] = useRecoilState(formulaState)
    const formularLength = useRecoilValue(charCountState)

    useEffect(() => {
        var mychart = echarts.init(document.getElementById('main'))
        function func(x) {
            let k = 15;
            let a = 0.22;
            let r = 9.88;
            try {
                return eval(formula)
            } catch (e) {
                return x
            }
        }

        function generateData() {
            let data = [];
            for (let i = -200; i <= 200; i += 0.1) {
                data.push([i, func(i)]);
            }
            return data;
        }

        const option = {
            animation: false,
            grid: {
                top: 40,
                left: 50,
                right: 40,
                bottom: 50
            },
            xAxis: {
                name: 'X',
                minorTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#888'
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                name: 'Y',
                min: -100,
                max: 100,
                minorTick: {
                    show: true
                },
                splitLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            dataZoom: [{
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20
            }, {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20
            }],
            series: [
                {
                    type: 'line',
                    showSymbol: false,
                    clip: true,
                    data: generateData()
                }
            ]
        };
        mychart.setOption(option)
    }, [formula])

    const handleFormulaChange = e => {
        setFormula(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <div>formula length：{formularLength}</div>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Search onChange={handleFormulaChange} placeholder={"15/(1+Math.exp(0.22-9.88*x))"}></Search>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div id="main" style={{ width: '100%', height: 500 }}></div>
                    </Paper>
                </Grid>
            </Grid >
        </div >
    )
}

export default Me




