import "./App.css";
import FirstPage from "../Pages/FirstPage";
import RegistrationPage from "../Pages/RegistrationPage";
import LogInPage from "../Pages/LogInPage";
import HomePage from "../Pages//Home/HomePage";
import { Route } from "react-router-dom";
import CalendarItem from "../Components/Calendar/CalendarItem";
import ActivityName from "../Components/ModalWindows/ModalActivityName";
import Statisctics from "../Pages/StatistictPage";
// import Example from "../Components/example";

function App() {
  return (
    <>
      <Route path="/" exact component={FirstPage} />
      <Route path="/registration" exact component={RegistrationPage} />
      <Route path="/login" exact component={LogInPage} />
      <Route path="/home" exact component={HomePage} />
      <Route path="/activityname" exact component={ActivityName} />
      <Route path="/calendaritem" exact component={CalendarItem} />
      <Route path="/statisctics/:categoryId" exact component={Statisctics} />
      {/* <Route path="/example" exact component={Example} /> */}
    </>
  );
}

export default App;
