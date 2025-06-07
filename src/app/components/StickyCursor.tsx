'use client'
import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function StickyCursor() {
  const isMobile = useIsMobile()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLargeRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const cursorLargePos = useRef({ x: 0, y: 0 })
  const animationId = useRef<number | null>(null)

  // NEW: Ref to track the hover state and scale
  const hoverState = useRef({
    isHovering: false,
    scale: 1, // Current scale of the small cursor
    largeScale: 1, // Current scale of the large cursor
  })

  useEffect(() => {
    if (isMobile) return
    const cursor = cursorRef.current
    const cursorLarge = cursorLargeRef.current
    if (!cursor || !cursorLarge) return

    // Handle mouse movement with direct position tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // NEW: Handlers for entering and leaving hover-target elements
    const handleMouseEnter = () => {
      hoverState.current.isHovering = true
    }
    const handleMouseLeave = () => {
      hoverState.current.isHovering = false
    }

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // Small cursor follows quickly
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15

      // Large cursor follows more slowly and smoothly
      const dxLarge = mousePos.current.x - cursorLargePos.current.x
      const dyLarge = mousePos.current.y - cursorLargePos.current.y
      cursorLargePos.current.x += dxLarge * 0.04
      cursorLargePos.current.y += dyLarge * 0.04

      // Animate cursor size based on hover state
      const targetSize = hoverState.current.isHovering ? 48 : 16 // Target size in pixels
       const targetLargeScale = hoverState.current.isHovering ? 1.5 : 1 // Expand large cursor on hover

       // Smoothly interpolate the sizes
       hoverState.current.scale += (targetSize - hoverState.current.scale) * 0.15
       hoverState.current.largeScale += (targetLargeScale - hoverState.current.largeScale) * 0.15

       // Apply size and position directly
       const size = Math.round(hoverState.current.scale)
       cursor.style.width = `${size}px`
       cursor.style.height = `${size}px`
       cursor.style.transform = `translate3d(${cursorPos.current.x - size/2}px, ${
         cursorPos.current.y - size/2
       }px, 0)`

       const largeSize = 40 * hoverState.current.largeScale
       cursorLarge.style.width = `${largeSize}px`
       cursorLarge.style.height = `${largeSize}px`
       cursorLarge.style.transform = `translate3d(${cursorLargePos.current.x - largeSize/2}px, ${
         cursorLargePos.current.y - largeSize/2
       }px, 0)`

      animationId.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animate()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    // NEW: Add listeners to all elements that should trigger the hover effect
    const hoverTargets = document.querySelectorAll('.cursor-hover-target, nav button')
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', handleMouseEnter)
      target.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)

      // NEW: Clean up hover listeners
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', handleMouseEnter)
        target.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isMobile])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null
  }

  return (
    // Apply mix-blend-difference to the container like BottomBar does
    <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-difference">
      {/* Small filled cursor */}
       <div
         ref={cursorRef}
         className="fixed top-0 left-0 w-[16px] h-[16px] bg-white rounded-full pointer-events-none z-[99999] shadow-lg border border-black/20"
         style={{
           willChange: 'transform',
           transform: 'translate3d(0, 0, 0)',

           backfaceVisibility: 'hidden',
           perspective: '1000px',
           WebkitFontSmoothing: 'antialiased',
           WebkitTransformStyle: 'preserve-3d'
         }}
       />
       {/* Large outline cursor */}
       <div
         ref={cursorLargeRef}
         className="fixed top-0 left-0 w-[40px] h-[40px] border-2 border-white rounded-full pointer-events-none z-[99999] shadow-lg"
         style={{
           willChange: 'transform',
           transform: 'translate3d(0, 0, 0)',
           backfaceVisibility: 'hidden',
           perspective: '1000px',
           transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)',
           WebkitFontSmoothing: 'antialiased',
           WebkitTransformStyle: 'preserve-3d'
         }}
       />
    </div>
  )
}