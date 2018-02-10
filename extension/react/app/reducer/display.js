let defaultState = {

    signup: false,
    home: false,
    profile: false,
    tile: false,
    signin: false,
    verify: false,
    unlock: true,
    email: false,
    pw: false,
    logout: false,
    delete: false,
    cred: false,
    about: false

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
