
"use client";

import React, { useRef, useEffect, useState } from "react";

const CameraCapture = ({ setPhoto, onClose, initialFacingMode }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [facingMode, setFacingMode] = useState(
    initialFacingMode || "environment"
  );
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      // Stop any existing camera stream first.
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setCameraError(null);

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera access is not supported by this browser.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
          },
          audio: false,
        });

        // Stop the stream if the component was closed during startup.
        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Camera access error:", error);

        if (isMounted) {
          setCameraError(
            error.name === "NotAllowedError"
              ? "Camera permission was denied. Please allow camera access in your browser settings."
              : error.name === "NotFoundError"
              ? "No camera was found on this device."
              : error.message || "Unable to access the camera."
          );
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState < 2) {
      setCameraError("Camera is not ready. Please try again.");
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Unable to capture the photo.");
      return;
    }

    const width = 400;
    const height = 400;

    canvas.width = width;
    canvas.height = height;

    // Capture the current video frame.
    context.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    // Stop the camera before returning the captured photo.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setPhoto(imageData);
    onClose?.();
  };

  const toggleCamera = () => {
    setFacingMode((previous) =>
      previous === "user" ? "environment" : "user"
    );
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    onClose?.();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "500px",
          boxSizing: "border-box",
        }}
      >
        {cameraError ? (
          <div
            className="p-4 bg-red-100 text-red-700 mb-4 rounded"
            role="alert"
          >
            {cameraError}
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              display: "block",
              borderRadius: "0.5rem",
              backgroundColor: "#000",
              transform:
                facingMode === "user" ? "scaleX(-1)" : "none",
            }}
          />
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={capturePhoto}
            disabled={Boolean(cameraError)}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: cameraError ? "not-allowed" : "pointer",
              opacity: cameraError ? 0.6 : 1,
            }}
          >
            Capture
          </button>

          <button
            type="button"
            onClick={toggleCamera}
            style={{
              background: "#eab308",
              color: "black",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Switch
          </button>

          <button
            type="button"
            onClick={handleClose}
            style={{
              background: "#dc2626",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
