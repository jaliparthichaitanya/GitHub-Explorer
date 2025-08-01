import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} <strong>Jaliparthi Chaithanya choudary</strong> | GitHub Explorer. Built with Passion 🚀
        </p>
        <div style={styles.socialIcons}>
          <a
            href="http:https://www.linkedin.com/in/chaitanya-choudary-102823278/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
            title="Visit LinkedIn"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              style={styles.icon}
            />
          </a>
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e0e0e0",
    padding: "20px 40px",
    position: "relative",
    bottom: 0,
    width: "100%",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  text: {
    fontSize: "14px",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  socialIcons: {
    display: "flex",
    gap: "16px",
  },
  iconLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    transition: "transform 0.2s ease",
  },
  icon: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};

export default Footer;
