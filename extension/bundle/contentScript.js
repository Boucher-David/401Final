
createPopup = () => {
  outerDiv = document.createElement("div");
  outerDiv.setAttribute('id','outerDiv');
  document.body.appendChild(outerDiv);

    let text = `
    <div>
      <h3>Save Login?</h3>
      <input id='nptNickname' class='nptLSD' placeholder='Enter Nickname' />
      <button id='btnSave' class='btnLSD'>Save</button>
      <button id='btnClose' class='btnLSD'>Cancel</button>
    </div>`;

    outerDiv.innerHTML = text;

    // LARRY -> you can create html elements normally and wrap them in quotes. then you simple innerHTML those quotes into the DOM.
    // LARRY -> write the below stuff above.
    // LARRY -> Also, I've created contentScriptStyle.css. Move the style into that file if it isn't already in there.

}

createPopup();

let nptNickname = () => {
  return document.getElementById('nptNickname').value;
}

let nicknameValue = nptNickname();

let btnSave = () => {
  console.log('User clicked btnSave to send ', nicknameValue, ' to DOM.');
  outerDiv.parentNode.removeChild(outerDiv);
}

let _btnSave = document.getElementById('btnSave');
_btnSave.addEventListener('click', btnSave);

let btnClose = () => {
  console.log('User clicked cancel. nicknameValue is currently ', nicknameValue);
  outerDiv.parentNode.removeChild(outerDiv);
}

let _btnClose = document.getElementById('btnClose');
_btnClose.addEventListener('click', btnClose);

let credentials = {
    username: 'username'
};

jQuery("form").on('submit', (e) => {
    e.preventDefault();

    $("form").each(function() {
        $(this).find("input").each(function () {
           let _attr = jQuery(this).attr('name');
            let _value = jQuery(this)[0].value;

            if (_attr === 'username') credentials['username'] = _value;
            if (_attr === 'email') credentials['email'] = _value;
            if (_attr === 'password') credentials['password'] = _value;
            if (_attr === 'user') credentials['username'] = _value;
            if (_attr === 'url') credentials['username'] = _value;
         })
      });

    let _before = Object.keys(credentials)

    Object.keys(credentials).forEach(key => {
        if (credentials[key] === '') delete credentials[key];
    });

    let _after = Object.keys(credentials);

    if ((_before.length === _after.length) && (_after.length > 0)) {
        createPopup();
    }
});


saveCredentials = () => {
    // user clicks button to save credentials
    // get nickname the user wants then call this function

    let _save = {
        nickname: 'amazon', // grab actual nickname from popup
        credentials: JSON.stringify(credentials)
    };
    chrome.runtime.sendMessage({'saveCredential': _save});

}

saveCredentials();
