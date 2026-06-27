'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Copy, Download, Loader2, Sparkles, FileText } from 'lucide-react';
import { useGenerateContent } from '@/hooks/useAI';
import { useToast } from '@/components/ui/toast';

const contentGeneratorSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, 'Prompt instructions must be at least 10 characters long')
    .max(1000, 'Prompt instructions cannot exceed 1000 characters'),
  type: z.enum(['blog', 'caption', 'summary']),
});

type ContentGeneratorFormData = z.infer<typeof contentGeneratorSchema>;

function GeneratorContent() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get('type') || 'blog';
  const urlContentType = ['blog', 'caption', 'summary'].includes(rawType) ? rawType : 'blog';

  const { success, error } = useToast();
  const [generated, setGenerated] = useState('');
  
  const generateContentMutation = useGenerateContent();

  const contentTypes = [
    { value: 'blog', label: 'Blog Article', placeholder: 'Write an article about the benefits of modular clean code in software engineering...' },
    { value: 'caption', label: 'Social Caption', placeholder: 'Create an engaging social media caption about our new platform launch...' },
    { value: 'summary', label: 'Text Summary', placeholder: 'Summarize the core concepts of software design patterns and best practices...' },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContentGeneratorFormData>({
    resolver: zodResolver(contentGeneratorSchema),
    defaultValues: {
      prompt: '',
      type: urlContentType as 'blog' | 'caption' | 'summary',
    },
  });

  const selectedType = watch('type');
  const currentPrompt = watch('prompt') || '';

  // Synchronize routing-initiated query param selection to react-hook-form
  useEffect(() => {
    setValue('type', urlContentType as 'blog' | 'caption' | 'summary');
  }, [urlContentType, setValue]);

  const currentType = contentTypes.find((t) => t.value === selectedType) || contentTypes[0];
  const isLoading = generateContentMutation.isPending;

  const onSubmit = async (data: ContentGeneratorFormData) => {
    try {
      const result = await generateContentMutation.mutateAsync({
        prompt: data.prompt.trim(),
        type: data.type,
      });
      setGenerated(result.output || '');
      success('AI content generated and saved to your library!');
    } catch (err: any) {
      console.error('Error generating content:', err);
      error(err.message || 'Failed to generate content with AI. Please check your quota.');
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(generated);
      success('Output copied to clipboard!');
    }
  };

  const downloadAsFile = () => {
    if (typeof window !== 'undefined') {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generated));
      element.setAttribute('download', `generated-${selectedType}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      success('File downloaded successfully!');
    }
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
        </div>
        <p className="text-muted-foreground">Create amazing content with AI and save it to your database</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-secondary" />
              Select Content Format
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setValue('type', type.value as 'blog' | 'caption' | 'summary');
                    const url = new URL(window.location.href);
                    url.searchParams.set('type', type.value);
                    window.history.pushState({}, '', url.pathname + url.search);
                  }}
                  disabled={isLoading}
                  className={`p-3.5 rounded-2xl border text-center text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedType === type.value
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background border-muted hover:border-primary/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-4">
            <label className="block text-sm font-bold text-foreground">Your Prompt / Instructions</label>
            <textarea
              {...register('prompt')}
              placeholder={currentType.placeholder}
              rows={8}
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base disabled:opacity-60 transition-all ${
                errors.prompt ? 'border-destructive focus:ring-destructive' : ''
              }`}
            />
            {errors.prompt && (
              <p className="text-xs text-destructive font-semibold animate-in slide-in-from-top-1">
                {errors.prompt.message}
              </p>
            )}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Be specific and detailed for best results</span>
              <span className="font-mono">{currentPrompt.length} / 1000 chars</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full shadow-md py-6 rounded-2xl text-base font-bold cursor-pointer"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </form>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
              Generated Output
            </h2>
            <div className="border rounded-2xl p-4 bg-muted/30 min-h-96 max-h-96 overflow-y-auto relative">
              {generated ? (
                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                  {generated}
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground animate-pulse font-semibold">Consulting LLM models, please wait...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm space-y-2">
                  <Sparkles className="w-8 h-8 text-muted-foreground/45" />
                  <span>Your generated content will appear here</span>
                </div>
              )}
            </div>
          </div>

          {generated && !isLoading && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={copyToClipboard} className="flex-1 py-5 rounded-2xl text-sm font-semibold cursor-pointer">
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </Button>
              <Button variant="outline" onClick={downloadAsFile} className="flex-1 py-5 rounded-2xl text-sm font-semibold cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Download Text
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 rounded" />
        <Skeleton className="h-64 w-full rounded" />
      </div>
    }>
      <GeneratorContent />
    </Suspense>
  );
}

