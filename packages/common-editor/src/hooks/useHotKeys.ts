import hotkeys, { KeyHandler } from 'hotkeys-js';
export function useHotKeys(key: string, handler: KeyHandler) {
    hotkeys(key, handler)
}