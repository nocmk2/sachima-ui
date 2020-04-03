import React, { useRef } from "react";
import LeaderLine from 'leader-line'
import Button from '@material-ui/core/Button'

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import CenterFocusWeak from '@material-ui/icons/CenterFocusWeak';
import BallotRounded from '@material-ui/icons/BallotRounded';

function Configs() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  var line = null;
  var line2 = null;

  const DrawLine = () => {
    if (!line) {
      line = new LeaderLine(ref1.current, ref2.current, { color: 'hotpink', size: 3, dash: { animation: true } });
      line2 = new LeaderLine(ref2.current, ref3.current, { color: 'purple', size: 3, dash: { animation: true } });
    }
  }

  const DisposeLine = () => {
    line.remove()
    line = null
    line2.remove()
    line2 = null
  }

  const handleDelete = () => {
    alert('王浩然！')
  }


  return (
    <div>
      <Button variant="contained">1</Button>
      <Button variant="contained">1</Button>
      <Button variant="contained">1</Button>
      <Button variant="contained">1</Button>
      <Button variant="contained">1</Button>
      <Chip
        ref={ref2}
        size="small"
        icon={<BallotRounded />}
        label="财务部普通员工"
        clickable
        color="secondary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        size="small"
        icon={<BallotRounded />}
        label="商务部普通员工"
        clickable
        color="secondary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      {/* <Button ref={ref2} variant="contained">ElementuuuC</Button> */}
      <Button onClick={DrawLine}>draw</Button>
      <Button variant="contained" color="primary" onClick={DisposeLine}>dispose</Button>
      <Chip
        ref={ref1}
        size="small"
        icon={<FaceIcon />}
        label="王浩然"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        size="small"
        icon={<FaceIcon />}
        label="段誉"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        ref={ref3}
        size="small"
        icon={<CenterFocusWeak />}
        label="改评分卡规则"
        clickable
        color="hotpink"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
    </div>
  );
};
export default Configs;
