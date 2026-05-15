// Функция throttle: ограничивает частоту вызова функции
export const throttle = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecTime = 0;

    return function (...args: Parameters<T>) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime >= delay) {
            func(...args);
            lastExecTime = currentTime;
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
};