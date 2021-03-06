import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import CalendarItem from "../../Components/Calendar/CalendarItem";
import Header from "../../Components/Header/Header";
import ModalActivityName from "../../Components/ModalWindows/ModalActivityName";
import "./home.css";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
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
  }, []);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  // const nextMonth = () => {
  //   setCurrentDate(moment(currentDate).add(1, "M").toDate());
  // };

  // const prevMonth = () => {
  //   setCurrentDate(moment(currentDate).subtract(1, "M").toDate());
  // };

  return (
    <div className="page-in-general">
      <Header />

      <div className="change-month">
        {/* <img
          src="https://image.flaticon.com/icons/png/512/860/860790.png"
          alt="<"
          className="reg-or-log-buttons no-background"
          onClick={prevMonth}
        />{" "} */}
        <h2 className="month">
          {moment(currentDate).locale("RU").format("MMMM")}
        </h2>
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/892/892528.png"
          alt=">"
          className="reg-or-log-buttons no-background"
          onClick={nextMonth}
        /> */}
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
