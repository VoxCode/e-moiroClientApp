import {BusinessGameBlock} from '../../main-step-constructors/business-game-constructor/business-game-block/business-game-block';

export class BusinessGame {
  constructor(
    public bGameTitle?: string,
    public bGameBlocks?: BusinessGameBlock[],
  ) {
    this.bGameBlocks = [];
  }

  public parseToStore(): string {
    let aux = '';
    this.bGameBlocks.forEach((block) => {
      aux += block.parseToStore();
    });
    return aux;
  }

  public parseToView(baseString: string): BusinessGame {
    this.bGameBlocks = [];
    const aux = baseString.split('<p>').filter(e => e);
    aux.forEach((blockBaseString: string, index) => {
      const auxbGameBlock: BusinessGameBlock = new BusinessGameBlock();
      this.bGameBlocks.push(auxbGameBlock.parseToView(blockBaseString));
    });
    return this;
  }

  createEmpty(): void {
    this.bGameTitle = '';
    this.bGameBlocks = [];
  }


  createTemplate(blockTitles: string[]): BusinessGameBlock[] {
    const blocks: BusinessGameBlock[] = [];
    blockTitles.forEach((blockTitle) => {
      const block = new BusinessGameBlock();
      block.title = blockTitle;
      blocks.push(block);
    });
    return blocks;
  }

  createBusinessGameTemplate(): void {
    this.bGameTitle = 'Деловая игра';
    this.bGameBlocks = this.createTemplate(['Задачи', 'Сценарий', 'Вводная часть', 'Основная часть', 'Заключительная часть']);
  }

  createRoundTableTemplate(): void {
    this.bGameTitle = 'Круглый стол';
    this.bGameBlocks = this.createTemplate(['Задачи', 'Вопросы для обсуждения']);
  }

  createTrainingTemplate(): void {
    this.bGameTitle = 'Тренинг';
    this.bGameBlocks = this.createTemplate(['Задачи', 'Сценарий', 'Вводная часть', 'Основная часть', 'Заключительная часть']);
  }

  createConferenceTemplate(): void {
    this.bGameTitle = 'Конференция';
    this.bGameBlocks = this.createTemplate(['Задачи', 'План']);
  }
}
