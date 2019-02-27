import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor() { }

  @Input() public user;
  @Output() passDelete: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

  daleteBack(){
    this.passDelete.emit(this.user);
  }

}
