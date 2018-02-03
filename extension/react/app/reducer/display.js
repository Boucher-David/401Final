import signup from "../../components/profile/_profile";

let defaultState = {
home: false,
signup: false,
verify: false,
unlock: false,
profile: true,
tile: false
}

export default (state=defaultState, action) => {
    let {type, payload} = action;
    return state;
}
