import { Component, memo } from "react";
import "../StyleFormat/Equals.css";

class Equals extends Component {
  render() {
    const { userInput } = this.props;
    return (
      <div className="displayEquals">
        <p>{userInput}</p>
      </div>
    );
  }
}
export default memo(Equals);
