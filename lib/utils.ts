declare global {
    interface Intl {
      Segmenter: any; 
    }
}
enum SupportMode {
    CBC = "0", // character by character
    WBW = "1", // word by word
    SBS = "2", // sentence by sentence
    WP = "3", // whole paragraph
}

const getAttributes = <T extends Record<string, any>, K extends keyof T = keyof T>(node: Element, attributes: K[]): T => {
    return attributes.reduce((prev, current) => {
        const attr = node.getAttribute(current as string);
        prev[current] = attr as T[K];
        return prev;
    }, {} as T);
};


const prepareText = (textContent: string, mode: SupportMode): string[] => {
    let res: string[] = []
    if (!textContent || textContent === ""){
        return res
    }
    if (mode === SupportMode.WBW){
        res =  textContent!.trim().split(/\b/)
    } else if (mode === SupportMode.SBS){
        res = textContent!.trim().split(/([\p{P}\p{S}]+)/u);
    } else {
        res = Array.from(textContent!.trim()) 
    }
    return res;
}


const convertWritingNode = (node: Element): WritingProps  =>  {
    const nodes: SupportNode[] = []
    for(let i = 0; i < node.childNodes.length; i++){
        const current = node.childNodes[i] as Element;
        if (current.nodeType === Node.TEXT_NODE && (current.textContent!.trim() === '' || current.textContent!.trim() === '\n')){
            continue
        }
        const attrs = getAttributes<{
            className: string;
            mode: string;
            duration: string;
            speed: string;
            count: string;
            color: string;
        }>(current, ["className", "duration", "speed","mode","count", "color"])
        const tagName = current.tagName
        const _speed = parseInt(attrs.speed)
        const _duration = parseFloat(attrs.duration)
        // base nodes
        if ( ["hideCursor", "cursor", "clear"].indexOf(tagName) >=0 ){
            const node: WritingBase = {tagName}
            nodes.push(node)
            continue
        }

        if (["delay", "moveCursor", "delete"].indexOf(tagName) !== -1) {
            if (!_duration || isNaN(_duration)) {
                continue;
            }
        
            if (tagName === "delay") {
                const node: WritingDelay = {
                    tagName,
                    delay: 1000 * _duration 
                };
                nodes.push(node);
                continue;
            }
        
            let _count = parseInt(attrs.count);
        
            if (!isNaN(_count) && _count > 0) {
                let node: WritingDelete | WritingMoveCursor;
        
                if (tagName === "delete") {
                    node = {
                        tagName,
                        count: _count,
                        delay: 1000 * _duration / _count
                    };
                } else {
                    node = {
                        tagName,
                        mode: ["0", "1"].indexOf(attrs.mode) !== -1 ? attrs.mode : "0",
                        count: _count,
                        delay: 1000 * _duration / _count
                    };
                }
        
                nodes.push(node);
            }
            continue;
        }
        

        let delay = 1  
        let text: string[] = []

        text = prepareText(current.textContent!, attrs.mode as SupportMode)
        if(attrs.duration && !Number.isNaN(_duration)){
            delay = _duration / text.length
        } else if(attrs.speed && !Number.isNaN(_speed)){
            delay = 1 / _speed
        }

        if (tagName === "mask"){
            nodes.push({
                tagName: tagName,
                className: attrs.className,
                mode: attrs.mode,
                delay: delay * 1000,
                text: text,
                color: attrs.color
            })
        } else {
            nodes.push({
                tagName: tagName,
                className: attrs.className,
                mode: attrs.mode,
                delay: delay * 1000,
                text: text
            })
        }
    }

    return {
        ...getAttributes<Pick<WritingProps, "infinity">>(node, ["infinity"]),
        nodes
    }
}

export {convertWritingNode}
