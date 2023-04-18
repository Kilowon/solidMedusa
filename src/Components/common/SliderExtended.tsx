import { For } from 'solid-js'
import { createSignal, useContext, createEffect } from 'solid-js'
import 'solid-slider/slider.css'
import { SliderContext } from 'solid-slider'

export function Arrow(props: any) {
	const disabeld = props.disabled ? ' arrow--disabled' : ''
	return (
		<svg
			onClick={props.onClick}
			class={`arrow ${props.left ? 'arrow--left ' : 'arrow--right'} ${disabeld} ${
				props.class
			}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{props.left && (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			)}
			{!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
		</svg>
	)
}

export const SliderDots = (props: {
	dots: any
	currentSlide: any
	class: any
}) => {
	const context = useContext(SliderContext)
	const changeSlide = (idx: string) => {
		if (context == null) return
		const [helpers] = context
		helpers()?.moveTo(parseInt(idx))
	}

	createEffect(() => {
		console.log('DOTS', props.dots)
	}, [props.dots])

	return (
		<div
			class="flex p-[10px,0px] justify-center items-center gap-x-2 
        "
		>
			<For each={props.dots}>
				{idx => {
					return (
						<button
							onClick={() => {
								changeSlide(idx)
							}}
							class={
								props.currentSlide === idx
									? `${props.class} bg-coolGray-4`
									: `${props.class} bg-coolGray-8`
							}
						></button>
					)
				}}
			</For>
		</div>
	)
}

export const SliderArrowLeft = (props: {
	next: any
	disabled: any
	class: any
	classList: any
}) => {
	const context = useContext(SliderContext)
	const [left, setLeft] = createSignal(false)
	const changeSlide = () => {
		if (context == null) return
		const [helpers] = context
		props.next ? helpers()?.next() : helpers()?.prev()
	}

	return (
		<Arrow
			left
			disabled={props.disabled || false}
			class={props.class}
			classList={props.classList}
			onClick={changeSlide}
		/>
	)
}

export const SliderArrowRight = (props: {
	next: any
	disabled: any
	class: any
	classList: any
}) => {
	const context = useContext(SliderContext)
	const [left, setLeft] = createSignal(false)
	const changeSlide = () => {
		if (context == null) return
		const [helpers] = context
		props.next ? helpers()?.next() : helpers()?.prev()
	}

	return (
		<Arrow
			disabled={props.disabled || false}
			class={props.class}
			classList={props.classList}
			onClick={changeSlide}
		/>
	)
}
