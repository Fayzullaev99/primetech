import * as XLSX from 'xlsx'

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(\+998\d{9}|\d{9})$/;
    return phoneRegex.test(phoneNumber);
};
export const isValidName = (name) => name.length > 2

export const downloadExcel = (el) => {
    let data = el?.users?.length > 0 ? el.users : el.length > 0 ? el.map((user) => ({
        Ism: user.firstname,
        Familya: user.lastname,
        Email: user.email,
        Manzil: user.address,
        Telefon: user.phonenumber,
        Holat: user.state,
        Sabab: user.text,
        Vaqt: user.timestamp,
        Deadline: user?.deadline,
        Daraja: user?.position
    })) : [{
        Ism: el.firstname,
        Familya: el.lastname,
        Email: el.email,
        Manzil: el.address,
        Telefon: el.phonenumber,
        Holat: el.state,
        Sabab: el.text,
        Vaqt: el.timestamp,
        Deadline: el?.deadline,
        Daraja: el?.position
    }]
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


export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
    return formattedDate;
};
