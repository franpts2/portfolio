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
    // array to track which tapes are still attached
    const [attachedTapes, setAttachedTapes] = useState([1, 2, 3, 4]);
    const isFalling = attachedTapes.length === 0;

    const handlePeel = (id: number) => {
        setAttachedTapes((prev) => prev.filter((t) => t !== id));
    };

    return (
        <div className={`relative inline-block ${className}`} style={{ perspective: "1000px" }}>
            <motion.div
                // falling animation
                animate={isFalling ? {
                    y: "70vh",       // drops to near bottom
                    rotate: 12,      // natural tilt during fall
                    scale: 0.95,     // slight perspective shrink
                    opacity: 0.9,    // subtle fade
                } : {
                    rotate: 1        // default subtle tilt
                }}
                transition={{
                    type: "spring",
                    stiffness: 40,   // low stiffness for "heavy" feel
                    damping: 10,     // low damping for a slight bounce at the floor
                    mass: 2,         // adds a sense of weight
                }}
                className="relative bg-white p-4 shadow-xl ease-out"
            >
                {/* Tapes */}
                <TapePiece id={1} isVisible={attachedTapes.includes(1)} onPeel={handlePeel} positionClass="-top-3 -left-8" rotation="-rotate-[25deg]" />
                <TapePiece id={2} isVisible={attachedTapes.includes(2)} onPeel={handlePeel} positionClass="-top-4 -right-6" rotation="rotate-[15deg]" />
                <TapePiece id={3} isVisible={attachedTapes.includes(3)} onPeel={handlePeel} positionClass="-bottom-3 -left-6" rotation="rotate-[10deg]" />
                <TapePiece id={4} isVisible={attachedTapes.includes(4)} onPeel={handlePeel} positionClass="-bottom-4 -right-8" rotation="-rotate-[30deg]" />

                <div className="overflow-hidden bg-gray-100 filter contrast-[1.05] sepia-[.1]">
                    <img src={imageSrc} alt={altText} className="block max-w-full h-auto object-cover grayscale-[0.2]" />
                </div>
            </motion.div>
        </div>
    );
};

export default TapeFrame;