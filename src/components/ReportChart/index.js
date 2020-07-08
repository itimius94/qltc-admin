import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

import { API_URL } from "../../configs";

export default function ReportChart(props) {
  const [dataSpending, setDataSpending] = useState([]);
  const [dataEarning, setDataEarning] = useState([]);
  const { listCategory } = props;

  useEffect(() => {
    axios.get(`${API_URL}/report`).then((res) => {
      setDataSpending(res.data.spending);
      setDataEarning(res.data.earning);
    });
  }, []);

  const getDatasets = listCategory.map((item, index) => {
    const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
    let data = [];

    dataSpending.forEach((dataItem) => {
      data.push(dataItem[index].price);
    });

    return {
      label: item.name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: color,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
    };
  });

  const getLabels = () => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      result.push(moment().subtract(i, "month").format("MMMM"));
    }

    return result.reverse();
  };

  const data = {
    labels: getLabels(),
    datasets: [
      ...getDatasets,
      {
        label: 'Tiền thêm vào',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataEarning
      }
    ],
  };

  let options = {
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
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Thống kê</h6>
      </div>
      <div className="card-body">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
