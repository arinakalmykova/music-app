import {useEffect, useRef} from 'react';
import {useAppSelector} from '@/app';

export function AudioPlayer () {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const {currentTrack, isPlaying} = useAppSelector(state => state.player);

    useEffect(()=> {
        if(!audioRef.current || !currentTrack?.previewUrl ) return;
         audioRef.current.src = currentTrack.previewUrl;

        if(isPlaying) {
            audioRef.current.play();
        }
    },[currentTrack]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
        audioRef.current.play();
        } else {
        audioRef.current.pause();
        }
    }, [isPlaying]);

    return <audio ref={audioRef}></audio>
}