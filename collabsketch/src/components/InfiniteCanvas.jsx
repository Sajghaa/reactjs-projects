import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function InfiniteCanvas() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // IMPORTANT: If a Fabric canvas already exists on this element, dispose it first
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    // Clear the canvas element content (just in case)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    // Create new Fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#f8f9fa',
      width: window.innerWidth,
      height: window.innerHeight,
      selection: true,
    });
    fabricCanvasRef.current = canvas;

    // ---------- Zoom & Pan ----------
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
    });

    let panning = false;
    let lastPosX = 0, lastPosY = 0;
    canvas.on('mouse:down', (opt) => {
      if (opt.e.button === 1) {
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

    // Default drawing mode
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = '#000000';

    // Cleanup function – runs before unmount or before re-running effect
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once after mount
  // (StrictMode will still run twice, but our cleanup handles it)

  // Helper to expose methods (optional, for toolbar)
  const setDrawingMode = (mode, options = {}) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    if (mode === 'pen') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = options.width || 3;
      canvas.freeDrawingBrush.color = options.color || '#000000';
    } else if (mode === 'rectangle') {
      canvas.isDrawingMode = false;
      // Add rectangle drawing later
    }
  };

  // Expose for external use (remove later)
  if (typeof window !== 'undefined') {
    window.infiniteCanvas = { setDrawingMode, getCanvas: () => fabricCanvasRef.current };
  }

  return <canvas ref={canvasRef} className="w-screen h-screen block" />;
}