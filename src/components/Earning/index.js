import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import moment from "moment";

import { API_URL } from "../../configs";

export default function Earning() {
  const [price, setPrice] = useState("");
  const alert = useAlert();

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price) {
      alert.show("Bạn phải nhập đủ thông tin", {
        type: "error",
      });
      return;
    }

    try {
      axios
        .post(`${API_URL}/earning`, {
          date: moment().format("YYYY-MM-DD"),
          price: price,
        })
        .then((res) => {
          setPrice("");
          alert.show("Thêm thành công!", {
            type: "success",
          });
        });
    } catch (error) {}
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-success">Thêm khoản thu</h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-user"
              placeholder="Số tiền VND"
              value={price}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success btn-user btn-block">
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
}
