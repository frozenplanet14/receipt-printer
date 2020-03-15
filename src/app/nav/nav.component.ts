import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouteLinkModel } from '../models/route-link.model';
import { APP_ROUTES } from '../constants/app-routes.const';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'epson-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') appDrawer: ElementRef;
  routerLinks: RouteLinkModel[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavService) { }

  ngOnInit() {
    this.routerLinks = APP_ROUTES;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
