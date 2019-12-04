import React, { useState, useRef, useEffect, useReducer } from 'react';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { TextField } from '@material-ui/core';

const initialState = {
    count: 0,
    step: 1,
}

const reducer = (state, action) => {
    const { count, step } = state;
    switch (action.type) {
        case 'tick':
            return { ...state, count: count + step }
        case 'step':
            return { ...state, step: action.step }
        default:
            throw new Error();
    }
}


const Ref = () => {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);
    // const latestCount = useRef(count);
    const [state, dispatch] = useReducer(reducer, initialState)
    const { count, step } = state


    // useEffect(() => {
    //     latestCount.current = count;
    //     setTimeout(() => {
    //         console.log(`You clicked ${latestCount.current} times`)
    //     }, 3000)
    // });
    // useEffect(() => {
    //     console.log("effect")
    //     const id = setInterval(() => {
    //         setCount(c => c + 1)
    //     }, 1000)
    // }, [])
    // useEffect(() => {
    //     console.log("eff")
    //     const id = setInterval(() => {
    //         setCount(c => c + step)
    //     }, 1000);
    //     return () => clearInterval(id);
    // }, [step])

    // const handleClick = () => {
    //     setCount(count + 1)
    // }
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000)
    }, [dispatch])

    return (
        <Paper>
            <p> You clicked {count} times</p >
            {/* <Button variant="contained" onClick={handleClick}>add</Button> */}
            {/* <Button variant="contained" onClick={() => setStep(c => c + 1)}>add step</Button> */}
            <TextField type="number" label="step" value={step} onChange={(event) => {
                // setStep(Number(event.target.value))
                dispatch({ type: "step", step: Number(event.target.value) })
            }}></TextField>
        </Paper>
    )

}

export default Ref

// useCallBack() example
// function Parent() {
//     const [query, setQuery] = useState('react');

//     // ✅ Preserves identity until query changes
//     const fetchData = useCallback(() => {
//         const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
//         // ... Fetch data and return it ...
//     }, [query]);  // ✅ Callback deps are OK

//     return <Child fetchData={fetchData} />
// }

// function Child({ fetchData }) {
//     let [data, setData] = useState(null);

//     useEffect(() => {
//         fetchData().then(setData);
//     }, [fetchData]); // ✅ Effect deps are OK

//     // ...
// }