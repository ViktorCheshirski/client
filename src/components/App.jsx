import React, {useEffect} from 'react';
import AudioPlayer from "./audioPlayer/AudioPlayer";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./profile/Profile";
import Settings from "./profile/settings/Settings";
import {auth} from "../actions/user";
import Main from './main/Main';
import './app.css';

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())
    })
    console.log(0);
    
    const tracks = useSelector(state => state.files.player)
    return (
        <BrowserRouter>
            <div className='app'>
                    <AudioPlayer/>
                    {!isAuth ?
                        <div className='wrap'>
                            <Routes>
                                <Route path='/' element={<Main/>}/>
                                <Route path="*" element={<Navigate to="/" replace />}/>
                            </Routes>
                        </div>
                        :
                        <div className='wrap'>
                            <Routes>
                                <Route path='/profile' element = {<Profile/>}/>
                                {/* <Route path='/profile/settings' element = {<Settings/>}/> */}
                                <Route path='/' element={<Main/>}/>
                                <Route path="*" element={<Navigate to="/" replace />}/>
                            </Routes>
                        </div>
                    }
            </div>
        </BrowserRouter>
    );
}

export default App;