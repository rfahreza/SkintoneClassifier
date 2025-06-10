let stream = null;

export function isCameraSupported() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

export async function startCamera(videoElement) {
  if (!isCameraSupported()) throw new Error("Kamera tidak didukung browser.");

  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;
  await videoElement.play();
  return stream;
}

export function captureImage(videoElement, canvasElement) {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  const ctx = canvasElement.getContext("2d");
  ctx.drawImage(videoElement, 0, 0);
  return canvasElement.toDataURL("image/png");
}

export function stopCamera(videoElement) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  videoElement.pause();
  videoElement.srcObject = null;
}
