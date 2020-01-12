import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatProgressSpinnerModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatProgressSpinnerModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
  ]
})
export class MaterialModule { }
