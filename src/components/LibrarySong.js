import React from "react";
import { playAudio } from "./util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    //addActiveState
    const newSong = songs.map((itemSong) => {
      if (itemSong.id === song.id) {
        return {
          ...song,
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

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="song cover" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
