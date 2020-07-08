import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../configs";

export default function ListEarning() {
  const [listEarning, setListEarning] = useState({});

  useEffect(() => {
    fetchListEarning();
  }, []);

  const fetchListEarning = (page = 1, limit = 5) => {
    try {
      axios
        .get(`${API_URL}/earning?page=${page}&limit=${limit}`)
        .then((res) => {
          setListEarning(res.data);
        });
    } catch (error) {}
  };

  const renderListItem =
    listEarning.data &&
    listEarning.data.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND
        </td>
        <td>{item.date}</td>
      </tr>
    ));

  const renderEmpty = (
    <tr>
      <td colSpan="4" className="text-center">
        Chưa có chi tiêu nào
      </td>
    </tr>
  );

  const renderPagination = [];
  if (listEarning.totalPages) {
    for (let i = 1; i <= listEarning.totalPages; i++) {
      renderPagination.push(
        <li
          key={i}
          className={`page-item ${
            i === listEarning.currentPage ? "active" : ""
          }`}
        >
          <button className="page-link" onClick={() => fetchListEarning(i)}>
            {i}
          </button>
        </li>
      );
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th className="text-center">Số tiền</th>
            <th className="text-center">Ngày thêm</th>
          </tr>
        </thead>
        <tbody>{listEarning.data ? renderListItem : renderEmpty}</tbody>
      </table>

      <nav aria-label="Page navigation example" className="text-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                listEarning.currentPage > 1
                  ? fetchListEarning(listEarning.currentPage - 1)
                  : {}
              }
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {renderPagination}
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={() =>
                listEarning.totalPages > listEarning.currentPage
                  ? fetchListEarning(listEarning.currentPage + 1)
                  : {}
              }
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
