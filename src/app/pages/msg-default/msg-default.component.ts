import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { MessageType } from 'src/app/models/MessageType';
import { selectMessages } from 'src/app/redux/selectors.store';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'dsw-msg-default',
  templateUrl: './msg-default.component.html',
  styleUrls: ['./msg-default.component.scss']
})
export class MsgDefaultComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService,
    private store: Store,
    private fb: FormBuilder
  ) { }

  listMsg: MessageType[];

  ngOnInit(): void {
        
    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });
  }

  msgForm = this.fb.group({
    title: [''],
    msg: [''],
    image: ['']
  })

  private getMessages() {
    this.messageService.get()
    .subscribe(_ => _);
  }

  editMsg(msg: MessageType) {
    this.msgForm.patchValue({
      title: msg.title,
      msg: msg.message,
      image: msg.picture
    })
  }


  onSubmitForm(event: Event) {
    event.preventDefault();

    this.messageService.post(this.msgForm.value.msg, this.msgForm.value.title)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao cadastrar nova mensagem, por favor contacte o suporte!!')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {
        this.getMessages();
        this.msgForm.reset({title: '', msg: '', image: ''})
      })
  }

}