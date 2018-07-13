module.exports = (req, res) => {
    res.statusCode = 404;
    res.send('This is not the page you are looking for...');
};