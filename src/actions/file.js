import axios from 'axios'
import empty from "../assets/empty.png" 
import {setFiles} from "../reducers/fileReducer";
import {API_URL} from "../config";

export function uploadFile(track) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', track.source)
            formData.append('title', track.title)
            formData.append('artist', track.artist)
            formData.append('image', track.image)
            formData.append('visibility', track.visibility)
            await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function getFiles(id) {
    return dispatch => {
        try {
            let resp;
            if (id == 0){
                resp = axios.get(`${API_URL}api/files/main`)
            }else{
                resp = axios.get(`${API_URL}api/files/get?id=${id}`,{
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            }
            resp.then((response)=>{
                if(response.data == [])
                    dispatch(setFiles([{
                        title: "",
                        artist: "",
                        source: "",
                        image: empty,
                    }]))
                else 
                    dispatch(setFiles(response.data))})
        } catch (e) {
            alert(e?.response?.data?.message)
        } 
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`)
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}