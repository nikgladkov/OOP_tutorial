import { Synth, MIDIInfo } from "./synthesizers";

interface MIDIController {
  sendNote(note: number, velocity: number): void;
}

class MIDIControllerSynth implements MIDIController {
  protected readonly synth: Synth;

  public constructor(synth: Synth) {
    this.synth = synth;
  }

  sendNote(note: number, velocity: number): void {
    const midiINfo: MIDIInfo = { note, velocity };
    this.synth.getNote(midiINfo);
  }
}

export class MIDIkeys extends MIDIControllerSynth {
  public pressKey(note: number, velocity: number): void {
    this.sendNote(note, velocity);
  }
}

export class DrumPad extends MIDIControllerSynth {
  public hitPad(note: number, velocity: number): void {
    this.sendNote(note, velocity);
  }
}
