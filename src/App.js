import "./App.css";
import { Component } from "react";
import Equals from "./Components/Equals";
import ButtonF from "./Components/Button";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInputValue: "0",
      number: 0,
      check: false
    };
  }

  isNumeric = (num) => {
    return !isNaN(num);
  };

  press = (value) => {
    const { userInputValue, number, check } = this.state;
    let inputValue = "";
    let numberCheck = this.isNumeric(value) ? number + 1 : 0;
    if (value === "AC") {
      inputValue = "0";
    } else if (userInputValue === "0") {
      inputValue = value;
    } else {
      if (value === "+/-") {
        inputValue = userInputValue;
        if (number !== 0) {
          inputValue = "-" + inputValue;
        }
      } else {
        inputValue = userInputValue;
        if(check === false && numberCheck === 0){
          inputValue = inputValue;
        }
        else{
          inputValue = inputValue + value;
        }
      }
    }
    this.setState({
      userInputValue: inputValue,
      number: numberCheck,
      check: this.isNumeric(value) ? true : false
    });
  };

  calculate = () => {
    const { userInputValue } = this.state;
    let inputValue1 = userInputValue.replace("x", "*");
    let inputValue2 = inputValue1.replace("÷", "/");
    let inputValue3 = inputValue2.replace("%", "/100");
    this.setState({
      userInputValue: eval(inputValue3),
      number: 0,
    });
  };

  render() {
    return (
      <div className="mainComponent">
        <Equals userInput={this.state.userInputValue} />
        <ButtonF press={this.press} calculate={this.calculate} />
      </div>
    );
  }
}
export default App;
