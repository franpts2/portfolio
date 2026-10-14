import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

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

export function ParticleBurst() {
	const reducedMotion = useReducedMotion();
	const [particles, setParticles] = useState<readonly Particle[]>([]);
	const particleId = useRef(0);

	const spawnParticles = useCallback(
		(originX: number, originY: number) => {
			if (reducedMotion) return;
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
		},
		[reducedMotion],
	);

	useEffect(() => {
		const handler = (e: Event) => {
			const { originX, originY } = (e as CustomEvent).detail;
			spawnParticles(originX, originY);
		};
		window.addEventListener("squishy-spawn", handler);
		return () => window.removeEventListener("squishy-spawn", handler);
	}, [spawnParticles]);

	return (
		<>
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
		</>
	);
}
