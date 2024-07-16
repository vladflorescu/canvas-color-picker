import { forwardRef, useImperativeHandle, useRef } from 'react';
import './CanvasEditor.css';
import ColorPicker, { ColorPickerProvider, ColorTracker } from './ColorPicker';
import CanvasRefContext from './CanvasRefContext';

export type CanvasEditorProps = {
  className?: string;
};

const CanvasEditor = forwardRef<HTMLCanvasElement, CanvasEditorProps>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useImperativeHandle(ref, () => canvasRef.current!, [canvasRef]);

  return (
    <div className="canvas-editor">
      <CanvasRefContext.Provider value={canvasRef}>
        <ColorPickerProvider>
          <ColorPicker />
          <div className="canvas-container">
            <ColorTracker />
            <canvas ref={canvasRef} className={className} />
          </div>
        </ColorPickerProvider>
      </CanvasRefContext.Provider>
    </div>
  );
});

export default CanvasEditor;
