import './style.css'

import createAdvancedTypingAnimation from '../../lib'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="demos">
    <p class="demo container"></p>
    <p class="demo container2"></p>
    <p class="demo container3"></p>
    <p class="demo container4"></p>
    <p class="demo container5"></p>
  </div>
`
createAdvancedTypingAnimation(
  document.querySelector<HTMLDivElement>('.container')!, 
  `<writing infinity="true">
      <cursor />
      <typewriter speed='8' mode="0">
        简单灵活的打字动画插件，原生
      </typewriter >    
      <typewriter speed='8' mode="0">
        JS打造
      </typewriter > 
      <moveCursor duration='0.2' mode='0' count='2'/>
      <delete duration='0.6' count='2'/>
      <typewriter speed='8' className="text-hightlight" mode="0">
        JavaScript
      </typewriter >   
      <moveCursor duration='0.2' mode='1' count='3'/>
      <typewriter speed='8' mode="0">
        ,简单配置，纵享丝滑。
      </typewriter >  
      <delay duration='2'/>                          
  </writing>
  `
)

createAdvancedTypingAnimation(document.querySelector<HTMLDivElement>('.container2')!, `
  <writing infinity="true">
    <cursor />
    <typewriter duration='10' mode="1">
    a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
    </typewriter>
  </writing>
`)
createAdvancedTypingAnimation(document.querySelector<HTMLDivElement>('.container3')!, `
  <writing infinity="true">
    <cursor />
    <typewriter duration='10' mode="0">
    a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
    </typewriter>
  </writing>
`)
createAdvancedTypingAnimation(document.querySelector<HTMLDivElement>('.container4')!, `
  <writing>
    <mask duration='10' mode="0">
    a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
    </mask>
  </writing>
`)

createAdvancedTypingAnimation(document.querySelector<HTMLDivElement>('.container5')!, `
  <writing>
    <mask duration='5' color='linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)' mode="1">
    a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
    </mask>  
  </writing>
`)