import { useState, useCallback, useRef } from "react";
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useReducedMotion,
	useAnimationControls,
} from "motion/react";

interface Particle {
	id: number;
	x: number;
	y: number;
	angle: number;
	distance: number;
	size: number;
	color: string;
}

const PALETTE = ["#f25c2a", "#ff7a4d", "#ff9b7a", "#ffeee7"];

interface SquishyPortraitProps {
	readonly src: string;
	readonly alt: string;
}

export function SquishyPortrait({ src, alt }: SquishyPortraitProps) {
	const reducedMotion = useReducedMotion();
	const controls = useAnimationControls();
	const wrapperRef = useRef<HTMLButtonElement>(null);
	const [particles, setParticles] = useState<readonly Particle[]>([]);
	const particleId = useRef(0);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const rotateY = useSpring(
		useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [10, -10]),
		{ stiffness: 120, damping: 20 },
	);
	const rotateX = useSpring(
		useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
		{ stiffness: 120, damping: 20 },
	);
	const x = useSpring(
		useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
		{ stiffness: 120, damping: 20 },
	);
	const y = useSpring(
		useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
		{ stiffness: 120, damping: 20 },
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (reducedMotion || !wrapperRef.current) return;
			const rect = wrapperRef.current.getBoundingClientRect();
			mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
			mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
		},
		[mouseX, mouseY, reducedMotion],
	);

	const handleMouseLeave = useCallback(() => {
		mouseX.set(0);
		mouseY.set(0);
	}, [mouseX, mouseY]);

	const spawnParticles = useCallback((originX: number, originY: number) => {
		const count = 18;
		const next: Particle[] = [];
		for (let i = 0; i < count; i++) {
			particleId.current += 1;
			next.push({
				id: particleId.current,
				x: originX,
				y: originY,
				angle: Math.random() * Math.PI * 2,
				distance: 40 + Math.random() * 90,
				size: 5 + Math.random() * 7,
				color: PALETTE[Math.floor(Math.random() * PALETTE.length)]!,
			});
		}
		setParticles((prev) => [...prev, ...next]);
		setTimeout(() => {
			setParticles((prev) =>
				prev.filter((p) => !next.some((n) => n.id === p.id)),
			);
		}, 900);
	}, []);

	const handleClick = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			if (reducedMotion) return;

			const rect = e.currentTarget.getBoundingClientRect();
			const originX = e.clientX - rect.left;
			const originY = e.clientY - rect.top;
			spawnParticles(originX, originY);

			await controls.start({
				scaleX: 1.22,
				scaleY: 0.72,
				rotate: (Math.random() - 0.5) * 6,
				transition: { duration: 0.08, ease: "easeIn" },
			});
			controls.start({
				scaleX: 1,
				scaleY: 1,
				rotate: 0,
				transition: {
					type: "spring",
					stiffness: 360,
					damping: 12,
				},
			});
		},
		[controls, reducedMotion, spawnParticles],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				const rect = wrapperRef.current?.getBoundingClientRect();
				if (rect) {
					const fakeEvent = {
						currentTarget: {
							getBoundingClientRect: () => rect,
						},
						clientX: rect.left + rect.width / 2,
						clientY: rect.top + rect.height / 2,
					} as React.MouseEvent<HTMLButtonElement>;
					handleClick(fakeEvent);
				}
			}
		},
		[handleClick],
	);

	return (
		<button
			type="button"
			ref={wrapperRef}
			className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 cursor-pointer select-none bg-transparent p-0 rounded-full"
			style={{ perspective: 1000 }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={`${alt}, press to squish`}
		>
			{/* Particle burst layer */}
			{particles.map((p) => {
				const tx = Math.cos(p.angle) * p.distance;
				const ty = Math.sin(p.angle) * p.distance;
				return (
					<motion.span
						key={p.id}
						className="absolute rounded-full pointer-events-none"
						style={{
							left: p.x,
							top: p.y,
							width: p.size,
							height: p.size,
							backgroundColor: p.color,
							translateX: "-50%",
							translateY: "-50%",
						}}
						initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
						animate={{
							opacity: 0,
							scale: 0,
							x: tx,
							y: ty,
						}}
						transition={{
							duration: 0.7 + Math.random() * 0.2,
							ease: [0.16, 1, 0.3, 1],
						}}
					/>
				);
			})}

			<motion.div
				className="w-full h-full rounded-full overflow-hidden shadow-[0_24px_80px_-20px_rgba(26,24,22,0.18)]"
				style={{
					rotateX,
					rotateY,
					x,
					y,
					transformStyle: "preserve-3d",
				}}
				animate={controls}
			>
				<motion.img
					src={src}
					alt={alt}
					className="w-full h-full object-cover pointer-events-none"
					whileHover={reducedMotion ? {} : { scale: 1.04 }}
					transition={{ type: "spring", stiffness: 200, damping: 20 }}
				/>
			</motion.div>

			{/* Subtle halo ring */}
			<motion.div
				className="absolute inset-0 rounded-full border border-(--color-line) -z-10"
				aria-hidden="true"
				initial={{ scale: 1 }}
				whileHover={reducedMotion ? {} : { scale: 1.08 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
			/>
		</button>
	);
}
