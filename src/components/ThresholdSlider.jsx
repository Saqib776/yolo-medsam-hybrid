// import React from 'react';

// function ThresholdSlider({ value, onChange }) {
//   return (
//     <div className="flex flex-col max-w-xs mx-auto">
//       <label className="mb-2 text-md font-medium text-gray-700">
//         IOU Threshold: <span className="font-semibold">{value.toFixed(2)}</span>
//       </label>
//       <input
//         type="range"
//         min="0.2"
//         max="0.95"
//         step="0.05"
//         value={value}
//         onChange={(e) => onChange(parseFloat(e.target.value))}
//         className="w-full cursor-pointer accent-indigo-600"
//       />
//     </div>
//   );
// }

// export default ThresholdSlider;





//nEW




import React from "react";

export default function ThresholdSlider({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">IoU Threshold: {value.toFixed(2)}</label>
      <input
        type="range"
        min="0.1"
        max="0.9"
        step="0.05"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
