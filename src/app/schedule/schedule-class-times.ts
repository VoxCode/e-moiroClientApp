export class ScheduleClassTimes {
  constructor() { }
  static mondayFirstShift = [
    {
      id: 0,
      FirstClassTimeStart: new Date(0, 0, 0, 11, 0, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 11, 40, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 11, 45, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 12, 25, 0, 0),
    },
    {
      id: 1,
      FirstClassTimeStart: new Date(0, 0, 0, 12, 55, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 13, 35, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 13, 40, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 14, 20, 0, 0),
    },
    {
      id: 2,
      FirstClassTimeStart: new Date(0, 0, 0, 14, 30, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 15, 10, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 15, 15, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 15, 55, 0, 0),
    },
    {
      id: 3,
      FirstClassTimeStart: new Date(0, 0, 0, 16, 5, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 16, 45, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 16, 50, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 17, 30, 0, 0),
    }
  ];

  static mondaySecondShift = [
    {
      id: 4,
      FirstClassTimeStart: new Date(0, 0, 0, 11, 0, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 11, 40, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 11, 45, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 12, 25, 0, 0),
    },
    {
      id: 5,
      FirstClassTimeStart: new Date(0, 0, 0, 12, 35, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 13, 15, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 13, 20, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 14, 0, 0, 0),
    },
    {
      id: 6,
      FirstClassTimeStart: new Date(0, 0, 0, 14, 30, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 15, 10, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 15, 15, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 15, 55, 0, 0),
    },
    {
      id: 7,
      FirstClassTimeStart: new Date(0, 0, 0, 16, 5, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 16, 45, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 16, 50, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 17, 30, 0, 0),
    }
  ];

  static genericFirstShift = [
    {
      id: 8,
      FirstClassTimeStart: new Date(0, 0, 0, 8, 55, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 9, 35, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 9, 40, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 10, 20, 0, 0),
    },
    {
      id: 9,
      FirstClassTimeStart: new Date(0, 0, 0, 10, 30, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 11, 10, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 11, 15, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 11, 55, 0, 0),
    },
    {
      id: 10,
      FirstClassTimeStart: new Date(0, 0, 0, 12, 25, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 13, 5, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 13, 10, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 13, 50, 0, 0),
    },
    {
      id: 11,
      FirstClassTimeStart: new Date(0, 0, 0, 14, 0, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 14, 40, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 14, 45, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 15, 25, 0, 0),
    },
    {
      id: 12,
      FirstClassTimeStart: new Date(0, 0, 0, 15, 35, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 16, 15, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 16, 20, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 17, 0, 0, 0),
    }
  ];

  static genericSecondShift = [
    {
      id: 13,
      FirstClassTimeStart: new Date(0, 0, 0, 8, 55, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 9, 35, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 9, 40, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 10, 20, 0, 0),
    },
    {
      id: 14,
      FirstClassTimeStart: new Date(0, 0, 0, 10, 30, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 11, 10, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 11, 15, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 11, 55, 0, 0),
    },
    {
      id: 15,
      FirstClassTimeStart: new Date(0, 0, 0, 12, 5, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 12, 45, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 12, 50, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 13, 30, 0, 0),
    },
    {
      id: 16,
      FirstClassTimeStart: new Date(0, 0, 0, 14, 0, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 14, 40, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 14, 45, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 15, 25, 0, 0),
    },
    {
      id: 17,
      FirstClassTimeStart: new Date(0, 0, 0, 15, 35, 0, 0),
      FirstClassTimeEnd: new Date(0, 0, 0, 16, 15, 0, 0),
      SecondClassTimeStart: new Date(0, 0, 0, 16, 20, 0, 0),
      SecondClassTimeEnd: new Date(0, 0, 0, 17, 0, 0, 0),
    }
  ];
}
