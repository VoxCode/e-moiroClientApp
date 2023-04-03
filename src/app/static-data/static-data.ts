import {Injectable} from "@angular/core";

@Injectable()
export class StaticData {

  public readonly trainingProgramExperts: {DEVELOPER_TYPE_ID: number, REVIEWER_TYPE_ID: number} =
    {DEVELOPER_TYPE_ID: 1, REVIEWER_TYPE_ID: 2};
  public readonly trainingProgramCurriculumType: {DEFAULT: number,
    BUSINESS_GAME: number,
    ROUND_TABLE: number,
    TRAINING: number,
    CONFERENCE: number} =
    {
      DEFAULT: 1,
      BUSINESS_GAME: 2,
      ROUND_TABLE: 3,
      TRAINING: 4,
      CONFERENCE: 5
    };
  public StaticData(){

  }

}
