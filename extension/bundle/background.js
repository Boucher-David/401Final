let MK = false;

// triplesec is loaded as variable triplesec. Come back later to encode.
// superagent is also loaded. don't send requests within the app, do it here.

pingSync = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('vault', result => {
          resolve(result.vault || {});
        });
    });
}

saveSync = async (k, v) => {

    let _vault = await pingSync();
    _vault[k] = v;
    chrome.storage.sync.set({'vault': _vault});
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let message = Object.keys(request);
    switch(message[0]) {
        case 'getMK':
            (MK) ? sendResponse(true) : sendResponse(false);
            return;
        case 'setMK':
            MK = request[message[0]];
            console.log(MK);
            return;
        case 'saveCredential':
            let _cred = request['saveCredential'];

            // create a function that checks for MK + user_id.
            // if both are present, encrypt _cred and send to server
            return;
        case 'saveLogins':
        saveSync('logins',request['saveLogins']);
        
            return;

        case 'saveID':
        saveSync('user_id', request['saveID']);

            return; 
        default:
            return;
    }

});

let encryptPassword = (_data) => {
return new Promise((resolve, reject) => {
  triplesec.encrypt(({
    key: new triplesec.Buffer(MK),
    data: new triplesec.Buffer(_data)}), (err, ciphertext) => {
    if(err) reject('Failed!');
    resolve(ciphertext.toString('hex'));
  });
})

}

let decryptPassword = (text) => {
  return new Promise((resolve, reject) => {
    triplesec.decrypt({
      data: new triplesec.Buffer(text, 'hex'),
      key: new triplesec.Buffer(MK)
    }, (err, decryptString) => {
      if(err) reject('Failed!');
      resolve(decryptString.toString());
    })
  })
}

let verifyEncryptionAndSend = async (obj) => {
  let _id = await pingSync();
    let _object = obj;
      if(MK && _id.user_id) {
        let encrypted = await encryptPassword(obj.credential)
        _object.credential = encrypted;
        return _object;
      }
  }



// save user_id
// chrome.runtime.sendMessage({'saveID': '12345'});

// // set master key
// chrome.runtime.sendMessage({setMK: master_key});

// // get master key
// chrome.runtime.sendMessage({getMK: null}, response => {
//     // does not return MK, simply returns true or false of MK has been entered.
// });

// // how to save credentials gotten by content script popup box
// chrome.runtime.sendMessage({saveCredential: {nickname: 'nickname', credential: 'stringifed credential object'}});
