import { SetStateAction, useState } from "react";
import "./Calculator.css";
import Container from "@material-ui/core/Container";

export default function Calculator() {
  const [firstNum, setFirstNum] = useState(0);
  var selectedSymbol = "";
  const operations = {
    "divide": divideFunc,
    "multiply": multiplyFunc,
    "subtraction": subFunc,
    "addition": addFunc
  }

  const [num, setNum] = useState(0);

  const fontSize = num.toString().length > 9 ? "3.35em" : num.toString().length > 8 ? "3.8em" : num.toString().length > 7 ? "4.24em" : "4.8em";

  function inputNum(e: React.MouseEvent<HTMLButtonElement>) {
    if (num.toString().length < 10) {
      if (num == 0) {
        setNum(Number(e.currentTarget.value));
      } else {
        setNum(parseFloat(`${num}${e.currentTarget.value}`));
      }
    }
  }

  function clear() {
    setNum(0);
    setFirstNum(0);
  }

  function percentage() {
    setNum(num/100);
  }

  function plusMinus() {
    if (num < 0) {
      setNum(Math.abs(num))
    } else {
      setNum(-num)
    }
  }

  function divideFunc() {}

  function multiplyFunc() {}

  function subFunc() {}

  function addFunc() {}

  function divide() {
    if (firstNum != 0) {
      setNum(firstNum/num);
      selectedSymbol = "divide";
    } else {
      setFirstNum(num);
      setNum(0);
      selectedSymbol = "divide"
    }
  }

  function result(funcName:string) {
    operations[e]()
  }

  return (
    <Container maxWidth="xs">
      <div className="wrapper">
        <div className="output">
          <div className="firstNum" style={{ fontSize }}>{num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
        </div>
        <button onClick={clear} className="gray">C</button>
        <button onClick={plusMinus} className="gray">+/-</button>
        <button onClick={percentage} className="gray">%</button>
        <button onClick={divide} className="orange">÷</button>
        <button onClick={inputNum} value={7}>7</button>
        <button onClick={inputNum} value={8}>8</button>
        <button onClick={inputNum} value={9}>9</button>
        <button className="orange">X</button>
        <button onClick={inputNum} value={4}>4</button>
        <button onClick={inputNum} value={5}>5</button>
        <button onClick={inputNum} value={6}>6</button>
        <button className="orange">-</button>
        <button onClick={inputNum} value={1}>1</button>
        <button onClick={inputNum} value={2}>2</button>
        <button onClick={inputNum} value={3}>3</button>
        <button className="orange">+</button>
        <button id="butaoZero" onClick={inputNum} value={0}>0</button>
        <button onClick={inputNum} value={","}>,</button>
        <button className="orange">=</button>
      </div>
    </Container>
  );
}
