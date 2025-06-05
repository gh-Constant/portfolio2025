# Custom Cursor Implementation

This project includes a custom cursor component built with Framer Motion that replaces the default browser cursor with a smooth, animated alternative.

## Features

- **Smooth Animation**: Uses Framer Motion's `useSpring` for fluid cursor movement
- **Interactive Feedback**: Cursor scales and changes opacity when hovering over interactive elements
- **Performance Optimized**: Uses `useCallback` and `useMotionValue` to prevent unnecessary re-renders
- **Blend Mode**: Uses `mix-blend-difference` for better visibility across different backgrounds
- **TypeScript Support**: Fully typed with proper interfaces

## Implementation Details

### Core Technologies
- **Framer Motion**: For smooth animations and spring physics
- **React Hooks**: `useEffect`, `useState`, `useCallback` for state management
- **Motion Values**: `useMotionValue` and `useSpring` for performance optimization

### Key Components

#### StickyCursor Component
Location: `src/app/components/StickyCursor.tsx`

**Props:**
- `stickyElement?: HTMLElement | null` - Optional element for sticky behavior (future enhancement)

**Features:**
- Tracks mouse movement with smooth spring animation
- Automatically detects interactive elements (buttons, links, inputs)
- Scales up (1.5x) and reduces opacity (0.8) on hover
- Uses `mix-blend-difference` for visibility

### Configuration

#### Spring Physics
```typescript
const smoothOptions = {
  damping: 20,      // Controls bounce/oscillation
  stiffness: 300,   // Controls responsiveness
  mass: 0.5         // Controls inertia
};
```

#### Interactive Elements
The cursor automatically detects these elements for hover effects:
- `a` (links)
- `button` (buttons)
- `[role="button"]` (ARIA buttons)
- `input, textarea, select` (form elements)
- `.cursor-pointer` (custom class)

## Usage

### Basic Implementation
```tsx
import StickyCursor from './components/StickyCursor';

export default function App() {
  return (
    <div>
      <StickyCursor />
      {/* Your app content */}
    </div>
  );
}
```

### CSS Requirements
The default cursor is hidden globally:
```css
* {
  cursor: none; /* Hide default cursor */
}
```

## Customization

### Cursor Size
Modify the `cursorSize` constant in the component:
```typescript
const cursorSize = 15; // Change this value
```

### Animation Settings
Adjust spring physics in `smoothOptions`:
- **Higher damping**: Less bouncy, more controlled
- **Higher stiffness**: More responsive, snappier
- **Higher mass**: More inertia, slower to start/stop

### Hover Effects
Customize hover animation in the `animate` prop:
```typescript
animate={{
  scale: isHovering ? 2.0 : 1,     // Increase scale
  opacity: isHovering ? 0.5 : 1,   // Adjust opacity
}}
```

### Styling
Modify the cursor appearance with Tailwind classes:
```typescript
className="fixed w-[20px] h-[20px] bg-blue-500 rounded-full pointer-events-none"
```

## Performance Considerations

1. **useMotionValue**: Prevents component re-renders on mouse movement
2. **useCallback**: Memoizes event handlers to prevent unnecessary re-creation
3. **Spring Animation**: Hardware-accelerated transforms for smooth performance
4. **Event Delegation**: Efficient handling of interactive element detection

## Browser Compatibility

- Modern browsers with CSS `mix-blend-mode` support
- Requires JavaScript enabled
- Fallback: Default cursor if component fails to load

## Future Enhancements

- Sticky cursor behavior for specific elements
- Different cursor styles for different content types
- Magnetic effect for buttons
- Trail effect following the cursor
- Custom cursor shapes/icons

## Troubleshooting

### Cursor Not Visible
- Check if `cursor: none` is applied globally
- Verify z-index is high enough (`z-50`)
- Ensure component is rendered at the top level

### Performance Issues
- Reduce spring stiffness
- Increase damping
- Check for memory leaks in event listeners

### Interactive Elements Not Detected
- Add `.cursor-pointer` class to custom interactive elements
- Ensure proper ARIA roles are set
- Check if elements are dynamically added after component mount