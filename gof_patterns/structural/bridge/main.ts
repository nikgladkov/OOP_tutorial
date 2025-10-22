import { FmSynth, AnalogSynth } from "./synthesizers";
import { MIDIkeys, DrumPad } from "./MIDIControllers";

const analog = new AnalogSynth();
const fm = new FmSynth();

const keyboardMoog = new MIDIkeys(analog);
const padDIY = new DrumPad(analog);
const keyboardRoland = new MIDIkeys(fm);
const padRoland = new DrumPad(fm);

keyboardMoog.pressKey(1,100);
padDIY.hitPad(14,55);
keyboardRoland.pressKey(5,3);
padRoland.hitPad(2,4);