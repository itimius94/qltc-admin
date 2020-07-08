import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../configs";

export default function ListSpending() {
  const [listSpending, setListSpending] = useState({});
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    fetchListSpending();
    fetchListCategory();
  }, []);

  const fetchListCategory = () => {
    try {
      axios.get(`${API_URL}/category`).then((res) => {
        setListCategory(res.data);
      });
    } catch (error) {}
  };

  const fetchListSpending = (page = 1, limit = 5) => {
    try {
      axios
        .get(`${API_URL}/spending?page=${page}&limit=${limit}`)
        .then((res) => {
          setListSpending(res.data);
        });
    } catch (error) {}
  };

  const getCategory = (id) => {
    const current = listCategory.find((item) => item._id === id);

    if (current) return current.name;
  };

  const listItems =
    listSpending.data &&
    listSpending.data.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND
        </td>
        <td>{item.date}</td>
        <td className="text-capitalize">{getCategory(item.category_id)}</td>
      </tr>
    ));

  const listItemsEmpty = (
    <tr>
      <td colSpan="4" className="text-center">
        Chưa có chi tiêu nào
      </td>
    </tr>
  );

  const renderPagination = [];
  if (listSpending.totalPages) {
    for (let i = 1; i <= listSpending.totalPages; i++) {
      renderPagination.push(
        <li
          key={i}
          className={`page-item ${
            i === listSpending.currentPage ? "active" : ""
          }`}
        >
          <button className="page-link" onClick={() => fetchListSpending(i)}>
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
            <th className="text-center">Ngày chi</th>
            <th className="text-center">Danh mục</th>
          </tr>
        </thead>
        <tbody>{listSpending.data ? listItems : listItemsEmpty}</tbody>
      </table>

      <nav aria-label="Page navigation example" className="text-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                listSpending.currentPage > 1
                  ? fetchListSpending(listSpending.currentPage - 1)
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
                listSpending.totalPages > listSpending.currentPage
                  ? fetchListSpending(listSpending.currentPage + 1)
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
