import React, { useState, useRef, useEffect } from "react";
import { Button, Alert } from "../../../common/modules/Elements";
import "./VideoPlayer.css";

const VideoPlayer = ({
  videoUrl,
  title = "",
  onProgress,
  onComplete,
  onBookmark,
  currentPosition = 0,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(currentPosition);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = currentPosition;
    }
  }, [currentPosition]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      onProgress?.(video.currentTime, video.duration);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    if (video) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleBookmark = () => {
    onBookmark?.(currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleError = () => {
    setError("Failed to load video");
  };

  return (
    <div className="video-player">
      {error && <Alert type="error" message={error} dismissible />}

      <div className="video-container">
        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          onEnded={() => {
            setIsPlaying(false);
            onComplete?.();
          }}
          className="video-element"
        />

        <div className="video-overlay">
          <div className="video-controls">
            <Button
              variant="primary"
              onClick={handlePlayPause}
              className="play-button"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </Button>

            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <Button
              variant="secondary"
              onClick={handleBookmark}
              className="bookmark-button"
            >
              📌 Bookmark
            </Button>
          </div>
        </div>
      </div>

      <div className="video-progress" onClick={handleSeek}>
        <div
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="video-settings">
        <div className="volume-control">
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        <div className="playback-rate">
          <label>Speed:</label>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <Button
              key={rate}
              variant={playbackRate === rate ? "primary" : "outline"}
              size="small"
              onClick={() => handlePlaybackRateChange(rate)}
            >
              {rate}x
            </Button>
          ))}
        </div>
      </div>

      {title && <h3 className="video-title">{title}</h3>}
    </div>
  );
};

export default VideoPlayer;
