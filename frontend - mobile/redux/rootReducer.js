initState = {
    displayHome: "Hi this is from the store home",
    displayProfile: "Hi this is from the store profile",
    status: [ "Prospects","Applied","Rejected","Accepted" ],
    user: {
        signedIn: false,
    }
}

const RootReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN":
            state = {
                ...state,
                user: {
                    signedIn: true,
                    Username: action.Username,
                    Password: action.Password
                }
            }
            return state
        case "GET_USER":
            return state
        default:
            return state
    }
}

export default RootReducer