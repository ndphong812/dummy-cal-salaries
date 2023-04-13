import React, { useState } from 'react';
import "./App.css";
import uuid from 'react-uuid';

const App = () => {

    const [name, setName] = useState(0);
    const [absent, setAbsent] = useState(0);
    const [percent, setPercent] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    const [list, setList] = useState([]);
    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAbsent = (e) => {
        setAbsent(e.target.value)
    }

    const handleChangePercent = (e) => {
        setPercent(e.target.value)
    }

    const changeTotalSalary = (e) => {
        setTotalSalary(e.target.value)
        let totalIndex = 0;
        const newList1 = [...list]; // sao chép mảng ban đầu
        newList1.forEach((item) => {
            totalIndex += (30 - item.absent) * item.percent / 100;
        })
        console.log("totalIndex", totalIndex)
        const newList2 = newList1.map(x => {
            return {
                ...x,
                salary: e.target.value / totalIndex * (30 - x.absent) * x.percent / 100
            }
        });
        // @ts-ignore
        setList(newList2); // cập nhật state với mảng mới
    }
    const handleSubmit = () => {
        const newList1 = [...list]; // sao chép mảng ban đầu
        newList1.push({
            id: uuid().substring(0, 10),
            name: name,
            absent: absent,
            percent: percent,
            salary: 0
        }); // thêm phần tử mới vào mảng sao chép
        // @ts-ignore

        let totalIndex = 0;
        newList1.forEach((item) => {
            totalIndex += (30 - item.absent) * item.percent / 100;
        })
        console.log("totalIndex", totalIndex)
        const newList2 = newList1.map(x => {
            return {
                ...x,
                salary: totalSalary / totalIndex * (30 - x.absent) * x.percent / 100
            }
        });
        // @ts-ignore
        setList(newList2); // cập nhật state với mảng mới
    }

    const handleRemove = (id) => {
        // @ts-ignore
        const filteredArr = list.filter(item => item.id != id);
        // @ts-ignore
        setList(filteredArr);
    }
    return (
        <div className='container'>
            <h2 className='name'>Tính Bảng Lương</h2>
            <input onChange={(e) => changeTotalSalary(e)} className='total' type='number' placeholder='Nhập tổng lương' />
            <h4>Nhập nhân viên</h4>
            <div className='group'>
                <input onChange={(e) => handleChangeName(e)} placeholder='Tên' type="text" />
                <input onChange={(e) => handleChangeAbsent(e)} placeholder='Số ngày nghỉ' type="number" />
                <input onChange={(e) => handleChangePercent(e)} placeholder='% lương' type="number" />
                <button onClick={() => handleSubmit()}>Thêm</button>
            </div>
            <div className="list">
                {
                    list && list.length > 0 && list.map((item) => {
                        return (
                            <div>
                                {item.
                                    // @ts-ignore
                                    name}
                                - {(Math.round(item.
                                    // @ts-ignore
                                    salary / 1000) * 1000).toLocaleString()}vnđ
                                <button className='remove' onClick={() => handleRemove(item.
                                    // @ts-ignore
                                    id)}>Xóa</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default App;