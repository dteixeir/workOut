import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excersize } from '../excersize.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';
import { BaseController } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-training-past',
  templateUrl: './training-past.component.html',
  styleUrls: [ './training-past.component.scss' ]
})
export class TrainingPastComponent extends BaseController implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Excersize>  = new MatTableDataSource<Excersize>();
  displayedColumns: string[] = [
    'date',
    'name',
    'caloriesBurned',
    'duration',
    'state'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private trainingService: TrainingService,
    protected uiService: UIService,
    protected store: Store<fromTraining.State>
  ) {
    super(
      store,
      uiService
    );
  }

  ngOnInit(): void {
    this.baseInit();

    this.store.select(fromTraining.getFinishedExcersizes)
      .subscribe(excersizes => {
        this.dataSource.data = excersizes;
      });

    this.trainingService.getFinishedExcersizes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
