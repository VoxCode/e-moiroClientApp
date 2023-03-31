import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CertificationType} from '../../../../models/CertificationType';
import {BusinessGame} from '../../../training-program-certification-step/business-game-form/business-game';

@Component({
  selector: 'app-business-game-viewer',
  templateUrl: './business-game-viewer.component.html',
  styleUrls: ['./business-game-viewer.component.scss']
})
export class BusinessGameViewerComponent implements OnInit, OnChanges {

  @Input() businessGameBaseString: string;

  businessGame: BusinessGame = new BusinessGame();

  constructor() { }

  ngOnInit(): void {
    this.businessGame.parseToView(this.businessGameBaseString);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.businessGame.parseToView(changes.businessGameBaseString.currentValue);
  }

}
