let MK = false;

// triplesec is loaded as variable triplesec. Come back later to encode.
// superagent is also loaded. don't send requests within the app, do it here.


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let message = Object.keys(request);
    switch(message[0]) {
        case 'getMK':
            (MK) ? sendResponse(true) : sendResponse(false);
            return;
        case 'setMK':
            MK = request[message[0]];
            return;
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