# NanoKVM-USB
This is a modified version with enhanced support for **AZERTY (FR)** keyboards.

## Fixes
- AZERTY layout is now correctly handled
- Special chars
- Multiselect with **Ctrl + Click**
- Copy/paste between host and target

Use the installer in the **Releases** section.

---

## Desktop version
[Original Version](https://github.com/sipeed/NanoKVM-USB)

Download the installer from the **Releases** section.  
Or use my version for enhanced handling of AZERTY keyboards.

---

## Web version
https://usbkvm.sipeed.com/

---

## Driver
Google and install:  
`ch340` driver

---

## Schemas

### NanoKVM USB + Raspberry
To command a Raspberry on your PC without SSH:  
Raspberry --(USBA/USBC + HDMI)-- KVM  
PC --(USBC)-- KVM  

### NanoKVM USB + Work PC
To show your Work PC on your Personal PC:  
Work PC --(USBA/USBC + HDMI)-- KVM  
Personal PC --(USBC)-- KVM  
=> Webcam/Keyboard/Mouse on the USB port and switched to Target  

### NanoKVM USB + Dex Hub
To use your Samsung phone on your Work PC:  
S25 --(USBC)-- Dex Hub --(USBA/USBC + HDMI)-- KVM  
Work PC --(USBC)-- KVM  
