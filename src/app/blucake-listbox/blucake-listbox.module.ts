import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { BlucakeListboxComponent } from './blucake-listbox.component';




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularDualListBoxModule
    ],
    declarations: [
        BlucakeListboxComponent
    ],
    exports: [
        BlucakeListboxComponent
    ]
})
export class BlucakeListBoxModule { }
