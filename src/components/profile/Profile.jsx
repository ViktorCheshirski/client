import {deleteAvatar, uploadAvatar} from "../../actions/user";
import TrackInfo from '../main/trackList/track/TrackInfo';
import {useDispatch, useSelector} from "react-redux";
import TrackList from "../main/trackList/TrackList";
import { getFiles } from '../../actions/file';
import {NavLink} from "react-router-dom";
import React from 'react';
import Popup from "../upload/Popup";
import Logout from "./Logout";


const Profile = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.user.currentUser.id)

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    dispatch(getFiles(id))

    return (
        <div className="main">
            <div className='main__header'></div>
            <TrackList name = "Ваша коллекция треков"/>
            <TrackInfo/>
            {/* <NavLink to='/profile/settings'> */}
                <button className="enter__button" onClick={() => (alert("Button doesn't work yet!"))}>Настройки профиля</button>
            {/* </NavLink> */}
            <Popup/>
            <Logout/>
        </div>
    );
};

export default Profile