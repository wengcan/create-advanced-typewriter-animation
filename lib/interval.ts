export function intervalInstance(): IntervalInstance {
    let _callback: Function | null = null;
    let _interval: number | null = null;
    let _timerId: number | null = null;
    let _prevTime = 0;
    let _elapsed = 0;
    let isActive = false;
    function loop(currentTime: number) {
        const deltaTime = currentTime - _prevTime;
        _prevTime = currentTime;
        _elapsed += deltaTime;
        while (_elapsed >= _interval!) { 
            _callback && _callback();
            _elapsed -= _interval!;
        } 

        if (isActive) {
            _timerId = requestAnimationFrame(loop);
        }
    }

    function clear(){
        if (_timerId !== null) {
            cancelAnimationFrame(_timerId);
            _timerId = null;
            isActive = false;
        }
    }

    return {
        load(callback: Function, interval: number) {
            if (typeof callback !== 'function' || interval <= 0) {
                throw new Error('Invalid arguments');
            }
            if (!isActive) {
                isActive = true;
                _callback = callback;
                _interval = interval;
                _elapsed = 0;
                _prevTime = performance.now(); 
                _timerId = requestAnimationFrame(loop);
            }
        },
        clear,
        pause: clear,
        resume() {
            if (!isActive && _callback && _interval) {
                _timerId = requestAnimationFrame(loop);
                isActive = true;
            }
        }
    };
}
