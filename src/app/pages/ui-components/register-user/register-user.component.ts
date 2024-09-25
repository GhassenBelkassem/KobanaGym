import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  constructor(private messageService: MessageService){}
  show() {
    console.log("test")
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
}
