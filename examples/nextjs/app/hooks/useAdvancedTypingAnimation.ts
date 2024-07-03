import React from 'react'
import createAdvancedTypingAnimation from 'create-advanced-typewriter-animation'

export default function useCreateAdvanceEffect<T extends HTMLElement>(template: any): [React.MutableRefObject<T | null>] {
    const ref = React.useRef<T | null>(null);
  
    React.useEffect(() => {
      if (ref.current && template) {
        createAdvancedTypingAnimation(ref.current, template);
      }
    }, [template]);
  
    return [ref];
  }