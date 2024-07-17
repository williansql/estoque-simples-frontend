import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialImportsModule } from '../../modules/material-imports/material-imports.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MaterialImportsModule,
    RouterOutlet,
    RouterLink,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
