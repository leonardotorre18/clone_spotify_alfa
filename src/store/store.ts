import { atom } from "nanostores";
import { type ISong } from "../types/song";

export const Songs = atom<ISong[]>([])
export const CurrentSong = atom<ISong | null>(null)