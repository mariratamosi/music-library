//Top part
//name, artist, picture
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "./util";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSong = songs.map((itemSong) => {
      if (itemSong.id === nextPrev.id) {
        return {
          ...nextPrev,
          active: true,
        };
      } else {
        return {
          ...itemSong,
          active: false,
        };
      }
    });

    setSongs(newSong);
    playAudio(isPlaying, audioRef);
  };

  const playSongHandler = () => {
    console.log(audioRef.current);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    console.log(direction);
    const curretIndex = songs.findIndex((s) => s.id === currentSong.id);
    console.log(curretIndex);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(curretIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(curretIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((curretIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[curretIndex - 1]);
        activeLibraryHandler(songs[curretIndex - 1]);
      }
    }

    // console.log(curretntIndex);
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.duration ? getTime(songInfo.currentTime) : "00:00"}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          ></input>
          <div className="animate-track" style={trackAnim}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
