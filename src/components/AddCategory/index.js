import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

import { API_URL } from "../../configs";

export default function AddCategory(props) {
  const [name, setName] = useState("");
  const alert = useAlert();
  const { toogleAddCategory } = props;

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert.show("Tên danh mục không được trống", {
        type: "error",
      });

      return;
    }

    try {
      axios
        .post(`${API_URL}/category`, {
          name: name,
        })
        .then(() => {
          alert.show("Thêm thành công!", {
            type: "success",
          });
          toogleAddCategory();
        });
    } catch (error) {}
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-success">Thêm danh mục</h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              placeholder="Tên danh mục"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-success btn-user btn-block">
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
}
