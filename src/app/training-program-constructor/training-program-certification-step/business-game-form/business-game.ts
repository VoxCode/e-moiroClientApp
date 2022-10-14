export class BusinessGame {
  constructor(
    public task?: string[],
    public intro?: string[],
    public main?: string[],
    public ending?: string[],
  ) { }

  public parseToStore(): string{
    let aux = '';
    aux += this.task.join('<br>') + '<p>';
    aux += this.intro.join('<br>') + '<p>';
    aux += this.main.join('<br>') + '<p>';
    aux += this.ending.join('<br>') + '<p>';
    return aux;
  }

  public parseToView(baseString: string): BusinessGame{
    const aux = baseString.split('<p>');
    this.task = aux[0].split('<br>').filter(e =>  e);
    this.intro = aux[1].split('<br>').filter(e =>  e);
    this.main = aux[2].split('<br>').filter(e =>  e);
    this.ending = aux[3].split('<br>').filter(e =>  e);
    return this;
  }

  createEmpty(): void{
    this.task = [];
    this.intro = [];
    this.main = [];
    this.ending = [];
  }
}
