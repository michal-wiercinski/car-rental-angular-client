import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnumService} from '../../services/enum.service';
import {Car} from '../../models/car';

@Component({
  selector: 'cs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 /* @Output()
  cars: EventEmitter<Car[]> = new EventEmitter<Car[]>();
  map: Map<string, Set<string>> = new Map();
  convertedKeys: Set<string> = new Set<string>();*/

  constructor(private enumService: EnumService) {
  }

  ngOnInit(): void {
   /* this.start();
    console.log(this.map.entries());
    console.log(this.map);
    console.log(this.convertedKeys);*/
  }

  /*
    start(): void {
      this.enumService.getAll().subscribe(data => {
        Object.keys(data).forEach(key => {
          this.map.set(key, data[key]);
        });
        console.log(this.map.entries());
      });
    }
  */

}
