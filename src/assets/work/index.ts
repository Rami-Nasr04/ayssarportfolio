import astronaut from "./astronaut.jpg";
import ayssarPortrait from "./ayssar-portrait.jpg";
import blindJustice from "./blind-justice.jpg";
import buffalo from "./buffalo.jpg";
import compassFamily from "./compass-family.jpg";
import creation from "./creation.jpg";
import eagle from "./eagle.jpg";
import eyeStudy from "./eye-study.jpg";
import eyesOnBack from "./eyes-on-back.jpg";
import girlPortrait from "./girl-portrait.jpg";
import kratosFull from "./kratos-full.jpg";
import lionClock from "./lion-clock.jpg";
import lions from "./lions.jpg";
import mobster from "./mobster.jpg";
import needleMacro from "./needle-macro.jpg";
import olympusLeg from "./olympus-leg.jpg";
import reaper from "./reaper.jpg";
import romanRebirth from "./roman-rebirth.jpg";
import scorpion from "./scorpion.jpg";
import signatureMain from "./signature-main.jpg";
import signaturePiece from "./signature-piece.jpg";
import sleeve1984 from "./sleeve-1984.jpg";
import sleeve1984Door from "./sleeve-1984-door.jpg";
import sleeve1984Family from "./sleeve-1984-family.jpg";
import sleeve1984Wolf from "./sleeve-1984-wolf.jpg";
import spartan from "./spartan.jpg";
import spartanDetailLeft from "./spartan-detail-left.jpg";
import spartanDetailRight from "./spartan-detail-right.jpg";
import tattooMachine from "./tattoo-machine.jpg";
import timeFamily from "./time-family.jpg";
import wolfForearm from "./wolf-forearm.jpg";

export interface WorkPiece {
  id: string;
  img: string;
  title: string;
  detail: string;
  /** width / height of the source image */
  aspect: number;
}

/** First rows of the gallery — strongest, most varied pieces. */
export const SELECTED_WORKS: WorkPiece[] = [
  { id: "spartan", img: spartan, title: "Spartan", detail: "Forearm — black & grey realism", aspect: 961 / 1600 },
  { id: "girl-portrait", img: girlPortrait, title: "Serpent & Skull", detail: "Thigh — portrait realism", aspect: 522 / 960 },
  { id: "wolf-forearm", img: wolfForearm, title: "Wolf", detail: "Forearm — black & grey with color detail", aspect: 962 / 1600 },
  { id: "lion-clock", img: lionClock, title: "Lion of Time", detail: "Upper arm — realism with clockwork", aspect: 1080 / 1424 },
  { id: "blind-justice", img: blindJustice, title: "Blind Justice", detail: "Full arm — statue realism", aspect: 947 / 1600 },
  { id: "mobster", img: mobster, title: "The Mobster", detail: "Forearm — cinematic realism", aspect: 1080 / 1415 },
  { id: "sleeve-1984", img: sleeve1984, title: "1984", detail: "Full sleeve — black & grey realism", aspect: 1080 / 1416 },
  { id: "time-family", img: timeFamily, title: "Time & Family", detail: "Forearm — custom composition", aspect: 1080 / 1410 },
  { id: "astronaut", img: astronaut, title: "The Astronaut", detail: "Forearm — illustrative realism", aspect: 949 / 1600 },
];

/** Revealed by "View more works". */
export const MORE_WORKS: WorkPiece[] = [
  { id: "kratos-full", img: kratosFull, title: "God of War", detail: "Shoulder — character realism", aspect: 545 / 960 },
  { id: "olympus-leg", img: olympusLeg, title: "Olympus", detail: "Full leg — statue realism", aspect: 803 / 1439 },
  { id: "compass-family", img: compassFamily, title: "Compass & Family", detail: "Forearm — custom composition", aspect: 1200 / 1600 },
  { id: "buffalo", img: buffalo, title: "The Buffalo", detail: "Calf — realism with film reel", aspect: 792 / 1600 },
  { id: "scorpion", img: scorpion, title: "Scorpion", detail: "Upper arm — character realism", aspect: 1200 / 1600 },
  { id: "creation", img: creation, title: "Creation", detail: "Forearm — surreal statue composition", aspect: 950 / 1600 },
  { id: "eagle", img: eagle, title: "Eagle", detail: "Upper back — fine detail", aspect: 1200 / 1600 },
  { id: "eyes-on-back", img: eyesOnBack, title: "Her Eyes", detail: "Upper back — portrait realism", aspect: 1200 / 1600 },
  { id: "roman-rebirth", img: romanRebirth, title: "Rebirth", detail: "Forearm — surreal statue composition", aspect: 1200 / 1600 },
  { id: "tattoo-machine", img: tattooMachine, title: "The Machine", detail: "Forearm — still-life realism", aspect: 1200 / 1600 },
  { id: "reaper", img: reaper, title: "The Reaper", detail: "Inner arm — fresh from the session", aspect: 953 / 1600 },
  { id: "lions", img: lions, title: "Two Lions", detail: "Forearm — split geometric frame", aspect: 1200 / 1600 },
  { id: "eye-study", img: eyeStudy, title: "Study of an Eye", detail: "Detail — Blind Justice", aspect: 945 / 1600 },
  { id: "sleeve-1984-door", img: sleeve1984Door, title: "1984 — The Doorway", detail: "Detail — full sleeve", aspect: 1066 / 1444 },
  { id: "sleeve-1984-wolf", img: sleeve1984Wolf, title: "1984 — The Wolf", detail: "Detail — full sleeve", aspect: 1080 / 1422 },
  { id: "sleeve-1984-family", img: sleeve1984Family, title: "1984 — Family", detail: "Detail — full sleeve", aspect: 1062 / 1431 },
  { id: "spartan-detail-left", img: spartanDetailLeft, title: "Spartan — Detail", detail: "Helm close-up", aspect: 739 / 1600 },
  { id: "spartan-detail-right", img: spartanDetailRight, title: "Spartan — Detail", detail: "Crest close-up", aspect: 739 / 1600 },
];

/** Signature feature — slider: Ayssar beside the piece, then the piece itself. */
export const SIGNATURE_SLIDES: WorkPiece[] = [
  {
    id: "signature-main",
    img: signatureMain,
    title: "The Oracle",
    detail: "Ayssar beside the finished full-leg piece",
    aspect: 1080 / 1416,
  },
  {
    id: "signature-piece",
    img: signaturePiece,
    title: "The Oracle",
    detail: "Full leg — black & grey statue realism",
    aspect: 1080 / 1408,
  },
];

/** Macro process shot — tattooing an eye, used as ambient imagery. */
export { needleMacro };

/** Ayssar at work — hero portrait. */
export { ayssarPortrait };
