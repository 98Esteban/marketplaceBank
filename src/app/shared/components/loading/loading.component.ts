import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    loading$: Observable<boolean>;

    constructor(private loadingService: LoadingService) {
        this.loading$ = this.loadingService.loading$;
    }
}