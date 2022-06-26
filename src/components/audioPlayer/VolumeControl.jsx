import React from 'react';
import { ReactComponent as VolumeOn } from '../../assets/volumeon.svg';
import { ReactComponent as VolumeOff } from '../../assets/volumeoff.svg';

const VolumeControl = ({
    isMuted,
    onMuteClick
  }) => (
    <div className="volume-control">
        {isMuted ? (
          <button
              type="button"
              className="unmute"
              onClick={() => onMuteClick(false)}
              aria-label="Unmute"
          >
            <VolumeOff />
          </button>
          ) : (
          <button
              type="button"
              className="mute"
              onClick={() => onMuteClick(true)}
              aria-label="Mute"
          >
              <VolumeOn />
          </button>
        )}
    </div>
  )

export default VolumeControl;