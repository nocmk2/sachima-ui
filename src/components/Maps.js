import React, { createRef } from "react";
import Button from "@material-ui/core/Button";
import { reaction } from 'mobx';

const Maps = () => {
  const [user, setUser] = React.useState({ name: 'Alex', weight: 40 })

  React.useEffect(() => {
    console.log('You need to do exercise!')
  }, [user])

  const gainWeight = () => {
    const newWeight = Math.random() >= 0.5 ? user.weight : user.weight + 1
    setUser(user => ({ ...user, weight: newWeight }))
  }

  return (
    <>
      <p>Current weight: {user.weight}</p>
      <button onClick={gainWeight}>Eat burger</button>
    </>
  )
};

export default Maps;
