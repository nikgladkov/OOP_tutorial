export type MIDIInfo = {
  note: number;
  velocity: number;
};

export interface Synth {
  getNote(midiInfo: MIDIInfo): void;
}

export class AnalogSynth implements Synth {
  public getNote(midiInfo: MIDIInfo): void {
    console.log(`Bzzz - ${midiInfo.note},${midiInfo.velocity}`);
  }
}

export class FmSynth implements Synth {
  public getNote(midiInfo: MIDIInfo): void {
    console.log(`Whooo - ${midiInfo.note},${midiInfo.velocity}`);
  }
}
