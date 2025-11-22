import { createSignal, onMount, createEffect } from 'solid-js';
import './WaferDesigner.css';

interface Vector2 {
  x: number;
  y: number;
}

interface Die {
  x: number;
  y: number;
  w: number;
  h: number;
  defects: { x: number; y: number; xl: number; yl: number }[];
}

const FabToPrice: Vector2[] = [
  { x: 10000, y: 1007 },
  { x: 90, y: 1650 },
  { x: 65, y: 1937 },
  { x: 40, y: 2274 },
  { x: 28, y: 2891 },
  { x: 20, y: 3677 },
  { x: 16, y: 3984 },
  { x: 10, y: 5992 },
  { x: 7, y: 9346 },
  { x: 5, y: 17000 },
  { x: 1, y: 100000 },
];

function getWaferPrice(size: number, year: number): number {
  let start: Vector2 = { x: 1, y: 1 };
  let end: Vector2 = { x: 1, y: 1 };

  for (let i = 0; i < FabToPrice.length; i++) {
    const cur = FabToPrice[i];
    if (size > cur.x) {
      start = FabToPrice[i === 0 ? FabToPrice.length - 1 : i - 1];
      end = FabToPrice[i];
      break;
    }
    if (size === cur.x) {
      start = cur;
      end = cur;
      break;
    }
  }

  let price =
    start !== end
      ? start.y + ((size - start.x) * (end.y - start.y)) / (end.x - start.x)
      : end.y;

  const inflation = (2020 - year) * 14;
  price = price + (price / 100) * inflation;
  return Math.round(price);
}

function insideCircle(
  cX: number,
  cY: number,
  x: number,
  y: number,
  w: number,
  h: number,
  waferRadius: number
): boolean {
  const dx = Math.max(cX - x, x + w - cX);
  const dy = Math.max(cY - y, y + h - cY);
  return Math.pow(waferRadius, 2) >= dx * dx + dy * dy;
}

export default function WaferDesigner() {
  let canvasRef: HTMLCanvasElement | undefined;
  const [year, setYear] = createSignal(1972);
  const [waferDiameter, setWaferDiameter] = createSignal(300);
  const [waferFabSize, setWaferFabSize] = createSignal(1000);
  const [dieWidth, setDieWidth] = createSignal(12);
  const [dieHeight, setDieHeight] = createSignal(12);
  const [dieGap, setDieGap] = createSignal(1);
  const [defectsPerMM, setDefectsPerMM] = createSignal(0.1);
  const [stats, setStats] = createSignal({
    waferPrice: 0,
    totalDies: 0,
    workingDies: 0,
    defectDies: 0,
  });

  const draw = () => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    const dies: Die[] = [];
    let workingDies = 0;
    let defectDies = 0;

    const gap = dieGap();
    const defects = defectsPerMM();
    const dieW = dieWidth();
    const dieH = dieHeight();
    const diameter = waferDiameter();
    const radius = diameter / 2;
    const centerX = radius;
    const centerY = radius;
    const fabSize = waferFabSize();
    const waferPrice = getWaferPrice(fabSize, year());

    // Clear and scale
    ctx.save();
    ctx.scale(4, 4);
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

    // Draw wafer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Generate dies
    for (let x = 0; x < diameter; x += dieW + gap) {
      for (let y = 0; y < diameter; y += dieH + gap) {
        if (!insideCircle(centerX, centerY, x, y, dieW, dieH, radius)) continue;

        const die: Die = {
          x,
          y,
          w: dieW,
          h: dieH,
          defects: [],
        };

        ctx.fillStyle = '#2ecc71'; // Green by default

        const eX = x + dieW;
        const eY = y + dieH;

        // Check for defects
        for (let x2 = x; x2 < eX; x2++) {
          for (let y2 = y; y2 < eY; y2++) {
            if (Math.random() * 100 > defects) continue;

            die.defects.push({
              x: x2,
              y: y2,
              xl: x2 - x,
              yl: y2 - y,
            });
            ctx.fillStyle = '#e74c3c'; // Red for defective dies
            ctx.fillRect(x, y, dieW, dieH);
          }
        }

        ctx.fillRect(x, y, dieW, dieH);
        dies.push(die);
      }
    }

    const totalDies = dies.length;

    // Draw first die in magenta (reference)
    ctx.fillStyle = '#9b59b6';
    ctx.fillRect(0, 0, dieW, dieH);

    // Draw defects
    dies.forEach((die) => {
      if (die.defects.length === 0) {
        workingDies++;
      } else {
        defectDies++;
      }

      die.defects.forEach((defect) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(defect.x, defect.y, 1, 1);
      });
    });

    ctx.restore();

    setStats({
      waferPrice,
      totalDies,
      workingDies,
      defectDies,
    });
  };

  createEffect(() => {
    // Redraw when any parameter changes
    year();
    waferDiameter();
    waferFabSize();
    dieWidth();
    dieHeight();
    dieGap();
    defectsPerMM();
    draw();
  });

  onMount(() => {
    draw();
  });

  return (
    <div class="wafer-designer">
      <div class="wafer-controls">
        <h3>Wafer Designer</h3>

        <div class="control-group">
          <label>
            Year:
            <input
              type="number"
              value={year()}
              onInput={(e) => setYear(parseInt(e.currentTarget.value) || 1972)}
              min="1970"
              max="2025"
            />
          </label>

          <label>
            Wafer Diameter (mm):
            <input
              type="number"
              value={waferDiameter()}
              onInput={(e) =>
                setWaferDiameter(parseFloat(e.currentTarget.value) || 300)
              }
              min="100"
              max="450"
            />
          </label>

          <label>
            Fab Size (nm):
            <input
              type="number"
              value={waferFabSize()}
              onInput={(e) =>
                setWaferFabSize(parseInt(e.currentTarget.value) || 1000)
              }
              min="1"
              max="10000"
            />
          </label>
        </div>

        <div class="control-group">
          <label>
            Die Width (mm):
            <input
              type="number"
              value={dieWidth()}
              onInput={(e) =>
                setDieWidth(parseInt(e.currentTarget.value) || 12)
              }
              min="1"
              max="100"
            />
          </label>

          <label>
            Die Height (mm):
            <input
              type="number"
              value={dieHeight()}
              onInput={(e) =>
                setDieHeight(parseInt(e.currentTarget.value) || 12)
              }
              min="1"
              max="100"
            />
          </label>

          <label>
            Die Gap (mm):
            <input
              type="number"
              value={dieGap()}
              onInput={(e) => setDieGap(parseInt(e.currentTarget.value) || 1)}
              min="0"
              max="10"
            />
          </label>

          <label>
            Defects per mm²:
            <input
              type="number"
              value={defectsPerMM()}
              step="0.01"
              onInput={(e) =>
                setDefectsPerMM(parseFloat(e.currentTarget.value) || 0.1)
              }
              min="0"
              max="1"
            />
          </label>
        </div>

        <div class="wafer-stats">
          <div class="stat">
            <span class="stat-label">Wafer Price:</span>
            <span class="stat-value">${stats().waferPrice.toLocaleString()}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total Dies:</span>
            <span class="stat-value">{stats().totalDies}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Working:</span>
            <span class="stat-value stat-working">{stats().workingDies}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Defective:</span>
            <span class="stat-value stat-defective">{stats().defectDies}</span>
          </div>
        </div>
      </div>

      <div class="wafer-canvas-container">
        <canvas ref={canvasRef} width="2000" height="2000" class="wafer-canvas" />
      </div>
    </div>
  );
}
