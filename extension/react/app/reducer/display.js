import signup from "../../components/signup";

let defaultState = {
home: false,
signup: false,
verify: true
}

export default (state=defaultState, action) => {
    let {type, payload} = action;
    return state;
}
