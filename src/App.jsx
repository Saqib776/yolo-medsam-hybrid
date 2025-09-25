


import { useState } from "react";

export default function App() {
  const [inputImage, setInputImage] = useState(null);
  const [yoloResult, setYoloResult] = useState(null);
  const [medsamResult, setMedsamResult] = useState(null);
  const [mergedResult, setMergedResult] = useState(null);
  const [gtResult, setGtResult] = useState(null);
  const [metrics, setMetrics] = useState({ yolo: {}, medsam: {}, merged: {} });
  const [datasetInfo, setDatasetInfo] = useState({ total: "-", masks: "-", labels: "-" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setInputImage(URL.createObjectURL(e.target.files[0]));
      setErrorMsg("");
    }
  };

  const handleDetect = async () => {
    if (!inputImage) return alert("Please upload an image first!");
    setLoading(true);
    setErrorMsg("");

    const fileInput = document.getElementById("imageInput").files[0];
    const formData = new FormData();
    formData.append("image", fileInput);
    formData.append("yolo_conf", 0.5);
    formData.append("yolo_iou", 0.5);
    formData.append("yolo_min_area", 500);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict_all", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error during detection");
      }

      const data = await res.json();

      setYoloResult(data?.yolo?.image ? `http://127.0.0.1:5000${data.yolo.image}` : null);
      setMedsamResult(data?.medsam?.image ? `http://127.0.0.1:5000${data.medsam.image}` : null);
      setMergedResult(data?.merged?.image ? `http://127.0.0.1:5000${data.merged.image}` : null);
      setGtResult(data?.groundtruth?.image ? `http://127.0.0.1:5000${data.groundtruth.image}` : null);

      setMetrics({
        yolo: data?.yolo?.metrics || {},
        medsam: data?.medsam?.metrics || {},
        merged: data?.merged?.metrics || {},
        cumulative: data?.cumulative || {},
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Detection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDatasetMetrics = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://127.0.0.1:5000/evaluate_dataset", { method: "GET" });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error while fetching dataset metrics");
      }

      const data = await res.json();

      setMetrics({
        yolo: data?.yolo || {},
        medsam: data?.medsam || {},
        merged: data?.merged || {},
        cumulative: {
          total_images: data?.total_images,
          missed_images: data?.missed,
          yolo: data?.yolo,
          medsam: data?.medsam,
          merged: data?.merged,
        },
      });

      setDatasetInfo({
        total: data?.total_images ?? "-",
        masks: data?.total_masks ?? "-",
        labels: data?.total_labels ?? "-",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to fetch dataset metrics");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const ImageBox = ({ title, src, loadingText, colorClass }) => (
    <div className={`flex-1 flex flex-col items-center bg-gray-50 border-2 rounded-xl p-4 ${colorClass}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div
        className="w-full h-64 flex items-center justify-center bg-white rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer"
        onClick={() => src && openModal(src)}
      >
        {loading && !src ? (
          <Spinner />
        ) : src ? (
          <img src={src} alt={title} className="object-contain h-full w-full" />
        ) : (
          <span className="text-gray-300">{loadingText}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 p-6">
      <div className="flex-grow w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">YOLO + MedSAM Visualizer</h1>

        {/* Upload + Buttons */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            onChange={handleFileChange}
            className="px-4 py-2 text-black border-2 border-indigo-400 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleDetect}
            disabled={!inputImage || loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? <Spinner /> : "Detect"}
          </button>

          <button
            onClick={handleDatasetMetrics}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? <Spinner /> : "Show Dataset Info"}
          </button>
        </div>

        {errorMsg && <div className="text-red-600 font-semibold text-center mt-2">{errorMsg}</div>}

        {/* Dataset Info */}
        <div className="flex justify-center mt-4 space-x-6 text-gray-800">
          <p>Total Images: {datasetInfo.total}</p>
          <p>Total Masks: {datasetInfo.masks}</p>
          <p>Total Labels: {datasetInfo.labels}</p>
        </div>

        {/* First Row */}
        <div className="flex text-black flex-col md:flex-row gap-6 mt-4">
          <ImageBox title="Input Image" src={inputImage} loadingText="Upload an image" colorClass="border-indigo-300" />
          <ImageBox title="YOLO Result" src={yoloResult} loadingText="Processing YOLO..." colorClass="border-blue-400" />
          <ImageBox title="MedSAM Result" src={medsamResult} loadingText="Processing MedSAM..." colorClass="border-blue-300" />
        </div>

        {/* Second Row */}
        <div className="flex text-black flex-col md:flex-row gap-6 mt-4">
          <ImageBox title="Merged Result" src={mergedResult} loadingText="Merging results..." colorClass="border-green-400" />
          <ImageBox title="Ground Truth (Reference)" src={gtResult} loadingText="Loading GT..." colorClass="border-red-400" />
        </div>

        {/* Metrics */}
        <div className="flex flex-col md:flex-row justify-around bg-blue-50 rounded-xl p-6 gap-6 mt-6">
          {["yolo", "medsam", "merged"].map((type) => (
            <div key={type} className="flex-1 text-center">
              <h3
                className={`text-lg font-semibold ${
                  type === "merged"
                    ? "text-green-600"
                    : type === "medsam"
                    ? "text-blue-400"
                    : "text-blue-600"
                } mb-2`}
              >
                {type.toUpperCase()} Metrics
              </h3>
              <p className="text-gray-800">Precision: {metrics[type]?.precision ?? "-"}</p>
              <p className="text-gray-800">Recall: {metrics[type]?.recall ?? "-"}</p>
              <p className="text-gray-800">F1 Score: {metrics[type]?.f1 ?? "-"}</p>
            </div>
          ))}
        </div>

        {/* Cumulative Metrics */}
        <div className="flex flex-col bg-green-50 rounded-xl p-6 gap-6 mt-6">
          <h3 className="text-xl font-bold text-green-700 text-center mb-4">
            Cumulative Results (All Processed Images)
          </h3>
          <p className="text-center text-gray-700">
            Total Images: {metrics?.cumulative?.total_images ?? "-"} | Missed:{" "}
            {metrics?.cumulative?.missed_images ?? "-"}
          </p>
          <div className="flex flex-col md:flex-row justify-around gap-6 mt-4">
            {["yolo", "medsam", "merged"].map((type) => (
              <div key={type} className="flex-1 text-center">
                <h4
                  className={`text-lg font-semibold ${
                    type === "merged"
                      ? "text-green-600"
                      : type === "medsam"
                      ? "text-blue-400"
                      : "text-blue-600"
                  } mb-2`}
                >
                  {type.toUpperCase()} Cumulative
                </h4>
                <p className="text-gray-800">Precision: {metrics?.cumulative?.[type]?.precision ?? "-"}</p>
                <p className="text-gray-800">Recall: {metrics?.cumulative?.[type]?.recall ?? "-"}</p>
                <p className="text-gray-800">F1 Score: {metrics?.cumulative?.[type]?.f1 ?? "-"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img src={modalImage} alt="Preview" className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
