import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalOverlayRef } from '../erot-modal.service';

@Component({
    selector: 'erot-modal',
    templateUrl: './erot-modal.component.html',
    styleUrls: ['./erot-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErotModalComponent {

    @Input() headerText = 'Выполнить действие ?';
    @Input() loading = false;

    contentScrollOnBottom = false;

    constructor(private readonly modalOverlayRef: ModalOverlayRef) {
    }

    close(): void {
        this.modalOverlayRef.close();
    }

    onContentScroll(event: any) {
        const {target} = event;
        this.contentScrollOnBottom =
            (target.offsetHeight + target.scrollTop) >= target.scrollHeight;
    }
}
