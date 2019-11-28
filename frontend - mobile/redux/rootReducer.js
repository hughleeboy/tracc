import { url } from '../secrets'

initState = {
    prospect: [],
    pending: [],
    reject: [],
    accept: [],
    status: [{
        key: 'prospect',
        title: 'Prospects',
        svg: {
            fill: 'blue',
        },
        value:10
    },{
        key: 'pending',
        title: 'Applied',
        svg: {
            fill: 'yellow',
        },
        value:10
    },{
        key: 'reject',
        title: 'Rejected',
        svg: {
            fill: 'red',
        },
        value:10
    },{
        key: 'accept',
        title: 'Accepted',
        svg: {
            fill: 'green',
        },
        value:10
    }],
    user: {
        signedIn: false,
        Username: '',
        Password: '',
    }
}

const RootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN':
            state = {
                ...state,
                user: {
                    signedIn: true,
                    Username: action.Username,
                    Password: action.Password
                }
            }
            return state
        case 'GET_USER':
            return state
        case 'GET_APPLICATIONS':
            state = {
                ...state,
                pending: action.data.pending,
                accept: action.data.accept,
                reject: action.data.reject,
                prospect: action.data.prospect
            }
            return state
        case 'APPLIC`ATION_REJECTED':
            fetch(url+'applications/reject', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Username: state.user.Username,
                    Password: state.user.Password
                },
                body: JSON.stringify({AppID: action.AppId})
            }).then(response => response.json())
            .then(result => {})
            return state
        case 'APPLICATION_ACCEPTED':
            fetch(url+'applications/accept', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Username: state.user.Username,
                    Password: state.user.Password
                },
                body: JSON.stringify({AppID: action.AppId})
            }).then(response => response.json())
            .then(result => {})
            return state
        case 'APPLICATION_APPLIED':
            fetch(url+'applications/pending', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Username: state.user.Username,
                    Password: state.user.Password
                },
                body: JSON.stringify({AppID: action.AppId})
            }).then(response => response.json())
            .then(result => {})
            return state  
        default:
            return state
    }
}

export default RootReducer