import { useEffect, useRef } from 'react';
import * as fabricModule from 'fabric';
import io from 'socket.io-client';

const fabric = fabricModule.default || fabricModule;

export default function InfiniteCanvas() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    const socket = socketRef.current;

    socket.on('draw', (data) => {
      if (!fabricCanvasRef.current) return;
      fabric.util.enlivenObjects([data], (objects) => {
        objects.forEach(obj => {
          fabricCanvasRef.current.add(obj);
          fabricCanvasRef.current.renderAll();
        });
      });
    });

    socket.on('clear', () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.backgroundColor = '#fafafa';
        fabricCanvasRef.current.renderAll();
      }
    });

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
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

    // ---- Drawing mode state ----
    let currentMode = 'pen';
    let isDrawingShape = false;
    let startPoint = null;
    let currentShape = null;

    const setMode = (mode) => {
      currentMode = mode;
      canvas.isDrawingMode = (mode === 'pen');
      canvas.selection = (mode === 'pen');
      canvas.defaultCursor = (mode === 'pen') ? 'default' : 'crosshair';
    };

    const clearCanvas = () => {
      canvas.clear();
      canvas.backgroundColor = '#fafafa';
      canvas.renderAll();
      socket.emit('clear');
    };

    window.infiniteCanvas = { setMode, clearCanvas };

    // ---- Shape drawing ----
    canvas.on('mouse:down', (opt) => {
      if (currentMode !== 'pen' && !opt.target) {
        isDrawingShape = true;
        const pointer = canvas.getPointer(opt.e);
        startPoint = { x: pointer.x, y: pointer.y };
        let shapeOptions = {
          left: startPoint.x,
          top: startPoint.y,
          width: 0,
          height: 0,
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 2,
          selectable: true,
          hasControls: true,
        };
        if (currentMode === 'rectangle') {
          currentShape = new fabric.Rect(shapeOptions);
        } else if (currentMode === 'circle') {
          currentShape = new fabric.Ellipse({
            ...shapeOptions,
            rx: 0,
            ry: 0,
          });
        }
        canvas.add(currentShape);
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (!isDrawingShape || !currentShape) return;
      const pointer = canvas.getPointer(opt.e);
      let width = pointer.x - startPoint.x;
      let height = pointer.y - startPoint.y;
      if (currentMode === 'rectangle') {
        currentShape.set({ width: width, height: height });
      } else if (currentMode === 'circle') {
        currentShape.set({ rx: Math.abs(width/2), ry: Math.abs(height/2) });
        currentShape.set({ left: startPoint.x + width/2, top: startPoint.y + height/2 });
      }
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      if (isDrawingShape && currentShape) {
        socket.emit('draw', currentShape.toJSON());
        isDrawingShape = false;
        currentShape = null;
      }
    });

    // ---- Zoom & Pan ----
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

    // Broadcast pen drawings
    const handleObjectAdded = (e) => {
      if (e.target && currentMode === 'pen') {
        socket.emit('draw', e.target.toJSON());
      }
    };
    canvas.on('object:added', handleObjectAdded);

    return () => {
      socket.off('draw');
      socket.off('clear');
      socket.disconnect();
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