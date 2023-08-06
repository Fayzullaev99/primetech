export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(\+998\d{9}|\d{9})$/;
    return phoneRegex.test(phoneNumber);
};
export const isValidName = (name) => name.length > 2





// const data = [
//     { id: 1, title: 'Item 1', date: '12:34:56 01:08:2023' },
//     { id: 2, title: 'Item 2', date: '15:20:42 02:08:2023' },
//     { id: 3, title: 'Item 3', date: '08:10:30 02:08:2023' },
//     // More data items with date field
//   ];
  
//   // Function to convert custom date string to Date object
//   const parseDateString = (dateString) => {
//     // Implementation as provided in the previous response
//   };
  
//   // Function to filter data by a specific day
//   const filterByDay = (data, day, month, year) => {
//     return data.filter(item => {
//       const itemDate = parseDateString(item.date);
//       return (
//         itemDate.getDate() === day &&
//         itemDate.getMonth() === month - 1 &&
//         itemDate.getFullYear() === year
//       );
//     });
//   };
  
//   // Function to filter data by a specific month (0-indexed: January is 0, February is 1, etc.)
//   const filterByMonth = (data, month, year) => {
//     return data.filter(item => {
//       const itemDate = parseDateString(item.date);
//       return (
//         itemDate.getMonth() === month - 1 &&
//         itemDate.getFullYear() === year
//       );
//     });
//   };
  
//   // Function to filter data by a specific year
//   const filterByYear = (data, year) => {
//     return data.filter(item => {
//       const itemDate = parseDateString(item.date);
//       return itemDate.getFullYear() === year;
//     });
//   };
  
//   // Example usage:
//   const filteredDataByDay = filterByDay(data, 1, 8, 2023);
//   const filteredDataByMonth = filterByMonth(data, 8, 2023);
//   const filteredDataByYear = filterByYear(data, 2023);
  
//   console.log(filteredDataByDay);
//   console.log(filteredDataByMonth);
//   console.log(filteredDataByYear);


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
  
//   // Get the current date and time
//   const currentTime = Date.now();
//   const currentDate = new Date(currentTime);
  
//   // Format the current date and time
//   const formattedDate = formatDate(currentDate);
  
//   console.log(formattedDate); 