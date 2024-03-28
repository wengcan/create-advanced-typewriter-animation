const cursor = Symbol("cursor")
const spaceAndSymbolRegex = /[\p{Z}\p{S}]/u;
const periodRegex = /[\p{P}.]/u;
enum TAG{
  DELAY =  "delay",
  TYPING = "typing",
  DELETE = "delete",
  MASK = "mask"
}
interface CursorRefs {
  [cursor]: HTMLElement;
  timer: number | null
}

interface GlobalRefs{
  timer: number | null;
  prevElement:  HTMLElement | null;
}
export function createTextEffect(
  container: HTMLElement
) {
  const cursorClassName = '__CTE_CUR'
  const cursorRefs: CursorRefs = {
    [cursor]: document.createElement('span'),
    timer: null
  }
  const globalRefs: GlobalRefs = {
    timer: null,
    prevElement: null
  }
  cursorRefs[cursor].className = cursorClassName
  cursorRefs[cursor].innerHTML = '|'
  let nodes: ChildNode[] | null = null;

  function addCursor(){
    container.appendChild(cursorRefs [cursor])
    cursorRefs.timer = setInterval(() => {
      cursorRefs[cursor].style.visibility = cursorRefs[cursor].style.visibility === 'hidden' ? 'visible' : 'hidden'
    }, 1000)
  }

  function hideCursor(){
    container.removeChild(cursorRefs[cursor])
    cursorRefs.timer && clearInterval(cursorRefs.timer)
  }

  function renderText(element: Element){
    container.appendChild(element)
  }
  function renderTyping(element: Element){
    globalRefs.prevElement = document.createElement('span')
    if (element.getAttribute('className')){
      globalRefs.prevElement.className += element.getAttribute('className')
    }
    container.appendChild(globalRefs.prevElement)
    const text = element.innerHTML
    const len = text.length
    if (len === 0){
      return
    }
    addCursor()
    const duration = element.getAttribute('duration') !== null ? parseInt(element.getAttribute('duration')!) / len :  100 
    const group = element.getAttribute('group')
    console.log(group)
    let textCur = 0
    cursorRefs.timer = setInterval(()=>{
      if (textCur >= len) {
        renderNext()
        hideCursor()
      } 
      if (
        (group === null ) || 
        (group === "words" && spaceAndSymbolRegex.test(text.charAt(textCur))) || 
        (group === "sentences" && periodRegex.test(text.charAt(textCur)))
      ){
        globalRefs.prevElement!.innerHTML = text.substring(0, textCur)
      } 

      textCur++
    },duration)
  }
  
  function renderDelte(element: Element){
    console.log(globalRefs.prevElement)
    renderNext()
  }

  function renderDelay(element: Element){
    const duration = element.getAttribute('duration') !== null ? parseInt(element.getAttribute('duration')!)  :  0 
    globalRefs.timer = setTimeout(renderNext,duration)
  }

  function renderNext(){
    if (nodes && nodes.length > 0){
      nodes.shift()
      setTimeout(renderByIndex,0)
    }
  }

  function renderByIndex(){ 
    if (nodes && nodes.length > 0){
      let current = nodes[0] as Element
      if (current.nodeType === Node.TEXT_NODE){
        renderText(current)
        renderNext()
      } else if (current.nodeType === Node.ELEMENT_NODE){
        const {tagName } = current
        switch (tagName) {
          case  TAG.TYPING:
            renderTyping(current)
            break;
          case TAG.DELAY:
            renderDelay(current)
            break;
          case TAG.DELETE:
            renderDelte(current)
            break;
        }
      }
    }
  }
  
  return {
    render: (template: string) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(template, "text/xml");
      let rootElement;
      for (let i = 0; i < xmlDoc.childNodes.length; i++) {
        const node = xmlDoc.childNodes[i];
        if (node.nodeType === 1) {
          rootElement = node;
          break;
        }
      }
      if (!rootElement) {
        console.error("Root element not found");
        return;
      }
      nodes =  Array.from(rootElement.childNodes);
      renderByIndex();
    }
  }
}