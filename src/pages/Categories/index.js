import React, { useState, useEffect } from "react";
import axios from "axios";

import ListCategory from "../../components/ListCategory";
import AddCategory from "../../components/AddCategory";

import { API_URL } from '../../configs'

export default function Category(props) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    fetchListCategory()
  }, []);

  const fetchListCategory = () => {
    try {
      axios.get(`${API_URL}/category`).then((res) => {
        setListCategory(res.data);
      });
    } catch (error) {}
  }

  const toogleAddCategory = () => {
    if (showAddCategory) {
      fetchListCategory()
    }

    setShowAddCategory(!showAddCategory);
  };

  return (
    <div id="content">
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <h1 className="h3 mb-0 text-gray-800">Quản lý danh mục</h1>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-success">
                  List danh mục
                </h6>
              </div>
              <div className="card-body">
                <ListCategory listCategory={listCategory} />
                {!showAddCategory && (
                  <button
                    className="btn btn-success btn-block"
                    onClick={() => toogleAddCategory()}
                  >
                    Thêm danh mục mới
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            {showAddCategory && (
              <AddCategory toogleAddCategory={() => toogleAddCategory()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
