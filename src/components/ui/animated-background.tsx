"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Large 3D Gradient Orbs with Depth */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)",
                    filter: "blur(80px)",
                    boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2), inset 0 0 80px rgba(147, 51, 234, 0.1)",
                }}
                animate={{
                    x: [0, 120, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/2 right-1/3 w-[450px] h-[450px] rounded-full"
                style={{
                    background: "linear-gradient(225deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.12) 100%)",
                    filter: "blur(90px)",
                    boxShadow: "0 25px 70px rgba(168, 85, 247, 0.15), inset 0 0 90px rgba(59, 130, 246, 0.08)",
                }}
                animate={{
                    x: [0, -100, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-1/2 w-[380px] h-[380px] rounded-full"
                style={{
                    background: "linear-gradient(315deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)",
                    filter: "blur(70px)",
                    boxShadow: "0 15px 50px rgba(34, 211, 238, 0.2), inset 0 0 70px rgba(59, 130, 246, 0.1)",
                }}
                animate={{
                    x: [0, 70, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6,
                }}
            />

            {/* 3D Floating Cubes with Perspective */}
            <motion.div
                className="absolute top-1/3 right-1/4 w-40 h-40 rounded-2xl backdrop-blur-sm"
                style={{
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.12) 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    boxShadow: `
            0 10px 30px -5px rgba(99, 102, 241, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            10px 10px 40px rgba(168, 85, 247, 0.15)
          `,
                    transform: "translateZ(0)",
                }}
                animate={{
                    rotateX: [0, 15, 0],
                    rotateY: [0, 25, 0],
                    rotateZ: [0, 10, 0],
                    x: [0, 50, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/3 left-1/5 w-32 h-32 rounded-xl backdrop-blur-sm"
                style={{
                    background: "linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.08) 100%)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    boxShadow: `
            0 8px 25px -3px rgba(59, 130, 246, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset,
            -8px 8px 35px rgba(34, 211, 238, 0.2)
          `,
                    transform: "translateZ(0)",
                }}
                animate={{
                    rotateX: [0, -20, 0],
                    rotateY: [0, -30, 0],
                    rotateZ: [0, -15, 0],
                    x: [0, -35, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            <motion.div
                className="absolute top-2/3 right-1/3 w-28 h-28 rounded-lg backdrop-blur-sm"
                style={{
                    background: "linear-gradient(315deg, rgba(168, 85, 247, 0.09) 0%, rgba(99, 102, 241, 0.11) 100%)",
                    border: "1px solid rgba(168, 85, 247, 0.22)",
                    boxShadow: `
            0 12px 28px -4px rgba(168, 85, 247, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.12) inset,
            12px -12px 38px rgba(99, 102, 241, 0.18)
          `,
                    transform: "translateZ(0)",
                }}
                animate={{
                    rotateX: [0, 25, 0],
                    rotateY: [0, 35, 0],
                    rotateZ: [0, 20, 0],
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 7,
                }}
            />

            {/* Smaller Accent Spheres for Depth */}
            <motion.div
                className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full"
                style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.25), rgba(59, 130, 246, 0.15))",
                    boxShadow: "0 4px 15px rgba(34, 211, 238, 0.4), inset -2px -2px 8px rgba(59, 130, 246, 0.3)",
                }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute bottom-1/2 right-1/4 w-12 h-12 rounded-full"
                style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(168, 85, 247, 0.3), rgba(99, 102, 241, 0.18))",
                    boxShadow: "0 3px 12px rgba(168, 85, 247, 0.45), inset -1px -1px 6px rgba(99, 102, 241, 0.35)",
                }}
                animate={{
                    x: [0, -20, 0],
                    y: [0, 35, 0],
                    scale: [1, 1.4, 1],
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    )
}
