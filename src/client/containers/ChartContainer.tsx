import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "antd/es/button/style/css";

import ChartPie from "../components/ChartPie";
import ChartBars from "../components/ChartBars";
import ChartLines from "../components/ChartLines";
const { Option } = Select;

const renderChart = (chartType: string, chartData: Array<any>) => {
  console.log(chartType);
  switch (chartType) {
    case "pie":
      return <ChartPie data={chartData} />;
    case "bars":
      return <ChartBars data={chartData} />;
    case "lines":
      return <ChartLines data={chartData} />;
    default:
      return <ChartPie data={chartData} />;
  }
};

const numberEmployeePerIndustry = (
  users: Array<any>,
  industries: Array<string>
) => {
  const data: Array<any> = [];
  industries.forEach(industry => {
    const usersIndustry = users.filter(user => user.industry === industry);
    if (usersIndustry && usersIndustry.length > 0) {
      data.push({
        name: industry === "n/a" ? "Other" : industry,
        value: usersIndustry.length
      });
    }
  });
  return data;
};
const yearlySpentSalaryPerIndustry = (
  users: Array<any>,
  industries: Array<string>
) => {
  const data: Array<any> = [];
  industries.forEach(industry => {
    const salaryIndustry = users.filter(
      user => user.industry === industry && user.salary
    );
    const totalSpent = salaryIndustry.reduce(
      (total = 0, user) => total + user.salary,
      0
    );
    if (salaryIndustry && salaryIndustry.length > 0) {
      data.push({
        name: industry === "n/a" ? "Other" : industry,
        value: Math.floor(totalSpent)
      });
    }
  });
  return data;
};

const averageSalaryPerIndustry = (
  users: Array<any>,
  industries: Array<string>
) => {
  const data: Array<any> = [];
  industries.forEach(industry => {
    const salaryIndustry = users.filter(
      user => user.industry === industry && user.salary
    );
    const totalSpent = salaryIndustry.reduce(
      (total = 0, user) => total + user.salary,
      0
    );
    if (salaryIndustry && salaryIndustry.length > 0) {
      const average = totalSpent / salaryIndustry.length;
      data.push({
        name: industry === "n/a" ? "Other" : industry,
        value: Math.floor(average)
      });
    }
  });
  return data;
};

const averageSalaryPerExperiance = (users: Array<any>) => {
  const salaries: any = {};
  users.forEach((user: any) => {
    if (user.years_of_experience) {
      if (!salaries[user.years_of_experience])
        salaries[user.years_of_experience] = [];
      salaries[user.years_of_experience].push(user.salary);
    }
  });
  const data = Object.keys(salaries).map(key => {
    const name = key;
    const _total = salaries[key].reduce(
      (total: number = 0, value: number) => total + value
    );
    return { name, value: Math.floor(_total / salaries[key].length) };
  });
  return data.sort((a: any, b: any) => a.name - b.name);
};

const averageSalaryPerAge = (users: Array<any>) => {
  const currentYear = new Date().getFullYear();
  const salaries: any = {};
  users.forEach((user: any) => {
    if (user.date_of_birth) {
      const age = currentYear - parseInt(user.date_of_birth.substring(6));
      if (!salaries[age]) salaries[age] = [];
      salaries[age].push(user.salary);
    }
  });
  const data = Object.keys(salaries).map(key => {
    const name = key;
    const _total = salaries[key].reduce(
      (total: number = 0, value: number) => total + value
    );
    return { name, value: Math.floor(_total / salaries[key].length) };
  });
  return data.sort((a: any, b: any) => a.name - b.name);
};
const filterUsers = (users: Array<any>, filter: string) => {
  const currentYear = new Date().getFullYear();
  const ageMin = parseInt(filter.split("-")[0]);
  const ageMax = parseInt(filter.split("-")[1]);
  const filterUsers = users.filter(user => {
    const age = currentYear - parseInt(user.date_of_birth.substring(6));
    if (age > ageMin && age < ageMax) return user;
  });
  return filterUsers;
};

const ChartContainer = ({ filter }: any) => {
  const [chartType, setChartType] = useState<string>("pie");
  const [chart, setChart] = useState<string>("number-employees-per-industry");
  const users = useSelector((state: any) => state.users.users);
  const industries = useSelector((state: any) => state.industries.industries);
  const handleSelectChartChange = (chart: string) => {
    setChart(chart);
  };
  const handleSelectChartTypeChange = (chartType: string) => {
    setChartType(chartType);
  };
  let chartData: Array<any> = [];
  if (users && industries) {
    let filtredUsers = users;
    if (filter != "all") {
      filtredUsers = filterUsers(filtredUsers, filter);
    }
    switch (chart) {
      case "number-employees-per-industry":
        chartData = numberEmployeePerIndustry(filtredUsers, industries);
        break;
      case "yearly-spent-salary-per-industry":
        chartData = yearlySpentSalaryPerIndustry(filtredUsers, industries);
        break;
      case "average-salary-per-industry":
        chartData = averageSalaryPerIndustry(filtredUsers, industries);
        break;
      case "average-salary-per-experiance":
        chartData = averageSalaryPerExperiance(filtredUsers);
        break;
      case "average-salary-per-age":
        chartData = averageSalaryPerAge(filtredUsers);
        break;
      default:
        chartData = numberEmployeePerIndustry(filtredUsers, industries);
    }
  }
  return (
    <div>
      <span style={{ margin: "10px" }}>Chart type:</span>
      <Select
        defaultValue="pie"
        style={{ width: 100, margin: "0 3px" }}
        onChange={handleSelectChartTypeChange}
      >
        <Option value="pie">Pie</Option>
        <Option value="bars">Bars</Option>
        <Option value="lines">Lines</Option>
      </Select>
      <span style={{ margin: "10px" }}>Chart Data:</span>
      <Select
        defaultValue="number-employees-per-industry"
        style={{ width: 270, margin: "0 3px" }}
        onChange={handleSelectChartChange}
      >
        <Option value="number-employees-per-industry">
          Number of employees per industry
        </Option>
        <Option value="yearly-spent-salary-per-industry">
          Yearly spent salary per industry
        </Option>
        <Option value="average-salary-per-industry">
          Average salary per industry
        </Option>
        <Option value="average-salary-per-experiance">
          Average salary / years experiance
        </Option>
        <Option value="average-salary-per-age">Average salary / Age</Option>
      </Select>
      <div style={{ marginBottom: "20px" }} />
      {renderChart(chartType, chartData)}
    </div>
  );
};

export default ChartContainer;
