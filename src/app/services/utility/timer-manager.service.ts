import { Injectable, EventEmitter } from '@angular/core';

export class Timer {
  public interval = 10000;
  private timerId: any;
  private timeOutEmitter: EventEmitter<any>;
  private subscriptions: any[];

  constructor() {
    this.timeOutEmitter = new EventEmitter();
    this.subscriptions = [];
  }

  start(): void{
    this.reset();
  }

  stop(): void{
    clearTimeout(this.timerId);
  }

  reset(): void{
    if (this.timerId){
      this.stop();
    }
    this.timerId = setTimeout(() => {
      this.timeOutEmitter.emit();
    }, this.interval);
  }

  subscribeOnTimeOut(callback: () => void): void {
    this.subscriptions.push(
      this.timeOutEmitter.subscribe(() => {
        callback();
      })
    );
  }

  clear(): void{
    this.stop();
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class TimerManagerService {

  private timers: Timer[];
  constructor() {
    this.timers = [];
  }

  startNewTimer(): Timer{
    const timer = new Timer();
    this.timers.push(timer);
    return timer;
  }
}
