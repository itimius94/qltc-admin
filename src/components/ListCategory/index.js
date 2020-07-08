import React from "react";

export default function ListCategory(props) {
  const { listCategory } = props;

  const listItems = listCategory.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="text-capitalize">{item.name}</td>
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table
        className="table table-bordered"
        id="dataTable"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th className="text-center">Tên danh mục</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}
