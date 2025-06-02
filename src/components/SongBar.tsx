// import type { ISong } from "../types/song"
import React from 'react'
import './SongBar.css'
import { CurrentSong } from '../store/store'
import type { ISong } from '../types/song'

export default function () {
    const [song, setSong] = React.useState<ISong | null>(null)

    React.useEffect(() => {
        CurrentSong.subscribe(song => {
            setSong(song)
        })
    }, [])

    const handlerClick = () => {
        console.log('Funcionando')
    }
    return (
        <>
            <div className="song-bar" onClick={handlerClick}>
                {
                    song
                        ? <div className="song-bar__info">
                            <div className="song-bar__info__image">
                                <img src={song.image.url} alt="" />
                            </div>
                            <div className="song-bar__info__details">
                                <h4 className="song-bar__info__details__title">{song.title}</h4>
                                <p className="song-bar__info__details__artist">{song.author}</p>
                            </div>
                        </div>
                        : <></>
                }
                <div className="song-bar__controls">
                    <div className="song-bar__controls__buttons">
                        {
                            song
                                ? <audio src={song.audio.url} id="audio" controls autoPlay />
                                : <></>
                        }
                    </div>
                </div>
                <div className="song-bar__extra"></div>
            </div>
        </>
    )
}
