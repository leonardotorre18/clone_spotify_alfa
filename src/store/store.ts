import { type ISong } from "../types/song";
import { create } from "zustand";

export const useSong = create(
  function (set): {
    song: ISong | null,
    updateSong: (song: ISong) => void
  } {
    return {
      song: null,
      updateSong: function (newSong: ISong) {
        set({ song: newSong })
      }
    }
  }
)