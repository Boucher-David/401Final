// console.log("Making up a new string");
//
// // Make the dialog visible.
// dialog.classList.add('opened');
//
// // Listen for things that should close the dialog.
// dialogMast.addEventListener('click', closeDialog);
// dialogWindow.querySelectorAll('button').forEach(btn -> {
//   btn.addEventListener('click', closeDialog);
// });
// document.addEventListener('keydown', checkCloseDialog);
//
// // Finally, move focus into the dialog.
// dialog.querySelector('button').focus();
//
// function checkCloseDialog(e) {
//   if (e.keyCode === KEYCODE.ESC)
//   closeDialog();
// }
//
// function closeDialog() {
//   //Clean up any event listeners.
//   dialogMask.removeEventListener('click', closeDialog);
//   dialogWindow.querySelectorAll('button'), foreach(btn => {
//     btn.removeEventListener('click', closeDialog);
//   });
//   document.removeEventListener('keydown', checkCloseDialog);
//
// // Hide the dialog.
// dialog.classList.remove('opened');
//
// // Restore focus to the previous active element.
// previousActiveElement.focus();
//
// }

wrapperDiv = document.createElement("div");
wrapperDiv.setAttribute("style"," top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 2px solid black; padding: 18px; z-index: 101; display: inline-block; position: fixed; width: 200px; height: 100px;");

wrapperInput =
document.createElement("input");
wrapperInput.setAttribute("placeholder", "Enter nickname");

wrapperSubmit = document.createElement("button");
wrapperSubmit.innerHTML = "Save";

wrapperCancel = document.createElement("button");
wrapperCancel.innerHTML = "No";

document.body.appendChild(wrapperDiv);
wrapperDiv.appendChild(wrapperInput);
wrapperDiv.appendChild(wrapperSubmit);
wrapperDiv.appendChild(wrapperCancel);
// iframeElement = document.createElement("iframe");
// iframeElement.setAttribute("style","width: 100%; height: 100%;");
//
// wrapperDiv.appendChild(iframeElement);
//
// modalDialogParentDiv = document.createElement("div");
// modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 1; overflow: auto; text-align: center; top: 149px; left: 497px;");
//
// modalDialogSiblingDiv = document.createElement("div");
//
// modalDialogTextDiv = document.createElement("div");
// modalDialogTextDiv.setAttribute("style" , "text-align:center");
//
// modalDialogTextSpan = document.createElement("span");
// modalDialogText = document.createElement("strong");
// modalDialogText.innerHTML = "Processing...  Please Wait.";
//
// breakElement = document.createElement("br");
//
// modalDialogTextSpan.appendChild(modalDialogText);
// modalDialogTextDiv.appendChild(modalDialogTextSpan);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(breakElement);
//
//
// modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
// modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
//
// document.body.appendChild(wrapperDiv);
// document.body.appendChild(modalDialogParentDiv);
