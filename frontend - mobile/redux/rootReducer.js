initState = {
    displayHome: "Hi this is from the store home",
    displayProfile: "Hi this is from the store profile",
    status: [ "Prospects","Applied","Rejected","Accepted" ]
}

const RootReducer = (state = initState, action) => {
    switch(action.type) {
        case "GET_USER":
            return state
        default:
            return state
    }
}

export default RootReducer