import {NgModule} from '@angular/core';

import { 
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
 } from '@angular/material';

@NgModule({
    imports: [
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialog,
    MatDialogRef
    ],
    exports: [
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatDialog,
        MatDialogRef
    ]
})

export class MaterialModule {}