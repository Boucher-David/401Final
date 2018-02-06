createPopup = () => {
    outerDiv = document.createElement("div");
    outerDiv.setAttribute('id','outerDiv');
    document.body.appendChild(outerDiv);


    let text = `<div>
        <h4>Save this login?</h4>
    </div>
    <div class="credentialInputbutton">
        <button class="_button" id="_un">Enter Username</button>
        <button class="_button" id="_pw">Enter Password</button>
        <button class="_button" id="_em">Enter Email</button>
    </div>
    <div class="inputs">
        <input type="text" placeholder="Username" class="hide _un"></input>
        <input type="password" placeholder="Password" class="hide _pw"></input>
        <input type="email" placeholder="Email" class="hide _em"></input>
    </div>
    <div class="buttons">
        <button class="_button" id="save">Save Login</button>
        <button class="_button" id="dontSave">Don't Save</button>
    </div>`;

    outerDiv.innerHTML = text;


    // wrapperTitle = document.createElement('h4');
    // wrapperTitle.innerHTML = "Save Login?";

    // wrapperInput =
    // document.createElement("input");
    // wrapperInput.setAttribute("placeholder", "Enter nickname");

    // wrapperSubmit = document.createElement("button");
    // wrapperSubmit.innerHTML = "Save";

    // wrapperCancel = document.createElement("button");
    // wrapperCancel.innerHTML = "No";

    // document.body.appendChild(wrapperDiv);
    // wrapperDiv.appendChild(wrapperTitle);
    // wrapperDiv.appendChild(wrapperInput);
    // wrapperDiv.appendChild(wrapperSubmit);
    // wrapperDiv.appendChild(wrapperCancel);

}

createPopup();

var classname = document.getElementsByClassName("_button");
console.log(classname);
Object.keys(classname).forEach(button => {
    classname[button].addEventListener('click', () => {
        console.log(this.getAttribute('id'));
    }, false)
});
