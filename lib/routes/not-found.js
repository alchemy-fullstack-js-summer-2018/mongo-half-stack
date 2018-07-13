module.exports = (req, res) => {
    res.statusCode = 404;
    res.end('This is not the page you are looking for...');
};