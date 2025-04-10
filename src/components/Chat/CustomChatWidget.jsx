import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomChatWidget.css'; // Using our custom CSS file

const CustomChatWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const chatbaseInitialized = useRef(false);

  // Skip rendering on admin pages
  if (location.pathname.includes('/admin')) {
    return null;
  }

  // Initialize Chatbase
  useEffect(() => {
    // Direct implementation of the Chatbase script
    const initChatbase = () => {
      if(!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if(!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if(prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });
      }
      
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "wBJJua-bJr9ZjVGoRPCnC";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if(document.readyState === "complete") {
      initChatbase();
    } else {
      window.addEventListener("load", initChatbase);
    }

    return () => {
      window.removeEventListener("load", initChatbase);
    };
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current && isOpen) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Also toggle Chatbase's visibility if it's initialized
    if (window.chatbase && typeof window.chatbase === 'function') {
      if (!isOpen) {
        // Hide Chatbase's interface since we're using our own
        window.chatbase('hide');
      }
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: inputText, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setLoading(true);
    
    try {
      // Use Chatbase to send the message
      if (window.chatbase && typeof window.chatbase === 'function') {
        window.chatbase('sendMessage', userMessage.text);
        
        // If Chatbase doesn't call onMessage within 5 seconds, provide a fallback response
        setTimeout(() => {
          if (loading) {
            setLoading(false);
            setMessages(prev => [...prev, { 
              text: "Thank you for your message. Our healthcare team will get back to you soon.",
              sender: "bot" 
            }]);
          }
        }, 5000);
      } else {
        // Fallback if Chatbase is not available
        throw new Error('Chatbase not initialized');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback response if the API call fails
      setMessages(prev => [...prev, { 
        text: "Sorry, there was an error processing your request. Please try again or contact support.",
        sender: "bot" 
      }]);
      setLoading(false);
    }
  };

  return null; // Don't render our custom button
};

export default CustomChatWidget; 