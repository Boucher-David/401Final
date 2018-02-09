let credentials = {};

let _btnSave;
let _btnClose;

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

    _btnSave = document.getElementById('btnSave');
    _btnSave.addEventListener('click', save);

    _btnClose = document.getElementById('btnClose');
    _btnClose.addEventListener('click', btnClose);
}


saveCredentials = (nickname) => {


    let _save = {
        nickname: nickname, // grab actual nickname from popup
        credentials: JSON.stringify(credentials)
    };
    chrome.runtime.sendMessage({'saveCredential': _save});

}

let nptNickname = () => {
    return document.getElementById('nptNickname').value;
}

let save = () => {
    let _nickname = nptNickname();
    if (_nickname === '') return;

    saveCredentials(_nickname);
    btnClose();
}

let btnClose = () => {
  outerDiv.parentNode.removeChild(outerDiv);
  credentials = {};
}


jQuery("form").on('submit', (e) => {
    e.preventDefault();

    jQuery("form").each(function() {
        jQuery(this).find("input").each((a, b) =>  {

           let _attr = jQuery(b).attr('name');

            let _value = jQuery(b)[0].value;


            if (_attr === 'username' && _value !== '') credentials['username'] = _value;
            if (_attr === 'email'&& _value !== '') credentials['email'] = _value;
            if (_attr === 'password'&& _value !== '') credentials['password'] = _value;
            if (_attr === 'user'&& _value !== '') credentials['username'] = _value;
            if (_attr === 'url'&& _value !== '') credentials['username'] = _value;
         })
      });
      
      if (Object.keys(credentials).length > 0) return createPopup();     

});

