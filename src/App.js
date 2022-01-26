import "./App.css";
import { useState, useEffect } from "react";
import Equals from "./Components/Equals";
import ButtonF from "./Components/Button";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";
import Waiting from "./Components/Waiting";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import LatestResult from "./Components/LatestResult";

function App() {
  const [userInputValue, setUserInputValue] = useState("0");
  const [number, setNumber] = useState(0);
  const [check, setCheck] = useState(false);
  const [latestResult, setLatestResult] = useState([0]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    if (!user && location.pathname === "/calculator") {
      alert("You need to login!");
      navigate("/");
    }
  }, [user]);

  const isNumeric = (num) => {
    return !isNaN(num);
  };

  const press = (value) => {
    let inputValue = "";
    let numberCheck = isNumeric(value) ? number + 1 : 0;
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
        if (check === false && numberCheck === 0) {
          inputValue = inputValue;
        } else {
          inputValue = inputValue + value;
        }
      }
    }
    setUserInputValue(inputValue);
    setNumber(numberCheck);
    setCheck(isNumeric(value) ? true : false);
  };

  const calculate = async () => {
    let inputValue1 = userInputValue.replace("x", "*");
    let inputValue2 = inputValue1.replace("÷", "/");
    let inputValue3 = inputValue2.replace("%", "/100");
    setUserInputValue(eval(inputValue3));
    let resultValue = eval(inputValue3);
    setNumber(0);

    try {
      const q = await query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      const docx = await getDocs(q);
      const data = docx.docs[0];
      const _data = data.data().result;
      _data.unshift(resultValue);
      db.collection("users").doc(data.id).update({ result: _data });
      //Update:
      const arr = [];
      var dataLength = _data.length; //1 10
      if (dataLength < 1) {
        setLatestResult(0);
      } else if (dataLength == 1) {
        arr.push(_data[0]);
      } else if (dataLength > 1 && dataLength < 10) {
        for (var i = 0; i < dataLength - 1; i++) {
          arr.push(_data[i] + ", ");
        }
        arr.push(_data[dataLength - 1]);
      } else {
        for (var i = 0; i < 9; i++) {
          arr.push(_data[i] + ", ");
        }
        arr.push(_data[9]);
      }
      setLatestResult(arr);
    } catch (err) {
      console.error(err);
      alert("An error occured while saving user data!");
    }
    //loadData();
  };

  const loadData = async () => {
    const q = await query(
      collection(db, "users"),
      where("uid", "==", user?.uid)
    );
    const docx = await getDocs(q);
    const data = docx.docs[0];
    const _data = data.data().result;
    const arr = [];
    var dataLength = _data.length; //1 10
    if (dataLength < 1) {
      setLatestResult(0);
    } else if (dataLength == 1) {
      arr.push(_data[0]);
    } else if (dataLength > 1 && dataLength < 10) {
      for (var i = 0; i < dataLength - 1; i++) {
        arr.push(_data[i] + ", ");
      }
      arr.push(_data[dataLength - 1]);
    } else {
      for (var i = 0; i < 9; i++) {
        arr.push(_data[i] + ", ");
      }
      arr.push(_data[9]);
    }
    setLatestResult(arr);
  };

  return (
    <Routes>
      <Route
        path="/calculator"
        element={
          <div className="mainComponent">
            <LatestResult latestResult={latestResult} />
            <Equals userInput={userInputValue} />
            <ButtonF press={press} calculate={calculate} />
          </div>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/waiting" element={<Waiting />} />
    </Routes>
  );
}
export default App;
