import type { Album } from "@/entities/album/model/types";
import '@/app/styles/AlbumCard.css';

export function AlbumCard({album}: {album: Album}) {
    return (
        <div className="album-card">
            <h3>{album.title}</h3>
            <img className="album-cover" src={album.coverImage} alt={album.title} />
        </div>
    );
}

