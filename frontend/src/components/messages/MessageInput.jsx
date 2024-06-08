import React, { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { FiMic, FiMicOff } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessage";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Comprehend } from "@aws-sdk/client-comprehend";
import 'regenerator-runtime/runtime';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const { loading, sendMessage } = useSendMessage();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  
  // AWS client
  const comprehend = new Comprehend({
    region: 'us-west-2',
    credentials: {
      accessKeyId: 'AKIAXYKJXJTMKLXRP47G',
      secretAccessKey: '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'
    }
  });

  // Detect language of the input text
  const detectLanguage = async () => {
    try {
      const detectionResult = await comprehend.detectDominantLanguage({
        Text: message
      });
      setDetectedLanguage(detectionResult.Languages[0].LanguageCode);
    } catch (error) {
      console.error("Error detecting language:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    resetTranscript();
  };

  // Start speech recognition
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  // Stop speech recognition
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    setMessage(transcript);
    detectLanguage();
  }, [transcript]);

  // Fetch supported languages from AWS Comprehend
// Fetch supported languages from AWS Comprehend
useEffect(() => {
	const fetchSupportedLanguages = async () => {
	  try {
		const { Languages } = await comprehend.describeSupportedLanguageTypes({}).promise();
		console.log("Supported Languages:", Languages);
		setSupportedLanguages(Languages);
	  } catch (error) {
		console.error("Error fetching supported languages:", error);
	  }
	};
	fetchSupportedLanguages();
  }, []);
  

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative flex'>
        {SpeechRecognition.browserSupportsSpeechRecognition() && (
          <button
            type='button'
            onMouseDown={startListening}
            onMouseUp={stopListening}
            className='flex items-center justify-center rounded-full h-10 w-10 bg-gray-600 text-white'
            style={{position: 'absolute', left: 0}}
          >
            {listening ? <FiMicOff size={20} /> : <FiMic size={20} />}
          </button>
        )}
        <input
          type='text'
          className='border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='flex items-center justify-center rounded-full h-10 w-10 bg-gray-600 text-white'>
          {loading ? <div className='loading loading-spinner'></div> : <BsSend size={20} />}
        </button>
      </div>
      {!SpeechRecognition.browserSupportsSpeechRecognition() && (
        <span>Your browser does not support speech recognition.</span>
      )}
      <div>
        Detected Language: {detectedLanguage}
      </div>
    </form>
  );
};

export default MessageInput;
