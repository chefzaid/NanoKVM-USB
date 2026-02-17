// AZERTY keyboard layout character mappings
// Maps ASCII character codes to HID keyboard scan codes for AZERTY layout
export const CharCodes: Record<number, number> = {
  // Numbers (top row on AZERTY: & e " ' ( - e _ c a)
  // To type 0-9, you need Shift on AZERTY
  48: 0x27, // 0 (Shift + a key)
  49: 0x1e, // 1 (Shift + & key)
  50: 0x1f, // 2 (Shift + e key)
  51: 0x20, // 3 (Shift + " key)
  52: 0x21, // 4 (Shift + ' key)
  53: 0x22, // 5 (Shift + ( key)
  54: 0x23, // 6 (Shift + - key)
  55: 0x24, // 7 (Shift + e key)
  56: 0x25, // 8 (Shift + _ key)
  57: 0x26, // 9 (Shift + c key)

  // Letters (uppercase) - AZERTY layout
  65: 0x14, // A (Q key on QWERTY)
  66: 0x05, // B
  67: 0x06, // C
  68: 0x07, // D
  69: 0x08, // E
  70: 0x09, // F
  71: 0x0a, // G
  72: 0x0b, // H
  73: 0x0c, // I
  74: 0x0d, // J
  75: 0x0e, // K
  76: 0x0f, // L
  77: 0x33, // M (semicolon key on QWERTY)
  78: 0x11, // N
  79: 0x12, // O
  80: 0x13, // P
  81: 0x04, // Q (A key on QWERTY)
  82: 0x15, // R
  83: 0x16, // S
  84: 0x17, // T
  85: 0x18, // U
  86: 0x19, // V
  87: 0x1d, // W (Z key on QWERTY)
  88: 0x1b, // X
  89: 0x1c, // Y
  90: 0x1a, // Z (W key on QWERTY)

  // Letters (lowercase) - same mappings as uppercase
  97: 0x14, // a (Q key on QWERTY)
  98: 0x05, // b
  99: 0x06, // c
  100: 0x07, // d
  101: 0x08, // e
  102: 0x09, // f
  103: 0x0a, // g
  104: 0x0b, // h
  105: 0x0c, // i
  106: 0x0d, // j
  107: 0x0e, // k
  108: 0x0f, // l
  109: 0x33, // m (semicolon key on QWERTY)
  110: 0x11, // n
  111: 0x12, // o
  112: 0x13, // p
  113: 0x04, // q (A key on QWERTY)
  114: 0x15, // r
  115: 0x16, // s
  116: 0x17, // t
  117: 0x18, // u
  118: 0x19, // v
  119: 0x1d, // w (Z key on QWERTY)
  120: 0x1b, // x
  121: 0x1c, // y
  122: 0x1a, // z (W key on QWERTY)

  32: 0x2c, // Space

  // Special characters on AZERTY
  33: 0x38, // ! (Shift + / key which is ! on AZERTY)
  34: 0x20, // " (3 key without shift on AZERTY)
  35: 0x20, // # (Shift + 3 on AZERTY)
  36: 0x30, // $ (] key on QWERTY)
  37: 0x34, // % (Shift + ' key)
  38: 0x1e, // & (1 key without shift on AZERTY)
  39: 0x21, // ' (4 key without shift on AZERTY)
  40: 0x22, // ( (5 key without shift on AZERTY)
  41: 0x2d, // ) (- key on QWERTY)
  42: 0x31, // * (\ key on QWERTY)
  43: 0x2e, // + (= key on QWERTY)
  44: 0x10, // , (M key on QWERTY)
  45: 0x23, // - (6 key without shift on AZERTY)
  46: 0x36, // . (Shift + ; on AZERTY)
  47: 0x37, // / (Shift + : on AZERTY)

  9: 0x2b, // Tab
  10: 0x28, // Enter
  13: 0x28, // Enter (CR)

  58: 0x37, // : (. key on QWERTY)
  59: 0x36, // ; (, key on QWERTY)
  60: 0x64, // < (non-US key, left of Z on AZERTY)
  61: 0x2e, // = (without shift on AZERTY)
  62: 0x64, // > (Shift + < on AZERTY)
  63: 0x10, // ? (Shift + M on AZERTY)
  64: 0x27, // @ (Shift + a on AZERTY)

  91: 0x22, // [ (AltGr + ( on AZERTY)
  92: 0x25, // \ (AltGr + 8 on AZERTY)
  93: 0x2d, // ] (AltGr + ) on AZERTY)
  94: 0x26, // ^ (AltGr + 9 on AZERTY)
  95: 0x25, // _ (8 key without shift on AZERTY)
  96: 0x24, // `  ` (AltGr + 7 on AZERTY)

  123: 0x21, // { (AltGr + 4 on AZERTY)
  124: 0x23, // | (AltGr + 6 on AZERTY)
  125: 0x2e, // } (AltGr + = on AZERTY)
  126: 0x1f // ~ (AltGr + 2 on AZERTY)
};

// Characters that require Shift modifier on AZERTY
export const ShiftChars: Record<number, boolean> = {
  // Numbers 0-9 require Shift on AZERTY
  48: true, // 0
  49: true, // 1
  50: true, // 2
  51: true, // 3
  52: true, // 4
  53: true, // 5
  54: true, // 6
  55: true, // 7
  56: true, // 8
  57: true, // 9
  // Special characters that need Shift
  33: true, // !
  35: true, // #
  37: true, // %
  42: true, // *
  46: true, // .
  47: true, // /
  62: true, // >
  63: true // ?
};

// Characters that require AltGr modifier on AZERTY
export const AltGrChars: Record<number, boolean> = {
  64: true, // @ (AltGr + a)
  91: true, // [ (AltGr + ()
  92: true, // \ (AltGr + 8)
  93: true, // ] (AltGr + ))
  94: true, // ^ (AltGr + 9)
  96: true, // `  ` (AltGr + 7)
  123: true, // { (AltGr + 4)
  124: true, // | (AltGr + 6)
  125: true, // } (AltGr + =)
  126: true // ~ (AltGr + 2)
};
