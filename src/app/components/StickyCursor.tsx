'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function StickyCursor() {
  const isMobile = useIsMobile()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLargeRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const cursorLargePos = useRef({ x: 0, y: 0 })
  const animationId = useRef<number>()

  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const cursorLarge = cursorLargeRef.current
    if (!cursor || !cursorLarge) return

    // Handle mouse movement with direct position tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
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

      // Apply transforms directly to DOM for maximum performance
      cursor.style.transform = `translate3d(${cursorPos.current.x - 8}px, ${cursorPos.current.y - 8}px, 0)`
      cursorLarge.style.transform = `translate3d(${cursorLargePos.current.x - 20}px, ${cursorLargePos.current.y - 20}px, 0)`

      animationId.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animate()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Small filled cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-black rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          willChange: 'transform',
        }}
      />
      {/* Large outline cursor */}
      <div
        ref={cursorLargeRef}
        className="fixed w-10 h-10 border border-black rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  )
}