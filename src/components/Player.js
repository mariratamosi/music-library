//Top part
//name, artist, picture
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

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
  useEffect(() => {
    //addActiveState
    const newSong = songs.map((itemSong) => {
      if (itemSong.id === currentSong.id) {
        return {
          ...currentSong,
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

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  }, [currentSong]);

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
    }
    if (direction === "skip-back") {
      if ((curretIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      } else setCurrentSong(songs[curretIndex - 1]);
    }

    // console.log(curretntIndex);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        ></input>
        <p>{getTime(songInfo.duration)}</p>
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
