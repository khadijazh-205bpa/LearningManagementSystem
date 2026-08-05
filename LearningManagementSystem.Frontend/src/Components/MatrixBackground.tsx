import { useEffect, useRef } from 'react'

function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const chars = '01アイウエオカキクケコ{}[]<>#$%&*+=;:'
        const fontSize = 16
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = new Array(columns).fill(1)

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 12, 0.08)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = '#ff3b3b'
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 40)

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: 0.25,
                pointerEvents: 'none',
            }}
        />
    )
}

export default MatrixBackground