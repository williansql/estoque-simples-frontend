import { Component, inject, Input } from '@angular/core';
import { SubheaderService } from './subheader.service';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [],
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
