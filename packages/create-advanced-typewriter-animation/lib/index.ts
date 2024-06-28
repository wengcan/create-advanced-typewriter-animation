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
    
    return function(container: HTMLElement, template: string, callback?: (index: number) => void ){
        if(container == null || containers.has(container)){
            return
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(template, "application/xml");
        const errorNode = xmlDoc.querySelector("parsererror");
        if (!errorNode && xmlDoc.childNodes.length > 0 && xmlDoc.childNodes[0]!.nodeType === 1) {
            const rootNode = xmlDoc.childNodes[0] as ChildNode
            containers.add(container)
            const nodeName = rootNode.nodeName
            if (nodeName === "writing"){
                let props: WritingProps | null = convertWritingNode(rootNode as Element);
                const _props = {
                    ...props!,
                    cb: callback
                }
                props = null
                const writing = new Writing( container, _props)
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