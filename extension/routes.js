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
    signup: true or false,
    message: Username or email taken if unsuccessful
}

// POST profile/signin
testing: "localhost:3000/profile/signup"


need: {
    username: username,
    password: password,
    email: email
}

Stringify the above object. Base64 encode. Then send as Basic auth like:
"Basic 38439rhfiu"

Response: response.body.vault = {
    signin: true or false,
    message: "Account unverified" if they try to sign in without verifying account. No message if,
    user: the user_id string if signin is true. Save this in sync Storage.
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
