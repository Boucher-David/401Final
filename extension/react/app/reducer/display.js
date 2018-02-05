import signup from "../../components/profile/_profile";

let defaultState = {
home: true,
signup: false,
verify: false,
unlock: false,
profile: false,
tile: false
}

export default (state=defaultState, action) => {
    let {type, payload} = action;
    return state;
}
