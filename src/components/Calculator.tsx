import { useState } from 'react';

type Button = {
    faceValue: string;
    colorClass: 'dark-gray' | 'light-gray' | 'orange';
    column?: 'zero';
    function?: () => void; 
}


export function Calculator() {
    const [value, setValue] = useState<string>("0");
    const [numCount, setNumCount] = useState<number>(1);
    const [save, setSave] = useState<string>("none");
    const [operation, setOperation] = useState<string>("none");
    const [reset, setReset] = useState<boolean>(false);

    const numberClick = (num: string): void => {
        if (reset) {
            setValue(num)
            setNumCount(1)
            setReset(false)
        } else if (numCount < 9) {
            if (value === "0") {
                setValue(num) 
            } else if (value === "-0") {
                setValue("-" + num)
            } else {
                setValue(value + num)
                setNumCount(numCount + 1)
            }
        }
    } 

    const clear = (): void => {
        setValue("0")
        setNumCount(1)
        setSave("none")
        setOperation("none")
        setReset(false)
    }

    const flipSign = (): void => {
        if (reset) {
            setValue("-0")
            setNumCount(1)
            setReset(false)
        } else if (value.charAt(0) == "-") {
            setValue(value.substring(1))
        } else {
            setValue("-" + value)
        }
    }

    const percentage = (): void => {
        
    }

    const decimal = (): void => {
        if (reset) {
            setValue("0.")
            setNumCount(1)
            setReset(false)
        } else if (!value.includes(".")) {
            setValue(value + ".")
        }
    }

    const add = (): void => { 
        setSave(value)
        setOperation("add")
        setReset(true)
    }
    
    const subtract = (): void => {
        setSave(value)
        setOperation("subtract")
        setReset(true)
    }

    const multiply = (): void => {
        setSave(value)
        setOperation("multiply")
        setReset(true)
    }

    const divide = (): void => {
        setSave(value)
        setOperation("divide")
        setReset(true)
    }

    const update = (value: number): void => { 
        if (value > 999999999 || value < -999999999) {
            setValue("Error")
        } else if (value % 1 != 0) {
            setValue("DECIMAL")
        } else {
            setValue(value.toString())
        }
    }

    const evaluate = (): void => {
        if (save !== "none" && value !== "Error") {
            switch(operation) {
                case "add": {
                    const newValue = (Number(save) + Number(value))
                    update(newValue)
                    break
                }
                case "subtract": {
                    const newValue = (Number(save) - Number(value))
                    update(newValue)
                    break
                }
                case "multiply": {
                    const newValue = (Number(save) * Number(value))
                    update(newValue)
                    break
                }
                case "divide": {
                    const newValue = (Number(save) / Number(value))
                    update(newValue)
                    break
                }
            }
            setReset(true)
        }
    }

    const buttonData: Button[] = [
        { faceValue: "C", colorClass: "light-gray", function: () => clear() },
        { faceValue: "±", colorClass: "light-gray", function: () => flipSign() },
        { faceValue: "%", colorClass: "light-gray", function: () => percentage() },
        { faceValue: "÷", colorClass: "orange", function: () => divide() },
        { faceValue: "7", colorClass: "dark-gray", function: () => numberClick("7") },
        { faceValue: "8", colorClass: "dark-gray", function: () => numberClick("8") },
        { faceValue: "9", colorClass: "dark-gray", function: () => numberClick("9") },
        { faceValue: "x", colorClass: "orange", function: () => multiply() },
        { faceValue: "4", colorClass: "dark-gray", function: () => numberClick("4") },
        { faceValue: "5", colorClass: "dark-gray", function: () => numberClick("5") },
        { faceValue: "6", colorClass: "dark-gray", function: () => numberClick("6") },
        { faceValue: "-", colorClass: "orange", function: () => subtract() },
        { faceValue: "1", colorClass: "dark-gray", function: () => numberClick("1") },
        { faceValue: "2", colorClass: "dark-gray", function: () => numberClick("2") },
        { faceValue: "3", colorClass: "dark-gray", function: () => numberClick("3") },
        { faceValue: "+", colorClass: "orange", function: () => add() },
        { faceValue: "0", colorClass: "dark-gray", column: "zero", function: () => numberClick("0") },
        { faceValue: ".", colorClass: "dark-gray", function: () => decimal() },
        { faceValue: "=", colorClass: "orange", function: () => evaluate() }
]
    return (
        <div className="container">
            <div className="calculator">
                <h1 className="header">
                    Calculator
                </h1>
                <div className="display-area">
                    {value}
                </div>
                <div className="button-grid">
                    {buttonData.map((button, index) => (
                        <button key={index} className={`${button.colorClass} ${button.column}`} onClick={button.function}>
                            {button.faceValue}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

