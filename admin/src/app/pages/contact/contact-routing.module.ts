import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactMasterComponent } from './contact-master.component';

import { ContactComponent } from './contact.component';

const routes: Routes = [{
  path: '',
  component: ContactMasterComponent,
  children: [
    {
      path: '',
      component: ContactComponent,
    },
    // {
    //   path: 'tree-grid',
    //   component: TreeGridComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule { }

export const routedComponents = [
  ContactMasterComponent,
  ContactComponent,
];
