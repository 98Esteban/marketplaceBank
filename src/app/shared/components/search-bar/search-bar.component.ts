import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { combineLatest } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  @Output() searchQuery = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
    this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery.emit(query || '');
    });
  }

  clearSearch(): void {
    this.searchForm.get('query')?.setValue('');
  }
}
