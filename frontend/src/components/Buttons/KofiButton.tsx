import React, { useEffect } from "react";

declare global {
  interface Window {
    kofiwidget2: {
      init: (title: string, color: string, userId: string) => void;
      draw: () => void;
    };
  }
}

const KofiWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.kofiwidget2) {
        window.kofiwidget2.init("Support JobRocket", "#f57873", "L4L01PZCY8");
        window.kofiwidget2.draw();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="kofi-widget-container"></div>;
};

export default KofiWidget;
