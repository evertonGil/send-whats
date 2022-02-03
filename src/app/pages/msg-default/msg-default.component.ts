import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'dsw-msg-default',
  templateUrl: './msg-default.component.html',
  styleUrls: ['./msg-default.component.scss']
})
export class MsgDefaultComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  listMsg: msgType[] = mockMsgs;

  ngOnInit(): void {
  }

  msgForm = this.fb.group({
    title: [''],
    msg: [''],
    image: ['']
  })

  editMsg(msg: msgType) {
    this.msgForm.setValue({
      title: msg.title,
      msg: msg.msg,
      image: msg.image
    })
  }
  

  onSubmitForm(event: Event) {
    event.preventDefault();

    console.log('form', this.msgForm)
  }

}

type msgType = {
  title: string;
  msg: string;
  image: string;
}

const mockMsgs: msgType[] = [
  {
    "title": "Mensagem Envio normal 1",
    "msg": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
    "image": "https://www.adobe.com/br/express/create/media_19da0db39efaa40b43fa0f5fefb7aeb14328a929e.jpeg?width=400&format=jpeg&optimize=medium"
  },
  {
    "title": "Mensagem Envio normal 2",
    "msg": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
    "image": "https://www.vaivai.com.br/wp-content/uploads/2020/05/FLYER.png"
  },
  {
    "title": "Mensagem Envio normal 3",
    "msg": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-nMbGmB3O4o-4EYQCzeGGUhRDUMYqAccrUQ&usqp=CAU"
  }
]