import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink, BannerComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
