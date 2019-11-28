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
            fill: '#30A9DE',
        },
        value:0
    },{
        key: 'pending',
        title: 'Applied',
        svg: {
            fill: '#EFDC05',
        },
        value:0
    },{
        key: 'reject',
        title: 'Rejected',
        svg: {
            fill: '#E53A40',
        },
        value:0
    },{
        key: 'accept',
        title: 'Accepted',
        svg: {
            fill: '#77AF9C',
        },
        value:0
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
                    Password: action.Password,
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
                prospect: action.data.prospect,
            }
            return state
        case 'APPLICATION_REJECTED':
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
        case 'ADD_APPLICATION':
            fetch(url+'applications/prospect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Username: state.user.Username,
                    Password: state.user.Password
                },
                body: JSON.stringify(action.data)
            }).then(response => response.json())
            .then(result => {
                if(action.data.Applied) {
                    fetch(url+'applications/pending', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            Username: state.user.Username,
                            Password: state.user.Password
                        },
                        body: JSON.stringify({AppID: result.AppID})
                    }).then(response => response.json())
                    .then(result => {})
                }
            })
            return state  
        default:
            return state
    }
}

export default RootReducer