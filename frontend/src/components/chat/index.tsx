import OpenAI from 'openai';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setThread } from '../../store/chatSlice';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  role: 'assistant' | 'user';
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true
});

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messages: Message[] = useSelector((state: any) => state.chat.messages);
  const threadId = useSelector((state: any) => state.chat.thread);
  const dispatch = useDispatch();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadThread = async () => {
      if (!threadId) {
        const thread = await openai.beta.threads.create();
        dispatch(setThread(thread.id));
      }
    };

    loadThread();
  }, [threadId, dispatch]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim().length === 0) {
      alert('Message cannot be empty.');
      return;
    }

    if (input.trim().length > 50) {
      alert('Message cannot be more than 50 characters.');
      return;
    }

    dispatch(addMessage({ text: input, role: 'user' }));
    setLoading(true);
    setInput('');
    try {
      await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: input
      });

      const run = await openai.beta.threads.runs.createAndPoll(
        threadId,
        {
          assistant_id: import.meta.env.VITE_ASSISTANT_ID,
          max_prompt_tokens: 1000
        }
      );

      if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
          run.thread_id
        );
        const response = messages.data[0].content[0];
        if ('text' in response) {
          dispatch(addMessage({ text: response.text.value, role: 'assistant' }));
        } else {
          console.log(response);
          dispatch(addMessage({ text: 'Something went wrong with the assistant, sorry!', role: 'assistant' }));
        }
      } else {
        console.log(run);
        dispatch(addMessage({ text: 'Something went wrong with the assistant, sorry!', role: 'assistant' }));
      }
    } catch (error) {
      console.error('Error fetching response from ChatGPT:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-1/2 h-3/4 border rounded-lg shadow-lg bg-white flex flex-col z-10">
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-lg text-white ${message.role === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} /> {/* This is where we scroll to */}
        {loading && <div className="text-gray-500">Tabaré is typing...</div>}
      </div>
      <div className="flex p-2 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={loading}
        >
          Enviar
        </button>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
      >
        <span>&nbsp;X&nbsp;</span>
      </button>
    </div>
  );
};
