import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { CategoryCreateComponent } from './items/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './items/category/category-update/category-update.component';
import { DetectQueerComponent } from './detect-queer/detect-queer.component';
import { ExpandTableComponent } from './items/items/items-table/expand-table/expand-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    RouterOutlet,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    DetectQueerComponent,
    ExpandTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'estoque-simples';
}
