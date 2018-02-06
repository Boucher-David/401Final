

let MK = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //let vault = chrome.storage.local.get('vault', result =>result);
    let message = Object.keys(request);
    switch(message[0]) {
        case 'getMK':
            (MK) ? sendResponse(true) : sendResponse(false);
            return;
        case 'setMK':
            MK = request[message[0]];
            return

        case 'saveCredential':
            console.log(request['saveCredential']);
            return;
        default:
            return;
    }

});

// // set master key
// chrome.runtime.sendMessage({setMK: master_key});

// // get master key
// chrome.runtime.sendMessage({getMK: null}, response => {
//     // does not return MK, simply returns true or false of MK has been entered.
// });

// // how to save credentials gotten by content script popup box
// chrome.runtime.sendMessage({saveCredential: {nickname: 'nickname', credential: 'stringifed credential object'}});