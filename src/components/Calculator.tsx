import { useState, useEffect } from "react";
import "./Calculator.css";
import Container from "@material-ui/core/Container";

export default function Calculator() {
  type OperationsType = {
    [key: string]: (() => void) | undefined;
  };

  const [num, setNum] = useState("0");
  const [resulted, setResulted] = useState<boolean>(false);
  const [firstNum, setFirstNum] = useState<number>(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const operations: OperationsType = {
    "divide": divideFunc,
    "multiply": multiplyFunc,
    "subtraction": subFunc,
    "addition": addFunc
  }

  const fontSize = num.toString().length > 9 ? "3.35em" : num.toString().length > 8 ? "3.8em" : num.toString().length > 7 ? "4.24em" : "4.8em";

  function inputNum(e: React.MouseEvent<HTMLButtonElement>) {
    if (resulted) {
      setNum(String(e.currentTarget.value));
      setResulted(false)
    } else if (num.toString().length < 9) {
      if (num == "0") {
        setNum(String(e.currentTarget.value));
      } else {
        setNum(String(num + e.currentTarget.value));
      }
    }
  }

  function inputDecimal(e: React.MouseEvent<HTMLButtonElement>) {
    if (resulted) {
      setNum(String(0 + e.currentTarget.value));
      setResulted(false)
    } else {
      setNum(String(num + e.currentTarget.value))
    }
  }

  useEffect(() => {
    console.log("Atualizado num e firstNum:", num, firstNum);
  }, [num, firstNum]);

  function clear() {
    setNum("0");
    setFirstNum(0);
    setSelectedSymbol("");
  }

  function percentage() {
    setNum(String(parseFloat(num) / 100));
  }

  function plusMinus() {
    setNum(parseFloat(num) > 0 ? `-${num}` : String(Math.abs(parseFloat(num))));
  }

  function divideFunc() {
    setNum(String(firstNum / parseFloat(num)));
    setFirstNum(0);
  }

  function multiplyFunc() {
    setNum(String(firstNum * parseFloat(num)));
    setFirstNum(0);
  }

  function subFunc() {
    setNum(String(firstNum - parseFloat(num)));
    setFirstNum(0);
  }

  function addFunc() {
    setNum(String(firstNum + parseFloat(num)));
    setFirstNum(0);
  }
    
  function divide() {
    if (firstNum === 0) {
      setFirstNum(parseFloat(num));
      setNum("0");
      setSelectedSymbol("divide");
    } else {
      setNum(String(firstNum / parseFloat(num)));
      setFirstNum(parseFloat(num));
      setSelectedSymbol("divide");
    }
  }

  function multiply() {
    if (firstNum === 0) {
      setFirstNum(parseFloat(num));
      setNum("0");
      setSelectedSymbol("multiply");
    } else {
      setNum(String(firstNum * parseFloat(num)));
      setFirstNum(parseFloat(num));
      setSelectedSymbol("multiply");
    }
  }

  function subtraction() {
    if (firstNum === 0) {
      setFirstNum(parseFloat(num));
      setNum("0");
      setSelectedSymbol("subtraction");
    } else {
      setNum(String(firstNum - parseFloat(num)));
      setFirstNum(parseFloat(num));
      setSelectedSymbol("subtraction");
    }
  }

  function addition () {
    if (firstNum === 0) {
      setFirstNum(parseFloat(num));
      setNum("0");
      setSelectedSymbol("addition");
    } else {
      setNum(String(firstNum + parseFloat(num)));
      setFirstNum(parseFloat(num));
      setSelectedSymbol("addition");
    }
  }

  function result(funcName:string, funcList:OperationsType) {
    const func = funcList[funcName];
    if(func !== undefined) {
      func();
      setSelectedSymbol("");
      setResulted(true);
    } else { 
      console.log("Function not found")
    }
  }

  function formatNumber(number:string): string {
    if (number.includes(".")) {
      let [integerPart, decimalPart] = number.split(".");
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      return decimalPart ? `${integerPart},${decimalPart}` : integerPart + ",";
    } 
    
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const numFormatted = formatNumber(num);

  return (
    <div className="all">
      <Container maxWidth="xs">
        <div className="wrapper">
          <div className="output">
            <div className="firstNum" style={{ fontSize }}>{numFormatted}</div>
          </div>
          <div className="buttons">
            <button onClick={clear} className="gray button">C</button>
            <button onClick={plusMinus} className="gray button">+/-</button>
            <button onClick={percentage} className="gray button">%</button>
            <button onClick={divide} className="orange button" id="dvdBtn">÷</button>
            <button onClick={inputNum} value={7} className="button">7</button>
            <button onClick={inputNum} value={8} className="button">8</button>
            <button onClick={inputNum} value={9} className="button">9</button>
            <button onClick={multiply} className="orange button" id="multiBtn">X</button>
            <button onClick={inputNum} value={4} className="button">4</button>
            <button onClick={inputNum} value={5} className="button">5</button>
            <button onClick={inputNum} value={6} className="button">6</button>
            <button onClick={subtraction} className="orange button" id="subBtn">-</button>
            <button onClick={inputNum} value={1} className="button">1</button>
            <button onClick={inputNum} value={2} className="button">2</button>
            <button onClick={inputNum} value={3} className="button">3</button>
            <button onClick={addition} className="orange button" id="addBtn">+</button>
            <button id="butaoZero" onClick={inputNum} value={0} className="button">0</button>
            <button onClick={inputDecimal} value={"."} className="button">,</button>
            <button onClick={() => result(selectedSymbol, operations)} className="orange button">=</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

