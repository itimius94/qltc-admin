import React, { useState, useEffect } from "react";
import axios from "axios";

import Spending from "../../components/Spending";
import Earning from "../../components/Earning";
import Income from "../../components/Income";
import ReportChart from "../../components/ReportChart";

import { API_URL } from "../../configs";

export default function HomePage() {
  const [listCategory, setListCategory] = useState([]);

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

  const listItems = listCategory.map((item, index) => (
    <option key={index} value={item._id}>
      {item.name}
    </option>
  ));

  return (
    <div id="content">
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <h1 className="h3 mb-0 text-gray-800">Trang chủ</h1>
      </nav>

      <div className="container-fluid">
        {/* <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Earnings (Monthly)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $40,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Earnings (Annual)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Tasks
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          50%
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            // style="width: 50%"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <ReportChart listCategory={listCategory} />
          </div>

          <div className="col-xl-4 col-lg-5">
            <Income />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <Earning />
          </div>

          <div className="col-lg-6 mb-4">
            <Spending listItems={listItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
