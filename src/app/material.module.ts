import {NgModule} from '@angular/core';

import { 
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule
 } from '@angular/material';

@NgModule({
    imports: [
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatDialogModule
    ]
})

export class MaterialModule {}