import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { AgGridModule } from 'ag-grid-angular';
import { ContactService } from 'app/@core/mock/contact.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { FsIconComponent } from '../tables/tree-grid/tree-grid.component';
import { ContactRoutingModule, routedComponents } from './contact-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    ContactRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,

    AgGridModule.withComponents([]),

  ],
  declarations: [
    ...routedComponents
      ],
      providers:[ContactService]
})
export class ContactModule { }
