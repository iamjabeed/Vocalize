import React, { useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PlayGround from "./PlayGround";

const Home = () => {
  const audioRef = useRef(null);
  const commands = [
    {
      command: "stop listening",
      callback: ({ stopListening }) => SpeechRecognition.stopListening(),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "open *",
      callback: (url) => window.open("http://" + url + ".com"),
    },
    {
      command: "play music",
      callback: () => playMusic(),
    },
    {
      command: "pause music",
      callback: () => stopMusic(),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  //   SpeechRecognition.startListening({ continuous: true })

  const startListening = async () => await SpeechRecognition.startListening();

  const startListeningcontinuously = async () =>
    await SpeechRecognition.startListening({ continuous: true });

  const stopListening = async () => {
    let audio = new Audio("/mouse-click-153941.mp3");
    audio.play();
    await SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  // if (!listening) {
  //   return <span>Turn on the Microphone.</span>;
  // }

  const songIndex = Math.floor(Math.random() * 5);

  const playMusic = () => {
    const audioPlayer = audioRef.current;
    if (audioPlayer) {
      audioPlayer.play();
    }
  };

  const stopMusic = () => {
    const audioPlayer = audioRef.current;
    if (audioPlayer) {
      audioPlayer.pause();
    }
    let audio = new Audio("/mouse-click-153941.mp3");
    audio.play();
  };

  return (
    <div className="flex justify-center items-center flex-col bg-gray-900 text-white p-8 min-h-screen">
      <p className="text-2xl font-semibold mb-4">
        Vocalize🎙️ - Speech Recognition, voice assistant web app
      </p>
      <p className="text-xl mb-4">Microphone: {listening ? "on" : "off"}</p>
      <p className="text-xl mb-4">
        When the microphone is turned on, try saying one of the commands: <br />{" "}
        🚀 stop listening <br />
        🚀 clear <br />
        🚀 open "domain name" ex: open google <br />
        🚀 play music - To play a random song
        <br />
        🚀 pause music - To Pause the music
        <br />
        🚀 play music - Agian to restart the music
        <br />
      </p>
      <div className="flex gap-3">
        <button
          onClick={startListening}
          className="bg-transparent hover:bg-[#5087C1] transition-all shadow-sm text-white font-semibold py-[3px] px-4 rounded-sm focus:outline-none border-[#5087C1] border-solid border-2"
        >
          Listen once
        </button>
        <button
          onClick={startListeningcontinuously}
          className="bg-transparent hover:bg-[#5087C1] transition-all shadow-sm text-white font-semibold py-[3px] px-4 rounded-sm focus:outline-none border-[#5087C1] border-solid border-2"
        >
          Listen continuously
        </button>

        <button
          onClick={() => {
            resetTranscript;
            let audio = new Audio("/mouse-click-153941.mp3");
            audio.play();
          }}
          className="bg-gray-500 hover:bg-gray-600 transition-all shadow-sm  text-white font-semibold py-[3px] px-4 rounded-sm focus:outline-none"
        >
          Clear
        </button>
        <button
          onClick={stopListening}
          className="bg-red-500 hover:bg-red-600 transition-all shadow-sm text-white font-semibold py-[3px] px-4 rounded-sm focus:outline-none"
        >
          Stop
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 h-[200px] w-[50%] max-h-full overflow-auto">
        <p className="text-lg text-white">{transcript}</p>
      </div>
      <audio ref={audioRef} controls className="hidden">
        <source src={`./music${songIndex}.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
export default Home;
