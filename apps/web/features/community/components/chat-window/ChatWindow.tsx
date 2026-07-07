/**
 * @file features/community/components/chat-window/ChatWindow.tsx
 * @description Study group real-time chat window component
 *
 * Features:
 * - Message list with sender name, avatar, timestamp
 * - Message input box with send button
 * - "Typing..." indicator (demo)
 * - System messages (join/leave events)
 * - Demo mode with static messages
 *
 * Used in: Community study groups, live battle lobby, teacher channels
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Badge }  from "@/components/ui/badge";

/* ─── Message type ───────────────────────────────────────────────────────── */
interface ChatMessage {
  id:       string;
  sender:   string;       // Display name
  avatar:   string;       // Initials
  color:    string;       // Tailwind bg class
  content:  string;
  time:     string;
  isSystem?: boolean;     // System event (join/leave)
  isSelf?:   boolean;     // Current user's own message
}

/* ─── Demo messages ──────────────────────────────────────────────────────── */
const DEMO_MESSAGES: ChatMessage[] = [
  { id:"m0", sender:"System", avatar:"S", color:"bg-muted", content:"Arjun Sharma joined the group 📚", time:"10:30 AM", isSystem:true },
  { id:"m1", sender:"Priya Sharma", avatar:"PS", color:"bg-blue-500",   content:"Hey everyone! Today we're covering Chapter 4 — Quadratic Equations. Let's start with the discriminant concept.", time:"10:32 AM" },
  { id:"m2", sender:"Arjun Sharma", avatar:"AS", color:"bg-green-500",  content:"Perfect timing. I just finished reading it. The discriminant part confused me — can we go over that?", time:"10:33 AM" },
  { id:"m3", sender:"Sneha Patel",  avatar:"SP", color:"bg-purple-500", content:"Same here! Also, should we attempt the NCERT examples before the exercises?", time:"10:34 AM" },
  { id:"m4", sender:"Priya Sharma", avatar:"PS", color:"bg-blue-500",   content:"Yes — NCERT examples first. b²-4ac tells you the nature of roots. If D > 0 → 2 real roots, D = 0 → 1 real root, D < 0 → no real roots.", time:"10:35 AM" },
  { id:"m5", sender:"Me",           avatar:"ME",color:"bg-brand-500",   content:"That makes sense! So for x² - 5x + 6 = 0, D = 25 - 24 = 1 > 0, two real roots.", time:"10:36 AM", isSelf:true },
  { id:"m6", sender:"Priya Sharma", avatar:"PS", color:"bg-blue-500",   content:"Exactly! You're getting it 🎉 Now solve for the roots using the formula.", time:"10:37 AM" },
];

/* ─── ChatWindow Component ───────────────────────────────────────────────── */
export function ChatWindow({ groupName = "Class 10 Maths", memberCount = 24 }: { groupName?: string; memberCount?: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MESSAGES);
  const [text,     setText]     = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  /** Send message (local only in demo mode) */
  function sendMessage() {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      sender: "Me", avatar: "ME", color: "bg-brand-500",
      content: text.trim(), time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
      isSelf: true,
    };
    setMessages(prev => [...prev, msg]);
    setText("");
  }

  return (
    <div className="flex flex-col h-full rounded-2xl border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div>
          <p className="font-semibold text-sm text-foreground">{groupName}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" /> {memberCount} members
          </p>
        </div>
        <Badge variant="outline" className="text-xs border-green-500/40 text-green-600 gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" /> Live
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id}>
            {msg.isSystem ? (
              // System message
              <p className="text-center text-xs text-muted-foreground py-1">{msg.content}</p>
            ) : msg.isSelf ? (
              // Own message — right aligned
              <div className="flex justify-end gap-2">
                <div className="max-w-[75%]">
                  <div className="bg-brand-500 text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm">{msg.content}</div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</p>
                </div>
                <div className={`h-7 w-7 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>{msg.avatar}</div>
              </div>
            ) : (
              // Other's message — left aligned
              <div className="flex gap-2">
                <div className={`h-7 w-7 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>{msg.avatar}</div>
                <div className="max-w-[75%]">
                  <p className="text-xs text-muted-foreground mb-1">{msg.sender} · {msg.time}</p>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-foreground">{msg.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t bg-card">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Type a message..."
          className="flex-1 h-9 text-sm"
        />
        <Button size="sm" className="h-9 w-9 p-0" onClick={sendMessage} disabled={!text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
