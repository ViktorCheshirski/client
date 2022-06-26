import empty from "../assets/empty.png" 

const SET_FILES = "SET_FILES"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const SET_TRACK_INFO_DISPLAY = "SET_TRACK_INFO_DISPLAY"
const SET_TRACK_TO_PLAY = "SET_TRACK_TO_PLAY"

const emptyTrack={
    title: "",
    artist: "",
    source: "",
    image: empty,
}

const defaultState = {
    files: [emptyTrack,emptyTrack, emptyTrack, emptyTrack,],
    popupDisplay: 'none',
    trackToDisplay: "",
    trackToPlay: emptyTrack,
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES: return {...state, files: action.payload}
        case SET_POPUP_DISPLAY: return {...state, popupDisplay: action.payload}
        case SET_TRACK_INFO_DISPLAY: return {...state, trackToDisplay: action.payload}
        case SET_TRACK_TO_PLAY: return {...state, trackToPlay: action.payload}
        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setPopupDisplay = (display) => ({type: SET_POPUP_DISPLAY, payload: display})
export const setTrackInfoDisplay = (track) => ({type: SET_TRACK_INFO_DISPLAY, payload: track})
export const setTrackToPlay = (trackIndex) => ({type: SET_TRACK_TO_PLAY, payload: trackIndex})