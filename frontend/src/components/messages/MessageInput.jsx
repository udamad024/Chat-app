import React, { useState, useEffect, useRef } from 'react';
import { BsSend } from 'react-icons/bs';
import { FiMic, FiMicOff } from 'react-icons/fi';
import useSendMessage from '../../hooks/useSendMessage';
import { Comprehend } from '@aws-sdk/client-comprehend';
import 'regenerator-runtime/runtime';
import { AudioConfig, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';

// Access environment variables
const API_KEY = 'fe4a34f39a1149df9884a8c1e020298d'
const API_LOCATION = 'eastus'

// Validate environment variables
if (!API_KEY || !API_LOCATION) {
  throw new Error('Missing API key or location. Please set REACT_APP_COG_SERVICE_KEY and REACT_APP_COG_SERVICE_LOCATION in your .env file.');
}

const speechConfig = SpeechConfig.fromSubscription(API_KEY, API_LOCATION);
let recognizer;

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [isRecognising, setIsRecognising] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const textRef = useRef();

  // AWS client
  const comprehend = new Comprehend({
    region: 'us-west-2',
    credentials: {
      accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
    },
  });

  // Detect language of the input text
  const detectLanguage = async () => {
    try {
      const detectionResult = await comprehend.detectDominantLanguage({ Text: message });
      setDetectedLanguage(detectionResult.Languages[0].LanguageCode);
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  // Speech recognition functions
  const startRecognizer = () => {
    recognizer.startContinuousRecognitionAsync();
    setIsRecognising(true);
  };

  const stopRecognizer = () => {
    setIsRecognising(false);
    recognizer.stopContinuousRecognitionAsync();
  };

  const toggleListener = () => {
    if (!isRecognising) {
      startRecognizer();
      setMessage('');
    } else {
      stopRecognizer();
    }
  };

  useEffect(() => {
    const constraints = {
      video: false,
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        sampleSize: 16,
        volume: 1,
      },
    };

    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const audioConfig = AudioConfig.fromStreamInput(stream);
        recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizing = (s, e) => {
          setMessage(e.result.text);
        };

        recognizer.recognized = (s, e) => {
          if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
            setMessage((prev) => `${prev} ${e.result.text}`);
          }
        };

        recognizer.canceled = (s, e) => {
          if (e.reason === sdk.CancellationReason.Error) {
            console.error(`CANCELED: ${e.errorDetails}`);
          }
          recognizer.stopContinuousRecognitionAsync();
        };

        recognizer.sessionStopped = (s, e) => {
          recognizer.stopContinuousRecognitionAsync();
        };
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    getMedia();
    return () => {
      if (recognizer) {
        recognizer.close();
      }
    };
  }, []);

  useEffect(() => {
    detectLanguage();
  }, [message]);

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative flex">
        <button
          type="button"
          onMouseDown={toggleListener}
          onMouseUp={toggleListener}
          className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-600 text-white"
          style={{ position: 'absolute', left: 0 }}
        >
          {isRecognising ? <FiMicOff size={20} /> : <FiMic size={20} />}
        </button>
        <input
          type="text"
          className="border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-600 text-white">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend size={20} />}
        </button>
      </div>
      <div>
        Detected Language: {detectedLanguage}
      </div>
    </form>
  );
};

export default MessageInput;
