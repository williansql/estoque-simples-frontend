import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MaterialImportsModule } from '../../modules/material-imports/material-imports.module';
import { HeaderComponent } from '../header/header.component';
import { SubheaderComponent } from '../subheader/subheader.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MaterialImportsModule,
    HeaderComponent,
    SubheaderComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {


}
