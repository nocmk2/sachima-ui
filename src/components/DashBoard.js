import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";

// const fib = (num) => {
//   let res = [1, 1]
//   for (var i = 1; i < num; i++) {
//     // let a = new Big(res[i])
//     // a.plus(res[i - 1])
//     res.push(res[i] + res[i - 1])
//   }
//   return res
// }
const fib = () => {
  let res = []
  for (var i = 0; i < 100; i++) {
    res.push(i)
  }
  return [, 5, 6, 7, 8, 9, 0, 1, 3, 3,]
}
const fiblist = fib(1000)
console.log(fiblist)

const DashBoard = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(result.data);
    };

    fetchData();
  }, [query]);

  return (
    <>
      <Button onClick={() => console.log(data)}>DashBoard</Button>
      <TextField
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
      {/* <GridList> */}
      {
        fiblist.map((item, index) => (
          <Button key={index} variant="contained" color={item % 2 === 0 ? "secondary" : "primary"}>{item}</Button>
        )
        )
      }
      {/* </GridList> */}
    </>
  );
};

export default DashBoard;
