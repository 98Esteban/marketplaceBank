import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-category-filter',
    imports: [
        CommonModule,
        FormsModule,

    ],
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss']

})

export class CategoryFilterComponent {
    @Input() categories: string[] = [];
    @Input() selectedCategory = 'all';
    @Output() categorySelected = new EventEmitter<string>();

    selectCategory(category: string): void {
        this.categorySelected.emit(category);
    }
}
