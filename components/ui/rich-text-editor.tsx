"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Link,
  Unlink,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Sun,
  Moon,
  Columns,
  PanelLeft
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isRTL?: boolean;
}

type ViewMode = 'edit' | 'preview' | 'split';
type Theme = 'light' | 'dark';

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start typing...", 
  className,
  disabled = false,
  isRTL = false
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isComposingRef = useRef(false);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');
  const [theme, setTheme] = useState<Theme>('light');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    updateCounts();
  }, [value]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const updateCounts = () => {
    const text = editorRef.current?.innerText || '';
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  const execCommand = (command: string, value?: string) => {
    if (disabled) return;
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current && !isComposingRef.current) {
      onChange(editorRef.current.innerHTML);
      updateCounts();
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const removeLink = () => {
    execCommand('unlink');
  };

  const clearFormatting = () => {
    execCommand('removeFormat');
    execCommand('formatBlock', 'div');
  };

  const formatList = (type: 'bullet' | 'number') => {
    const command = type === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList';
    execCommand(command);
  };

  const formatHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toolbarGroups = [
    {
      name: 'Format',
      buttons: [
        { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
        { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
        { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)' },
      ]
    },
    {
      name: 'Headings',
      buttons: [
        { icon: Heading1, command: 'formatBlock', value: 'h1', title: 'Heading 1' },
        { icon: Heading2, command: 'formatBlock', value: 'h2', title: 'Heading 2' },
        { icon: Heading3, command: 'formatBlock', value: 'h3', title: 'Heading 3' },
        { icon: Type, command: 'formatBlock', value: 'p', title: 'Paragraph' },
      ]
    },
    {
      name: 'Lists',
      buttons: [
        { 
          icon: List, 
          action: () => formatList('bullet'), 
          title: 'Bullet List',
          isActive: () => document.queryCommandState('insertUnorderedList')
        },
        { 
          icon: ListOrdered, 
          action: () => formatList('number'), 
          title: 'Numbered List',
          isActive: () => document.queryCommandState('insertOrderedList')
        },
      ]
    },
    {
      name: 'Alignment',
      buttons: [
        { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
        { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
        { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
      ]
    },
    {
      name: 'Blocks',
      buttons: [
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
      ]
    }
  ];

  const viewModes = [
    { mode: 'edit' as ViewMode, icon: PanelLeft, title: 'Edit Mode' },
    { mode: 'split' as ViewMode, icon: Columns, title: 'Split View' },
    { mode: 'preview' as ViewMode, icon: Eye, title: 'Preview Mode' },
  ];

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<u>$1</u>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  const getPreviewContent = () => {
    return { __html: value || formatText(placeholder) };
  };

  return (
    <div className={cn(
      "overflow-hidden rounded-lg border transition-colors",
      theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white',
      className
    )}>
      {/* Enhanced Toolbar */}
      <div className={cn(
        "flex flex-wrap items-center justify-between border-b p-3",
        theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      )}>
        <div className="flex flex-wrap items-center gap-2">
          {toolbarGroups.map((group, groupIndex) => (
            <div key={group.name} className="flex items-center gap-1">
              {group.buttons.map((button, btnIndex) => (
                <Button
                  key={`${group.name}-${btnIndex}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => button.action ? button.action() : execCommand(button.command, button.value)}
                  disabled={disabled}
                  className={cn(
                    "size-8 p-0 transition-all",
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-200',
                    button.isActive?.() && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  )}
                  title={button.title}
                >
                  <button.icon className="size-4" />
                </Button>
              ))}
              {groupIndex < toolbarGroups.length - 1 && (
                <div className={cn(
                  "mx-2 h-6 w-px",
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                )} />
              )}
            </div>
          ))}
          
          {/* Links Group */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={insertLink}
              disabled={disabled}
              className={cn(
                "size-8 p-0",
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-200'
              )}
              title="Insert Link"
            >
              <Link className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeLink}
              disabled={disabled}
              className={cn(
                "size-8 p-0",
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-200'
              )}
              title="Remove Link"
            >
              <Unlink className="size-4" />
            </Button>
          </div>

          <div className={cn(
            "mx-2 h-6 w-px",
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
          )} />

          {/* History Group */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('undo')}
              disabled={disabled}
              className={cn(
                "size-8 p-0",
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-200'
              )}
              title="Undo"
            >
              <Undo className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('redo')}
              disabled={disabled}
              className={cn(
                "size-8 p-0",
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-200'
              )}
              title="Redo"
            >
              <Redo className="size-4" />
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-4">
          {/* Word Count */}
          <div className={cn(
            "rounded px-2 py-1 text-sm",
            theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
          )}>
            {wordCount} words • {charCount} chars
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center gap-1">
            {viewModes.map(({ mode, icon: Icon, title }) => (
              <Button
                key={mode}
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(mode)}
                className={cn(
                  "size-8 p-0",
                  theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-200',
                  viewMode === mode && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                )}
                title={title}
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
              "size-8 p-0",
              theme === 'dark' 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-200'
            )}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className={cn(
        "flex",
        viewMode === 'split' ? 'flex-row' : 'flex-col'
      )}>
        {/* Editor */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div
            ref={editorRef}
            contentEditable={!disabled}
            onInput={handleInput}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            className={cn(
              "min-h-[300px] p-6 transition-colors focus:outline-none",
              "prose prose-lg max-w-none",
              "prose-headings:font-bold prose-headings:text-gray-900",
              "prose-p:leading-relaxed prose-p:text-gray-700",
              "prose-strong:font-bold prose-strong:text-gray-900",
              "prose-em:italic prose-em:text-gray-700",
              "prose-blockquote:rounded-r prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:italic",
              "prose-ol:list-decimal prose-ul:list-disc prose-li:marker:text-gray-400",
              "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
              "prose-code:rounded prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm",
              "prose-pre:overflow-x-auto prose-pre:rounded prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-gray-100",
              disabled && "cursor-not-allowed opacity-50",
              isRTL && "text-right",
              theme === 'dark' && [
                "dark:prose-invert",
                "prose-headings:text-gray-100",
                "prose-p:text-gray-300",
                "prose-strong:text-gray-100",
                "prose-em:text-gray-300",
                "prose-blockquote:border-blue-400 prose-blockquote:bg-gray-800",
                "prose-li:marker:text-gray-500",
                "prose-a:text-blue-400",
                "prose-code:bg-gray-800 prose-code:text-gray-200",
                "bg-gray-900 text-gray-100"
              ],
              theme === 'light' && "bg-white text-gray-900",
              viewMode === 'split' ? 'flex-1 border-r' : 'w-full'
            )}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            data-placeholder={placeholder}
            suppressContentEditableWarning
          />
        )}

        {/* Preview */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div
            className={cn(
              "prose prose-lg min-h-[300px] max-w-none p-6",
              "prose-headings:font-bold",
              "prose-p:leading-relaxed",
              "prose-strong:font-bold",
              "prose-em:italic",
              "prose-blockquote:rounded-r prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:italic",
              "prose-ol:list-decimal prose-ul:list-disc",
              "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
              "prose-code:rounded prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm",
              "prose-pre:overflow-x-auto prose-pre:rounded prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-gray-100",
              isRTL && "text-right",
              theme === 'dark' && [
                "dark:prose-invert",
                "prose-blockquote:bg-gray-800",
                "prose-code:bg-gray-800",
                "bg-gray-900 text-gray-100"
              ],
              theme === 'light' && "bg-gray-50 text-gray-900",
              viewMode === 'split' ? 'flex-1' : 'w-full'
            )}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            dangerouslySetInnerHTML={getPreviewContent()}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className={cn(
        "flex items-center justify-between border-t px-4 py-2 text-sm",
        theme === 'dark' 
          ? 'border-gray-700 bg-gray-800 text-gray-400' 
          : 'border-gray-200 bg-gray-50 text-gray-500'
      )}>
        <div className="flex items-center gap-4">
          <button
            onClick={clearFormatting}
            className="transition-colors hover:text-blue-600"
          >
            Clear Formatting
          </button>
          <span>•</span>
          <span>HTML Supported</span>
        </div>
        <div>
          {viewMode === 'split' ? 'Split View' : viewMode === 'preview' ? 'Preview Mode' : 'Edit Mode'}
        </div>
      </div>
    </div>
  );
}

// Add missing Eye icon
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);