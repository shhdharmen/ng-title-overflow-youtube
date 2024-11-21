import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TitleOverflowDirective } from './shared/directives/title-overflow.directive';
import { TooltipOverflowDirective } from './shared/directives/tooltip-overflow.directive';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    AsyncPipe,
    MatButtonModule,
    TitleOverflowDirective,
    TooltipOverflowDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-title-overflow';

  width = signal(225);
  content = signal('Angular is a web framework.');

  isHandset$ = inject(BreakpointObserver)
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  shortContent() {
    this.content.set('Angular is a web framework.');
  }
  longContent() {
    this.content.set(
      'Angular is a web framework that empowers developers to build fast, reliable applications.'
    );
  }
}
