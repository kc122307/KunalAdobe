import React, { useState } from 'react';
import { aiService, AiDesignGeneration } from '../../services/aiService';
import { fabricServiceInstance } from '../../services/fabricService';
import { useEditorStore } from '../../store/useEditorStore';
import { Sparkles, Wand2, Type, Palette, Layout, Key, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AiAssistantPanel: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Summer fitness bootcamp 50% discount');
  const [style, setStyle] = useState<string>('vibrant');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<AiDesignGeneration | null>(null);

  // AI Provider settings
  const [aiProvider, setAiProvider] = useState<'groq' | 'gemini' | 'offline'>(
    () => (localStorage.getItem('ai_provider') as any) || 'groq'
  );
  const [groqKey, setGroqKey] = useState<string>(
    () => localStorage.getItem('groq_api_key') || (import.meta.env.VITE_GROQ_API_KEY as string) || ''
  );
  const [geminiKey, setGeminiKey] = useState<string>(
    () => localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || ''
  );
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  const { setCanvasDimensions, setProjectName, incrementLayersVersion } = useEditorStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      if (aiProvider === 'groq' && groqKey && groqKey.trim()) {
        const result = await aiService.generateWithGroq(prompt, style, groqKey);
        setGeneratedResult(result);
      } else if (aiProvider === 'gemini' && geminiKey && geminiKey.trim()) {
        const result = await aiService.generateWithGemini(prompt, style, geminiKey);
        setGeneratedResult(result);
      } else {
        // Built-in intelligent procedural heuristic engine
        await new Promise((r) => setTimeout(r, 300));
        const result = aiService.generateDesignFromPrompt(prompt, style);
        setGeneratedResult(result);
      }
    } catch (err) {
      console.warn('AI generation error, using fallback generator:', err);
      const result = aiService.generateDesignFromPrompt(prompt, style);
      setGeneratedResult(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyFullLayout = () => {
    if (!generatedResult) return;

    setCanvasDimensions(generatedResult.width, generatedResult.height, generatedResult.category);
    setProjectName(generatedResult.title);

    fabricServiceInstance.loadTemplate({
      id: 'ai-' + Date.now(),
      title: generatedResult.title,
      category: generatedResult.category as any,
      width: generatedResult.width,
      height: generatedResult.height,
      thumbnail: '',
      description: 'AI Generated Design',
      backgroundColor: generatedResult.backgroundColor,
      elements: generatedResult.elements,
    });

    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch (e) {}
  };

  const handleInsertText = (text: string, type: 'heading' | 'subheading' | 'body') => {
    fabricServiceInstance.addText(type, {
      text,
      fill: style === 'minimal' ? '#1c1917' : '#ffffff',
    });
  };

  const handleApplyPalette = (palette: string[]) => {
    if (palette.length > 0) {
      fabricServiceInstance.setBackgroundColor(palette[0]);
    }
  };

  const saveProvider = (provider: 'groq' | 'gemini' | 'offline') => {
    setAiProvider(provider);
    localStorage.setItem('ai_provider', provider);
  };

  const saveGroqKey = (key: string) => {
    setGroqKey(key);
    localStorage.setItem('groq_api_key', key);
  };

  const saveGeminiKey = (key: string) => {
    setGeminiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">AI Design Assistant</h2>
          </div>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showKeyInput || (aiProvider === 'groq' && groqKey) || (aiProvider === 'gemini' && geminiKey)
                ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                : 'border-[#383838] text-gray-500 hover:text-gray-300'
            }`}
            title="Configure AI Provider & Keys"
          >
            <Key className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Provider Selector Tabs */}
        <div className="grid grid-cols-3 p-1 bg-[#252525] rounded-xl border border-[#333333] mb-2.5">
          <button
            onClick={() => saveProvider('groq')}
            className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
              aiProvider === 'groq' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚡ Groq
          </button>
          <button
            onClick={() => saveProvider('gemini')}
            className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
              aiProvider === 'gemini' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            ✨ Gemini
          </button>
          <button
            onClick={() => saveProvider('offline')}
            className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
              aiProvider === 'offline' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            📦 Offline
          </button>
        </div>

        {/* API Key Configuration Drawer (visible if no key or toggled) */}
        {(showKeyInput || (aiProvider === 'groq' && !groqKey) || (aiProvider === 'gemini' && !geminiKey)) && (
          <div className="p-3 bg-[#252525] rounded-xl border border-[#383838] space-y-2.5 mb-2 animate-in fade-in duration-150">
            {aiProvider === 'groq' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>⚡ Groq API Key</span>
                    {groqKey && <span className="text-emerald-400 font-normal">✓ Active</span>}
                  </label>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-orange-400 hover:text-orange-300 underline font-medium"
                  >
                    Get Free Key &rarr;
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="Paste gsk_... here"
                  value={groqKey}
                  onChange={(e) => saveGroqKey(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#181818] border border-orange-500/50 focus:border-orange-500 rounded-lg text-xs text-white focus:outline-none font-mono"
                />
                <span className="text-[10px] text-gray-400 block mt-1">
                  Using <strong>Llama 3.3 70B</strong> on Groq LPUs. (Or set in <code className="text-orange-300">.env</code>: <code className="text-orange-300">VITE_GROQ_API_KEY</code>).
                </span>
              </div>
            )}

            {aiProvider === 'gemini' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>✨ Gemini API Key</span>
                    {geminiKey && <span className="text-emerald-400 font-normal">✓ Active</span>}
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Get Free Key &rarr;
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="Paste AIzaSy... here"
                  value={geminiKey}
                  onChange={(e) => saveGeminiKey(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#181818] border border-blue-500/50 focus:border-blue-500 rounded-lg text-xs text-white focus:outline-none font-mono"
                />
                <span className="text-[10px] text-gray-400 block mt-1">
                  Using <strong>Google Gemini 1.5 Flash</strong>.
                </span>
              </div>
            )}

            {aiProvider === 'offline' && (
              <div className="text-[11px] text-gray-400 leading-relaxed">
                Using built-in procedural heuristic generator. Runs 100% locally with zero keys or internet.
              </div>
            )}
          </div>
        )}

        {/* Status indicator when key is already configured and drawer closed */}
        {!showKeyInput && aiProvider === 'groq' && groqKey && (
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#252525] border border-[#383838] mb-2 text-[11px]">
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Groq Llama 3.3 Connected
            </span>
            <button
              onClick={() => setShowKeyInput(true)}
              className="text-gray-400 hover:text-white text-[10px] underline"
            >
              Change Key
            </button>
          </div>
        )}

        {!showKeyInput && aiProvider === 'gemini' && geminiKey && (
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#252525] border border-[#383838] mb-2 text-[11px]">
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Gemini 1.5 Flash Connected
            </span>
            <button
              onClick={() => setShowKeyInput(true)}
              className="text-gray-400 hover:text-white text-[10px] underline"
            >
              Change Key
            </button>
          </div>
        )}

        <p className="text-[11px] text-gray-400">
          {aiProvider === 'groq'
            ? 'Powered by Groq LPUs & Llama 3.3 for lightning-fast design synthesis.'
            : aiProvider === 'gemini'
            ? 'Powered by Google Gemini 1.5 Flash.'
            : 'Using built-in procedural engine with zero keys required.'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Prompt Input */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
            Prompt / Design Idea
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Modern tech conference banner with keynote speakers and discount code..."
            className="w-full p-3 bg-[#252525] border border-[#383838] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />

          {/* Quick prompt suggestions */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              'Tech podcast episode thumbnail',
              'Summer Mega Sale 50% off',
              'Coffee shop grand opening flyer',
              'Startup Pitch Deck title slide',
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#252525] text-gray-400 hover:text-white hover:bg-[#333333] transition-colors"
              >
                + {p}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
            Aesthetic Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'vibrant', label: 'Bold & Vibrant' },
              { id: 'minimal', label: 'Modern Minimalist' },
              { id: 'cyber', label: 'Cyber / Neon Tech' },
              { id: 'nature', label: 'Artisan & Earthy' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                  style === s.id
                    ? 'border-purple-500 bg-purple-500/10 text-white'
                    : 'border-[#333333] bg-[#252525] text-gray-400 hover:text-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4" />
          <span>{isGenerating ? 'Generating Suggestions...' : 'Generate with AI'}</span>
        </button>

        {/* Results Area */}
        {generatedResult && (
          <div className="space-y-4 pt-2 border-t border-[#2d2d2d] animate-in fade-in duration-200">
            {/* 1. Full Layout Apply Card */}
            <div className="p-3.5 bg-gradient-to-br from-[#2a1b4e] to-[#1e1e2f] border border-purple-500/40 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5" />
                  Generated Layout Ready
                </span>
                <span className="text-[10px] text-gray-400">
                  {generatedResult.width} × {generatedResult.height} px
                </span>
              </div>
              <p className="text-[11px] text-gray-300 mb-3">
                Complete responsive layout with matching background, headline, and badges.
              </p>
              <button
                onClick={handleApplyFullLayout}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5"
              >
                <span>Apply Layout to Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Color Palette */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  Harmonious Palette
                </span>
                <button
                  onClick={() => handleApplyPalette(generatedResult.colorPalette)}
                  className="text-[10px] text-purple-400 hover:underline"
                >
                  Set as BG
                </button>
              </div>
              <div className="flex rounded-xl overflow-hidden h-9 border border-[#383838]">
                {generatedResult.colorPalette.map((col, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: col }}
                    className="flex-1 cursor-pointer transition-transform hover:scale-105"
                    title={`Click to copy: ${col}`}
                    onClick={() => navigator.clipboard.writeText(col)}
                  />
                ))}
              </div>
            </div>

            {/* 3. AI Generated Copy */}
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" />
                Suggested Headlines
              </span>
              <div className="space-y-1.5">
                {generatedResult.copySuggestions.headlines.map((hl, i) => (
                  <button
                    key={i}
                    onClick={() => handleInsertText(hl, 'heading')}
                    className="w-full text-left p-2 rounded-lg bg-[#252525] hover:bg-[#2f2f2f] text-xs font-semibold text-gray-200 hover:text-white border border-[#333333] transition-colors truncate"
                    title="Click to insert"
                  >
                    "{hl}"
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Actions */}
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Call To Action Phrases
              </span>
              <div className="space-y-1.5">
                {generatedResult.copySuggestions.callToActions.map((cta, i) => (
                  <button
                    key={i}
                    onClick={() => handleInsertText(cta, 'subheading')}
                    className="w-full text-left p-2 rounded-lg bg-[#252525] hover:bg-[#2f2f2f] text-xs font-medium text-gray-300 hover:text-white border border-[#333333] transition-colors truncate"
                    title="Click to insert"
                  >
                    • {cta}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

