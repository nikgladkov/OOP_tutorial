//Адаптер вычисляет наименьший радиус окружности, в которую можно вписать квадратный колышек, и представляет его как круглый колышек с этим радиусом

class RoundHole {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }

  fits(peg: RoundPeg): boolean {
    return peg.getRadius() <= this.radius;
  }
}

class RoundPeg {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }
}

class SquarePeg {
  private width: number;

  constructor(width: number) {
    this.width = width;
  }

  getWidth(): number {
    return this.width;
  }
}

class SquarePegAdapter extends RoundPeg {
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    super(0);
    this.peg = peg;
  }

  getRadius(): number {
    const w = this.peg.getWidth();
    return Math.round((w * Math.sqrt(2)) / 2);
  }
}

//client
const hole10 = new RoundHole(10);

const rpeg9 = new RoundPeg(9);
const rpeg11 = new RoundPeg(11);

console.log(
  `Hole: ${hole10.getRadius()}, Peg: ${rpeg9.getRadius()}, Fits() result is: ${hole10.fits(
    rpeg9
  )}`
);
console.log(
  `Hole: ${hole10.getRadius()}, Peg: ${rpeg11.getRadius()}, Fits() result is: ${hole10.fits(
    rpeg11
  )}`
);

const speg9 = new SquarePeg(9);
const adaptedSpeg9 = new SquarePegAdapter(speg9);
console.log(
  `Hole: ${hole10.getRadius()}, Peg: ${adaptedSpeg9.getRadius()}, Fits() result is: ${hole10.fits(
    adaptedSpeg9
  )}`
);
