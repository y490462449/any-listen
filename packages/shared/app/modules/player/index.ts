import type { DBSeriveTypes } from '../worker/utils'
import { initPlayerEvent, playerEvent } from './event'

// let dbService: DBSeriveTypes

// import { hotKeyState } from './state'

// export const getHotKeyConfig = () => {
//   return {
//     local: hotKeyState.config.local,
//     global: hotKeyState.config.global,
//   }
// }

// export const getHotkeyStatus = () => {
//   return hotKeyState.state
// }

export const initPlayer = (_dbService: DBSeriveTypes) => {
  // dbService = _dbService
  initPlayerEvent(_dbService)
}

export const onPlayListAction = (listAction: (action: AnyListen.IPCPlayer.PlayListAction) => Promise<void>): (() => void) => {
  playerEvent.on('playListAction', listAction)
  return () => {
    playerEvent.off('playListAction', listAction)
  }
}

export const onPlayHistoryListAction = (
  listAction: (action: AnyListen.IPCPlayer.PlayHistoryListAction) => Promise<void>
): (() => void) => {
  playerEvent.on('playHistoryListAction', listAction)
  return () => {
    playerEvent.off('playHistoryListAction', listAction)
  }
}

export {
  // hotKeyState,
  playerEvent,
}
