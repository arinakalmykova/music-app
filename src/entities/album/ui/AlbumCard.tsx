import type { Album } from "@/entities";
import '@/app/styles/AlbumCard.css';
import {Link} from "react-router-dom";

export function AlbumCard({album}: {album: Album}) {
    return (
        <Link to={`/artist/${album.artist.name}/album/${album.title}`}>
            <div className="album-card">
                <h3>{album.title}</h3>
                <img className="album-cover" src={album.coverImage} alt={album.title}/>
            </div>
        </Link>
    );
}


