import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appTitleOverflow]',
  standalone: true,
})
export class TitleOverflowDirective {
  private elementRef = inject(ElementRef);
  private showTitle = signal(false);

  @HostBinding('title')
  get title() {
    return this.showTitle() ? this.elementRef.nativeElement.textContent : '';
  }

  @HostListener('mouseenter', ['$event.target'])
  handleMouseEnter(target: HTMLElement) {
    const { scrollWidth, clientWidth } = target;
    this.showTitle.set(scrollWidth > clientWidth);
  }
}
