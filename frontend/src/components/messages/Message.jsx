import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    // Check if the message contains an audio file
    const isAudioMessage = message.audioUrl && message.audioUrl !== "";

    // Check if the recipient is female
    const isFemaleRecipient = message.receiverGender === "female";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleBgColor} pb-2 text-white`}>
                {isAudioMessage && isFemaleRecipient ? (
                    // Render audio player only if the message contains an audio file and the recipient is female
                    <>
                        <div>{message.message}</div>
                        <audio controls>
                            <source src={message.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </>
                ) : (
                    // Render text message if the message does not contain an audio file or the recipient is not female
                    <div>{message.message}</div>
                )}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Message;
