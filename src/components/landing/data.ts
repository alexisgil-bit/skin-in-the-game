import a1 from "@/assets/athlete-1.jpg";
import a2 from "@/assets/athlete-2.jpg";
import a3 from "@/assets/athlete-3.jpg";
import a4 from "@/assets/athlete-4.jpg";
import qr from "@/assets/athlete-qr.png.asset.json";

export const athletes = [
  { id: "07", name: "Valeria R.", img: a1, pace: "4:05", podios: 6, zone: "Frente", tag: "HYROX PRO" },
  { id: "12", name: "Diego M.", img: a2, pace: "3:42", podios: 11, zone: "Pecho", tag: "MARATÓN" },
  { id: "21", name: "Iván T.", img: a3, pace: "4:30", podios: 3, zone: "Brazo", tag: "HYROX" },
  { id: "33", name: "Sofía L.", img: a4, pace: "3:58", podios: 9, zone: "Rostro", tag: "10K ÉLITE" },
  { id: "48", name: "Andrea P.", img: qr.url, pace: "4:12", podios: 4, zone: "Espalda QR", tag: "21K" },
];

export const qrImg = qr.url;
