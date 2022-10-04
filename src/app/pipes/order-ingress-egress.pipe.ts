import {Pipe, PipeTransform} from '@angular/core';
import {IngressEgressModel} from "../models/ingress-egress.model";

@Pipe({
  name: 'orderIngressEgress'
})
export class OrderIngressEgressPipe implements PipeTransform {

  transform(item: IngressEgressModel[],): IngressEgressModel[] {
    return item.slice().sort((a, b) => {
      if (a.type === 'ingress') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
