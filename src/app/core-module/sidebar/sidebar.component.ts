import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnumService} from '../../services/enum.service';
import {Car} from '../../models/car';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'cs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
  }
}
