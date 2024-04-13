import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input() message: string = 'Sorry, but an unexpected error occurred';
}
