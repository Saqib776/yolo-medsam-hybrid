import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.data || !location.state.input) {
      navigate("/");
      return;
    }
    setResult(location.state);
  }, [location, navigate]);

  if (!result) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading results...</p>;

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "30px",
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh"
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    flex: "1 1 400px",
    maxWidth: "500px"
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "15px",
    objectFit: "contain",
    border: "1px solid #ddd"
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px", color: "#1f2937" }}>Detection Results</h1>
      <div style={containerStyle}>
        {/* Input Image */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "15px", color: "#2563eb" }}>Input Image</h2>
          <img src={result.input} alt="Input" style={imgStyle} />
        </div>

        {/* YOLO Result */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "15px", color: "#10b981" }}>YOLO Detection</h2>
          <img src={`http://127.0.0.1:5000${result.data.yolo.image}`} alt="YOLO Result" style={imgStyle} />
        </div>

        {/* MedSAM Result */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "15px", color: "#f59e0b" }}>MedSAM Detection</h2>
          <img src={`http://127.0.0.1:5000${result.data.medsam.image}`} alt="MedSAM Result" style={imgStyle} />
        </div>
      </div>
    </div>
  );
}
