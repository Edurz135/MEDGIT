function ArrayArrToObjectArr(arr) {
    let attr = arr[0];

    let toReturn = [];

    for (var i = 1; i < arr.length; i++) {
        let obj = {};
        for (let j = 0; j < attr.length; j++) {
            obj[attr[j]] = arr[i][j];
        }
        toReturn.push(obj);
    }
    return toReturn;
}

module.exports = {
    ArrayArrToObjectArr,
};
