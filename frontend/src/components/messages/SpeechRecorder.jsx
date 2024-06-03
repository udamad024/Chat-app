import React, { useState } from "react";
import { ReactMic } from "../dist/index.modern"; // Correct import statement

const SpeechRecorder = ({ onRecordStop }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordStart = () => {
    setIsRecording(true);
  };

  const handleRecordStop = (recordedBlob) => {
    setIsRecording(false);
    onRecordStop(recordedBlob.blob);
  };

  return (
    <div>
      <ReactMic // Correct component usage
        record={isRecording}
        onStop={handleRecordStop}
        onStart={handleRecordStart}
        mimeType="audio/webm"
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default SpeechRecorder;
