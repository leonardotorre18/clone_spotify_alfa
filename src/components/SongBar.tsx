// import type { ISong } from '../types/song'
import React, { type ChangeEvent } from 'react'
import './SongBar.css'
import { useSong } from '../store/store'
import { IoPause, IoPlay } from 'react-icons/io5'

export default function () {
  const [play, setPlay] = React.useState<boolean>(false)
  const [progress, setProgress] = React.useState<number>(0)
  const { song } = useSong()

  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    const intervalID = setInterval(() => updateProgress(), 1000)
    setPlay(true)
    return () => {
      clearInterval(intervalID)
    }
  }, [song])

  const updateProgress = () => {
    if (audioRef.current) {
      const { duration, currentTime } = audioRef.current
      if (duration > 0) {
        const percent = (currentTime * 100) / duration
        setProgress(percent)
      } else {
        setProgress(0)
      }
    }
  }

  const handlerProcessbar = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (parseFloat(value) / 100) * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setProgress(parseFloat(value))
    }
  }

  const handlerClickPlay = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
      if (audioRef.current.paused) {
        audioRef.current.play()
        setPlay(true)
        updateProgress()
      } else {
        audioRef.current.pause()
        setPlay(false)
        updateProgress()
      }
    }
  }

  return (
    song
      ? <>
        <div className="song-bar">
          <div className="song-bar__info">
            <div className="song-bar__info__image">
              <img src={song.image.url} alt="" />
            </div>
            <div className="song-bar__info__details">
              <h4 className="song-bar__info__details__title">{song.title}</h4>
              <p className="song-bar__info__details__artist">{song.author}</p>
            </div>
          </div>
          <audio
            src={song.audio.url}
            autoPlay
            ref={audioRef}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={updateProgress}
          />
          <div className="song-bar__controls">
            <div className="song-bar__controls__process">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handlerProcessbar}
              />

            </div>
            <div className='song-bar__controls__buttons'>
              <button>
                {
                  play
                    ? <IoPause onClick={handlerClickPlay} />
                    : <IoPlay onClick={handlerClickPlay}/>
                }
              </button>

            </div>
          </div>
        </div>
      </>
      : <></>
  )
}
