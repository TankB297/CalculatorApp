import { Component, memo } from "react";
import "../StyleFormat/Button.css";

class ButtonF extends Component{
    render(){
        const {
            press,
            calculate
        } = this.props;
        return(
            <div className="inputButton">
                <div className="inputButton-row">
                    <button className="setColor01" onClick={() => press("AC")}>AC</button>
                    <button className="setColor01" onClick={() => press("+/-")}>+/-</button>
                    <button className="setColor01" onClick={() => press("%")}>%</button>
                    <button className="setColor02" onClick={() => press("÷")}>÷</button>
                </div>
                <div className="inputButton-row">
                    <button className="setColor01" onClick={() => press("7")}>7</button>
                    <button className="setColor01" onClick={() => press("8")}>8</button>
                    <button className="setColor01" onClick={() => press("9")}>9</button>
                    <button className="setColor02" onClick={() => press("x")}>x</button>
                </div>
                <div className="inputButton-row">
                    <button className="setColor01" onClick={() => press("4")}>4</button>
                    <button className="setColor01" onClick={() => press("5")}>5</button>
                    <button className="setColor01" onClick={() => press("6")}>6</button>
                    <button className="setColor02" onClick={() => press("-")}>-</button>
                </div>
                <div className="inputButton-row">
                    <button className="setColor01" onClick={() => press("1")}>1</button>
                    <button className="setColor01" onClick={() => press("2")}>2</button>
                    <button className="setColor01" onClick={() => press("3")}>3</button>
                    <button className="setColor02" onClick={() => press("+")}>+</button>
                </div>
                <div className="inputButton-row2">
                    <button className="button0 setColor01" onClick={() => press("0")}>0</button>
                    <button className="button1 setColor01" onClick={() => press(".")}>.</button>
                    <button className="button1 setColor02" onClick={calculate}>=</button>
                </div>
            </div>
        );
    }
}
export default memo(ButtonF);