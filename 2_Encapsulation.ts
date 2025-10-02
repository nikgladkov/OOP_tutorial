class RectangleEncapsulated {
  private _width: any;
  private _height: any;

  //Инкапсуляция — скрытие внутреннего устройства объекта и предоставление доступа через публичные методы.

  constructor(w: number, h: number) {
    this._width = w;
    this._height = h;
  }

  public get width() {
    return this._width;
  }

  public set width(value) {
    if (value <= 0) {
      this._width = 1;
    } else {
      this._width = value;
    }
  }
}

const rec1 = new RectangleEncapsulated(5, 10)
rec1.width=95
console.log(rec1.width)