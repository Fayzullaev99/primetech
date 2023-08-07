import React from 'react'
import { downloadExcel } from '../helpers';
import styles from './component.module.css'

function Filter({ users, setUsers, allUsers, loggedType }) {
    console.log(loggedType);
    function sortAscending(arr) {
        let sortedAZ = arr.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
        setUsers(sortedAZ)
    }
    function sortDescending(arr) {
        let sortedZA = arr.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));
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
    const filterBySimple = () => {
        let filteredUsers = allUsers.filter((item) => {
            return item.type === 'simple'
        });
        setUsers(filteredUsers);
    };
    const filterByAdmin = () => {
        let filteredUsers = allUsers.filter((item) => {
            return item.type === 'admin'
        });
        setUsers(filteredUsers);
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
                        {loggedType === "simple" && (
                            <>
                                <button className="blueBtn" onClick={() => filterBySell()}>Sell</button>
                                <button className="blueBtn" onClick={() => filterByMeet()}>Meet</button>
                                <button className="blueBtn" onClick={() => filterByIgnore()}>Ignore</button>
                            </>
                        )}
                        {loggedType === "super" && (
                            <>
                                <button className="blueBtn" onClick={() => filterBySimple()}>Simple</button>
                                <button className="blueBtn" onClick={() => filterByAdmin()}>Admins</button>
                            </>
                        )}
                    </div>
                    <div>
                        <button className="blueBtn" onClick={() => downloadExcel(users)}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter