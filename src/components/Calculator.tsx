import { SetStateAction, useState } from "react";
import "./Calculator.css";
import Container from "@material-ui/core/Container";

export default function Calculator() {
  type OperationsType = {
    [key: string]: (() => void) | undefined;
  };

  const [firstNum, setFirstNum] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const operations: OperationsType = {
    "divide": divideFunc,
    "multiply": multiplyFunc,
    "subtraction": subFunc,
    "addition": addFunc
  }

  const [num, setNum] = useState(0);

  const fontSize = num.toString().length > 9 ? "3.35em" : num.toString().length > 8 ? "3.8em" : num.toString().length > 7 ? "4.24em" : "4.8em";

  function inputNum(e: React.MouseEvent<HTMLButtonElement>) {
    if (num.toString().length < 10) {
      if (num === 0) {
        setNum(Number(e.currentTarget.value));
      } else {
        setNum(parseFloat(`${num}${e.currentTarget.value}`));
      }
    }
  }

  function clear() {
    setNum(0);
    setFirstNum(0);
    setSelectedSymbol("");
  }

  function percentage() {
    setNum(num / 100);
  }

  function plusMinus() {
    setNum(num > 0 ? -num : Math.abs(num));
  }

  function divideFunc() {
    setNum(firstNum / num);
    setFirstNum(0);
  }

  function multiplyFunc() {
    setNum(firstNum * num);
    setFirstNum(0);
  }

  function subFunc() {
    setNum(firstNum - num);
    setFirstNum(0);
  }

  function addFunc() {
    setNum(firstNum + num);
    setFirstNum(0);
  }
    
  function divide() {
    if (firstNum === 0) {
      setFirstNum(num);
      setNum(0);
      setSelectedSymbol("divide");
    } else {
      setNum(firstNum / num);
      setFirstNum(num);
      setSelectedSymbol("divide");
    }
  }

  function multiply() {
    if (firstNum === 0) {
      setFirstNum(num);
      setNum(0);
      setSelectedSymbol("multiply");
    } else {
      setNum(firstNum * num);
      setFirstNum(num);
      setSelectedSymbol("multiply");
    }
  }

  function subtraction() {
    if (firstNum === 0) {
      setFirstNum(num);
      setNum(0);
      setSelectedSymbol("subtraction");
    } else {
      setNum(firstNum - num);
      setFirstNum(num);
      setSelectedSymbol("subtraction");
    }
  }

  function addition () {
    if (firstNum === 0) {
      setFirstNum(num);
      setNum(0);
      setSelectedSymbol("addition");
    } else {
      setNum(firstNum + num);
      setFirstNum(num);
      setSelectedSymbol("addition");
    }
  }

  function result(funcName:string, funcList:OperationsType) {
    const func = funcList[funcName];
    if(func !== undefined) {
      func();
      setSelectedSymbol("");
    } else { 
      console.log("Function not found")
    }
  }

  function inputDecimal() {
    
  }

  return (
    <Container maxWidth="xs">
      <div className="wrapper">
        <div className="output">
          <div className="firstNum" style={{ fontSize }}>{num.toLocaleString('pt-BR').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
        </div>
        <div className="buttons">
          <button onClick={clear} className="gray">C</button>
          <button onClick={plusMinus} className="gray">+/-</button>
          <button onClick={percentage} className="gray">%</button>
          <button onClick={divide} className="orange">÷</button>
          <button onClick={inputNum} value={7}>7</button>
          <button onClick={inputNum} value={8}>8</button>
          <button onClick={inputNum} value={9}>9</button>
          <button onClick={multiply} className="orange">X</button>
          <button onClick={inputNum} value={4}>4</button>
          <button onClick={inputNum} value={5}>5</button>
          <button onClick={inputNum} value={6}>6</button>
          <button onClick={subtraction} className="orange">-</button>
          <button onClick={inputNum} value={1}>1</button>
          <button onClick={inputNum} value={2}>2</button>
          <button onClick={inputNum} value={3}>3</button>
          <button onClick={addition} className="orange">+</button>
          <button id="butaoZero" onClick={inputNum} value={0}>0</button>
          <button onClick={inputDecimal}>,</button>
          <button onClick={() => result(selectedSymbol, operations)} className="orange">=</button>
        </div>
      </div>
    </Container>
  );
}
function Float(num: number): SetStateAction<number> {
  throw new Error("Function not implemented.");
}

