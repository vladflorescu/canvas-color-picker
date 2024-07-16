import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import colorString from 'color-string';
import './ColorTracker.css';
import { useColorPicker } from './state';
import clsx from 'clsx';
import CanvasRefContext from '../CanvasRefContext';

const RADIUS = 10;
const GRID_SIZE = 2 * RADIUS + 1;

export default function ColorTracker() {
  const { isActive, setValue, setIsActive } = useColorPicker();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useContext(CanvasRefContext);

  const middleHexColor = useMemo(() => {
    const middleIdx = Math.floor((GRID_SIZE * GRID_SIZE) / 2) * 4;
    return imageData && colorString.to.hex([...imageData.data.slice(middleIdx, middleIdx + 4)]);
  }, [imageData]);

  const middleHexColorRef = useRef<string | null>(middleHexColor);
  middleHexColorRef.current = middleHexColor;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    if (isActive) {
      canvas.addEventListener('mousemove', onCanvasMouseMove);
      canvas.addEventListener('mouseout', onCanvasMouseExit);
      canvas.addEventListener('click', onCanvasClick);

      return () => {
        setImageData(null);
        canvas.removeEventListener('mousemove', onCanvasMouseMove);
        canvas.removeEventListener('mouseout', onCanvasMouseExit);
        canvas.removeEventListener('click', onCanvasClick);
      };
    }

    function onCanvasMouseMove(event: MouseEvent) {
      setImageData(ctx.getImageData(event.offsetX - RADIUS, event.offsetY - RADIUS, GRID_SIZE, GRID_SIZE));
      elementRef.current!.style.transform = `translate(calc(${event.offsetX}px - 50%), calc(${event.offsetY}px - 50%))`;
    }

    function onCanvasMouseExit() {
      setImageData(null);
    }

    function onCanvasClick() {
      setImageData(null);
      setValue(middleHexColorRef.current);
      setIsActive(false);
    }
  }, [canvasRef, isActive, setIsActive, setValue]);

  return (
    <div ref={elementRef} className={clsx('color-tracker', imageData && 'color-tracker--active')} style={{ borderColor: middleHexColor ?? 'black' }}>
      <div
        className="color-tracker__grid"
        style={{ gridTemplateRows: Array(GRID_SIZE).fill('1fr').join(' '), gridTemplateColumns: Array((GRID_SIZE)).fill('1fr').join(' ') }}
      >
        {imageData && (
          Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, idx) => {
            const [r, g, b, a] = imageData.data.slice(idx * 4, idx * 4 + 4);
            const [rowIdx, colIdx] = [Math.floor(idx / GRID_SIZE), idx % GRID_SIZE];
            const isMiddlePixel = rowIdx === RADIUS && colIdx === RADIUS;

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: `rgb(${r} ${g} ${b} / ${a / 255})`,
                  ...(isMiddlePixel && {
                    border: `1px solid white`,
                  }),
                }}
              >
              </div>
            );
          })
        )}
      </div>

      <div className="color-tracker__value">
        {middleHexColor}
      </div>
    </div>
  );
}
