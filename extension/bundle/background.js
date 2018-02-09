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
            return;

        case 'saveCredential':
          verifyEncryptionAndSend(request['saveCredential']);
          return;
        
          case 'getCredential':
            sendResponse(MK);
            return;

          case 'deleteCredential':
            let d = await deleteCredential(request.deleteCredential);
            sendResponse('hello');
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


let verifyEncryptionAndSend = async (obj) => {
  let _id = await pingSync();
    let _object = obj;

      if(MK && _id.user_id) {
        let encrypted = await encryptPassword(obj.credentials);

        _object.credentials = encrypted;
        _object.user_id = _id.user_id;

        superagent.post('http://localhost:3000/credential/set').set('Authorization', `Basic ${btoa(JSON.stringify(_object))}`).then(response => {  
          if (response.body.vault.saved) return saveSync('logins', response.body.vault.logins);
        });
      }
  }

deleteCredential = async (cred) => {
  let _id = await pingSync();
  let _obj = {};
  
  _obj.user_id = _id.user_id;

  superagent.delete(`http://localhost:3000/credential/delete/${cred}`).set('Authorization', `Basic ${btoa(JSON.stringify(_obj))}`).then(response => {
  if (response.body.vault.deleted) {
    console.log(response.body.vault);
      saveSync('logins', response.body.vault.logins);
    }
  })
}

deleteAll = async () => {
  let _id = await pingSync();
  let _obj = {};
  
  _obj.user_id = _id.user_id;

  superagent.delete(`http://localhost:3000/credential/reset`).set('Authorization', `Basic ${btoa(JSON.stringify(_obj))}`).then(response => {
    if (response.body.vault.deleted) {
      saveSync('logins', response.body.vault.logins);
    }
  });
}