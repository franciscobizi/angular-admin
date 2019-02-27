import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {

  constructor() { }
  
  @Input() public user;
  @Output() passUpdate: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

  updateBack(){
    this.passUpdate.emit(this.user);
  }

}
