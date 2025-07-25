import React, { useState } from "react";
import { FaGithub, FaTrashAlt, FaShareAlt } from "react-icons/fa";

const BookmarkList = ({ bookmarks, onRemoveBookmark, updateNote }) => {
  const [filterTag, setFilterTag] = useState("All");

  const uniqueLanguages = [
    "All",
    ...new Set(bookmarks.map((repo) => repo.language).filter(Boolean)),
  ];

  const filteredBookmarks =
    filterTag === "All"
      ? bookmarks
      : bookmarks.filter((repo) => repo.language === filterTag);

  if (bookmarks.length === 0) return null;

  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Repository link copied to clipboard!");
  };

  const styles = {
    section: {
      padding: "24px",
      backgroundColor: "#f5f7fb",
      fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#222",
    },
    dropdown: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: 0,
    },
    repoLink: {
      color: "#007bff",
      textDecoration: "none",
    },
    description: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "12px",
    },
    info: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      fontSize: "13px",
      marginBottom: "14px",
      color: "#666",
    },
    note: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      resize: "vertical",
      fontSize: "13px",
      marginBottom: "16px",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      gap: "12px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "500",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    githubBtn: {
      backgroundColor: "#333",
    },
    shareBtn: {
      backgroundColor: "#28a745",
    },
    removeBtn: {
      backgroundColor: "#dc3545",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>⭐ Bookmarked Repositories</h2>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={styles.dropdown}
        >
          {uniqueLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {filteredBookmarks.map((repo) => (
          <div key={repo.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.repoLink}
                >
                  {repo.name}
                </a>
              </h3>
              <FaGithub size={18} color="#333" />
            </div>

            <p style={styles.description}>
              {repo.description || "No description available."}
            </p>

            <div style={styles.info}>
              {repo.language && <span>🧠 {repo.language}</span>}
              {repo.license?.name && <span>📄 {repo.license.name}</span>}
              <span>⭐ {repo.stargazers_count}</span>
            </div>

            <textarea
              placeholder="Add a note..."
              value={repo.note || ""}
              onChange={(e) => updateNote(repo.id, e.target.value)}
              style={styles.note}
            />

            <div style={styles.footer}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.btn, ...styles.githubBtn }}
              >
                <FaGithub /> View
              </a>
              <button
                onClick={() => handleShare(repo.html_url)}
                style={{ ...styles.btn, ...styles.shareBtn }}
              >
                <FaShareAlt /> Share
              </button>
              <button
                onClick={() => onRemoveBookmark(repo.id)}
                style={{ ...styles.btn, ...styles.removeBtn }}
              >
                <FaTrashAlt /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookmarkList;
