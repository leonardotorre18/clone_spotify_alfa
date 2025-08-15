import { useSong } from '../store/store'
import type { ISong } from '../types/song'
import './SongCard.css'

export default function ({
    song
}: PropTypes) {
    const {
        title,
        author,
        image
    } = song

    const { 
        updateSong, 
        song: currentSong 
    } = useSong()

    const handlerClick = () => {
        updateSong(song)
    }

    return (
        <>
            <div className="song-card" onClick={handlerClick}>
                <div className="song-card__image">
                    <img className="song-card__img" src={image.url} alt="" />
                </div>
                <div className="song-card__body">
                    <div className="song-card__body__info">
                        <h3 className="song-card__body__info__title">{title}</h3>
                        <p className="song-card__body__info__artist">{author}</p>
                    </div>
                    <hr className="song-card__body__line" style={
                        currentSong?._id == song._id ? 
                        {
                            filter: 'blur(1px)',
                            borderColor: '#fff'
                        } : {

                        }
                    } />
                    <div className="song-card__body__controls">
                        <div className="song-card__body__controls__icons">
                            {/* <Icon name='mdi:heart-outline' />
                            <Icon name='mdi:tray-download' /> */}
                        </div>
                        <div className="song-card__body__controls__play">
                            {/* <Icon name='mdi:play' /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface PropTypes {
    song: ISong
}