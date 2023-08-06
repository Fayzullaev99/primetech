import React from 'react'
import * as XLSX from 'xlsx'
import styles from './component.module.css'

function Filter({ users, setUsers, allUsers }) {
    function sortAscending(arr) {
        let sortedAZ = arr.slice().sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedAZ)
    }
    function sortDescending(arr) {
        let sortedZA = arr.slice().sort((a, b) => b.name.localeCompare(a.name));
        setUsers(sortedZA)
    }
    const parseDateString = (dateString) => {
        const [time, date] = dateString.split(' ');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const [day, month, year] = date.split('.').map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
    };
    const filterByDay = (day, month, year) => {
        let filteredUsers = allUsers.filter((item) => {
            const itemDate = parseDateString(item.timestamp);
            return (
                itemDate.getDate() === day &&
                itemDate.getMonth() === month &&
                itemDate.getFullYear() === year
            );
        });
        setUsers(filteredUsers);
    };
    const filterByMonth = (month, year) => {
        let filteredUsers = allUsers.filter((item) => {
            const itemDate = parseDateString(item.timestamp);
            return (
                itemDate.getMonth() === month &&
                itemDate.getFullYear() === year
            );
        });
        setUsers(filteredUsers);
    };
    const filterByYear = (year) => {
        let filteredUsers = allUsers.filter((item) => {
            const itemDate = parseDateString(item.timestamp);
            return itemDate.getFullYear() === year;
        });
        setUsers(filteredUsers);
    };
    const filterBySell = () => {
        let filteredUsers = allUsers.filter((item) => {
            return item.state === 'sotuv'
        });
        setUsers(filteredUsers);
    };
    const filterByMeet = () => {
        let filteredUsers = allUsers.filter((item) => {
            return item.state === 'uchrashuv'
        });
        setUsers(filteredUsers);
    };
    const filterByIgnore = () => {
        let filteredUsers = allUsers.filter((item) => {
            return item.state === 'rad'
        });
        setUsers(filteredUsers);
    };
    const downloadExcel  = () => {
        const data = users.map((user) => ({
          Ism: user.name,
          Familya: user.lastname,
          Email: user.email,
          Manzil: user.address,
          Telefon: user.phoneNumber,
          Holat: user.state,
          Sabab: user.text,
          Vaqt: user.timestamp,
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
    
        const excelFileName = 'user_data.xlsx';
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(excelBlob, excelFileName);
        } else {
          const excelFileUrl = URL.createObjectURL(excelBlob);
          const downloadLink = document.createElement('a');
          downloadLink.href = excelFileUrl;
          downloadLink.download = excelFileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
    };
    return (
        <div className={styles.filter}>
            <div className='container'>
                <div className={styles.filter__box}>
                    <div>
                        <button className="blueBtn" onClick={() => sortAscending(users)}>A-Z</button>
                        <button className="blueBtn" onClick={() => sortDescending(users)}>Z-A</button>
                        <button className="blueBtn" onClick={() => filterByDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear())}>Daily</button>
                        <button className="blueBtn" onClick={() => filterByMonth(new Date().getMonth(), new Date().getFullYear())}>Monthly</button>
                        <button className="blueBtn" onClick={() => filterByYear(new Date().getFullYear())}>Yearly</button>
                        <button className="blueBtn" onClick={() => filterBySell()}>Sell</button>
                        <button className="blueBtn" onClick={() => filterByMeet()}>Meet</button>
                        <button className="blueBtn" onClick={() => filterByIgnore()}>Ignore</button>
                    </div>
                    <div>
                        <button className="blueBtn" onClick={() => downloadExcel()}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter