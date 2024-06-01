import {
	Component,
	ComponentRef,
	OnInit,
	OnDestroy,
	ElementRef,
	EventEmitter,
	ViewChild,
	ViewContainerRef,
	Type,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ModalService } from './modal.service'
import { FormsModule } from '@angular/forms'

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

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalComponent<T> implements OnInit, OnDestroy {
	@ViewChild('container', { read: ViewContainerRef })
	entry?: ViewContainerRef
	childComponentRef!: ComponentRef<T>
	closed: boolean = false
	title!: string
	showButtonClose: boolean = true
	openCloseAnimation: boolean = true
	popup: boolean = false
	image: boolean = false
	simple: boolean = false
	update: boolean = false

	onClose: EventEmitter<T> = new EventEmitter()
	onInit: EventEmitter<T> = new EventEmitter()
	private element: any

	ignoreBackButton: boolean = true
	previous: EventEmitter<any> = new EventEmitter()

	constructor(
		private modalService: ModalService,
		el: ElementRef,
	) {
		this.element = el.nativeElement
	}

	ngOnInit(): void {
		;(document.activeElement as any).blur()
		document.getElementsByTagName('body')[0].style.overflow = 'hidden'
	}

	open<T>(component: Type<T>, data?: Partial<T>, options?: Options): void {
		this.element.style.display = 'block'

		this.entry?.clear()

		this.childComponentRef = this.entry?.createComponent(component) as any

		if (options?.ignoreButtonClose) this.showButtonClose = false

		if (options?.ignoreAnimation) this.openCloseAnimation = false

		if (options?.showBackButton) this.ignoreBackButton = false

		if (options?.isPopup) this.popup = true

		if (options?.isImage) this.image = true

		if (options?.isUpdate) this.update = true

		if (options?.isSimple) this.simple = true

		if (options?.title) this.title = options.title

		Object.keys(data || {}).forEach((key) => {
			const anyData = data as any
			if (anyData === undefined) return
			if (anyData[key] === undefined) return
			const intanceRef = this.childComponentRef.instance as any
			intanceRef[key] = anyData[key]
		})

		if (!options?.ignoreBackClick) {
			this.element.addEventListener('click', (el: any) => {
				if (el.target.className === 'modal-background') {
					if (this.popup && this.openCloseAnimation) {
						const modalClose = document.querySelector(
							'.popupMode',
						) as HTMLElement
						modalClose.classList.add('close')
					}

					setTimeout(
						() => {
							this.modalService.close()
						},
						this.popup && this.openCloseAnimation ? 500 : 0,
					)
				}
			})
		}

		this.onInit.emit(this.childComponentRef.instance)
	}

	close(): void {
		if (this.closed) return

		if (this.popup && this.openCloseAnimation) {
			const modalClose = document.querySelector(
				'.popupMode',
			) as HTMLElement
			modalClose.classList.add('close')
		}

		setTimeout(
			() => {
				this.closed = true
				this.modalService.close(this.childComponentRef)
				this.closed = false
				this.entry?.clear()
				this.element.style.display = 'none'
				this.emitCloseEvent()
			},
			this.popup && this.openCloseAnimation ? 500 : 0,
		)
	}

	emitCloseEvent(): void {
		this.onClose.emit(this.childComponentRef.instance)
	}

	ngOnDestroy(): void {
		this.childComponentRef.destroy()
		document.getElementsByTagName('body')[0].style.overflow = 'auto'
	}

	previousPage() {
		this.previous.emit(true)
	}
}
