
import { createContext, useContext, useRef, useState } from 'react';
import type { Track } from '@/entities';

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (track: Track,tracks?: Track[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  const playNext = () => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex(t => t.id === currentTrack.id);
    const nextTrack = playlist[(index + 1) % playlist.length];
    playTrack(nextTrack);
  };

  const playPrev = () => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex(t => t.id === currentTrack.id);
    const prevTrack = playlist[(index - 1 + playlist.length) % playlist.length];
    playTrack(prevTrack);
  };

  const playTrack = (track: Track, tracks?: Track[]) => {
  if (tracks) {
    setPlaylist(tracks);
  }

  if (audioRef.current.src !== track.previewUrl) {
    audioRef.current.src = track.previewUrl;
  }

  audioRef.current.play();
  setCurrentTrack(track);
  setIsPlaying(true);
};


  const togglePlay = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  audioRef.current.ontimeupdate = () => {
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
};
