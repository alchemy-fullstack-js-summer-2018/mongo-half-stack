module.exports = req => {
    return new Promise((resolve, reject) => {
        console.log('inside body-parser.js req is:', req);
        let body = '';
        req.on('data', data => {
            console.log('inside body-parser.js data is:', data);
            body += data;
        });

        req.on('end', () => {
            if(!body) return resolve({});

            const parsed = JSON.parse(body);
            resolve(parsed);
            console.log('inside body-parser.js parsed is:', parsed);
        });

        req.on('error', reject);
    });
};  