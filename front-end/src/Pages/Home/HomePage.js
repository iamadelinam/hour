import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import CalendarItem from "../../Components/Calendar/CalendarItem";
import Header from "../../Components/Header/Header";
import ModalActivityName from "../../Components/ModalWindows/ModalActivityName";
import "./home.css";

function HomePage() {
  // function addActivity() {}
  const [categories, setCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Fetch categories from server
    // using GET request
    return fetch(`http://localhost:3333/categories`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      });

    // and setCategories with the result of fetch
  }, []);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "M").toDate());
  };

  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "M").toDate());
  };

  return (
    <div className="page-in-general">
      <Header />
      {/* <div>
        <h1>Lorem ipsum dolor sit amet</h1>
      </div> */}
      <div className="change-month">
        {/* <button className="reg-or-log-buttons"> {"<"} </button> */}
        {/* <button> */}{" "}
        <img
          src="https://cdn-icons-png.flaticon.com/512/860/860790.png"
          alt="<"
          className="reg-or-log-buttons no-background"
          onClick={prevMonth}
        />{" "}
        {/* </button> */}
        <h2 className="month">
          {moment(currentDate).locale("RU").format("MMMM")}
        </h2>
        {/* <button className="reg-or-log-buttons"> {">"} </button>{" "} */}
        {/* <button > */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/892/892528.png"
          alt=">"
          className="reg-or-log-buttons no-background"
          onClick={nextMonth}
        />
        {/* </button>{" "} */}
      </div>
      <div className="main-div">
        <div className="activities">
          {categories.map((category) => (
            <CalendarItem
              key={category.id}
              title={category.title}
              id={category.id}
              date={currentDate}
              changeDate={setCurrentDate}
            />
          ))}
        </div>
        <ModalActivityName onNewCategoryAdded={addCategory} />
      </div>
    </div>
  );
}

export default HomePage;
