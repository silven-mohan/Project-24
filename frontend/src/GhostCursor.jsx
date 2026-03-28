import React, { useEffect, useRef } from 'react';

export default function GhostCursor({
  trailLength = 60,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1,
  brightness = 2,
  color = '#B19EEF',
  edgeIntensity = 0
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let points = [];
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Attach to document to catch fast strokes
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    document.addEventListener('mousemove', onMouseMove);

    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 177, g: 158, b: 239 };
    }
    const rgbColor = hexToRgb(color);

    const draw = () => {
      ctx.fillStyle = `rgba(6, 7, 15, ${0.4 - inertia * 0.2})`; 
      ctx.fillRect(0, 0, width, height);

      if(grainIntensity > 0 && Math.random() < 0.2) {
          ctx.fillStyle = `rgba(255,255,255,${grainIntensity})`;
          ctx.fillRect(Math.random()*width, Math.random()*height, 2, 2);
      }

      points.push({ x: mouse.x, y: mouse.y });

      if (points.length > trailLength) {
          points.shift();
      }

      if (points.length > 2) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
              const xc = (points[i].x + points[i + 1].x) / 2;
              const yc = (points[i].y + points[i + 1].y) / 2;
              ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          
          ctx.quadraticCurveTo(
              points[points.length - 2].x, points[points.length - 2].y, 
              points[points.length - 1].x, points[points.length - 1].y
          );

          if (bloomStrength > 0) {
              ctx.shadowBlur = bloomRadius * 15;
              ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${bloomStrength})`;
          } else {
              ctx.shadowBlur = 0;
          }

          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';

          let alphaBase = (brightness / 10); 
          ctx.lineWidth = 12 + edgeIntensity * 5; 
          
          ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.1 * alphaBase})`;
          ctx.stroke();
          
          ctx.lineWidth = 6 + edgeIntensity * 2;
          ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.4 * alphaBase})`;
          ctx.stroke();
          
          ctx.lineWidth = 2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * alphaBase})`;
          ctx.stroke();
      }

      if (points.length > 0) {
          const lastPoint = points[points.length - 1];
          ctx.beginPath();
          ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 1)`;
          ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [trailLength, inertia, grainIntensity, bloomStrength, bloomRadius, brightness, color, edgeIntensity]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
