import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('in => out', [
        animate('300ms ease-in-out')
      ]),
      transition('out => in', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class RegisterFormComponent {
  isOpen = false;

  toggleForm() {
    this.isOpen = !this.isOpen;
  }
}
