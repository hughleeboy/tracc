const initState = {
    displayHome: 'Hi this is from the store home',
    displayProfile: 'Hi this is from the store profile',
    status: [ 'Prospects','Applied','Rejected','Accepted' ],
    applications: [{
        id: '1',
        company: 'google',
        title: 'intern'
    }],
    user:{
        signedIn: false,
    }
}

const RootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN':
            state = {
                ...state,
                user: {
                    ...state.user,
                    signedIn: true
                }
            }
            console.log(state)
            return state
        case 'GET_USER':
            return state
        default:
            return state
    }
}

export default RootReducer