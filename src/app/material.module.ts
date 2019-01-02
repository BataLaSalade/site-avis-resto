import {NgModule} from '@angular/core';

import { 
    MatButtonModule,
    MatListModule,
 } from '@angular/material';

@NgModule({
    imports: [
    MatButtonModule,
    MatListModule
    ],
    exports: [
        MatButtonModule,
        MatListModule
    ]
})

export class MaterialModule {}