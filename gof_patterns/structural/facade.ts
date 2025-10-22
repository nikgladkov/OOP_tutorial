//Фасад - клавиатура синтезатора
interface SoundUnit {
  generate(voltage: number): void;
}

class VCOunit implements SoundUnit {
  generate(voltage: number): void {
    console.log(`Saw*${voltage}`);
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
syntFacade.play(1);
