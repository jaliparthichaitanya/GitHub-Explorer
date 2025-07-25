import React from "react";

const Loader = () => {
  return (
    <section style={styles.dashboardSection}>
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>Fetching GitHub repositories...</p>
      </div>
    </section>
  );
};

const styles = {
  dashboardSection: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    margin: "20px auto",
    maxWidth: "800px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#444",
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid #e0e0e0",
    borderTop: "6px solid #007bff", // Blue highlight
    borderRadius: "50%",
    animation: "spin 1s ease-in-out infinite",
  },
  text: {
    marginTop: "16px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default Loader;
