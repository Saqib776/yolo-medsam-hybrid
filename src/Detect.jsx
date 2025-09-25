import { useState } from "react";

export default function Detect() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFile = (e) => setImage(e.target.files[0]);

  const handleDetect = async () => {
    if (!image) return alert("Upload an image first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("yolo_conf", 0.7);
    formData.append("yolo_iou", 0.5);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict_all", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults({
        yolo: data.yolo,
        medsam: data.medsam,
        inputURL: URL.createObjectURL(image)
      });
    } catch (err) {
      console.error(err);
      alert("Error detecting image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      background: "#f0f4f8",
      minHeight: "100vh",
      padding: "30px"
    }}>
      {/* Heading */}
      <h1 style={{ textAlign: "center", color: "#1f2937", marginBottom: "20px" }}>
        YOLO + MedSAM Detection
      </h1>

      {/* Upload box */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <label style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #3b82f6",
          borderRadius: "12px",
          width: "350px",
          height: "220px",
          cursor: "pointer",
          background: image ? "#dbeafe" : "#fff",
          transition: "0.3s"
        }}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxHeight: "200px", borderRadius: "8px" }} />
          ) : (
            <span style={{ color: "#3b82f6" }}>Click or drag image here</span>
          )}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>

      {/* Detect button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <button
          onClick={handleDetect}
          disabled={loading}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Detecting..." : "Detect"}
        </button>
      </div>

      {/* Results section */}
      {results && (
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap", marginBottom: "30px" }}>
          {/* YOLO */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#1f2937" }}>YOLO Result</h3>
            <img src={`http://127.0.0.1:5000${results.yolo.image}`} alt="YOLO" style={{ maxWidth: "400px", border: "2px solid #3b82f6", borderRadius: "8px" }} />
            <pre style={{ textAlign: "left", background: "#e0f2fe", padding: "10px", borderRadius: "6px", marginTop: "10px" }}>
              {JSON.stringify(results.yolo.metrics, null, 2)}
            </pre>
          </div>

          {/* MedSAM */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#1f2937" }}>MedSAM Result</h3>
            <img src={`http://127.0.0.1:5000${results.medsam.image}`} alt="MedSAM" style={{ maxWidth: "400px", border: "2px solid #10b981", borderRadius: "8px" }} />
            <pre style={{ textAlign: "left", background: "#d1fae5", padding: "10px", borderRadius: "6px", marginTop: "10px" }}>
              {JSON.stringify(results.medsam.metrics, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
