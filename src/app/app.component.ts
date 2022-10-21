import { Component, HostListener } from '@angular/core';
import { ErotModalService } from './erot-modal/erot-modal.service';
import { ErotModalComponent } from './erot-modal/erot-modal/erot-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ErotModalService],
})
export class AppComponent {
  title = 'test';

  @HostListener('window:load')
  onLoad() {
    if (sessionStorage.getItem('mobile_version_active')) {
      sessionStorage.removeItem('mobile_version_active');
      location.reload();
    }
  }

  constructor(private readonly modalService: ErotModalService) {

    window.onpagehide = function() {
      if (document.cookie.indexOf('mobile_version=') !== -1) {
        sessionStorage.setItem('mobile_version_active', 'true');
        document.cookie = 'mobile_version=; path=/; max-age=-1';
      }
    }
  }

  get cookie() {
    return document.cookie;
  }

  setCookie() {
    document.cookie = 'mobile_version=false; path=/';
  }

  openModal() {
    this.modalService.open(ErotModalComponent);
  }
}
