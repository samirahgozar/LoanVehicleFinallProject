import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify
      .confirm(message, function(e) {
        if (e) {
          okCallback();
        } else {
        }
      })
      .set({
        title: 'اخطار!',
        labels: { ok: 'تایید', cancel: 'انصراف' }
      });
  }
}
