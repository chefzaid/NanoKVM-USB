import { ReactElement, useState } from 'react'
import { ClipboardIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IpcEvents } from '@common/ipc-events'
import { CharCodes, ShiftChars, AltGrChars } from '@renderer/libs/keyboard'

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
        // Only process line feed (LF) which will be converted to Enter
        if (ascii === 13) {
          continue
        }

        const code = CharCodes.get(ascii)
        if (!code) {
          console.log(`Skipping unsupported character: "${char}" (ASCII: ${ascii})`)
          continue
        }

        // Determine modifier based on character
        let modifier = 0
        if (AltGrChars.has(ascii)) {
          // AltGr = rightAlt (bit 6) = 64
          // Some systems need Ctrl+Alt for AltGr, so we use: leftCtrl (bit 0) + rightAlt (bit 6) = 1 + 64 = 65
          modifier = 65
        } else if ((ascii >= 65 && ascii <= 90) || ShiftChars.has(ascii)) {
          // Shift = leftShift (bit 1) = 2
          modifier = 2
        }

        // Press key with modifier
        await send(modifier, code)

        // Release key immediately (no delay needed - the serial communication is already slow enough)
        await send(0, 0)
      }

      console.log('Paste completed')
    } catch (e) {
      console.error('Paste error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  async function send(modifier: number, key: number): Promise<void> {
    await window.electron.ipcRenderer.invoke(IpcEvents.SEND_KEYBOARD, modifier, key)
  }

  return (
    <div
      className="flex h-[30px] cursor-pointer items-center space-x-1 rounded px-3 text-neutral-300 hover:bg-neutral-700/60"
      onClick={paste}
    >
      <ClipboardIcon size={18} />
      <span>{t('keyboard.paste')}</span>
    </div>
  )
}
