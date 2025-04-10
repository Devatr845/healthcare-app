import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatbaseWidget.css';

const ChatbaseWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Skip rendering on admin pages
  if (location.pathname.includes('/admin')) {
    return null;
  }

  useEffect(() => {
    // Initialize Chatbase
    const script = document.createElement('script');
    script.innerHTML = `
      (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="wBJJua-bJr9ZjVGoRPCnC";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){
          onLoad()
        }else{
          window.addEventListener("load",onLoad)
        }
      })();
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (window.chatbase) {
      if (!isOpen) {
        window.chatbase('show');
      } else {
        window.chatbase('hide');
      }
    }
  };

  return (
    <div className="chatbase-widget-container">
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <span className="chat-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
          </svg>
        </span>
        <span className="chat-text">Chat with us</span>
      </button>
    </div>
  );
};

export default ChatbaseWidget; 