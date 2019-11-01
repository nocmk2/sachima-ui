import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const aaa = { first: "heelo", second: "what" };

const Test = () => {
  const value = aaa.second;
  const hi = "hi";
  return <HeadLine value={value} hi={hi} mk></HeadLine>;
};

const Ele = props => <h1>我是组件 返回元素{props.eva}</h1>;

const Ele3Simple = props => <h2>ele3..........{props.super}</h2>;

function Ele2(props) {
  return <h1>ele2,props.name</h1>;
}

// class 有额外特性
class Ele3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), counter: 10 };

    // 必须绑定函数才能用  除非用箭头函数定义函数
    // this.changeStateByProps = this.changeStateByProps.bind(this);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  changeStateByProps = x => {
    // correct;
    console.log("incr");
    this.setState((state, props) => ({
      counter: x * (state.counter + props.increment)
    }));
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.changeStateByProps.bind(this, 3)} // 向事件处理程序传递参数
          type="submit"
          variant="contained"
          color="primary"
        >
          +
        </Button>
        <h2>
          ele3.............{this.state.counter}...
          {this.state.date.toLocaleTimeString()}......
          {this.props.super}
        </h2>
        <NameForm></NameForm>
        <Example name="nocmk2" id={23}></Example>
      </div>
    );
  }
}

const HeadLine = props => {
  return (
    <div>
      <h1>{props.value}</h1> {/*Dom 标签*/}
      <h2>{props.hi}</h2>
      <Ele eva="balblalbal" /> {/*用户自定义 标签*/}
      <Ele2 name="nameheh"></Ele2>
      <Ele3 super="sssssssssssss" increment={12}></Ele3>
      <Ele3Simple super="hhhhhhhhhhhhhhkkkkkkkkkkkkkkhhhhhhhhhh"></Ele3Simple>
      <CompB></CompB>
    </div>
  );
};

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    alert("提交的名字: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:{this.state.value}
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

const CompA = props => {
  return <Paper>{props.children}</Paper>;
};

const CompB = props => {
  return (
    <CompA>
      <h6>hihi</h6>
      <h6>wefef</h6>
    </CompA>
  );
};

// Hook new !!!!!!!
const Example = props => {
  // 声明一个新的叫做 “count” 的 state 变量
  const [bigBang, setBigBang] = useState({ what: 2000 });

  const handleClick = () => {
    setBigBang({ what: bigBang.what + props.id });
  };

  return (
    <div>
      <p>
        {props.name} here {bigBang.what} !!!!
      </p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
export default Test;
