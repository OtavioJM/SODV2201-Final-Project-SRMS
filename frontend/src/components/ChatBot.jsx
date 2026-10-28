import { useState, useRef, useEffect } from 'react'
import { aiData, defaultAnswer } from '../data/aiData'

// Looks for a keyword from the dataset inside the question
function getAnswer(question) {
  const text = question.toLowerCase()
  const match = aiData.find((item) => item.keywords.some((word) => text.includes(word)))
  return match ? match.answer : defaultAnswer
}

// Simulated AI assistant (works locally with the dataset in aiData.js)
function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the Smart Bistro assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  // Scrolls down every time a new message shows up
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(text) {
    if (text.trim() === '') return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    // Small delay so it looks like the AI is thinking
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getAnswer(text) }])
      setTyping(false)
    }, 800)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="chatbot">
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <p key={index} className={`msg ${msg.from}`}>{msg.text}</p>
            ))}
            {typing && <p className="msg bot typing">Typing...</p>}
            <div ref={bottomRef}></div>
          </div>

          {/* Quick questions from the dataset */}
          <div className="quick-questions">
            {aiData.map((item) => (
              <button key={item.question} onClick={() => sendMessage(item.question)}>
                {item.question}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? 'Close chat' : 'Ask our AI'}
      </button>
    </div>
  )
}

export default ChatBot
