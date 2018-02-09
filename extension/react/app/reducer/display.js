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
        let newState = {...state};
        let {type, payload} = action;
        if (type === 'TOGGLE'){

            
            Object.keys(newState).forEach(component => {
                newState[component] = false
            });
            newState[payload] = true;

        }
        return newState;
    }
