import React from "react";

const Copyright = ({ text }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright">
      <p className="py-3 text-center">
        &copy; {currentYear} Copyright Received By
        <a
          href="https://jay-raam.github.io/Jayasriraam"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1"
        >
          {text}
        </a>
      </p>
    </div>
  );
};

export default Copyright;
