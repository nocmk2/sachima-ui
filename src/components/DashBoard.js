import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";

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
    </>
  );
};

export default DashBoard;
