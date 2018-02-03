module.exports = (req, res, next) => {
    req.body = req.body || {};
    req.body.vault = req.body.vault || {};
    let auth = {
        bearer: ''
    };
    let authHeader = req.headers.authorization || false;
    if (!authHeader) return  req.body.vault.auth = false;


    let authType = authHeader.split(' ');
    if (authType[0] === 'Basic') {
        let base64 = authType[1];
        let base64Buffer = new Buffer(base64, 'base64');
        let stringHeader = base64Buffer.toString();
        auth.basic = JSON.parse(stringHeader);

    } else {
        if (authType[0] !== 'Bearer') return  req.body.vault.auth = false;
        if (authType[1] === '') return  req.body.vault.auth = false;
        if (authType[1] === 'undefined') return  req.body.vault.auth = false;
        auth.push(authType[1])
        auth['bearer'] = authType[1];
    }
    req.body.vault.auth = auth;

    return next();
};
