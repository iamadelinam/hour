import React from "react";
import moment from "moment";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import "./statistics.css";


function MonthlyStatictics({ data }) {
  return (
    <div className="progress">
      <div>
        {" "}
        <h2 className="progress-h2">
          {" "}
          {moment().locale("RU").format("MMMM")} 
        </h2>{" "}
      </div>
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Bar type="monotone" dataKey="act_minutes" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time_stamp" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
}

export default MonthlyStatictics;
