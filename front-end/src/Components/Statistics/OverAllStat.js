import React from "react";
import "./statistics.css";
// import chart from "../../images/chart.png";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function OverAllStatictics({ data }) {
  return (
    <div className="progress">
      <div>
        {" "}
        <h2 className="progress-h2">Общий прогресс</h2>{" "}
      </div>
      {/* <img className="st-example" src={chart} alt="статистика"/> */}
      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="act_minutes" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time_stamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
      {/* <div className="st-example"></div> */}
    </div>
  );
}

export default OverAllStatictics;
