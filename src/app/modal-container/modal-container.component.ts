import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit {

  public user = {name : '', price: '', amount: ''}; 

  @Input() upid;
  @Input() upname;
  @Input() upprice;
  @Input() upamount;
  @Input() delete;

  constructor(private modalService: NgbModal, private productService : ProductsService) { }
  ngOnInit() {
  }

  onOpenProductModalUpdate() {
    const modalRef = this.modalService.open(ModalContentComponent);
    this.user.name = this.upname;
    this.user.price = this.upprice;
    this.user.amount = this.upamount;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.passUpdate.subscribe((receivedEntry) => {

      this.productService.updateProduct(receivedEntry, this.upid).subscribe(
        res => {
          alert(res['message']);
          window.location.reload();
        },
        err => {
          console.log(err);}
      );
      
      });

  }

  onOpenProductModalDelete() {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.user = this.delete;
    modalRef.componentInstance.passDelete.subscribe((receivedEntry) => {

      this.productService.deleteProduct(this.delete).subscribe(
        res => {
          alert(res['message']);
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
      
      });
  }

}
