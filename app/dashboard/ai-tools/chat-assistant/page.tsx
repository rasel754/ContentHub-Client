'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Send, Loader2, MessageSquare, Trash2, Plus, Sparkles, MessageCircle } from 'lucide-react';
import {
  useCreateSession,
  useChatSessions,
  useSessionMessages,
  useDeleteSession,
} from '@/hooks/useChat';
import { useChatWithAI } from '@/hooks/useAI';
import { Skeleton } from '@/components/ui/skeleton';

const chatMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ChatMessageFormData = z.infer<typeof chatMessageSchema>;

export default function ChatAssistantPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API hooks
  const { data: sessionsData, isLoading: isSessionsLoading } = useChatSessions();
  const sessions = sessionsData?.data || [];

  const createSessionMutation = useCreateSession();
  const deleteSessionMutation = useDeleteSession();
  const chatMutation = useChatWithAI();

  // Load messages if a session is active
  const { data: messages = [], isLoading: isMessagesLoading } = useSessionMessages(
    activeSessionId || ''
  );

  // Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ChatMessageFormData>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      message: '',
    },
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatMutation.isPending]);

  // Handle session selection
  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    reset({ message: '' });
  };

  // Start a fresh workspace
  const handleNewChat = () => {
    setActiveSessionId(null);
    reset({ message: '' });
  };

  // Handle session deletion
  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSessionMutation.mutate(id, {
      onSuccess: () => {
        if (activeSessionId === id) {
          setActiveSessionId(null);
        }
      },
    });
  };

  // Handle sending a message
  const onSubmitMessage = async (data: ChatMessageFormData) => {
    if (chatMutation.isPending || createSessionMutation.isPending) return;

    const messageText = data.message.trim();
    reset({ message: '' });

    try {
      let sessionId = activeSessionId;

      // If no active session, create one first
      if (!sessionId) {
        const title = messageText.length > 30 ? messageText.substring(0, 30) + '...' : messageText;
        const newSession = await createSessionMutation.mutateAsync(title);
        sessionId = newSession._id;
        setActiveSessionId(sessionId);
      }

      // Send chat request
      await chatMutation.mutateAsync({
        conversationId: sessionId,
        message: messageText,
      });
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const isSubmitting = chatMutation.isPending || createSessionMutation.isPending;

  return (
    <div className="h-full flex bg-background divide-x divide-muted overflow-hidden animate-in fade-in duration-300">
      {/* Sidebar: Chat History List */}
      <div className="hidden md:flex flex-col w-64 lg:w-72 bg-card/40 flex-shrink-0">
        <div className="p-4 border-b">
          <Button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl text-sm font-bold shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Chat Assistant
          </Button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">History Sessions</p>
          {isSessionsLoading ? (
            <div className="space-y-2 p-2">
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((sess) => (
              <div
                key={sess._id}
                onClick={() => handleSelectSession(sess._id)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer text-sm font-semibold transition-all select-none ${
                  activeSessionId === sess._id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageCircle className="w-4.5 h-4.5 flex-shrink-0" />
                  <span className="truncate pr-1 leading-none">{sess.title}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDeleteSession(e, sess._id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-current transition-opacity"
                  disabled={deleteSessionMutation.isPending}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground text-xs font-semibold">
              No historical sessions found
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Header */}
        <div className="border-b p-4 sm:p-5 flex items-center justify-between shadow-sm bg-card/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight flex items-center gap-2">
                AI Chat Assistant
                {activeSessionId && (
                  <span className="hidden sm:inline-block text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Connected
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground text-xs font-medium">Contextual conversational AI helper</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="md:hidden flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
            {activeSessionId && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleDeleteSession(e, activeSessionId)}
                disabled={deleteSessionMutation.isPending}
                className="text-destructive border-destructive/20 bg-destructive/5 hover:bg-destructive/10 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline ml-1.5 font-semibold">Clear History</span>
              </Button>
            )}
          </div>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!activeSessionId && messages.length === 0 ? (
            // Empty State Welcome Screen
            <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary border shadow-sm">
                <Sparkles className="w-8 h-8 animate-pulse text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Meet Your Contextual Chat Assistant</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Type your first question below to start a chat session. The assistant retains message context throughout the session.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-left w-full pt-4">
                <div
                  onClick={() => setValue('message', 'Explain the core benefits of SOLID design principles.')}
                  className="p-3.5 border rounded-2xl hover:border-primary/40 cursor-pointer bg-card/30 transition-colors hover:shadow-sm"
                >
                  <span className="font-bold block mb-1 text-emerald-600 dark:text-emerald-400">💡 Software Engineering</span>
                  Explain the core benefits of SOLID design...
                </div>
                <div
                  onClick={() => setValue('message', 'Write a clean node script executing sequential files.')}
                  className="p-3.5 border rounded-2xl hover:border-primary/40 cursor-pointer bg-card/30 transition-colors hover:shadow-sm"
                >
                  <span className="font-bold block mb-1 text-emerald-600 dark:text-emerald-400">💻 Scripting & Logic</span>
                  Write a clean node script executing...
                </div>
              </div>
            </div>
          ) : isMessagesLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-2/3 rounded-2xl rounded-bl-none" />
              <Skeleton className="h-20 w-1/2 ml-auto rounded-2xl rounded-br-none" />
              <Skeleton className="h-16 w-3/4 rounded-2xl rounded-bl-none" />
            </div>
          ) : (
            // Message list
            messages.map((message) => {
              const isAI = message.role === 'assistant';
              return (
                <div
                  key={message._id}
                  className={`flex ${!isAI ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                >
                  <div
                    className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm text-sm border leading-relaxed ${
                      !isAI
                        ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/20'
                        : 'bg-card text-foreground rounded-tl-none border-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="flex justify-end pt-1 mt-1.5 border-t border-white/10 dark:border-black/5">
                      <span className={`text-[10px] ${!isAI ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Thinking loader */}
          {isSubmitting && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-card text-foreground rounded-2xl rounded-tl-none border border-muted px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold animate-pulse">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="border-t p-4 sm:p-5 bg-card/10 shadow-sm">
          <form onSubmit={handleSubmit(onSubmitMessage)} className="space-y-2">
            <div className="flex gap-3">
              <input
                type="text"
                {...register('message')}
                placeholder={
                  activeSessionId
                    ? 'Send a follow-up message...'
                    : 'Start a new conversation session...'
                }
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm sm:text-base transition-all"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="gap-2 shadow-sm rounded-2xl px-6 cursor-pointer font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
            {errors.message && (
              <p className="text-xs text-destructive font-semibold pl-2">
                {errors.message.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

