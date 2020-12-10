import { useCallback, useEffect, useRef, useState } from 'react';
import './index.scss';

interface CanvasProps {
    width?: number;
    height?: number;
}

interface Coordinate {
    x: number;
    y: number;
}

const DrawCanvas = (props: CanvasProps) => {
    const { width = 800, height = 600 } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const [isPainting, setIsPainting] = useState(false);

    const getCoordinates = (event: TouchEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;

        if (event.touches.length) {
            return {
                x: event.touches[0].clientX - canvas.offsetLeft,
                y: event.touches[0].clientY - canvas.offsetTop
            };
        }

        return {
            x: 0,
            y: 0,
        }
    };

    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
            context.strokeStyle = "red";
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };

    const startPaint = useCallback((event: TouchEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    const paint = useCallback((event: TouchEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isPainting) {
            const newMousePosition = getCoordinates(event);
            if (mousePosition && newMousePosition) {
                drawLine(mousePosition, newMousePosition);
                setMousePosition(newMousePosition);
            }
        }
    },
        [isPainting, mousePosition]
    );

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;

        canvas.addEventListener('touchstart', startPaint);
        canvas.addEventListener('touchmove', paint);
        canvas.addEventListener('touchend', exitPaint);
        canvas.addEventListener('touchcancel', exitPaint);

        return () => {
            canvas.removeEventListener('touchstart', startPaint);
            canvas.removeEventListener('touchmove', paint);
            canvas.removeEventListener('touchend', exitPaint);
            canvas.removeEventListener('touchcancel', exitPaint);
        };
    }, [startPaint, paint, exitPaint]);

    const clearCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight / 2}
                className={'canvas'}
            />
            <div onClick={clearCanvas}>
                clear
            </div>
        </div>
    );
}

export default DrawCanvas;