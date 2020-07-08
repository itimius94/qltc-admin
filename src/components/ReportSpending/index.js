import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

import { API_URL } from "../../configs";

export default function ReportSpending(props) {
  const { listCategory, date } = props;
  const [dataSpending, setDataSpending] = useState([]);
  let currentYear = moment(date).year();
  let currentMonth = moment(date).month();

  useEffect(() => {
    axios
      .get(
        `${API_URL}/report/spending?year=${currentYear}&month=${
          currentMonth + 1
        }`
      )
      .then((res) => {
        setDataSpending(res.data);
      });
  }, [date]);

  const getName = (id) => {
    if (!listCategory.length) return "";

    const current = listCategory.find((item) => item._id === id);

    return current.name;
  };

  let labels = dataSpending.map((item) => getName(item.category_id));
  let prices = dataSpending.map((item) => item.price);
  let colors = dataSpending.map((item) => item.color);
  let data = {
    labels: labels,
    datasets: [
      {
        data: prices,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  let options = {
    legend: {
      position: "right",
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          let price =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

          return ` ${price
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND`;
        },
      },
    },
  };

  return (
    <div>
      {dataSpending.length ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div>Không có dữ liệu thống kê</div>
      )}
    </div>
  );
}
