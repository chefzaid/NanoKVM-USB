import { ReactElement, useEffect, useRef } from 'react'

import { IpcEvents } from '@common/ipc-events'
import { KeyboardCodes } from '@renderer/libs/keyboard'

export const Keyboard = (): ReactElement => {
  const modifierKeys = new Set(['Control', 'Shift', 'Alt', 'Meta'])

  const pressedKeysRef = useRef<Set<string>>(new Set())

  // listen keyboard events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // press button
    async function handleKeyDown(event: KeyboardEvent): Promise<void> {
      // Only intercept keyboard events when not typing in input fields
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      if (modifierKeys.has(event.key)) {
        pressedKeysRef.current.add(event.code)
        // Send modifier key immediately so it's active for mouse clicks
        await sendModifiersOnly()
        return
      }

      await sendKeyDown(event)
    }

    // release button
    async function handleKeyUp(event: KeyboardEvent): Promise<void> {
      // Only intercept keyboard events when not typing in input fields
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      if (modifierKeys.has(event.key)) {
        pressedKeysRef.current.delete(event.code)
      }

      await send(0, 0x00)
    }

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  async function sendKeyDown(event: KeyboardEvent): Promise<void> {
    const code = KeyboardCodes.get(event.code)
    if (!code) return

    const modifier = getModifier(event)

    await send(modifier, code)
  }

  async function sendModifiersOnly(): Promise<void> {
    const modifier = getCurrentModifier()
    await send(modifier, 0x00)
  }

  async function send(modifier: number, key: number): Promise<void> {
    await window.electron.ipcRenderer.invoke(IpcEvents.SEND_KEYBOARD, modifier, key)
  }

  function getCurrentModifier(): number {
    const pressedKeys = [
      pressedKeysRef.current.has('ControlLeft'),
      pressedKeysRef.current.has('ShiftLeft'),
      pressedKeysRef.current.has('AltLeft'),
      pressedKeysRef.current.has('MetaLeft'),
      pressedKeysRef.current.has('ControlRight'),
      pressedKeysRef.current.has('ShiftRight'),
      pressedKeysRef.current.has('AltRight'),
      pressedKeysRef.current.has('MetaRight')
    ]

    return pressedKeys.reduce((acc, isPressed, bit) => (isPressed ? acc | (1 << bit) : acc), 0)
  }

  function getModifier(e: KeyboardEvent): number {
    const altGraphKey = e.getModifierState('AltGraph')
    const pressedKeys = [
      altGraphKey || (e.ctrlKey && pressedKeysRef.current.has('ControlLeft')),
      e.shiftKey && pressedKeysRef.current.has('ShiftLeft'),
      e.altKey && pressedKeysRef.current.has('AltLeft'),
      e.metaKey && pressedKeysRef.current.has('MetaLeft'),
      e.ctrlKey && pressedKeysRef.current.has('ControlRight'),
      e.shiftKey && pressedKeysRef.current.has('ShiftRight'),
      altGraphKey || (e.altKey && pressedKeysRef.current.has('AltRight')),
      e.metaKey && pressedKeysRef.current.has('MetaRight')
    ]

    return pressedKeys.reduce((acc, isPressed, bit) => (isPressed ? acc | (1 << bit) : acc), 0)
  }

  return <></>
}
