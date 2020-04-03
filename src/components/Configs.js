import React, { useRef } from "react";
import LeaderLine from 'leader-line'
import Button from '@material-ui/core/Button'

function Configs() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const Drawer = () => {
    // alert(ref1.current)
    new LeaderLine(ref1.current, ref2.current);
    // ref1.current.focus()
  }

  return (
    <div>
      <Button ref={ref1} variant="contained">1</Button>
      <Button ref={ref2} variant="contained">ElementuuuC</Button>
      <Button onClick={Drawer}>draw</Button>
    </div>
  );
};
export default Configs;
