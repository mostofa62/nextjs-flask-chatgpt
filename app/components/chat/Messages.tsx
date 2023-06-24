import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Message({ msg, type, time }:any) {
  console.log(msg);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center ${
        type === 'bot' ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`flex flex-col items-start justify-center ${type === 'bot'? 'text-black':'text-white'}  rounded-xl p-4 ${
          type === 'bot'
            ? 'bg-[#f1e56c] rounded-tl-none'
            : 'bg-[#FF6600] rounded-br-none'
        }`}
      >
        <p>{msg}</p>
        <span className={`text-xs mt-2 ${type === 'bot' && 'text-[#949494]'}`}>
          {time}
        </span>
      </div>
    </motion.div>
  );
}

export default function Messages({ messages, prevMessage }:any) {
  const messagesEndRef = useRef<null|HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="w-[600px] max-h-96 overflow-y-scroll scrollbar-hide space-y-4">

      {
        prevMessage.length?
        prevMessage.map((message:any, index:number) => <Message key={index} {...message} />):

      <>
      {messages.length ? (
        messages.map((message:any, index:number) => <Message key={index} {...message} />)
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-sm">Ask the bot relavent to Category Topics...</p>
        </div>
      )}
      <div ref={messagesEndRef} />
      </>
}
      
    </div>
  );
}
