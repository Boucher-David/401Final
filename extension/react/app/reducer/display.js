import signup from "../../components/profile/_profile";

let defaultState = {
home: false,
signup: false,
verify: true,
unlock: false,
profile: false,
tile: false
}

export default (state=defaultState, action) => {
    let {type, payload} = action;
    return state;
}
