import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;

      // Check if the recipient is female before playing the audio
      const isFemaleRecipient = newMessage.receiverGender === "female";

      // Play the audio from the audioUrl if it exists and the recipient is female
      if (isFemaleRecipient && newMessage.audioUrl) {
        const sound = new Audio(newMessage.audioUrl);
        sound.onerror = (error) => {
          console.error("Error playing audio:", error);
        };
        sound.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }

      // Check if the new message already exists to avoid duplicates
      const messageExists = messages.some(
        (message) => message._id === newMessage._id
      );
      if (!messageExists) {
        setMessages([...messages, newMessage]);
      }
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages]);

  return null; // This hook does not render anything
};

export default useListenMessages;
