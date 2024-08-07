import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { SubheaderService } from './subheader.service';
import { MaterialImportsModule } from '../../modules/material-imports/material-imports.module';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [
    MaterialImportsModule,
    UpperCasePipe
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent {

    @Input() subheader = {
        title: '',
        subtitle: ''
    }

    // private subheaderService = inject(SubheaderService);

    // get title(): string{
    //     return this.subheaderService.subheaderData.title;
    // }

    // get subtitle(): string{
    //     return this.subheaderService.subheaderData.subtitle;
    // }

}
