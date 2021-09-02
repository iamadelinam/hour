import React, { useState } from "react";
import moment from "moment";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import "./statistics.css";
// import chart from "../../images/chart.png";
// import moment from "moment";

function MonthlyStatictics({ data }) {
  const currentDate = useState(new Date());
  return (
    <div className="progress">
      <div>
        {" "}
        <h2 className="progress-h2">
          {" "}
          {moment(currentDate).locale("RU").format("MMMM")}
        </h2>{" "}
      </div>

      {/* <img className="st-example" src={chart} alt="статистика" /> */}
      {/* <div className="st-example"></div> */}
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
