import React, { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Peer from "simple-peer";
import { MdContentCopy } from "react-icons/md";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
const NewMeetingPage = () => {
  const [me, setMe] = useState("hi");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [showbox, setshowBox] = useState(true);
  const myVideo = useRef(null);
  // const userVideo = useRef();
  //const connectionRef = useRef();

  useEffect(() => {
    socket.on("me", (id) => {
     console.log(id);
      setMe(id);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
        setStream(stream);
        myVideo.current.srcObject = stream;
      });


   // setshowBox(true);
  }, []);
  return (
    <>
    {showbox ? (
      <div className="fixed top-0 left-0 w-full h-full flex justify-start items-end  bg-black bg-opacity-50 z-50">
        <div className="bg-slate-100 h-4/3 w-1/4 p-6 m-10 rounded shadow-md">
          <h2 className="text-gray-800 font-medium text-lg">
            Your Meeting's ready
          </h2>
          <h3>Share this code with anyone you want in this meeting.</h3>
            <div className="h-10 w-30 bg-zinc-300 mt-4 rounded-md flex items-center p-3 justify-between">
            <h3>{me}</h3>
          <CopyToClipboard text={me} style={{ marginBottom: "1rem" }}>
            <MdContentCopy className="cursor-pointer h-6 text-zinc-700 w-10" />
          </CopyToClipboard>
            </div>
          <h6 className="text-zinc-600 text-md">
            People who use this code must get your permission before they
            can join.
          </h6>
        </div>
      </div>
    ) : (
      <></>
    )}
      <div className="h-screen w-full bg-zinc-800 flex justify-center items-stretch">
        <div className=" bg-black w-4/5 h-4/5 rounded-lg mt-6 ">
          {stream && (
            <video
              playsInline
              ref={myVideo}
              autoPlay
              className="w-full h-full"
            ></video>
          )}
        </div>
          <div className="video">
            {callAccepted && !callEnded ?
            <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
            null}
          </div>
      </div>
      <div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
    </>
  );
};

export default NewMeetingPage;
