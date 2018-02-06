createPopup = () => {
    // outerDiv = document.createElement("div");
    // outerDiv.setAttribute('id','outerDiv');
    // document.body.appendChild(outerDiv);


    // let text = `
    // <div>
    // 
    // </div>`;

    // outerDiv.innerHTML = text;

    // LARRY -> you can create html elements normally and wrap them in quotes. then you simple innerHTML those quotes into the DOM. 
    // LARRY -> write the below stuff above.
    // LARRY -> Also, I've created contentScriptStyle.css. Move the style into that file if it isn't already in there.

    wrapperDiv = document.createElement("div");
wrapperDiv.setAttribute("style"," top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 2px solid black; padding: 10px; z-index: 101; display: inline-block; position: fixed; width: 200px; height: 100px;");

wrapperTitle = document.createElement('h4');
wrapperTitle.innerHTML = "Save Login?";

wrapperInput =
document.createElement("input");
wrapperInput.setAttribute("placeholder", "Enter nickname");

wrapperSubmit = document.createElement("button");
wrapperSubmit.innerHTML = "Save";

wrapperCancel = document.createElement("button");
wrapperCancel.innerHTML = "No";

document.body.appendChild(wrapperDiv);
wrapperDiv.appendChild(wrapperTitle);
wrapperDiv.appendChild(wrapperInput);
wrapperDiv.appendChild(wrapperSubmit);
wrapperDiv.appendChild(wrapperCancel);

}

let credentials = {};

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