


// import React, { useState } from "react";

// const fallbackYOLO = "/fallbacks/yolo-placeholder.png";
// const fallbackMedSAM = "/fallbacks/medsam-placeholder.png";
// const fallbackMerged = "/fallbacks/merged-placeholder.png";

// function ResultDisplay({ image, iou, preference, yoloResult, medsamResult, mergedResult }) {
//   const [modalImage, setModalImage] = useState(null);

//   return (
//     <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
//       {/* Input Image */}
//       <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Image</h2>
//         {image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             onClick={() => setModalImage(image)}
//             className="w-full h-64 rounded object-contain border border-gray-300 bg-gray-100 cursor-pointer hover:opacity-90"
//           />
//         ) : (
//           <p className="text-gray-400 italic">No image uploaded yet.</p>
//         )}
//       </div>

//       {/* YOLOv11n Result */}
//       <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">YOLOv11n Result</h2>
//         <img
//           src={yoloResult || fallbackYOLO}
//           alt="YOLOv11n Result"
//           onClick={() => setModalImage(yoloResult || fallbackYOLO)}
//           className="w-full h-64 rounded object-contain border border-indigo-400 bg-gray-100 cursor-pointer hover:opacity-90"
//         />
//         <p className="mt-3 text-gray-600 text-center">
//           IOU Threshold: <span className="font-semibold">{iou.toFixed(2)}</span> <br />
//           Preference: <span className="font-semibold">{preference}</span>
//         </p>
//       </div>

//       {/* MedSAM Result */}
//       <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">MedSAM Result</h2>
//         <img
//           src={medsamResult || fallbackMedSAM}
//           alt="MedSAM Result"
//           onClick={() => setModalImage(medsamResult || fallbackMedSAM)}
//           className="w-full h-64 rounded object-contain border border-green-400 bg-gray-100 cursor-pointer hover:opacity-90"
//         />
//         <p className="mt-3 text-gray-600 text-center">
//           IOU Threshold: <span className="font-semibold">{iou.toFixed(2)}</span> <br />
//           Preference: <span className="font-semibold">{preference}</span>
//         </p>
//       </div>

//       {/* Merged Result */}
//       <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Merged Result</h2>
//         <img
//           src={mergedResult || fallbackMerged}
//           alt="Merged Result"
//           onClick={() => setModalImage(mergedResult || fallbackMerged)}
//           className="w-full h-64 rounded object-contain border border-purple-400 bg-gray-100 cursor-pointer hover:opacity-90"
//         />
//         <p className="mt-3 text-gray-600 text-center">
//           IOU Threshold: <span className="font-semibold">{iou.toFixed(2)}</span> <br />
//           Preference: <span className="font-semibold">{preference}</span>
//         </p>
//       </div>

//       {/* 🔥 Modal */}
//       {modalImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//           onClick={() => setModalImage(null)}
//         >
//           <div className="relative max-w-5xl max-h-[90vh]">
//             <img
//               src={modalImage}
//               alt="Full View"
//               className="rounded-lg shadow-lg max-h-[90vh] object-contain"
//             />
//             <button
//               onClick={() => setModalImage(null)}
//               className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultDisplay;









// import React, { useState } from "react";
// const fallbackYOLO = "/fallbacks/yolo-placeholder.png";
// const fallbackMedSAM = "/fallbacks/medsam-placeholder.png";
// const fallbackMerged = "/fallbacks/merged-placeholder.png";

// export default function ResultDisplay({ image, iou, preference, yoloResult, medsamResult, mergedResult }) {
//   const [modalImage, setModalImage] = useState(null);
//   const onClickImage = (src) => { if (src) setModalImage(src); };
//   return (
//     <div>
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
//         {/* Input */}
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Image</h2>
//           {image ? (<img src={image} alt="Uploaded" className="w-full h-64 object-contain cursor-pointer" onClick={() => onClickImage(image)} />)
//                  : (<p className="text-gray-400 italic">No image uploaded yet.</p>)}
//         </div>

//         {/* YOLO */}
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">YOLOv11n Result</h2>
//           <img src={yoloResult || fallbackYOLO} alt="YOLO" className="w-full h-64 object-contain cursor-pointer" onClick={() => onClickImage(yoloResult || fallbackYOLO)} />
//           <p className="mt-3 text-gray-600 text-center">IOU: <b>{iou.toFixed(2)}</b><br/>Pref: <b>{preference}</b></p>
//         </div>

//         {/* MedSAM */}
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">MedSAM Result</h2>
//           <img src={medsamResult || fallbackMedSAM} alt="MedSAM" className="w-full h-64 object-contain cursor-pointer" onClick={() => onClickImage(medsamResult || fallbackMedSAM)} />
//           <p className="mt-3 text-gray-600 text-center">IOU: <b>{iou.toFixed(2)}</b><br/>Pref: <b>{preference}</b></p>
//         </div>

//         {/* Merged */}
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Merged Result</h2>
//           <img src={mergedResult || fallbackMerged} alt="Merged" className="w-full h-64 object-contain cursor-pointer" onClick={() => onClickImage(mergedResult || fallbackMerged)} />
//           <p className="mt-3 text-gray-600 text-center">IOU: <b>{iou.toFixed(2)}</b><br/>Pref: <b>{preference}</b></p>
//         </div>
//       </div>

//       {/* Modal */}
//       {modalImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
//           <img src={modalImage} alt="preview" className="max-w-[90%] max-h-[90%] rounded-lg" />
//         </div>
//       )}
//     </div>
//   );
// }











//newwwwwww yolo
// import React from "react";

// export default function ResultDisplay({ image, metrics }) {
//   if (!image) return null;

//   return (
//     <div className="text-center">
//       <img
//         src={image}
//         alt="Result"
//         className="rounded-xl shadow-md max-h-96 mx-auto"
//       />
//       <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-md inline-block">
//         <p className="text-lg font-semibold">📊 Detection Metrics</p>
//         <p>Precision: {metrics.precision}</p>
//         <p>Recall: {metrics.recall}</p>
//         <p>F1 Score: {metrics.f1}</p>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function ResultDisplay({ results }) {
  const { yolo_result, medsam_result, yolo_metrics } = results;

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "30px",
  };

  const blockStyle = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "15px",
    width: "420px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const imgStyle = {
    maxWidth: "100%",
    borderRadius: "10px",
    marginTop: "10px",
    border: "2px solid #4a90e2",
  };

  const titleStyle = {
    color: "#4a90e2",
  };

  return (
    <div style={containerStyle}>
      <div style={blockStyle}>
        <h2 style={titleStyle}>YOLO Detection</h2>
        <img src={`http://127.0.0.1:5000${yolo_result}`} alt="YOLO" style={imgStyle} />
        <p>
          Precision: {yolo_metrics.precision} | Recall: {yolo_metrics.recall} | F1: {yolo_metrics.f1}
        </p>
      </div>

      <div style={blockStyle}>
        <h2 style={titleStyle}>MedSAM Masks</h2>
        <img src={`http://127.0.0.1:5000${medsam_result}`} alt="MedSAM" style={imgStyle} />
      </div>
    </div>
  );
}
