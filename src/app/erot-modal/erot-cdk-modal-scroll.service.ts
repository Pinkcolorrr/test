import { ApplicationRef, Injectable, OnInit } from '@angular/core';

/**
 * Cdk с scrollStrategy.block() не правильно работает с высотой приложение на мобибльных экранаэ в некоторых браузерах (safari, mozilla)
 * Поэтому при испольховании cdk-overlay нужно блокировать скролл вручную.
 */
@Injectable({
    providedIn: 'root'
})
export class ErotCdkModalScrollService {

    private prevScroll: number;
    private appRoot: any;
    private readonly noScrollClass = 'no-scroll';

    constructor(private applicationRef: ApplicationRef) {
        setTimeout(() => {
            this.appRoot = this.applicationRef.components[0]?.location.nativeElement;
        })
    }

    disableScroll() {
        this.prevScroll = window.pageYOffset;
        this.appRoot.classList.add(this.noScrollClass);
        this.appRoot.style.top = `-${this.prevScroll}px`;
    }

    enableScroll() {
        this.appRoot.classList.remove(this.noScrollClass);
        window.scrollTo(0, this.prevScroll);
        this.appRoot.style.top = null;
    }
}
