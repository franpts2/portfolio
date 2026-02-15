import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../ThemeProvider.tsx";

interface TapePieceProps {
    positionClass: string;
    rotation: string;
}

const TapePiece: React.FC<TapePieceProps> = ({ positionClass, rotation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const { isDark } = useContext(ThemeContext);

    // realistic masking tape colors
    const tapeColor = isDark ? "#eee2c8" : "#d1bc91";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{
                        rotateX: 45,
                        rotateZ: 10,
                        y: -20,
                        x: 10,
                        opacity: 0,
                        scale: 1.05,
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                    onClick={() => setIsVisible(false)}
                    
                    className={`
                        absolute z-20 h-8 w-24 
                        shadow-sm drop-shadow-md 
                        mix-blend-multiply cursor-pointer
                        ${positionClass} ${rotation}
                    `}
                    style={{
                        backgroundColor: tapeColor, // Applied dynamically
                        transformOrigin: "bottom right",
                        clipPath:
                            "polygon(0% 10%, 5% 0%, 95% 5%, 100% 0%, 100% 90%, 95% 100%, 5% 95%, 0% 100%)",
                        backgroundImage: `
                            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
                        `,
                    }}
                />
            )}
        </AnimatePresence>
    );
};

export default TapePiece;