import { CdkObserveContent } from '@angular/cdk/observers';
import { AfterViewInit, Directive, ElementRef, HostListener, inject, signal } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { merge } from 'rxjs';
import { fromResizeObserver } from '../resize-observer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appTooltipOverflow]',
  standalone: true,
  hostDirectives: [MatTooltip, CdkObserveContent]
})
export class TooltipOverflowDirective {
  private matTooltip = inject(MatTooltip);
  private cdkObserveContent = inject(CdkObserveContent);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private showTitle = signal(false);

  constructor() {
    merge(
      fromResizeObserver(this.elementRef.nativeElement),
      this.cdkObserveContent.event
    ).pipe(takeUntilDestroyed()).subscribe(()=>{
      // content change or size change
      const { scrollWidth, clientWidth } = this.elementRef.nativeElement;

      this.showTitle.set(scrollWidth > clientWidth);

      if (this.showTitle()) {
        this.matTooltip.message = this.elementRef.nativeElement.textContent;
      } else {
        this.matTooltip.message = "";
      }
    })
  }
}
