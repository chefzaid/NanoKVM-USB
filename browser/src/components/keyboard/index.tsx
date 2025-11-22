import { useEffect, useRef } from 'react';

import { device } from '@/libs/device';
import { Modifiers } from '@/libs/device/keyboard.ts';
import { KeyboardCodes } from '@/libs/keyboard';

export const Keyboard = () => {
  const controlKeys = new Set(['Control', 'Shift', 'Alt', 'Meta']);

  const pressedKeysRef = useRef<Set<string>>(new Set());

  // listen keyboard events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // press button
  async function handleKeyDown(event: KeyboardEvent) {
    // Only intercept keyboard events when not typing in input fields
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (controlKeys.has(event.key)) {
      pressedKeysRef.current.add(event.code);
      // Send modifier key immediately so it's active for mouse clicks
      await sendModifiersOnly();
      return;
    }

    await sendKeyDown(event);
  }

  // release button
  async function handleKeyUp(event: KeyboardEvent) {
    // Only intercept keyboard events when not typing in input fields
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (controlKeys.has(event.key)) {
      pressedKeysRef.current.delete(event.code);
    }

    await sendKeyUp();
  }

  async function sendKeyDown(event: KeyboardEvent) {
    const code = KeyboardCodes.get(event.code);
    if (!code) return;

    const ctrl = getCtrl(event);
    const keys = [0x00, 0x00, code, 0x00, 0x00, 0x00];

    await device.sendKeyboardData(ctrl, keys);
  }

  async function sendModifiersOnly() {
    const modifiers = getCurrentModifiers();
    const keys = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    await device.sendKeyboardData(modifiers, keys);
  }

  async function sendKeyUp() {
    const modifiers = new Modifiers();
    const keys = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    await device.sendKeyboardData(modifiers, keys);
  }

  function getCurrentModifiers() {
    const modifiers = new Modifiers();

    if (pressedKeysRef.current.has('ControlLeft')) {
      modifiers.leftCtrl = true;
    }
    if (pressedKeysRef.current.has('ControlRight')) {
      modifiers.rightCtrl = true;
    }
    if (pressedKeysRef.current.has('ShiftLeft')) {
      modifiers.leftShift = true;
    }
    if (pressedKeysRef.current.has('ShiftRight')) {
      modifiers.rightShift = true;
    }
    if (pressedKeysRef.current.has('AltLeft')) {
      modifiers.leftAlt = true;
    }
    if (pressedKeysRef.current.has('AltRight')) {
      modifiers.rightAlt = true;
    }
    if (pressedKeysRef.current.has('MetaLeft')) {
      modifiers.leftWindows = true;
    }
    if (pressedKeysRef.current.has('MetaRight')) {
      modifiers.rightWindows = true;
    }

    return modifiers;
  }

  function getCtrl(event: KeyboardEvent) {
    const modifiers = new Modifiers();

    if (event.ctrlKey) {
      modifiers.leftCtrl = pressedKeysRef.current.has('ControlLeft');
      modifiers.rightCtrl = pressedKeysRef.current.has('ControlRight');
    }
    if (event.shiftKey) {
      modifiers.leftShift = pressedKeysRef.current.has('ShiftLeft');
      modifiers.rightShift = pressedKeysRef.current.has('ShiftRight');
    }
    if (event.altKey) {
      modifiers.leftAlt = pressedKeysRef.current.has('AltLeft');
      modifiers.rightAlt = pressedKeysRef.current.has('AltRight');
    }
    if (event.metaKey) {
      modifiers.leftWindows = pressedKeysRef.current.has('MetaLeft');
      modifiers.rightWindows = pressedKeysRef.current.has('MetaRight');
    }
    if (event.getModifierState('AltGraph')) {
      modifiers.leftCtrl = true;
      modifiers.rightAlt = true;
    }

    return modifiers;
  }

  return <></>;
};
