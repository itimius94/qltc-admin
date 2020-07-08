import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import ListSpending from "../../components/ListSpending";
import ListEarning from "../../components/ListEarning";
import ReportSpending from "../../components/ReportSpending";

import { API_URL } from "../../configs";

export default function Report() {
  const [listCategory, setListCategory] = useState([]);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));

  useEffect(() => {
    fetchListCategory();
  }, []);

  const fetchListCategory = () => {
    try {
      axios.get(`${API_URL}/category`).then((res) => {
        setListCategory(res.data);
      });
    } catch (error) {}
  };

  const handleChangeDate = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div id="content">
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <h1 className="h3 mb-0 text-gray-800">Trang chủ</h1>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Báo cáo chi tiêu
                </h6>

                <div>
                  <input
                    type="month"
                    className="form-control"
                    placeholder="Chọn tháng"
                    value={month}
                    onChange={handleChangeDate}
                  />
                </div>
              </div>
              <div className="card-body">
                <ReportSpending listCategory={listCategory} date={month} />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5"></div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-success">
                  Danh sách chi
                </h6>
              </div>
              <div className="card-body">
                <ListSpending />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Danh sách thêm
                </h6>
              </div>

              <div className="card-body">
                <ListEarning />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
