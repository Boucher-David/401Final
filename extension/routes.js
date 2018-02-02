// I will put all routes, what you need to send, and what to expect back in here.

// profile/signup
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

// POST profile/signup



// POST profile/signin
// PUT profile/update/email
// PUT profile/update/password
// PUT profile/delete

// POST verify/signup
// POST verify/signin
// POST verify/update/email
// POST verify/update/password
// POST verify/delete

// POST credential/save/:nickname
// GET credential/get/:nickname
// GET logins/get

// These are not decided yet. They may change. 
