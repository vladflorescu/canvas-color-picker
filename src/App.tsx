import sampleImage from './assets/sample-8k-image.jpg';
import './App.css';
import { useLayoutEffect, useRef } from 'react';
import CanvasEditor from './components/CanvasEditor/CanvasEditor';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = sampleImage;

    img.addEventListener('load', () => {
      console.log(`Sample image size: ${img.naturalWidth}x${img.naturalHeight}`);

      const canvas = canvasRef.current!;
      canvas.setAttribute('width', `${window.innerWidth}px`);
      canvas.setAttribute('height', `${window.innerWidth * img.naturalHeight / img.naturalWidth}px`);

      // Source - https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-getcontext
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
    });
  }, []);

  return (
    <CanvasEditor ref={canvasRef} />
  );
}
