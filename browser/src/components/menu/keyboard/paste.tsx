import { useState } from 'react';
import { ClipboardIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { device } from '@/libs/device';
import { Modifiers } from '@/libs/device/keyboard.ts';
import { CharCodes, ShiftChars, AltGrChars } from '@/libs/keyboard';

export const Paste = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  async function paste() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        console.log('No text in clipboard');
        return;
      }

      console.log('Pasting text:', text);

      for (const char of text) {
        const ascii = char.charCodeAt(0);

        // Skip carriage return (CR) to avoid double line breaks on Windows (\r\n)
        // Only process line feed (LF) which will be converted to Enter
        if (ascii === 13) {
          continue;
        }

        const code = CharCodes.get(ascii);
        if (!code) {
          console.log(`Skipping unsupported character: "${char}" (ASCII: ${ascii})`);
          continue;
        }

        const modifiers = new Modifiers();
        if (AltGrChars.has(ascii)) {
          // AltGr = Ctrl + rightAlt on most systems
          modifiers.leftCtrl = true;
          modifiers.rightAlt = true;
        } else if ((ascii >= 65 && ascii <= 90) || ShiftChars.has(ascii)) {
          modifiers.leftShift = true;
        }

        // Send key press and release (no delay needed - serial communication is already slow enough)
        await send(modifiers, code);
      }

      console.log('Paste completed');
    } catch (e) {
      console.error('Paste error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function send(modifiers: Modifiers, code: number) {
    const keys = [0x00, 0x00, code, 0x00, 0x00, 0x00];
    await device.sendKeyboardData(modifiers, keys);

    await device.sendKeyboardData(new Modifiers(), [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  }

  return (
    <div
      className="flex h-[30px] cursor-pointer items-center space-x-1 rounded px-3 text-neutral-300 hover:bg-neutral-700/50"
      onClick={paste}
    >
      <ClipboardIcon size={18} />
      <span>{t('keyboard.paste')}</span>
    </div>
  );
};
