import React, { useState } from "react";
import { Radio } from "antd";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ScatterChart,
  ZAxis,
  Scatter
} from "recharts";
import data1 from "./data.json";

let industries = [];

for (let i = 0; i < data1.length; ++i) {
  if (industries.indexOf(data1[i].industry) === -1)
    industries.push(data1[i].industry);
}
const data01 = data1.filter(el => el.salary && el.years_of_experience);
const data03 = data01.map(el => ({
  x: Number(el.salary) / 1000,
  y: el.years_of_experience,
  z: el.date_of_birth
}));
const compare = (a: any, b: any) => {
  if (a.x > b.x) return 1;
  if (b.x > a.x) return -1;
  return 0;
};
data03.sort(compare);

const getOccurance = (array: any, value: any): number => {
  let count = 0;
  array.forEach((el: any) => el.industry === value && count++);
  return count;
};
const dataX = industries.map(el => ({
  name: el ? el : "Not known",
  count: getOccurance(data1, el)
}));

const ChartView = () => {
  const [value, setValue] = useState(2);
  const { t } = useTranslation(["common"]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ margin: "10px" }}>
      <h1>{t("chartView")}</h1>
      {t("typeOfChart")}
      <br />
      <Radio.Group onChange={onChange} value={value}>
        {/* <Radio value={1}>Pie chart</Radio> */}
        <Radio value={2}>Bar chart</Radio>
        <Radio value={3}>Scatter chart</Radio>
      </Radio.Group>
      {/* Bar Chart */}
      {value === 2 ? (
        <BarChart width={730} height={250} data={dataX}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      ) : null}
      {/* Scatter Chart */}
      {value === 3 ? (
        <ScatterChart
          width={730}
          height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="salary" unit="k" />
          <YAxis dataKey="y" name="years" unit=" yrs" />
          <ZAxis dataKey="z" range={[64, 144]} name="dob" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter
            name="Years of experience vs Salary"
            data={data03.map(el => ({ ...el, x: el.x.toFixed(2) }))}
            fill="#8884d8"
          />
        </ScatterChart>
      ) : null}
    </div>
  );
};
export default ChartView;
