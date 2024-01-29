import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AdviceService} from "./advice.service";

@Component({
  selector: 'app-advice-page',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnDestroy {
  private onDestroy$ = new Subject<void>(); /////////приватний метод для відписки
  adviceData$ = this.adviceService.advice$; ////////це мій перший потік даних буде, відображує дані за допомогою асинк пайпа
  constructor(public adviceService: AdviceService) {
    this.handleButtonClick('Default Advice');

    this.adviceData$.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        console.log('Отримано пораду:', data);
      });
  }

  handleButtonClick(advice: string): void {///////метод для виклику ф-ї updateAdvice
    this.adviceService.updateAdvice(advice);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
