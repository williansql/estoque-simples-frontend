import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialImportsModule } from '../../modules/material-imports/material-imports.module';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialImportsModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


}
