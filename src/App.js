// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./App.css";
import uuid from "react-uuid";
import numeral from "numeral";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const App = () => {
  const [name, setName] = useState("");
  const [absent, setAbsent] = useState(0);
  const [percent, setPercent] = useState(0);
  const [totalSalary, setTotalSalary] = useState(
    localStorage.getItem("totalSalary") || 0
  );
  const [totalDay, setTotalDay] = useState(
    localStorage.getItem("totalDay") || 0
  );
  const [total, setTotal] = useState(0);

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAbsent = (e) => {
    setAbsent(e.target.value);
  };

  const handleChangePercent = (e) => {
    setPercent(e.target.value);
  };

  const updateList = () => {
    let totalIndex = 0;
    list.forEach((item) => {
      totalIndex += ((totalDay - item.absent) * item.percent) / 100;
    });

    setTotal(totalIndex);
    const newList2 = list.map((x) => {
      return {
        ...x,
        salary:
          ((totalSalary / totalIndex) * (totalDay - x.absent) * x.percent) /
          100,
      };
    });

    setList(newList2); // cập nhật state với mảng mới
    localStorage.setItem("list", JSON.stringify(newList2));
  };
  const changeTotalSalary = (e) => {
    localStorage.setItem("totalSalary", e.target.value);
    setTotalSalary(e.target.value);
  };

  const changeTotalDay = (e) => {
    localStorage.setItem("totalDay", e.target.value);
    setTotalDay(e.target.value);
  };

  const handleSubmit = () => {
    const newList1 = [...list]; // sao chép mảng ban đầu
    newList1.push({
      id: uuid().substring(0, 10),
      name: name,
      absent: absent,
      percent: percent,
      salary: 0,
    }); // thêm phần tử mới vào mảng sao chép
    setList(newList1);
  };

  const handleRemove = (id) => {
    const filteredArr = list.filter((item) => item.id != id);
    setList(filteredArr);
  };

  const reset = () => {
    setName("");
    setAbsent(0);
    setPercent(0);
    setTotalSalary(0);
    localStorage.removeItem("totalSalary");
    setTotal(0);
    setList([]);
    localStorage.removeItem("list");
    setTotal(0);
    localStorage.removeItem("totalDay");
  };

  useEffect(() => {
    updateList();
  }, [list.length, totalSalary, totalDay]);

  return (
    <div className="container">
      <h2 className="name">Tính Bảng Lương</h2>
      {/* <input
        onChange={(e) => changeTotalSalary(e)}
        value={totalSalary}
        className="total"
        type="number"
        placeholder="Nhập tổng lương"
      /> */}
      <TextField
        label="Nhập tổng lương"
        variant="outlined"
        onChange={(e) => changeTotalSalary(e)}
        value={totalSalary || ""}
        className="total"
        type="number"
        sx={{ marginTop: "12px" }}
      />
      {/* <input
        onChange={(e) => changeTotalDay(e)}
        value={totalDay}
        className="total"
        type="number"
        placeholder="Ngày công chuẩn"
      /> */}

      <TextField
        placeholder="Ngày công chuẩn"
        variant="outlined"
        onChange={(e) => changeTotalDay(e)}
        value={totalDay || ""}
        className="total"
        sx={{ marginTop: "12px" }}
        type="number"
      />

      <h4>Nhập nhân viên</h4>
      <div className="group">
        <div className="group-inputs">
          {/* <input
            className="input-name"
            onChange={(e) => handleChangeName(e)}
            placeholder="Tên"
            value={name}
            type="text"
          /> */}
          <TextField
            placeholder="Tên"
            variant="outlined"
            onChange={(e) => handleChangeName(e)}
            value={name || ""}
            className="input-name"
            type="text"
          />
          {/* <input
            className="input-absent"
            onChange={(e) => handleChangeAbsent(e)}
            placeholder="Số ngày nghỉ"
            value={absent}
            type="number"
          /> */}

          <TextField
            placeholder="Số ngày nghỉ"
            variant="outlined"
            onChange={(e) => handleChangeAbsent(e)}
            value={absent || ""}
            className="input-absent"
            type="number"
          />

          {/* <input
            className="input-salary"
            onChange={(e) => handleChangePercent(e)}
            placeholder="% lương"
            value={percent}
            type="number"
          /> */}

          <TextField
            placeholder="%"
            variant="outlined"
            onChange={(e) => handleChangePercent(e)}
            value={percent || ""}
            className="input-salary"
            type="number"
          />
        </div>
        <Button
          className="reset"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Thêm
        </Button>
        {/* <button onClick={() => handleSubmit()}>Thêm</button> */}
      </div>
      <div className="detail">
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <div>
                {item.name}- {item.percent}%, nghỉ {item.absent} ngày &rarr; còn{" "}
                {totalDay - item.absent} ngày
              </div>
            );
          })}
      </div>
      <h3 className="total">
        Tổng công =
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            if (index == list.length - 1) {
              return (
                <span>
                  {totalDay - item.absent}*{item.percent / 100}
                </span>
              );
            }
            return (
              <span>
                {totalDay - item.absent}*{item.percent / 100} +
              </span>
            );
          })}
        <span>={total}</span>
      </h3>
      <div className="list">
        {list &&
          list.length > 0 &&
          list.map((item) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <div>
                  {item.name}
                  {` = `}
                  {`${totalSalary}/${total}*${totalDay - item.absent}*${
                    item.percent / 100
                  } = `}
                  {numeral(item.salary).format("0,0")} rúp
                </div>
                {/* <button
                  className="remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Xóa
                </button> */}
                <Button
                  className="remove"
                  variant="outlined"
                  onClick={() => handleRemove(item.id)}
                >
                  Xóa
                </Button>
              </div>
            );
          })}
      </div>
      <div className="list1" style={{ marginTop: "10px" }}>
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            if (index == list.length - 1) {
              return (
                <span>
                  {item.name} {` = `}
                </span>
              );
            } else {
              return (
                <span>
                  {item.name} {` + `}
                </span>
              );
            }
          })}

        {list && list.length > 0 && (
          <span>
            {numeral(list.reduce((total, num) => total + num.salary, 0)).format(
              "0,0"
            )}
          </span>
        )}
      </div>
      <Button
        className="reset"
        variant="outlined"
        onClick={() => reset()}
        style={{ marginTop: "10px" }}
      >
        Xoá tất cả
      </Button>
    </div>
  );
};

export default App;
