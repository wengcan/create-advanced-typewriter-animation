type ControlsImpl = {
    pause(): void;
    resume(): void;
}

type IntervalInstance = {
    load(callback: Function, interval: number): void;
    clear(): void;
    pause(): void;
    resume(): void;
}


type GlobalControls<T extends ControlsImpl> = {
    paused: boolean;
    effectObjs: T[]
}

type CursorRefs = { 
    cursor?: HTMLElement;
    show?: boolean;
    interval: IntervalInstance;
}


type GlobalRefs = {
    doc?: HTMLElement;
    interval: IntervalInstance;
    nodeCur: number;
}

type CurrentRefs = {
    doc?: HTMLElement;
    node: number;
    text: number;
}


interface WritingBase{
    tagName: string;
}

interface WritingDelay extends WritingBase {
    delay: number;
}

interface WritingDelete extends WritingBase {
    delay: number;
    count: number;
}

interface WritingMoveCursor extends WritingBase {
    mode: string;
    delay: number;
    count: number;
}

interface WritingDelete extends WritingBase{
    delay: number;
    count: number;
}


interface WritingTypewriter extends WritingBase {
    className: string;
    mode: string;
    delay: number;
    text: string[];
}
type WritingMask =  WritingTypewriter & {color: string}
type SupportNode = WritingBase | WritingMask | WritingTypewriter |  WritingMoveCursor | WritingDelete | WritingDelay;
type WritingProps = {
    infinity: string;
    nodes:  SupportNode[];
    cb?: (id: number) => void;
}