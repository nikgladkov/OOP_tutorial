interface SoundUnit {
  generate(voltage: number): void;
}

class VCOunit implements SoundUnit {
  generate(voltage: number): void {
    if (voltage > 0 && voltage < 10) {
      console.log(`Saw*${voltage}`);
    } else {
      console.log("Voltage out of range. Enjoy the silence");
    }
  }
}

class AnalogSynthesizer {
  private readonly sawGenerator: VCOunit;

  constructor(sawGenerator: VCOunit) {
    this.sawGenerator = sawGenerator;
  }

  generateSaw(pitch: number) {
    this.sawGenerator.generate(pitch);
  }
}

class AnalogSynthFacade {
  private readonly analogSynthesizer: AnalogSynthesizer;

  constructor() {
    const vco = new VCOunit();
    this.analogSynthesizer = new AnalogSynthesizer(vco);
  }

  play(velocity: number) {
    this.analogSynthesizer.generateSaw(velocity / 10);
  }
}

//client
const syntFacade = new AnalogSynthFacade();
syntFacade.play(50)
