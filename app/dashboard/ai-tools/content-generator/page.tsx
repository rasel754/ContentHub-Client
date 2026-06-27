'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Copy, Download, Loader2, Sparkles, FileText } from 'lucide-react';
import { useGenerateContent } from '@/hooks/useAI';
import { useToast } from '@/components/ui/toast';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get('type') || 'blog';
  
  // Align rawType to supported backend types
  const contentType = ['blog', 'caption', 'summary'].includes(rawType) ? rawType : 'blog';

  const { success } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generated, setGenerated] = useState('');
  
  const generateContentMutation = useGenerateContent();

  const contentTypes = [
    { value: 'blog', label: 'Blog Article', placeholder: 'Write an article about the benefits of modular clean code in software engineering...' },
    { value: 'caption', label: 'Social Caption', placeholder: 'Create a engaging social media caption about our new platform launch...' },
    { value: 'summary', label: 'Text Summary', placeholder: 'Summarize the core concepts of software design patterns and best practices...' },
  ];

  const currentType = contentTypes.find((t) => t.value === contentType) || contentTypes[0];

  const handleGenerate = async () => {
    if (!prompt.trim() || generateContentMutation.isPending) return;

    try {
      const result = await generateContentMutation.mutateAsync({
        prompt: prompt.trim(),
        type: contentType as 'blog' | 'caption' | 'summary',
      });
      setGenerated(result.output || '');
    } catch (err) {
      // Error handles inside mutation onError toast
      console.error('Error generating content:', err);
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(generated);
      success('Copied to clipboard!');
    }
  };

  const downloadAsFile = () => {
    if (typeof window !== 'undefined') {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generated));
      element.setAttribute('download', `generated-${contentType}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      success('File downloaded successfully!');
    }
  };

  const isLoading = generateContentMutation.isPending;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold">AI Content Generator</h1>
        </div>
        <p className="text-muted-foreground">Create amazing content with AI and save it to your database</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
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
                    // Update search params on selection
                    const url = new URL(window.location.href);
                    url.searchParams.set('type', type.value);
                    window.history.pushState({}, '', url.pathname + url.search);
                  }}
                  className={`p-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    contentType === type.value
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background border-muted hover:border-primary/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
            <label className="block text-sm font-bold text-foreground">Your Prompt / Instructions</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={currentType.placeholder}
              rows={8}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base disabled:opacity-60"
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Be specific and detailed for best results</span>
              <span>{prompt.length} chars</span>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="w-full shadow-md py-6 rounded-xl text-base font-bold"
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
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
              Generated Output
            </h2>
            <div className="border rounded-xl p-4 bg-muted/30 min-h-96 max-h-96 overflow-y-auto relative">
              {generated ? (
                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                  {generated}
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground animate-pulse">Consulting LLM models, please wait...</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Your generated content will appear here
                </div>
              )}
            </div>
          </div>

          {generated && !isLoading && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={copyToClipboard} className="flex-1 py-5 rounded-xl text-sm font-semibold">
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </Button>
              <Button variant="outline" onClick={downloadAsFile} className="flex-1 py-5 rounded-xl text-sm font-semibold">
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
    <Suspense fallback={<div className="p-6 text-center text-muted-foreground">Loading Generator Workspace...</div>}>
      <GeneratorContent />
    </Suspense>
  );
}
