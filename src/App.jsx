import { useState } from "react";

// This converts the hex color to HSL format, which is easier to manipulate for generating palettes.
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// This converts HSL back to hex format for displaying the colors.
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  let a = s * Math.min(l, 1 - l);
  let f = n => {
    let k = (n + h / 30) % 12;
    let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// This is a simple palette generator that creates a palette of 5 colors based on a single input color.

function PaletteGenerator() {
  const [colors, setColors] = useState([]);
  const [hex, setHex] = useState("#000000");

  function handleGenerate() {
    hsl = hslToHex(hex);
    setColors([hex, "#ff2052", "#ff9966", "#fdee00", "#8db600"]);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        {colors.map(function(color) {
          return <div key={color} style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: color }} />;
        })}
      </div>
      <input 
        type="color"
        value={hex}
        onChange={function(e) { setHex(e.target.value); }}
      />
      <button onClick={handleGenerate}>Generate</button>
    </div>
  )
}


export default PaletteGenerator;