"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Shield, User, Sparkles, Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "How can I create a strong password?",
  "What is two-factor authentication?",
  "How do I recognize phishing emails?",
  "Is my network secure?",
]

const mockResponses: Record<string, string> = {
  "how can i create a strong password": `Here are some best practices for creating a strong password:

1. **Length matters**: Use at least 12-16 characters
2. **Mix it up**: Combine uppercase, lowercase, numbers, and symbols
3. **Avoid common patterns**: Don't use "123456", "password", or personal info
4. **Use passphrases**: Consider a memorable phrase like "Coffee@Morning!Makes$Me#Happy"
5. **Unique passwords**: Never reuse passwords across different accounts

**Pro tip**: Use a password manager like Bitwarden or 1Password to generate and store complex passwords securely.`,

  "what is two-factor authentication": `**Two-Factor Authentication (2FA)** adds an extra layer of security to your accounts by requiring two forms of verification:

1. **Something you know** - Your password
2. **Something you have** - A code from your phone, hardware key, or authenticator app

**Types of 2FA:**
- SMS codes (least secure)
- Authenticator apps (Google Authenticator, Authy)
- Hardware keys (YubiKey)
- Biometrics (fingerprint, face recognition)

**Why it matters**: Even if someone steals your password, they can't access your account without the second factor. Enable 2FA on all important accounts!`,

  "how do i recognize phishing emails": `Here are key signs of phishing emails to watch for:

**Red Flags:**
- Urgent language ("Act now!" "Account suspended!")
- Generic greetings ("Dear Customer" instead of your name)
- Suspicious sender addresses (check for typos in domain)
- Grammar and spelling errors
- Requests for personal information or passwords
- Suspicious links (hover to preview before clicking)
- Unexpected attachments

**Stay Safe:**
1. Never click links in suspicious emails
2. Go directly to the company's website
3. Contact the company through official channels
4. Report phishing attempts
5. Keep your email security settings up to date`,

  "is my network secure": `Let me help you assess your network security. Here are key areas to check:

**Router Security:**
- Change default admin password
- Use WPA3 encryption (or WPA2 minimum)
- Update router firmware regularly
- Disable WPS

**Network Practices:**
- Use a strong WiFi password (12+ characters)
- Create a separate guest network
- Enable firewall protection
- Consider using a VPN

**Monitoring:**
- Check connected devices regularly
- Look for unknown devices
- Monitor for unusual activity

Would you like me to run a detailed network security scan?`,
}

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim()
  
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key) || key.includes(lowerMessage.split(" ").slice(0, 3).join(" "))) {
      return response
    }
  }
  
  return `I understand you're asking about "${message}". As your cybersecurity assistant, I can help with:

- Password security and management
- Two-factor authentication setup
- Phishing and scam prevention
- Network security assessment
- Privacy protection tips
- Malware prevention
- Data breach monitoring

Could you provide more details about your security concern so I can give you specific guidance?`
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your CyberSync security assistant. I can help you with cybersecurity questions, threat analysis, and security best practices. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(userMessage.content),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
    textareaRef.current?.focus()
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-screen pt-14 md:pt-0">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/50 backdrop-blur-sm p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Security Assistant</h1>
            <p className="text-sm text-muted-foreground">AI-powered cybersecurity guidance</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 max-w-3xl",
              message.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.role === "assistant"
                  ? "bg-primary/20"
                  : "bg-secondary"
              )}
            >
              {message.role === "assistant" ? (
                <Shield className="w-4 h-4 text-primary" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {/* Message content */}
            <div
              className={cn(
                "group relative rounded-xl px-4 py-3 max-w-[85%]",
                message.role === "assistant"
                  ? "bg-card border border-border"
                  : "bg-primary text-primary-foreground"
              )}
            >
              <div
                className={cn(
                  "text-sm whitespace-pre-wrap prose prose-sm max-w-none",
                  message.role === "assistant"
                    ? "prose-invert text-foreground"
                    : "text-primary-foreground"
                )}
                dangerouslySetInnerHTML={{
                  __html: message.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br />"),
                }}
              />

              {/* Copy button for assistant messages */}
              {message.role === "assistant" && (
                <button
                  onClick={() => handleCopy(message.content, message.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-secondary"
                  aria-label="Copy message"
                >
                  {copiedId === message.id ? (
                    <Check className="w-4 h-4 text-cyber-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Analyzing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div className="flex-shrink-0 px-4 md:px-6 pb-4">
          <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="px-3 py-2 text-sm bg-card border border-border rounded-lg hover:bg-secondary hover:border-primary/50 transition-colors text-foreground"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-border bg-card/50 backdrop-blur-sm p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a security question..."
            className="min-h-[48px] max-h-32 resize-none bg-input border-border focus:border-primary focus:ring-primary"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 p-0"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-3">
          CyberSync AI provides general security guidance. For critical issues, consult a professional.
        </p>
      </div>
    </div>
  )
}
