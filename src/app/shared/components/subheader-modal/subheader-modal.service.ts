import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISubheader } from '../subheader/subheader';

@Injectable({
  providedIn: 'root'
})
export class SubheaderModalService {

    private _subheaderData = new BehaviorSubject<ISubheader>({
        title: 'Inicio',
        subtitle: 'Seja bem vindo ao Estoque Simples'
    })

  constructor() { }

  get subheaderData(): ISubheader{
    return this._subheaderData.value
  }

  set subheaderData (subheaderInfo: ISubheader){
    this._subheaderData.next(subheaderInfo)
  }

}
