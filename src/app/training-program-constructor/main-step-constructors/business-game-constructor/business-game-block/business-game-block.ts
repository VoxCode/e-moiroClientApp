export class BusinessGameBlock {
  constructor(
    public title?: string,
    public dataFields?: string[],
  ) {
    this.dataFields = [];
  }

  public parseToStore(): string{
    let aux = '';
    aux += this.title + '<title>' + this.dataFields.join('<br>') + '<p>';
    return aux;
  }

  public parseToView(baseString: string): BusinessGameBlock{
    this.dataFields = [];
    const aux = baseString.split('<title>');
    // this.title = baseString.split('<title>').filter(e =>  e)[0];
    // this.dataFields = baseString.split('<br>').filter(e =>  e);
    this.title = aux[0];
    this.dataFields = aux[1].split('<br>').filter(e =>  e);
    console.log(baseString);
    console.log(aux);
    return this;
  }

  createEmpty(): void{
    this.title = '';
    this.dataFields = [];
  }
}
