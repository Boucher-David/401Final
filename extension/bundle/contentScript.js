let credentials = {};

createPopup = () => {
  outerDiv = document.createElement("div");
  outerDiv.setAttribute('id','outerDiv');
  document.body.appendChild(outerDiv);
    let text = `
    <div >
      <h3>Save Login?</h3>
      <input id='nptNickname' class='nptLSD' placeholder='Enter Nickname for login' />
      <button id='btnSave' class='btnLSD'>Save</button>
      <button id='btnClose' class='btnLSD'>Cancel</button>
    </div>`;

    outerDiv.innerHTML = text;

}

createPopup();

saveCredentials = (nickname) => {
    // user clicks button to save credentials
    // get nickname the user wants then call this function

    let _save = {
        nickname: nickname, // grab actual nickname from popup
        credentials: JSON.stringify(credentials)
    };
    chrome.runtime.sendMessage({'saveCredential': _save});

}

let nptNickname = () => {
    if (document.getElementById('nptNickname').value === '') return window.location.host;
    return document.getElementById('nptNickname').value;
}

let save = () => {
    let _nickname = nptNickname();

    saveCredentials(_nickname);
    btnClose();
}

let _btnSave = document.getElementById('btnSave');
    _btnSave.addEventListener('click', save);

let btnClose = () => {
  outerDiv.parentNode.removeChild(outerDiv);
}

let _btnClose = document.getElementById('btnClose');
_btnClose.addEventListener('click', btnClose);

jQuery("form").on('submit', (e) => {
    e.preventDefault();

    jQuery("form").each(function() {
        jQuery(this).find("input").each((a, b) =>  {

           let _attr = jQuery(b).attr('name');
            let _value = jQuery(this)[0].value;
            if (_attr === 'username') credentials['username'] = _value;
            if (_attr === 'email') credentials['email'] = _value;
            if (_attr === 'password') credentials['password'] = _value;
            if (_attr === 'user') credentials['username'] = _value;
            if (_attr === 'url') credentials['username'] = _value;
         })
      });


    outerDiv.setAttribute('style', 'display: inline-block;');      

});

