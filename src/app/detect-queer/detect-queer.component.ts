import { Component, inject } from '@angular/core';
import { DetectQueerService } from './detect-queer.service';
import { SubheaderComponent } from '../shared/components/subheader/subheader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detect-queer',
  standalone: true,
  imports: [
    SubheaderComponent,
    FormsModule
  ],
  templateUrl: './detect-queer.component.html',
  styleUrl: './detect-queer.component.scss'
})
export class DetectQueerComponent {

    roletaDePirocagem: string = '';
    nomeDoBicha: string = '';

    detectGay = inject(DetectQueerService);

    ngOnInit(){
    }


    getTypeOfGay() {
        if (this.nomeDoBicha == 'zeldashooter') {
            this.roletaDePirocagem = 'Moreno sensação 22cm'
        } else {
            this.roletaDePirocagem = this.detectGay.getTipoDeViado();
        }
    }

}
