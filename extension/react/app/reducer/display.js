import signup from "../../components/profile/_profile";

let defaultState = {

home: false,
signup: true,
verify: false,
unlock: false,
profile: false,
tile: false
}

export default (state=defaultState, action) => {
    let {type, payload} = action;

    switch(type) {
        case 'TOGGLE':


        let newState = {
            ...state 
        }
        Object.keys(newState).forEach(component => {
            newState[component] = false
        });
        newState[payload] = true;
        
        return newState;
        break;
        default:
            return state;
    }


}
