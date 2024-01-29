import { Injectable } from '@angular/core';
import {BehaviorSubject,  Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AdviceService {
public advice$ = new BehaviorSubject<string>('');
private destroy$ = new Subject<void>();

  updateAdvice(newAdvice: string): void { /////оновлює значення BehaviorSubject інадсилає нову пораду

    this.advice$.next(newAdvice);/////для того щоб давати різні поради кли я клікнула на кнопку
  }
  constructor() { }

  unsubscribe(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
