
const SET_SENT = "SET_SENT"

const defaultState = {
    isSent: false
}

export default function sentReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_SENT: return { isSent: action.value };     
        default: return state;
    }
}


export const setSentTrue = () => ({type: SET_SENT, value: true})
export const setSentFalse = () => ({type: SET_SENT, value: false})