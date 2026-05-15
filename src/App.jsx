import { useState } from "react";

function PaletteGenerator() {
  const [colors, setColors] = useState([]);
  const [hex, setHex] = useState("#000000");

  function handleGenerate() {
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