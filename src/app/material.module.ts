import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
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
    MatDialogModule,
    MatInputModule
    ],
    exports: [
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule
    ]
})

export class MaterialModule {}