import { Component, OnInit } from "@angular/core";
import { setTimeout } from "timers";
import { IModalContent, ModalService } from "./modal.service";

@Component({
    selector:'app-modal',
    templateUrl:`./modal.component.html`,
    styleUrls:['./modal.component.sass']
})
export class ModalComponent implements OnInit {

    modalVisible = false;
    modalVisibleAnimate = false;
    modalContent: IModalContent = {};
    cancel: () => void = () => {};
    ok: () => void = () => {};
    defaultModalContent : IModalContent = {
        header: 'Please Confirm',
        body : 'Are you sure want to continue?',
        cancelButtonText : 'Cancel',
        OKButtonText : 'OK',
        cancelButtonVisible : true
    };


constructor(private modalService : ModalService) {
    modalService.show = this.show.bind(this)
    modalService.hide = this.hide.bind(this)
}

    ngOnInit(): void {
        
    }


    show(modalContent : IModalContent) {
        this.modalContent = Object.assign(this.defaultModalContent, modalContent);
        this.modalVisible = true ;
        setTimeout(() => this.modalVisibleAnimate = true, 100);

        const promise = new Promise<boolean>((resolve, reject) => {
          this.cancel = () => {
              this.hide();
              resolve(false);
          };

          this.ok = () => {
              this.hide();
              resolve(true);
          };
        });
        return promise;
    }

    hide() {
        this.modalVisibleAnimate = false;
        setTimeout(() => this.modalVisible = false, 300);
    }
}