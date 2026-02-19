import { ReactElement, useState } from 'react'
import { ClipboardIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IpcEvents } from '@common/ipc-events'
import { CharCodes, ShiftChars, AltGrChars } from '@renderer/libs/keyboard/charCodes'
import { getModifierBit } from '@renderer/libs/keyboard/keymap'

export const Paste = (): ReactElement => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  async function paste(): Promise<void> {
    if (isLoading) return
    setIsLoading(true)

    try {
      const text = await navigator.clipboard.readText()
      if (!text) {
        console.log('No text in clipboard')
        return
      }

      console.log('Pasting text:', text)

      for (const char of text) {
        const ascii = char.charCodeAt(0)

        // Skip carriage return (CR) to avoid double line breaks on Windows (\r\n)
        if (ascii === 13) {
          continue
        }

        const code = CharCodes[ascii]
        if (!code) continue

        let modifier = 0
        if (AltGrChars[ascii]) {
          // AltGr = Ctrl + rightAlt on most systems
          modifier |= getModifierBit('ControlLeft')
          modifier |= getModifierBit('AltRight')
        } else if ((ascii >= 65 && ascii <= 90) || ShiftChars[ascii]) {
          modifier |= getModifierBit('ShiftLeft')
        }

        await send(modifier, code)
        await send(0, 0)
      }

      console.log('Paste completed')
    } catch (e) {
      console.error('Paste error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  async function send(modifier: number, code: number): Promise<void> {
    const keys = [modifier, 0, code, 0, 0, 0, 0, 0]
    await window.electron.ipcRenderer.invoke(IpcEvents.SEND_KEYBOARD, keys)
  }

  return (
    <div
      className="flex h-[30px] cursor-pointer items-center space-x-2 rounded px-3 text-neutral-300 hover:bg-neutral-700/50"
      onClick={paste}
    >
      <ClipboardIcon size={16} />
      <span>{t('keyboard.paste')}</span>
    </div>
  )
}
