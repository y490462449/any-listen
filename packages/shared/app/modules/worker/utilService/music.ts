import { isValidLyric } from '@any-listen/common/tools'
import { createLocalMusicInfo, getLocalMusicFileLyric, getLocalMusicFilePic } from './shared/music'

interface PicBuffer {
  format: string
  data: Uint8Array
}
export const getMusicFilePic = async (filePath: string): Promise<string | PicBuffer> => {
  const picture = await getLocalMusicFilePic(filePath)
  if (!picture) return ''
  if (typeof picture == 'string') return picture
  const [type, ext] = picture.format.split('/')
  if (type != 'image') return ''
  return {
    format: ext,
    data: picture.data,
  }
}

export const getMusicFileLyric = async (filePath: string): Promise<AnyListen.Music.LyricInfo | null> => {
  const lyric = await getLocalMusicFileLyric(filePath)
  if (!isValidLyric(lyric)) return null
  // TODO: lyric awlyric
  return {
    lyric,
  }
}

/**
 * 创建本地列表音乐信息
 * @param filePaths 文件路径
 */
export const createLocalMusicInfos = async (filePaths: string[]): Promise<AnyListen.Music.MusicInfoLocal[]> => {
  const list: AnyListen.Music.MusicInfoLocal[] = []
  for await (const path of filePaths) {
    const musicInfo = await createLocalMusicInfo(path)
    if (!musicInfo) continue
    list.push(musicInfo)
  }

  return list
}
