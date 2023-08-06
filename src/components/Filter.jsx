import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
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
        console.log(filteredUsers);
        setUsers(filteredUsers);
        console.log('filter', filteredUsers);
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
        console.log('filter', filteredUsers);
    };
    const filterByYear = (year) => {
        let filteredUsers = allUsers.filter((item) => {
            const itemDate = parseDateString(item.timestamp);
            return itemDate.getFullYear() === year;
        });
        setUsers(filteredUsers);
        console.log('filter', filteredUsers);
    };
    return (
        <div className={styles.filter}>
            <div className='container'>
                <div className={styles.filter__box}>
                    <div>
                        <button className={styles.sort__az} onClick={() => sortAscending(users)}>A-Z</button>
                        <button className={styles.sort__za} onClick={() => sortDescending(users)}>A-Z</button>
                        <button className={styles.filter__btn} onClick={() => filterByDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear())}>Daily</button>
                        <button className={styles.filter__btn} onClick={() => filterByMonth(new Date().getMonth(), new Date().getFullYear())}>Monthly</button>
                        <button className={styles.filter__btn} onClick={() => filterByYear(new Date().getFullYear())}>Yearly</button>
                    </div>
                    <div>
                        <button className={styles.file__download} onClick={() => ""}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter