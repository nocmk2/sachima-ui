import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const DashBoard = () => {
  const [data, setData] = useState({ hits: [] });
  // const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Button onClick={() => console.log(data)}>DashBoard</Button>
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
