const triplesec = require('triplesec');


module.exports = {

    encrypt: async (_data) => {
        return new Promise((resolve, reject) => {
            triplesec.encrypt({
                key: new triplesec.Buffer(process.env.SECURITY),
                data: new triplesec.Buffer(_data)
            }, (err, cipher) => {
                resolve(cipher.toString('hex'));
            });
        });
    },

    decrypt: async (_text) => {
        return new Promise ((resolve, reject) => {
            triplesec.decrypt({
                data: new triplesec.Buffer(_text, 'hex'),
                key: new triplesec.Buffer(process.env.SECURITY)
              }, (err, decryptString) => {
                if(err) reject('Failed!');
                resolve(decryptString.toString());
              })
            
        });
    }
}