import React, {useState} from 'react';
import './autorization.css'
import '../upload/popup.css'
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {emailing, logging} from "../../actions/user";
import { setSentFalse, setSentTrue } from '../../reducers/sentReducer';
import {setPopupDisplay} from "../../reducers/fileReducer";
import {NavLink} from "react-router-dom";

const Autorization = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const isSent = useSelector(state => state.sentState.isSent)
    const isAuth = useSelector(state => state.user.isAuth)
    const avatar = useSelector(state => state.user.currentUser.avatar)
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const dispatch = useDispatch()

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'));
    }

    if  (!isAuth) {
        if (popupDisplay !== 'none'){
            if (!isSent){
            return (
                <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))}>
                    <div className="popup__content" onClick={(event => event.stopPropagation())}>
                        <div className='autorization'>
                            <div className="autorization__header">Авторизация</div>
                            <Input className="autorization__email" value = {email} setValue={setEmail} type="email" placeholder="Введите email..."/>
                            <button className="emailing__btn" onClick={() => {emailing(email); dispatch(setSentTrue())}}>
                                Отправить код</button>                    
                        </div>
                    </div>
                </div>
            );
            }else {return (
                        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))}>
                            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                                <div className='autorization'> 
                                    <div className="autorization__header">Авторизация</div>
                                    <Input className="autorization__password"value={password} setValue={setPassword} type="number" placeholder="Введите полученный код..."/>
                                    <div>
                                        <button className="reset__btn" onClick={() => dispatch(setSentFalse())}>Отправить ещё раз</button>
                                        <button className="autorization__btn" onClick={() => dispatch(logging(email,password))}>Войти</button>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        )
                    }
        } else {return(
                <button className="enter__button" onClick={() => showPopupHandler()}>
                    Войти
                </button>
            );}        
    }
    else return(
        <div>
        <NavLink to='/profile'>
            <img className="avatar" src={avatar} alt="" onClick={()=>(dispatch(setPopupDisplay('none')))}/>
        </NavLink>
        </div>
    )
};

export default Autorization;