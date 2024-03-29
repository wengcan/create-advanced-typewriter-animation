export function intervalInstance(): IntervalInstance {
    let _callback: Function | null = null;
    let _interval: number | null = null;
    let _timerId: number | null = null;
    let startTime = 0;
    let elapsed = 0;
    let isActive = false;
    function loop(currentTime: number) {
        const deltaTime = currentTime - startTime;
        elapsed += deltaTime;

        while (elapsed >= _interval!) {
            _callback && _callback();
            elapsed -= _interval!;
        }

        startTime = currentTime;
        if (isActive) {
            _timerId = requestAnimationFrame(loop);
        }
    }

    return {
        load(callback: Function, interval: number) {
            if (typeof callback !== 'function' || interval <= 0) {
                throw new Error('Invalid arguments');
            }

            _callback = callback;
            _interval = interval;

            if (!isActive) {
                startTime = performance.now();
                elapsed = 0;
                startTime = 0;
                _timerId = requestAnimationFrame(loop);
                isActive = true;
            }
        },
        clear() {
            if (_timerId !== null) {
                cancelAnimationFrame(_timerId);
                _timerId = null;
            }
            isActive = false;
        },
        pause() {
            this.clear();
        },
        resume() {
            if (!isActive && _callback && _interval) {
                startTime = performance.now();
                elapsed = 0;
                _timerId = requestAnimationFrame(loop);
                isActive = true;
            }
        }
    };
}
