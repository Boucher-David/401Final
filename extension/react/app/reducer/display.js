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
    let newState = {
        ...state 
    }
    Object.keys(newState).forEach(component => {
        newState[component] = false
    });
    newState[payload] = true;
    
    return newState;
}
