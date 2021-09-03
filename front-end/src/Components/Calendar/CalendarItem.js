import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { useHistory } from "react-router-dom";
import Modal from "simple-react-modal";
import moment from "moment";

function CalendarItem({ title, id, date, changeDate }) {
  const [activities, setActivities] = useState([]);

  const history = useHistory();

  useEffect(() => {
    return fetch(
      `http://localhost:3333/categories/${id}/activities?time_stamp=${moment(
        date
      ).format("YYYY-MM-DD")}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      });
  }, [id, date]);

  function goToStaistics() {
    history.push(`/statisctics/${id}`);
  }

  const [show, setShow] = useState(false);
  const [inputHour, setInputHour] = useState("");
  const [inputMinute, setInputMinute] = useState("");

  const handleShowModal = (newDate) => {
    if (moment(newDate).month() !== moment(date).month()) {
      return;
    }
    setShow(true);
  };

  const onConfirmActivityClick = () => {
    handleModalClose();
    fetch(`http://localhost:3333/categories/${id}/activities`, {
      body: JSON.stringify({
        categoryId: id,
        timeStamp: moment(date).format("YYYY-MM-DD"),
        actMinutes: Number(inputHour || "0") * 60 + Number(inputMinute || "0"),
      }),
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setActivities([...activities, data]);
        console.log(data);
      });
  };
  const fillInputHour = (event) => {
    if (Number(event.target.value) < 0) {
      return;
    }
    setInputHour(event.target.value);
  };

  const fillInputMinute = (event) => {
    if (Number(event.target.value) < 0) {
      return;
    }
    setInputMinute(event.target.value);
  };

  const handleDateChange = (newDate) => {
    if (moment(newDate).month() !== moment(date).month()) {
      return;
    }
    changeDate(newDate);
  };

  const handleModalClose = () => {
    setShow(false);
    setInputHour("");
    setInputMinute("");
  };

  const getTileClassNames = (args) => {
    let classNames = "day";
    if (moment(args.date).isSame(date, "date")) {
      classNames += " chosen";
    }

    const hasActivitiesThisDay = activities.find((activity) => {
      if (
        moment(activity.time_stamp).isSame(args.date, "date") &&
        activity.act_minutes > 0
      ) {
        return true;
      }
      return false;
    });

    if (hasActivitiesThisDay) {
      classNames += " with-activity";
    }

    return classNames;
  };

  return (
    <div className="calendar-item">
      <div className="div-activity-name">
        <p className="p-activity-name">{title || "Название занятия"} </p>
        <img
          onClick={goToStaistics}
          src="https://image.flaticon.com/icons/png/512/876/876225.png"
          alt="статистика"
          className="statictics-img"
          activities={activities}
        />
      </div>
      <div className="calendar-conteiner">
        <Calendar
          onChange={handleDateChange}
          value={date}
          showNavigation={false}
          defaultView={"month"}
          onClickDay={handleShowModal}
          tileClassName={getTileClassNames}
          maxDetail={"month"}
        />
        <Modal show={show} onClose={handleModalClose}>
          <div className="set-time">
            <div className="set-time-sections">
              <input
                type="number"
                step="1"
                className="set-time-digits"
                min="0"
                value={inputHour}
                onChange={fillInputHour}
                placeholder="ч"
                required
              />
              {/* <p className="set-time-letters">час</p> */}
            </div>

            <div className="set-time-sections">
              <input
                type="number"
                step="1"
                min="0"
                className="set-time-digits"
                value={inputMinute}
                onChange={fillInputMinute}
                placeholder="м"
                required
              />
              {/* <p className="set-time-letters">мин</p> */}
            </div>
            <img
              onClick={onConfirmActivityClick}
              className="check-mark"
              src="https://image.flaticon.com/icons/png/512/1287/1287087.png"
              alt="checked"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CalendarItem;
