import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  scrollToSection(section: string) {
    let target: HTMLElement | null = null;

    if (section === 'hero') {
      target = this.heroSection.nativeElement;
    } else if (section === 'about') {
      target = this.aboutSection.nativeElement;
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
