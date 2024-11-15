import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Play, Pause, Maximize, Minimize, Bookmark } from 'lucide-react';

const VideoPlayer = ({ 
  src, 
  onTimeUpdate, 
  initialTime = 0, 
  onAddBookmark,
  captions = [],
  showCaptions = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = initialTime;
    }
  }, [initialTime]);

  useEffect(() => {
    const updateCaption = () => {
      if (showCaptions && captions.length > 0) {
        const currentCaption = captions.find(
          caption => currentTime >= caption.start && currentTime <= caption.end
        );
        setCurrentCaption(currentCaption ? currentCaption.text : '');
      } else {
        setCurrentCaption('');
      }
    };

    updateCaption();
  }, [currentTime, showCaptions, captions]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    if (onTimeUpdate) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    videoRef.current.volume = newVolume[0];
    setIsMuted(newVolume[0] === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
    } else {
      videoRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (newTime) => {
    videoRef.current.currentTime = newTime[0];
    setCurrentTime(newTime[0]);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleAddBookmark = () => {
    if (onAddBookmark) {
      onAddBookmark(currentTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="relative bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      {showCaptions && currentCaption && (
        <div className="absolute bottom-14 left-0 right-0 text-center">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded">
            {currentCaption}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <div className="flex items-center justify-between mb-2">
          <Button onClick={togglePlay} variant="ghost" size="sm">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <div className="flex-grow mx-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
            />
          </div>
          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button onClick={toggleMute} variant="ghost" size="sm">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-24 ml-2">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <Button onClick={handleAddBookmark} variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button onClick={toggleFullscreen} variant="ghost" size="sm">
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;