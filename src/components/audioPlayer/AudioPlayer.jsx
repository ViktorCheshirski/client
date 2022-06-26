import React, { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import AudioControls from './AudioControls';
import VolumeControl from "./VolumeControl";
import './AudioPlayer.css';

const AudioPlayer = ({ }) => {
    const tracks = useSelector(state => state.files.files)
    const trackToPlay = useSelector(state => state.files.trackToPlay)
	// State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [playList, setPlayList] = useState(tracks);

    // Destructure for conciseness
    const title = playList[trackIndex].title;
    const artist = playList[trackIndex].artist;
    const audioSrc = playList[trackIndex].source;
    const image = playList[trackIndex].image;

	// Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

	// Destructure for conciseness
	const { duration } = audioRef.current;

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
    
        intervalRef.current = setInterval(() => {
          if (audioRef.current.ended) {
            toNextTrack();
          } else {
            setTrackProgress(audioRef.current.currentTime);
          }
        }, [100]);
    };

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(playList.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }
    
    const toNextTrack = () => {
        if (trackIndex < playList.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };
    
    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
          setIsPlaying(true);
        }
        startTimer();
    };
    
    useEffect(()=>{
        if (audioSrc==""){
            setPlayList(tracks);
        }
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        audioRef.current.currentTime = trackProgress;
        if (isPlaying) audioRef.current.play();
        audioRef.current.muted=isMuted;
        audioRef.current.volume=document.getElementById('volume').value;
    }, [tracks])

    function finder(track) {
        return track.id == trackToPlay.id
    }
    
    useEffect(()=>{
        if (trackToPlay.source !=""){
            setPlayList(tracks);
            setTrackIndex(tracks.findIndex(finder));
        }
    }, [trackToPlay])

    useEffect(() => {
        if (audioSrc==""){
            setPlayList(tracks);
        }
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
        } else {
          audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
          audioRef.current.pause();
          clearInterval(intervalRef.current);
        }
    }, []);

    // Handle setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        audioRef.current.muted=isMuted;
        audioRef.current.volume=document.getElementById('volume').value;

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
        }
    }, [trackIndex]);

    useEffect(() => {
        if (isMuted) {
            audioRef.current.muted=true;
        } else {
            audioRef.current.muted=false;
        }
    }, [isMuted]);
    
	return (
        <div className="audio-player">
			<div className="track-info">
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <img
			        className="artwork"
			        src={image}
			        alt =""
			    />
                <div className="audio-text">
                    <div className="title">{title}</div>
                    <div className="artist">{artist}</div>
                </div>
                <input
                    id="volume"
                    type="range"
                    step="0.01"
                    min="0"
                    max="1"
                    className="volume-bar"
                    onChange={(e) => {
                        audioRef.current.volume = e.target.value;
                    }}
                    style={{background: `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${audioRef.current.volume}, #fff), color-stop(${audioRef.current.volume}, #777))`}}
                />
                <VolumeControl
                    isMuted={isMuted}
                    onMuteClick={setIsMuted}
                />
			</div>
                <input
                    type="range"
                    value={trackProgress}
                    step="0.1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ background: trackStyling }}
                />
		</div>
    );
}

export default AudioPlayer;