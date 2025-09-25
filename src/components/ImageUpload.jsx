// // import React from 'react';

// // function ImageUpload({ onImageSelect }) {
// //   const handleFileChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       onImageSelect(URL.createObjectURL(e.target.files[0]));
// //     }
// //   };

// //   return (
// //     <div className="mb-6 max-w-md mx-auto">
// //       <label className="block mb-2 text-lg font-semibold text-gray-700">
// //         Upload Image
// //       </label>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleFileChange}
// //         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //       />
// //     </div>
// //   );
// // }

// // export default ImageUpload;





// import React from "react";

// function ImageUpload({ onImageSelect }) {
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const previewUrl = URL.createObjectURL(file);
//       onImageSelect({ preview: previewUrl, file });
//     }
//   };

//   return (
//     <div className="mb-6 max-w-md mx-auto">
//       <label className="block mb-2 text-lg font-semibold text-gray-700">
//         Upload Image
//       </label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </div>
//   );
// }

// export default ImageUpload;














//NEW










import React from "react";

export default function ImageUpload({ onSelect, preview }) {
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onSelect(f);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="w-72">
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
        <div className="w-full h-40 border border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50">
          <span className="text-gray-500">Click to choose image</span>
        </div>
      </label>
      <div className="w-40 h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
        {preview ? <img src={preview} alt="preview" className="object-contain w-full h-full" /> : <span className="text-gray-400">Preview</span>}
      </div>
    </div>
  );
}
