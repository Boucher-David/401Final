import signup from "../../components/signup";

let defaultState = {
home: false,
signup: false   
}

export default (state=defaultState, action) => {
    let {type, payload} = action;
    return state;
}