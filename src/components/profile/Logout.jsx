import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../reducers/userReducer";
import "./profile.css"

const Logout= () => {
    const dispatch = useDispatch()
    
    return (
        <button className="logout__button" onClick={()=>(dispatch(logout()))}>Выйти из профиля</button>
    )
}

export default Logout