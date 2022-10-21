import { ComponentRef, Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ErotCdkModalScrollService } from './erot-cdk-modal-scroll.service';
import { take } from 'rxjs/operators';

@Injectable()
export class ErotModalService {

    readonly positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();

    readonly overlayConfig = new OverlayConfig({
        hasBackdrop: true,
        positionStrategy: this.positionStrategy,
        panelClass: 'modal-panel'
    });

    constructor(private readonly overlay: Overlay,
                private readonly scrollService: ErotCdkModalScrollService,
                private readonly injector: Injector) {
    }

    open<T>(component: ComponentType<T>, injector?: Injector): ModalOverlayRef<T> {
        this.scrollService.disableScroll();

        const overlay = this.overlay.create(this.overlayConfig);
        const dialogRef = new ModalOverlayRef<T>(overlay);
        const portal = new ComponentPortal(component, null, Injector.create({
            providers: [{provide: ModalOverlayRef, useValue: dialogRef}],
            parent: injector || this.injector
        }));

        dialogRef.componentRef = overlay.attach(portal);

        dialogRef.afterClosed.pipe(take(1)).subscribe(() => this.scrollService.enableScroll());
        overlay.backdropClick().subscribe(() => {
            dialogRef.close();
            dialogRef.backdropClick.next();
        });
        return dialogRef;
    }
}

export class ModalOverlayRef<T = any> {
    afterClosed = new Subject<any>();
    backdropClick = new Subject<any>();
    componentRef!: ComponentRef<T>;

    constructor(private overlayRef: OverlayRef) {
    }

    close(data?: any): void {
        this.overlayRef.dispose();
        this.afterClosed.next(data);
        this.afterClosed.complete();
    }
}
