import { useEffect, useRef } from 'react';
import * as fabricModule from 'fabric';
const fabric = fabricModule.default || fabricModule;

export default function InfiniteCanvas() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#fafafa',
      width: window.innerWidth,
      height: window.innerHeight,
      selection: true,
    });
    fabricCanvasRef.current = canvas;

    setTimeout(() => {
      if (!canvas || canvas.disposed) return;
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = 3;
        canvas.freeDrawingBrush.color = '#000000';
      } else {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 3;
        canvas.freeDrawingBrush.color = '#000000';
      }
      canvas.renderAll();
    }, 0);

    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      zoom = Math.min(Math.max(zoom, 0.1), 20);
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
    });

    let panning = false;
    let lastX = 0, lastY = 0;
    canvas.on('mouse:down', (opt) => {
      if (opt.e.button === 1) {
        panning = true;
        lastX = opt.e.clientX;
        lastY = opt.e.clientY;
        canvas.selection = false;
        opt.e.preventDefault();
      }
    });
    canvas.on('mouse:move', (opt) => {
      if (panning) {
        const deltaX = opt.e.clientX - lastX;
        const deltaY = opt.e.clientY - lastY;
        canvas.relativePan({ x: deltaX, y: deltaY });
        lastX = opt.e.clientX;
        lastY = opt.e.clientY;
      }
    });
    canvas.on('mouse:up', () => {
      panning = false;
      canvas.selection = true;
    });

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-screen h-screen block border-4 border-blue-500 shadow-lg"
    />
  );
}