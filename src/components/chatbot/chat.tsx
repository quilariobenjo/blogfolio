"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, MessageCircle } from "lucide-react"
import { getResponse } from "@/lib/ai-responses"
import { CustomMDX } from "../mdx-content"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = getResponse(input)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "Are you available for hire?",
  ]

  return (
    <section className="from-background to-muted/20 bg-gradient-to-b px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mb-4 inline-flex items-center justify-center rounded-full p-2">
            <MessageCircle className="text-primary h-8 w-8" />
          </div>
          <h2 className="mb-2 text-3xl font-bold">Chat with My AI Assistant</h2>
          <p className="text-muted-foreground">
            Ask anything about my skills, experience, or projects!
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <div className="flex h-[600px] flex-col">
            <div className="bg-muted/50 border-b p-4">
              <div className="flex items-center gap-2">
                <Bot className="text-primary h-5 w-5" />
                <span className="font-semibold">Portfolio Assistant</span>
                <span className="text-muted-foreground ml-auto text-xs">
                  Always Online
                </span>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="py-12 text-center">
                    <Bot className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                    <p className="mb-2 text-lg font-medium">
                      Welcome! I'm here to help.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Ask me anything about [Your Name]'s background and work.
                    </p>
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">
                        Quick questions:
                      </p>
                      <div
                        className="justify ``` ```typescript center
flex flex-wrap
                      gap-2"
                      >
                        {quickQuestions.map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setInput(question)
                            }}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "user" ? (
                        <p>{message.content}</p>
                      ) : (
                        <CustomMDX source={message.content} />
                      )}
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="bg-foreground/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                        <div className="bg-foreground/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                        <div className="bg-foreground/60 h-2 w-2 animate-bounce rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills, experience, or projects..."
                  className="flex-1"
                />
                <Button type="submit" disabled={isTyping || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </section>
  )
}
