import React, { useState } from "react";
import { motion } from "framer-motion";
import TapePiece from "./TapePiece.tsx";

interface TapeFrameProps {
    imageSrc: string;
    altText?: string;
    className?: string;
}

const TapeFrame: React.FC<TapeFrameProps> = ({
    imageSrc,
    altText = "Framed image",
    className = "",
}) => {
    const [attachedTapes, setAttachedTapes] = useState([1, 2, 3, 4]);
    const isFalling = attachedTapes.length === 0;

    const handlePeel = (id: number) => {
        setAttachedTapes((prev) => prev.filter((t) => t !== id));
    };

    return (
        <div className={`relative inline-block ${className}`} style={{ perspective: "1000px" }}>
            {/* container handles the vertical gravity (y position) */}
            <motion.div
                animate={isFalling ? { y: "75vh" } : { y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 10,
                    mass: 2,
                }}
                className="relative flex items-center"
            >
                {/* photo frame */}
                <motion.div
                    animate={isFalling ? { rotate: 12, scale: 0.95 } : { rotate: 1 }}
                    transition={{ type: "spring", stiffness: 40 }}
                    className="relative bg-white p-4 shadow-xl"
                >
                    <TapePiece id={1} isVisible={attachedTapes.includes(1)} onPeel={handlePeel} positionClass="-top-3 -left-8" rotation="-rotate-[25deg]" />
                    <TapePiece id={2} isVisible={attachedTapes.includes(2)} onPeel={handlePeel} positionClass="-top-4 -right-6" rotation="rotate-[15deg]" />
                    <TapePiece id={3} isVisible={attachedTapes.includes(3)} onPeel={handlePeel} positionClass="-bottom-3 -left-6" rotation="rotate-[10deg]" />
                    <TapePiece id={4} isVisible={attachedTapes.includes(4)} onPeel={handlePeel} positionClass="-bottom-4 -right-8" rotation="-rotate-[30deg]" />

                    <div className="overflow-hidden bg-gray-100 filter contrast-[1.05] sepia-[.1]">
                        <img src={imageSrc} alt={altText} className="block max-w-full h-auto object-cover grayscale-[0.2]" />
                    </div>
                </motion.div>

                {/* secret message*/}
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={isFalling ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute left-full ml-6 text-secondary font-medium whitespace-nowrap pointer-events-none"
                    style={{ rotate: 0 }} // forces horizontal even if parent tilts
                >
                    Oops! Dropped me!
                </motion.span>
            </motion.div>
        </div>
    );
};

export default TapeFrame;