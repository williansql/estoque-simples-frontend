import {
	ApplicationRef,
	ComponentRef,
	EventEmitter,
	Injectable,
	Type,
} from '@angular/core'
import { Observable } from 'rxjs'

import { ModalComponent } from './modal.component'

interface Options {
	ignoreBackClick?: boolean
	ignoreButtonClose?: boolean
	ignoreAnimation?: boolean
	showBackButton?: boolean
	isPopup?: boolean
	isImage?: boolean
	isUpdate?: boolean
	isSimple?: boolean
	title?: string
}
@Injectable({
	providedIn: 'root',
})
export class ModalService {
	modals: ComponentRef<any>[] = []
	closeModals: EventEmitter<void> = new EventEmitter()
	constructor(private appRef: ApplicationRef) {}

	add(modal: ComponentRef<ModalComponent<any>>) {
		this.modals.push(modal)
	}

	open<T>(
		component: Type<T>,
		data?: Partial<T>,
		options?: Options,
	): Observable<ModalComponent<T>> {
		return new Observable<ModalComponent<T>>((subscriber) => {
			const root = document.querySelector('app-root')

			const modalDiv = document.createElement('div')
			modalDiv.id = 'modal-injector-' + this.modals.length
			root?.appendChild(modalDiv)

			setTimeout(() => {
				const modalRef: ComponentRef<ModalComponent<T>> =
					this.appRef.bootstrap(
						ModalComponent,
						`#${modalDiv.id}`,
					) as ComponentRef<ModalComponent<T>>
				modalRef.instance.open(component, data, options)
				this.add(modalRef)

				subscriber.next(modalRef.instance)
			}, 0)
		})
	}

	close(component?: ComponentRef<any>) {
		if (component !== undefined) {
			for (let i = this.modals.length - 1; i >= 0; i--) {
				const refModal = this.modals[i]
				if (
					component.componentType.name ===
					refModal.instance.childComponentRef.componentType.name
				) {
					refModal.instance.close()
					refModal.destroy()

					// Limpando listagem - Caso ocorra algum erro na hora de fechar o modal, esete pode ser o principal suspeito!
					this.modals = []

					break
				}
			}
			return
		}
		this.modals[this.modals.length - 1].instance.close()
		this.modals[this.modals.length - 1].destroy()
		this.modals.pop()
	}
}
