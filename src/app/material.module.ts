import {NgModule} from '@angular/core';

import { 
    MatButtonModule,
    MatListModule,
    MatSelectModule
 } from '@angular/material';

@NgModule({
    imports: [
    MatButtonModule,
    MatListModule,
    MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatListModule,
        MatSelectModule
    ]
})

export class MaterialModule {}