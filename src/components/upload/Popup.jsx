import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {uploadFile} from "../../actions/file";
import "./popup.css"
import jsm from "jsmediatags"
import defaultCover from "./cover.js"

const Popup = () => {
    const [fileName, setfileName] = useState('Неизвестно')
    const [artist, setartist] = useState('Неизвестный исполнитель')
    const [image, setimage] = useState(defaultCover)
    const [file, setfile] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const dispatch = useDispatch()

    function fileUploadHandler(event) {
        const file = event.target.files[0];
        new jsm.Reader(file)
        .read({
          onSuccess: (tag) => {
            if (typeof(tag.tags.picture) === 'undefined') {
                setimage (defaultCover);
            }
            else{
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String = "";
                for (let i = 0; i < data.length; i++) {
                    base64String += String.fromCharCode(data[i]);
                }
                const cover = document.getElementById("cover");
                setimage (window.btoa(base64String));
                cover.style.backgroundImage = (`url(data:${format};base64,${window.btoa(base64String)})`);
            }
            
            if (typeof tag.tags.title === 'undefined') {setfileName('Неизвестно')}
                else{ setfileName(tag.tags.title)}
            if (typeof tag.tags.artist === 'undefined') {setfileName('Неизвестный исполнитель')}
                else{ setartist(tag.tags.artist);}            
            setfile(file)
          },
          onError: (error) => {
            const file = event.target.files[0];
            setfile(file)
            setfileName('Неизвестно')
            setartist('Неизвестный исполнитель')
            setimage(defaultCover)
          }
      });

    }

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'));
        setfileName('Неизвестно')
        setartist('Неизвестный исполнитель')
        setimage(defaultCover)
        setfile('')
    }

    function uploading(){
        const track = {
            title: fileName,
            artist: artist,
            source: file,
            image: image,
            visibility: document.getElementById("checkbox").checked
        }
        dispatch(uploadFile(track));
        alert("Файл загружен")
        dispatch(setPopupDisplay('none'));
    }

    if (popupDisplay !== 'none'){
    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Выберите файл</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                
                <div className="upload">
                    <label htmlFor="upload-input" className="upload-label">Файл
                        <input multiple={false} onChange={(event)=> fileUploadHandler(event)} type="file" 
                            id="upload-input" accept=".mp3" className="upload-input"/>
                    </label>
                </div>
                <div className="popup__container" style={file==="" ?{display: 'none'}:{display: 'flex'}}>
                    <div id = "cover" className="popup__cover"></div>
                    <Input type="text" className = "popup__imput" placeholder="Введите название трека..." 
                        value={fileName} setValue={setfileName}/>
                    <Input type="text" className = "popup__imput" placeholder="Введите имя исполнителя..." 
                        value={artist} setValue={setartist}/>
                    <div className='popup__header'>
                        <div className='popup__title'>Доступность трека для глобального поиска</div>
                        <input type="checkbox" className="popup__checkbox" id ="checkbox" 
                            defaultChecked></input>
                    </div>
                    <button className="popup__send" onClick={() => uploading()}>Загрузить</button> 
                </div>
            </div>
        </div>
    );
} else {return(
        <button className="popup__button" onClick={() => showPopupHandler()}>
            Загрузить трек
        </button>
    );}
};

export default Popup;