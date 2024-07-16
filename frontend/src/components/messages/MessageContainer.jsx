import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // Cleanup function (unmounts)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div style={{ minWidth: '450px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div style={{ backgroundColor: 'slategray', padding: '8px 16px', marginBottom: '8px', position: 'sticky', top: 0, zIndex: 10 }}>
                        <span className='label-text'>To:</span>{" "}
                        <span style={{ color: 'green', fontWeight: 'bold' }}>{selectedConversation.fullName}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <Messages />
                    </div>
                    <div style={{ flexShrink: 0, padding: '8px 16px', backgroundColor: 'white' }}>
                        <MessageInput />
                    </div>
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <div style={{ padding: '16px', textAlign: 'center', fontSize: '1.125rem', color: 'gray', fontWeight: '600', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages style={{ fontSize: '3rem', textAlign: 'center' }} />
            </div>
        </div>
    );
};
