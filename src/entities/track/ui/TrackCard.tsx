import type { Track } from "../model/types"; 
import '../../../app/styles/TrackCard.css';

export function TrackCard({track}: {track: Track}) {
    return (
        <div className="track-card">
            <h3>{track.title}</h3>
        </div>
    );
}