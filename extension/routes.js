// I will put all routes, what you need to send, and what to expect back in here.

// POST profile/signup
testing: "localhost:3000/profile/signup"

need: {
    username: username,
    password: password,
    email: email
}

Stringify the above object. Base64 encode. Then send as Basic auth like:
"Basic 38439rhfiu"

Response: response.body.vault = {
    signup: true or false
}

// POST profile/signin
testing: "localhost:3000/profile/signin"


need: {
    username: username,
    password: password,
    email: email
}

Stringify the above object. Base64 encode. Then send as Basic auth like:
"Basic 38439rhfiu"

Response: response.body.vault = {
    signin: true or false,
    user: the user_id string if signin is true. Save this in sync Storage.
    logins: [] // array of stored logins for that user.
}

// POST /profile/update/email
need: {
    user_id: user_id,
    oldEmail: oldEmail,
    newEmail: newEmail
}

Stringify the above object. Base64 encode. Then send as Basic auth like:
"Basic 38439rhfiu"

Response: res.body.vault = {
    update: true or false
}

// POST /profile/update/email
need: {
    user_id: user_id,
    oldPassword: oldPasword,
    newPassword: newPassword
}

Stringify the above object. Base64 encode. Then send as Basic auth like:
"Basic 38439rhfiu"

// GET /verify/:id

User enters the code we sent them via email. Code goes where :id is in URL. 
Response: res.body.vault = {
    verified: true or false
}

// POST /credential/set
need: {
    user_id: user_id
}
Send the above as basic auth as we have done in previous routes
In the request body, send : {
    nickname: nickname,
    credential: Stringified credentials that we have encrypted
}

// GET /credential/get/:cred
need: {
    user_id: user_id
}

Credential nickname we want to get goes in url where :cred is. 
Response: {
    success: true or false,
    credential: only exists if success is true
}


// POST profile/signin
// PUT profile/update/email
// PUT profile/update/password
// PUT profile/delete

// POST verify/signup
// POST verify/update/email
// POST verify/update/password
// POST verify/delete

// POST credential/save/:nickname
// GET credential/get/:nickname
// GET logins/get

// These are not decided yet. They may change. 
