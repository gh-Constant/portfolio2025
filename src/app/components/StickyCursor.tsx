'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

export default function StickyCursor() {
  const isMobile = useIsMobile()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLargeRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const cursorLargePos = useRef({ x: 0, y: 0 })
  const animationId = useRef<number | null>(null)
  
  // Velocity tracking for inertia effect
  const velocity = useRef({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })

  // NEW: Ref to track the hover state and scale
  const hoverState = useRef({
    isHovering: false,
    scale: 1, // Current scale of the small cursor
    largeScale: 1, // Current scale of the large cursor
  })

  const pathname = usePathname()

  // Reset hover state when pathname changes
  useEffect(() => {
    hoverState.current.isHovering = false
  }, [pathname])

  useEffect(() => {
    if (isMobile) return
    const cursor = cursorRef.current
    const cursorLarge = cursorLargeRef.current
    if (!cursor || !cursorLarge) return

    // Handle mouse movement with velocity tracking for inertia
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity based on mouse movement
      velocity.current.x = (e.clientX - lastMousePos.current.x) * 0.5
      velocity.current.y = (e.clientY - lastMousePos.current.y) * 0.5
      
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // NEW: Handlers for entering and leaving hover-target elements
    const handleMouseEnter = () => {
      hoverState.current.isHovering = true
    }
    const handleMouseLeave = () => {
      hoverState.current.isHovering = false
    }

    // Store current hover targets to remove listeners later
    let currentHoverTargets: NodeListOf<Element> | null = null

    // Function to attach hover listeners to all current hover targets
    const attachHoverListeners = () => {
      // Remove existing listeners first
      if (currentHoverTargets) {
        currentHoverTargets.forEach((target) => {
          target.removeEventListener('mouseenter', handleMouseEnter)
          target.removeEventListener('mouseleave', handleMouseLeave)
        })
      }

      // Query for all current hover targets
      currentHoverTargets = document.querySelectorAll('.cursor-hover-target, nav button')
      
      // Add listeners to all current targets
      currentHoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', handleMouseEnter)
        target.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // Small cursor with inertia effect
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      
      // Apply velocity for inertia effect
      velocity.current.x *= 0.85 // Damping factor
      velocity.current.y *= 0.85
      
      // Combine direct movement with velocity-based inertia
      cursorPos.current.x += dx * 0.6 + velocity.current.x
      cursorPos.current.y += dy * 0.6 + velocity.current.y

      // Large cursor follows more quickly and smoothly
      const dxLarge = mousePos.current.x - cursorLargePos.current.x
      const dyLarge = mousePos.current.y - cursorLargePos.current.y
      cursorLargePos.current.x += dxLarge * 0.18
      cursorLargePos.current.y += dyLarge * 0.18

      // Animate cursor size based on hover state with faster response
      const targetSize = hoverState.current.isHovering ? 48 : 16 // Target size in pixels
       const targetLargeScale = hoverState.current.isHovering ? 1.5 : 1 // Expand large cursor on hover

       // Smoothly interpolate the sizes with faster animation
       hoverState.current.scale += (targetSize - hoverState.current.scale) * 0.25
       hoverState.current.largeScale += (targetLargeScale - hoverState.current.largeScale) * 0.25

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

    // Initial attachment of hover listeners
    attachHoverListeners()

    // Set up MutationObserver to detect DOM changes and re-attach listeners
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false
      
      mutations.forEach((mutation) => {
        // Check if any added nodes contain hover targets
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              // Check if the added element or its children have cursor-hover-target class
              if (element.classList?.contains('cursor-hover-target') || 
                  element.querySelector?.('.cursor-hover-target')) {
                shouldReattach = true
              }
            }
          })
        }
      })
      
      if (shouldReattach) {
        // Small delay to ensure DOM is fully updated
        setTimeout(attachHoverListeners, 10)
      }
    })

    // Start observing DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()

      // Clean up hover listeners
      if (currentHoverTargets) {
        currentHoverTargets.forEach((target) => {
          target.removeEventListener('mouseenter', handleMouseEnter)
          target.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
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