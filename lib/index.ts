import Writing from "./writing"
import {convertWritingNode} from './utils'

type globalControlsType = GlobalControls<ControlsImpl>
const createAdvancedTypingAnimation = (function(){
    let containers = new Set<HTMLElement>()
    let globalControls: globalControlsType = {
        paused: false,
        effectObjs: []
    }
    let controlsProxyHandler: ProxyHandler<typeof globalControls> = {
        set: function(obj, prop, value) {
            if (prop === 'paused') {
                obj.effectObjs.forEach(current => {
                    Reflect.apply( value ? current.pause : current.resume, current, []);
                })
            }
            obj[prop as keyof globalControlsType] = value;
            return true;
        }
    };
    
    return function(container: HTMLElement, template: string){
        if(container == null || containers.has(container)){
            return
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(template, "application/xml");
        const errorNode = xmlDoc.querySelector("parsererror");
        if (!errorNode && xmlDoc.childNodes[0].nodeType === 1) {
            const rootNode = xmlDoc.childNodes[0]
            containers.add(container)
            const nodeName = rootNode.nodeName
            if (nodeName === "writing"){
                const props = convertWritingNode(rootNode as Element)
                const writing = new Writing( container, props)
                globalControls.effectObjs.push(writing)
            }
        } else {
            console.error(errorNode)
            return;
        }
        let proxyClobalControls = new Proxy(globalControls, controlsProxyHandler);
        return {
            toggleLoop(){
                proxyClobalControls.paused = !proxyClobalControls.paused
            },
            destroy(){
                containers.clear()
            }
        }
    }

})()

export default createAdvancedTypingAnimation