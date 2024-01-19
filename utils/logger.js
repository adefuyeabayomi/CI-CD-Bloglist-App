let info = (...params) => {
    console.log(...params);
}

let error = (...params) => {
    console.log(...params);
}

module.exports = {
    info, error
}