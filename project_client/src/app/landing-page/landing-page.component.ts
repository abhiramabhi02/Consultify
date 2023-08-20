import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  scrollToNextDiv() {
    const nextDiv = document.getElementById('nextDiv');
    if (nextDiv) {
      nextDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
