let MK = false;

// triplesec is loaded as variable triplesec. Come back later to encode.
// superagent is also loaded. don't send requests within the app, do it here.

pingSync = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('vault', result => {
            resolve(result);
        });
    });
}

saveSync = async (value=false) => {

    let _vault = await pingSync();
    let _new = {..._vault};
    Object.keys(value).forEach(keys => {
        _new[keys] = value[keys];
    });
    _new['vault'] = null;
    delete _new['vault'];
    delete _vault['_vault'];

    chrome.storage.sync.set({'vault': _new});
}


// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     let message = Object.keys(request);
//     switch(message[0]) {
//         case 'getMK':
//             (MK) ? sendResponse(true) : sendResponse(false);
//             return;
//         case 'setMK':
//             MK = request[message[0]];
//             return;
//         case 'saveCredential':
//             let _cred = request['saveCredential'];
//
//             // create a function that checks for MK + user_id.
//             // if both are present, encrypt _cred and send to server
//             return;
//         case 'saveID':
//             let _ = await saveSync({'user_id': request[message]});
//             _ = await pingSync();
//             console.log(_);
//             return;
//         default:
//             return;
//     }
//
// });

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
