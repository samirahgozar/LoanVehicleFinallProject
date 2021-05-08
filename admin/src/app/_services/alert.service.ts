import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
import { AlertPosition, AlertType } from 'app/@core/data/alert';
import { ToastrService } from 'ngx-toastr';

 @Injectable({
   providedIn: 'root'
})
export class AlertService {
  constructor(private toastr: ToastrService) {}


  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';





  quotes = [
    { title: null, body: 'We rock at Angular' },
    { title: null, body: 'Titles are not always needed' },
    { title: null, body: 'Toastr rock!' },
  ];

 
  public showAlert(type: AlertType, title: string, body: string, position:AlertPosition ) {
    switch (type) {

      case 'success':
        this.toastr.success(body, title);
        break;
        case 'error':
        this.toastr.error(body, title);
        break;
        case 'info':
        this.toastr.info(body, title);
        break;
        case 'warning':
        this.toastr.warning(body, title);
        break;
    }
  }

  // showCustom() {
  //   this.toastr.custom('',
  //     'Custom Message',
  //     {
  //       enableHTML: true,
  //       dismiss: 'click',
  //       toastLife: 3000,
  //       showCloseButton: true,
  //       positionClass: 'toast-bottom-right',
  //       messageClass: "border",
  //       titleClass: 'border',
  //       animate: 'flyRight'
  //     });
  // }

}
