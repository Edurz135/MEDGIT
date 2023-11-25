function formatDate(date) {
    console.log(date)
    console.log("##########################")
    const [day, month, yearHour] = date.split("/");
    const [year, hms] = yearHour.split(" ");
    const [hour, minute, second] = hms.split(":");

    // Formato 'YYYY-MM-DD HH:mm:ss' para PostgreSQL
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate;
}

module.exports = {
    formatDate,
};
