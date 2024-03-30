import { type RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';

function useHorizontalScroll(ref: RefObject<HTMLDivElement>): RefObject<HTMLDivElement> {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);

    useEffect(() => {
        const chartContainer = ref.current;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - chartContainer!.offsetLeft);
            setScrollLeft(chartContainer!.scrollLeft);
            chartContainer!.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            chartContainer!.style.cursor = 'grab';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - chartContainer!.offsetLeft;
            const walk = (x - startX) * 2;
            chartContainer!.scrollLeft = scrollLeft - walk;
        };

        if (chartContainer) {
            chartContainer.addEventListener('mousedown', handleMouseDown);
            chartContainer.addEventListener('mouseup', handleMouseUp);
            chartContainer.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (chartContainer) {
                chartContainer.removeEventListener('mousedown', handleMouseDown);
                chartContainer.removeEventListener('mouseup', handleMouseUp);
                chartContainer.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [ref, isDragging, startX, scrollLeft]);

    return ref;
}

export default useHorizontalScroll;
