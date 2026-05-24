import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function InfiniteCanvas() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#f8f9fa',
      width: window.innerWidth,
      height: window.innerHeight,
      selection: true,
    });
    fabricCanvasRef.current = canvas;

    // Zoom & Pan (infinite canvas illusion)
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
    });

    // Optional: pan with middle mouse button
    let panning = false;
    let lastPosX = 0, lastPosY = 0;
    canvas.on('mouse:down', (opt) => {
      if (opt.e.button === 1) { // middle button
        panning = true;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
        canvas.selection = false;
      }
    });
    canvas.on('mouse:move', (opt) => {
      if (panning) {
        const deltaX = opt.e.clientX - lastPosX;
        const deltaY = opt.e.clientY - lastPosY;
        canvas.relativePan({ x: deltaX, y: deltaY });
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
      }
    });
    canvas.on('mouse:up', () => {
      panning = false;
      canvas.selection = true;
    });

    // Add some default drawing tools (pen, rectangle)
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = '#000000';

    // Cleanup
    return () => canvas.dispose();
  }, []);

  // Helper function to change drawing mode from outside
  const setDrawingMode = (mode, options = {}) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    if (mode === 'pen') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = options.width || 3;
      canvas.freeDrawingBrush.color = options.color || '#000000';
    } else if (mode === 'rectangle') {
      canvas.isDrawingMode = false;
      // We'll implement rectangle drawing manually in next step
    }
  };

  // Expose methods via window for quick testing (remove later)
  if (typeof window !== 'undefined') {
    window.infiniteCanvas = { setDrawingMode, fabricCanvas: fabricCanvasRef };
  }

  return <canvas ref={canvasRef} className="w-screen h-screen block" />;
}