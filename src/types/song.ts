import type { IFile } from "./file"

export interface ISong {
    _id: string
    title: string
    author: string
    album: string
    image: IFile
    audio: IFile
}