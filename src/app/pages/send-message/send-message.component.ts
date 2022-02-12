import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType } from 'src/app/models/ContactListType';
import { MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';
import { ContactListService } from 'src/app/services/contact-list.service';
import { MessageService } from 'src/app/services/message.service';

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
    private messageService: MessageService,
    private store: Store
  ) { }

  listMsg: MessageType[] = [];
  listContactList: ContactListType[];
  client: ClientStoreType;
  showModal: boolean;

  msgForm = this.fb.group({
    listSend: ['', Validators.required],
    numberWhatsApp: ['', Validators.required],
    msgTemplate: [''],
    msg: ['', Validators.required],
    image: ['']
  })

  ngOnInit() {
    this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
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

    //Todo: voltar com modal
    //this.showModal = true;
    if (this.msgForm.valid) {

      const { listSend, numberWhatsApp, msg } = this.msgForm.value;

      this.messageService.send({ message: msg, phone: numberWhatsApp, idList: listSend, picture: '' })
        .pipe(catchError(error => {
          this.toastr.error(`Não foi possivel enviar a mensagem: ${error.error.message}`)
          return throwError(() => new Error(error.message));
        }))
        .subscribe(_ => {

          this.toastr.success(`Mensagem enviada com sucesso`);

          this.msgForm.reset({
            listSend: '',
            numberWhatsApp: '',
            msgTemplate: '',
            msg: '',
            image: ''
          })
        })
    } else {
      this.msgForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showModal = false;
  }

}
