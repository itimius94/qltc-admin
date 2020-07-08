import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

import { API_URL } from "../../configs";

export default function Income() {
  const [price, setPrice] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const alert = useAlert()

  useEffect(() => {
    axios.get(`${API_URL}/common`).then((res) => {
      if (res.data.length) {
        setPrice(res.data[0].price);
      } else {
        setIsShow(true)
      }
    });
  }, []);

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
        .post(`${API_URL}/common`, {
          price: price,
        })
        .then((res) => {
          setPrice("");
          setIsShow(false)
          alert.show("Thêm thành công!", {
            type: "success",
          });
        });
    } catch (error) {}
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">
          Thu nhập hàng tháng
        </h6>
      </div>

      <div className="card-body">
        {isShow && (
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
            <button
              type="submit"
              className="btn btn-success btn-user btn-block"
            >
              Thêm
            </button>
          </form>
        )}

        {!isShow &&
          `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND`}
      </div>
    </div>
  );
}
