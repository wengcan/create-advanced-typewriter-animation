import React from 'react'
import createAdvancedTypingAnimation from '../../../dist/esm/bundle'
export default function useCreateAdvanceEffect(template){
    const ref = React.useRef()

    React.useEffect(()=>{
        if (ref.current && template){
            createAdvancedTypingAnimation(ref.current, template)  
        }
    },[ref, template])

    return [ref]
}

