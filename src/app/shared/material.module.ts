import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card'; 

const ModuleComponent = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule
]

@NgModule({
  declarations: [],
  imports: [ ModuleComponent ],
  exports: [ ModuleComponent ]
})
export class MaterialModule { }
