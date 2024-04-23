import {intervalInstance} from './interval';
class Writing implements ControlsImpl {
    container: HTMLElement;
    props: WritingProps;
    cursorRefs: CursorRefs = {
        interval: intervalInstance(),
        show: false
    };
    globalRefs: GlobalRefs =  {
        interval: intervalInstance(),
        nodeCur: 0
    };

    constructor(container: HTMLElement, props: WritingProps){
        this.container = container
        this.props =  props
        this.continueAction()
    }

    pause(){
        this.globalRefs.interval.pause()
    }
    resume(){
        this.globalRefs.interval.resume()
    }
    continueAction(skipCurrent?: boolean): void {
        if (skipCurrent){
            this.globalRefs.nodeCur += 1
        }
        if (this.props.infinity === "true" && this.globalRefs.nodeCur >= this.props.nodes.length){
            this.globalRefs.nodeCur = 0
            this.handleClear()
        }

        if (this.globalRefs.nodeCur < this.props.nodes.length){
            this.props.cb?.(this.globalRefs.nodeCur);
            this.nextAction()
        }


    }

    private nextAction(){
        const current = this.props.nodes[this.globalRefs.nodeCur]
        switch(current.tagName){
            case 'cursor':
                this.showCursor()
                this.continueAction(true)
                break
            case 'hideCursor':
                this.hideCursor()
                this.continueAction(true)
                break
            case 'clear':
                this.handleClear()
                this.continueAction(true)
                break
            case 'delay':
                this.handleDelay(current as WritingDelay)
                break
            case 'moveCursor':
                this.handleMoveCursor(current as WritingMoveCursor)
                break
            case 'delete':
                this.handleDelete(current as WritingDelete)
                break
            case 'typewriter':
                this.renderTypewriter(current as WritingTypewriter)
                break
            case 'mask':
                this.renderMask(current as WritingMask)
                break;
            default:
                break
        }
    }

    private addNewDoc(doc: HTMLElement){
        if(this.cursorRefs?.show && this.cursorRefs.cursor?.parentNode){
            this.cursorRefs.cursor?.parentNode?.insertBefore(doc, this.cursorRefs.cursor)
        } else {
            this.container.appendChild(doc)
        }
    }


    private moveCurBackward(cur: Node) {
        let temp = cur;

        while (!temp.previousSibling && temp.parentNode !== this.container) {
            temp = temp.parentNode!;
        }
        if (temp.previousSibling) {
            temp = temp.previousSibling;
        } else {
            if (temp.parentNode) {
                temp.parentNode.insertBefore(cur, temp);
                return; 
            }
        }
    
        while (temp.lastChild) {
            temp = temp.lastChild;
        }
    
  
        if (temp.parentNode) {
            temp.parentNode.insertBefore(cur, temp);
        }
    }

    private moveCurForward(cur: Node) {
        let temp = cur;
    
        while (!temp.nextSibling && temp.parentNode !== this.container) {
            temp = temp.parentNode!;
        }

        if (temp.nextSibling) {
            temp = temp.nextSibling;
        } else {
            if (temp.parentNode) {
                temp.parentNode.appendChild(cur);
                return; 
            }
        }
    
        while (temp.firstChild) {
            temp = temp.firstChild;
        }
    
        if (temp.parentNode) {
            temp.parentNode.insertBefore(cur, temp.nextSibling);
        }
    }
    private deleteContentInFront(cur: Node) {
        this.moveCurBackward(cur)
        const itemToDelete = cur.nextSibling;
        itemToDelete?.parentNode?.removeChild(itemToDelete)
        const tempNode = cur.parentNode
        if( tempNode?.childNodes.length === 1 && tempNode?.childNodes[0] === cur){
            tempNode.parentNode?.insertBefore(cur, tempNode)
            tempNode.parentNode?.removeChild(tempNode)
        }
    }


    private handleMoveCursor(node: WritingMoveCursor){
        if ( !this.cursorRefs?.show ){
            return
        }

        const cur = this.cursorRefs.cursor
        let _count = 0
        this.globalRefs.interval.load(()=>{
            if( _count >= node.count ){
                this.globalRefs.interval.clear()
                this.continueAction(true)
                return
            }
            if(cur){
                node.mode === "0" && this.moveCurBackward(cur)
                node.mode === "1" && this.moveCurForward(cur)
            }
            _count++
        },node.delay)
    }
    private handleDelete(node: WritingDelete){
        if ( !this.cursorRefs?.show ){
            return
        }
        const cur = this.cursorRefs.cursor
        let _count = 0
        this.globalRefs.interval.load(()=>{
            if( _count >= node.count ){
                this.globalRefs.interval.clear()
                this.continueAction(true)
                return
            }
            if (cur) {
                this.deleteContentInFront(cur)
            }
            _count++
        }, node.delay)
    }
    private handleDelay(node: WritingDelay){  
        this.globalRefs.interval.load(()=>{
            this.globalRefs.interval.clear()
            this.continueAction(true)
        }, node.delay)
    }
    private handleClear(){
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        if(this.cursorRefs.show){
            this.cursorRefs.cursor && this.container.appendChild(this.cursorRefs.cursor)
        } else {
            this.cursorRefs.cursor?.remove()
        }
    }
    private hideCursor(){
        this.cursorRefs.interval.clear()
        if (this.cursorRefs.cursor) {
            this.cursorRefs.cursor.style.display = "none";
        }
        this.cursorRefs.show = false
    }
    private showCursor(){
        if( !this.cursorRefs?.cursor ){
            const cursor = document.createElement("span")
            cursor.innerHTML = "|"
            cursor.className = "_a_cursor"
            this.cursorRefs.cursor = cursor
        }
        this.cursorRefs.cursor.style.display = ""
        this.cursorRefs.show = true
        this.cursorRefs.interval.load(()=>{
            this.cursorRefs!.cursor!.style.visibility = (
                this.cursorRefs.cursor!.style.visibility === 'hidden' ? 'visible' : 'hidden'
            )
        }, 600)
    }

    private renderTypewriter(node: WritingTypewriter){
        if(!this.globalRefs.doc){
            const doc = document.createElement("span")
            doc.className = node.className || "";
            this.globalRefs.doc =  doc
            this.addNewDoc(doc)
        }
        let _count = 0 
        this.globalRefs.interval.load(()=>{
            if( _count >= node.text.length){
                this.globalRefs.interval.clear()
                const cp = this.cursorRefs?.cursor?.parentNode
                cp?.parentNode?.insertBefore(this.cursorRefs?.cursor!,cp.nextSibling)
                delete this.globalRefs.doc
                this.continueAction(true)
            } else {
                const textEle = document.createTextNode(node.text[_count])
                this.globalRefs.doc!.appendChild(textEle)
                this.cursorRefs?.show && this.cursorRefs?.cursor && this.globalRefs.doc!.insertBefore(
                    this.cursorRefs?.cursor, 
                    textEle.nextSibling
                )
                _count++
            }
        }, node.delay)
    }
    private renderMask(node: WritingMask){
        let nodes: HTMLElement[] = [];
        const fragment = new DocumentFragment();
        const maskRoot = document.createElement("span")
        for (let k = 0; k < 3; k++) {
            let doc = document.createElement("span")
            fragment.appendChild(doc)
            nodes.push(doc);
        }
        let textNodes = node.text.map(item=>{
            return document.createTextNode(item)
        })
        const tempNode =  fragment.childNodes[1] as HTMLElement
        tempNode.style.background = node.color || "red";
        tempNode.style.backgroundClip = "text";
        tempNode.style.color = "transparent";
        this.addNewDoc(maskRoot)
        maskRoot.appendChild(fragment)
        this.hideCursor()
        let start = 0
        let _count = 0
        this.globalRefs.interval.load(()=>{
            if (_count > node.text.length) {
                this.globalRefs.interval.clear()
                maskRoot.removeChild(nodes[2])
                textNodes = []
                if (nodes[0].innerText === ""){
                    maskRoot.removeChild(nodes[0])
                }
                this.showCursor()
                this.continueAction(true)
                return
            }
            let arr = [0, start, _count, node.text.length]
            for (let k = 0; k < 3; k++) {
                if (nodes[k]) {
                    textNodes.slice(arr[k], arr[k+1]).forEach(item=>{
                        nodes[k].appendChild(item)
                    })
                }
            }
            _count++
        }, node.delay)
    }
}

export default Writing