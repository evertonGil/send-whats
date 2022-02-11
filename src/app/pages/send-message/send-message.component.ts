import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType } from 'src/app/models/ContactListType';
import { MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';
import { ContactListService } from 'src/app/services/contact-list.service';

@Component({
  selector: 'dsw-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactListService: ContactListService,
    private store: Store
  ) { }

  listMsg: MessageType[] = [];
  listContactList: ContactListType[];
  client: ClientStoreType;  
  showModal: boolean;

  msgForm = this.fb.group({
    listSend: [''],
    numberWhatsApp: [''],
    msgTemplate: [''],
    msg: [''],
    image: ['']
  })

  ngOnInit() {
    this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {

        console.log('getContactList', res);

        this.listContactList = res.resume.contactLists;
      });

    this.store.select(selectClient).subscribe(client => {
      this.client = client;
    });

    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });

    this.client.phone
  }

  selectMsgTemplate() {
    const index = this.msgForm?.value?.msgTemplate;
    const msgTemplate = this.listMsg[index];

    this.msgForm.patchValue({
      msg: msgTemplate?.message,
      image: msgTemplate?.picture
    })
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
