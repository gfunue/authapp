import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonModule, CardModule, RippleModule, PanelModule, DividerModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
