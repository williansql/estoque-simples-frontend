import { Component, inject } from '@angular/core';
import { SubheaderModalService } from './subheader-modal.service';

@Component({
  selector: 'app-subheader-modal',
  standalone: true,
  imports: [],
  templateUrl: './subheader-modal.component.html',
  styleUrl: './subheader-modal.component.scss'
})
export class SubheaderModalComponent {

    private subheaderService = inject(SubheaderModalService);

    get title(): string{
        return this.subheaderService.subheaderData.title;
    }

    get subtitle(): string{
        return this.subheaderService.subheaderData.subtitle;
    }

}
