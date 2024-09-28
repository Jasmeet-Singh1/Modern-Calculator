import React, { useEffect, useState } from 'react';
import classes from './Calculator.module.css';

const Calculator = () => {
  const [numberInput, setnumberInput] = useState([]);
  const [operatorinput, setOperatorinput] = useState([]);
  const [isNumberActive, setIsNumberActive] = useState(true);

  const handleNumberInput = (num) => {
    if (isNumberActive) {
      let duplicateArray = [...numberInput];
      let string = duplicateArray.pop() || '';

      let updatedString = `${string}${num}`;

      duplicateArray.push(updatedString);

      setnumberInput(duplicateArray);
    } else {
      setnumberInput((prev) => [...prev, `${num}`]);
      setIsNumberActive(true);
    }
  };

  const handleOperatorInput = (op) => {
    setOperatorinput((prev) => [...prev, op]);
    setIsNumberActive(false);
  };

  const handleReset = () => {
    setOperatorinput([]);
    setnumberInput([]);
  };

  const getInputLabel = (() => {
    let newString = numberInput[0] || '';

    for (let i = 0; i <= operatorinput.length - 1; i++) {
      const appendOperator = `${newString} ${operatorinput[i]}`;
      console.log('appendOperator', appendOperator);

      newString = `${appendOperator} ${numberInput[i + 1] || ''}`;
    }

    return newString;
  })();

  const handleCalculteTotal = () => {
    let result = Number(numberInput[0]);

    for (let i = 0; i <= operatorinput.length - 1; i++) {
      const currentOperator = operatorinput[i];
      const nextNumber = Number(numberInput[i + 1]);

      switch (currentOperator) {
        case '+':
          result = result + nextNumber;
          break;
        case '-':
          result = result - nextNumber;
          break;
        case '÷':
          result = result / nextNumber;
          break;
        case 'x':
          result = result * nextNumber;
          break;
      }
    }

    setnumberInput([`${result}`]);
    setOperatorinput([]);
  };

  return (
    <div className={`${classes.calculator}`}>
      <div className={`${classes.display}`}>{getInputLabel}</div>
      <div className={`${classes.buttons}`}>
        <button onClick={() => handleNumberInput(7)}>7</button>
        <button onClick={() => handleNumberInput(8)}>8</button>
        <button onClick={() => handleNumberInput(9)}>9</button>
        <button onClick={() => handleOperatorInput('÷')}>÷</button>
        <button>(</button>

        <button onClick={() => handleNumberInput(4)}>4</button>
        <button onClick={() => handleNumberInput(5)}>5</button>
        <button onClick={() => handleNumberInput(6)}>6</button>
        <button onClick={() => handleOperatorInput('x')}>x</button>
        <button>)</button>

        <button onClick={() => handleNumberInput(1)}>1</button>
        <button onClick={() => handleNumberInput(2)}>2</button>
        <button onClick={() => handleNumberInput(3)}>3</button>
        <button onClick={() => handleOperatorInput('-')}>-</button>
        <button onClick={handleCalculteTotal}>=</button>

        <button>.</button>
        <button onClick={() => handleNumberInput(0)}>0</button>
        <button onClick={handleReset}>DEL</button>
        <button onClick={() => handleOperatorInput('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
