import './App.css'
import useAdvancedTypingAnimation from "./useAdvancedTypingAnimation"

function App() {
  const [ref] = useAdvancedTypingAnimation(`
    <writing infinity="true">
        <cursor />
        <typewriter duration='10' mode="1">
        a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
        </typewriter>
    </writing>
  `)
  return (
    <>
      <div ref={ref}/>
    </>
  )
}

export default App
