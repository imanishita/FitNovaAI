import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		let ticking = false

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const newScroll = window.pageYOffset

					blobRefs.current.forEach((blob, index) => {
						if (blob) {
							const initialPos = initialPositions[index]

							// Calculating movement in both X and Y direction
							const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 40 // Reduced movement
							const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 20 // Reduced movement

							const x = initialPos.x + xOffset
							const y = initialPos.y + yOffset

							// Apply transformation
							blob.style.transform = `translate(${x}px, ${y}px)`
						}
					})

					ticking = false
				})
				ticking = true
			}
		}

		// Initial render
		handleScroll()

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			<div className="absolute inset-0">
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
				></div>
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
				></div>
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-40%] md:left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
				></div>
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
				></div>
			</div>
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
		</div>
	)
}

export default AnimatedBackground