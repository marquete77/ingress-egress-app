import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import {IngressEgressModel} from "../../models/ingress-egress.model";
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  ingressEgressSubs!: Subscription;

  ingress = 0;
  egress = 0;
  totalIngress = 0;
  totalEgress = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [  ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingressEgressSubs = this.store.select('ingressEgress')
      .subscribe(({items}) => this.generateStatistics(items));
  }

  ngOnDestroy() {
    this.ingressEgressSubs.unsubscribe();
  }

  generateStatistics(items: IngressEgressModel[]) {

    this.ingress = 0;
    this.egress = 0;
    this.totalIngress = 0;
    this.totalEgress = 0;

    for (const item of items) {
      if (item.type === 'ingress') {
        this.totalIngress += item.amount;
        this.ingress ++;
      } else {
        this.totalEgress += item.amount;
        this.egress ++;
      }
    }
    this.doughnutChartData.datasets[0].data = [this.totalIngress, this.totalEgress];
  }

}
