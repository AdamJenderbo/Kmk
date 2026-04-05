import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSheetMusicPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serialNumber: "",
    title: "",
    composer: "",
    arranger: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial"
    },
    title: {
      marginBottom: "20px",
      textAlign: "center"
    },
    inputGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column"
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold"
    },
    input: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    button: {
      marginTop: "15px",
      padding: "10px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer"
    },
    error: {
      marginTop: "15px",
      color: "red",
      textAlign: "center"
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setError("");
    // setLoading(true);

    // try {
    //   const response = await fetch("/api/sheetmusic", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();

    //     // Example: backend returns { message: "Title missing" }
    //     setError(errorData.message || "Something went wrong");
    //     setLoading(false);
    //     return;
    //   }

    //   // Success → redirect to list page
    //   navigate("/sheet-music");
    // } catch (err) {
    //   setError("Network error. Please try again.");
    //   setLoading(false);
    // }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Sheet Music</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Composer</label>
          <input
            type="text"
            name="composer"
            value={formData.composer}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Arranger</label>
          <input
            type="text"
            name="arranger"
            value={formData.arranger}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </form>
    </div>
  );
}