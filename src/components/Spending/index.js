import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

import { API_URL } from "../../configs";

export default function Spending(props) {
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const alert = useAlert();

  const { listItems } = props;

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !price || !categoryId) {
      alert.show("Bạn phải nhập chính xác thông tin", {
        type: "error",
      });

      return;
    }

    try {
      axios
        .post(`${API_URL}/spending`, {
          date: date,
          price: price,
          category_id: categoryId,
        })
        .then((res) => {
          setPrice("");
          setCategoryId("");
          setDate("");
          alert.show("Thêm thành công!", {
            type: "success",
          });
        });
    } catch (error) {}
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-success">Thêm khoản chi</h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <select
                className="form-control form-control-user--select text-capitalize"
                value={categoryId}
                onChange={handleChangeCategory}
              >
                {listItems}
              </select>
            </div>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control form-control-user"
                placeholder="Số tiền VND"
                value={price}
                onChange={handleChangePrice}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-user"
              placeholder="Chọn ngày"
              value={date}
              onChange={handleChangeDate}
            />
          </div>
          <button className="btn btn-success btn-user btn-block" type="submit">
            Chi
          </button>
        </form>
      </div>
    </div>
  );
}
