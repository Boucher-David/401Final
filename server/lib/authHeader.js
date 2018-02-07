module.exports = (req, res, next) => {
    req.body = req.body || {};
    req.body.vault = req.body.vault || {};
    req.body.vault = {
        auth: {
            basic: false
        }
    };
    let authHeader = req.headers.authorization || false;
    if (!authHeader) return next();


    let authType = authHeader.split(' ');
    if (authType[0] === 'Basic') {
        let base64 = authType[1];
        let base64Buffer = new Buffer(base64, 'base64');
        
        let stringHeader = base64Buffer.toString();

        req.body.vault.auth.basic = JSON.parse(stringHeader);
    }

    return next();
};