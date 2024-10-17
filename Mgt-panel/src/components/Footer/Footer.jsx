import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2024{" "}
          <a 
            href="https://mineit.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Merry's Info-Tech & New-Gen Educare
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
