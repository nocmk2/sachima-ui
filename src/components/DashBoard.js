import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";

const fib = (num) => {
  let res = [1, 1]
  for (var i = 1; i < num; i++) {
    res.push(res[i] + res[i - 1])
  }
  return res
}
const fiblist = fib(22)

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
