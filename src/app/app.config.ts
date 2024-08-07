import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from './shared/models/translate-paginator';
import { provideToastr } from 'ngx-toastr';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const  maskConfig : Partial < IConfig >  =  {
    validation : false,
  } ;

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideToastr(
            {
                closeButton: true,
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                progressBar: true
            }),
        provideEnvironmentNgxMask (maskConfig),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR',
        },
        {
            provide: MatPaginatorIntl,
            useValue: getPortuguesePaginatorIntl(),
        },
        provideAnimationsAsync(), provideAnimationsAsync(),
    ],
};
