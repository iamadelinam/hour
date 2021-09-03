import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Header from "../Components/Header/Header";
import MonthlyStatictics from "../Components/Statistics/MonthlyStat";
import OverAllStatictics from "../Components/Statistics/OverAllStat";
import "../Components/Statistics/statistics.css";
function Statisctics() {
  const params = useParams();
  const [category, setCategory] = useState();
  const [currentMonthActivities, setCurrentMonthActivities] = useState([]);
  const [totalActivities, setTotalActivities] = useState([]);
  const history = useHistory();

  const getData = () => {
    fetch(`http://localhost:3333/categories/${params.categoryId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });

    fetch(
      `http://localhost:3333/categories/${
        params.categoryId
      }/activities?time_stamp=${moment().format("YYYY-MM-DD")}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentMonthActivities(data);
        console.log(moment().format("YYYY-MM-DD"));
      });

    fetch(`http://localhost:3333/categories/${params.categoryId}/activities`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalActivities(data);
      });
  };

  useEffect(getData, [params.categoryId]);

  const goBack = () => {
    history.push("/home");
  };

  return (
    <>
      <Header />
      <div className="btn-wrapper">
        <button className="go-back" onClick={goBack}>Назад</button>
      </div>
      {/* <div className="btn-wrapper">
        <button className="go-back" onClick={goBack}>Назад</button>
        <button className="go-back">Таймер</button>
        <button className="go-back">Совет</button>
      </div> */}
      {category && (
        <div className="statictics">
          <header className="activity-title">
            <h1 className="activity-title-h1">{category.title}</h1>
          </header>
          <div className="statisctics-wrapper">
            <MonthlyStatictics data={currentMonthActivities} />
          </div>
          <div className="statisctics-wrapper">
            <OverAllStatictics data={totalActivities} />
          </div>
        </div>
      )}
    </>
  );
}

export default Statisctics;
