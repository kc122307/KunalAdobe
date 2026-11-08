export interface AiDesignGeneration {
  title: string;
  category: 'social' | 'banner' | 'poster' | 'presentation';
  width: number;
  height: number;
  backgroundColor: string;
  colorPalette: string[];
  elements: any[];
  copySuggestions: {
    headlines: string[];
    subheadings: string[];
    callToActions: string[];
  };
}

export const aiService = {
  /**
   * Generates a complete design layout, copy, and color scheme based on user prompt
   */
  generateDesignFromPrompt(
    prompt: string,
    style: string = 'modern'
  ): AiDesignGeneration {
    const p = prompt.toLowerCase();

    // Determine category and dimensions based on prompt keywords
    let width = 1080;
    let height = 1080;
    let category: AiDesignGeneration['category'] = 'social';

    if (p.includes('youtube') || p.includes('thumbnail') || p.includes('video')) {
      width = 1280;
      height = 720;
      category = 'social';
    } else if (p.includes('story') || p.includes('reel') || p.includes('tiktok')) {
      width = 1080;
      height = 1920;
      category = 'social';
    } else if (p.includes('poster') || p.includes('flyer') || p.includes('event')) {
      width = 1200;
      height = 1800;
      category = 'poster';
    } else if (p.includes('banner') || p.includes('header') || p.includes('linkedin')) {
      width = 1200;
      height = 630;
      category = 'banner';
    } else if (p.includes('slide') || p.includes('presentation') || p.includes('pitch')) {
      width = 1920;
      height = 1080;
      category = 'presentation';
    }

    // Determine theme palette and typography style
    let bg = '#0f172a';
    let primary = '#38bdf8';
    let secondary = '#f43f5e';
    let textMain = '#ffffff';
    let textSub = '#94a3b8';
    let fontHeadline = 'Anton';
    let fontBody = 'Montserrat';
    let palette = ['#0f172a', '#1e293b', '#38bdf8', '#f43f5e', '#ffffff'];

    if (style === 'minimal' || p.includes('minimal') || p.includes('luxury') || p.includes('clean')) {
      bg = '#faf8f5';
      primary = '#1c1917';
      secondary = '#d97706';
      textMain = '#1c1917';
      textSub = '#78716c';
      fontHeadline = 'Playfair Display';
      fontBody = 'Inter';
      palette = ['#faf8f5', '#e7e5e4', '#d97706', '#44403c', '#1c1917'];
    } else if (style === 'vibrant' || p.includes('sale') || p.includes('discount') || p.includes('promo')) {
      bg = '#111827';
      primary = '#ef4444';
      secondary = '#facc15';
      textMain = '#ffffff';
      textSub = '#e5e7eb';
      fontHeadline = 'Anton';
      fontBody = 'Montserrat';
      palette = ['#111827', '#1f2937', '#ef4444', '#facc15', '#ffffff'];
    } else if (style === 'cyber' || p.includes('cyber') || p.includes('ai') || p.includes('tech') || p.includes('code')) {
      bg = '#070913';
      primary = '#00f0ff';
      secondary = '#ff007f';
      textMain = '#ffffff';
      textSub = '#38bdf8';
      fontHeadline = 'Anton';
      fontBody = 'Courier Prime';
      palette = ['#070913', '#121829', '#00f0ff', '#ff007f', '#ffe600'];
    } else if (style === 'nature' || p.includes('green') || p.includes('eco') || p.includes('coffee') || p.includes('food')) {
      bg = '#1c1917';
      primary = '#10b981';
      secondary = '#f59e0b';
      textMain = '#fafaf9';
      textSub = '#a8a29e';
      fontHeadline = 'Playfair Display';
      fontBody = 'Montserrat';
      palette = ['#1c1917', '#292524', '#10b981', '#f59e0b', '#ffffff'];
    }

    // Extract potential subject words
    const words = prompt.split(' ').filter(w => w.length > 2);
    const mainSubject = words.length > 0 ? words.slice(0, 3).join(' ').toUpperCase() : 'SPECIAL ANNOUNCEMENT';

    // Construct tailored copy
    const headlines = [
      mainSubject,
      `DISCOVER ${mainSubject}`,
      `THE NEW ${mainSubject}`
    ];

    const subheadings = [
      `Elevate your experience with next-generation results.`,
      `Exclusive limited release • Experience the difference today.`,
      `Join thousands of creators taking their work to the next level.`
    ];

    const callToActions = [
      'GET STARTED TODAY',
      'LEARN MORE',
      'CLAIM 50% OFF NOW'
    ];

    // Build editable canvas elements
    const elements: any[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Framing Card
    elements.push({
      type: 'rect',
      left: centerX,
      top: centerY,
      width: width * 0.92,
      height: height * 0.9,
      fill: palette[1] || '#1e293b',
      rx: 24,
      ry: 24,
      stroke: secondary,
      strokeWidth: 3,
      originX: 'center',
      originY: 'center',
      name: 'Background Card'
    });

    // 2. Decorative Top Tag / Badge
    elements.push({
      type: 'rect',
      left: centerX,
      top: centerY - height * 0.32,
      width: Math.min(width * 0.35, 340),
      height: 48,
      fill: secondary,
      rx: 24,
      ry: 24,
      originX: 'center',
      originY: 'center',
      name: 'Top Tag Badge'
    });

    elements.push({
      type: 'textbox',
      text: 'AI GENERATED DESIGN',
      left: centerX,
      top: centerY - height * 0.32 - 10,
      fontFamily: fontBody,
      fontSize: 20,
      fontWeight: 'bold',
      fill: '#ffffff',
      textAlign: 'center',
      charSpacing: 150,
      originX: 'center',
      originY: 'center',
      name: 'Top Tag Text'
    });

    // 3. Main Headline
    elements.push({
      type: 'textbox',
      text: headlines[0],
      left: centerX,
      top: centerY - height * 0.12,
      fontFamily: fontHeadline,
      fontSize: Math.round(Math.min(width, height) * 0.11),
      fill: textMain,
      textAlign: 'center',
      lineHeight: 0.95,
      originX: 'center',
      originY: 'center',
      name: 'Headline Text'
    });

    // 4. Subtitle / Description
    elements.push({
      type: 'textbox',
      text: subheadings[0],
      left: centerX,
      top: centerY + height * 0.08,
      fontFamily: fontBody,
      fontSize: Math.round(Math.min(width, height) * 0.034),
      fill: textSub,
      textAlign: 'center',
      lineHeight: 1.3,
      originX: 'center',
      originY: 'center',
      name: 'Subtitle Text'
    });

    // 5. Call To Action Button
    elements.push({
      type: 'rect',
      left: centerX,
      top: centerY + height * 0.26,
      width: Math.min(width * 0.45, 360),
      height: 60,
      fill: primary,
      rx: 14,
      ry: 14,
      originX: 'center',
      originY: 'center',
      name: 'CTA Button Box'
    });

    elements.push({
      type: 'textbox',
      text: callToActions[0],
      left: centerX,
      top: centerY + height * 0.26 - 10,
      fontFamily: fontBody,
      fontSize: 22,
      fontWeight: 'bold',
      fill: style === 'minimal' ? '#ffffff' : '#000000',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      name: 'CTA Button Text'
    });

    return {
      title: prompt.slice(0, 30) || 'AI Generated Project',
      category,
      width,
      height,
      backgroundColor: bg,
      colorPalette: palette,
      elements,
      copySuggestions: {
        headlines,
        subheadings,
        callToActions
      }
    };
  },

  /**
   * Helper to construct canvas elements and design metadata from structured AI JSON output
   */
  constructLayoutFromAiJson(
    parsed: any,
    prompt: string,
    modelBadge: string = 'AI CREATION'
  ): AiDesignGeneration {
    let width = 1080;
    let height = 1080;
    if (parsed.category === 'banner') {
      width = 1200;
      height = 630;
    } else if (parsed.category === 'poster') {
      width = 1200;
      height = 1800;
    } else if (parsed.category === 'presentation') {
      width = 1920;
      height = 1080;
    } else if (prompt.toLowerCase().includes('youtube') || prompt.toLowerCase().includes('thumbnail')) {
      width = 1280;
      height = 720;
    }

    const palette =
      Array.isArray(parsed.colorPalette) && parsed.colorPalette.length >= 3
        ? parsed.colorPalette
        : ['#0f172a', '#1e293b', '#38bdf8', '#f43f5e', '#ffffff'];

    const centerX = width / 2;
    const centerY = height / 2;

    const elements: any[] = [
      {
        type: 'rect',
        left: centerX,
        top: centerY,
        width: width * 0.92,
        height: height * 0.9,
        fill: palette[1] || '#1e293b',
        rx: 24,
        ry: 24,
        stroke: palette[2] || '#38bdf8',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center',
        name: 'AI Card Frame',
      },
      {
        type: 'rect',
        left: centerX,
        top: centerY - height * 0.32,
        width: Math.min(width * 0.38, 320),
        height: 48,
        fill: palette[3] || palette[2],
        rx: 24,
        ry: 24,
        originX: 'center',
        originY: 'center',
        name: 'AI Tag Badge',
      },
      {
        type: 'textbox',
        text: modelBadge.toUpperCase(),
        left: centerX,
        top: centerY - height * 0.32 - 10,
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        charSpacing: 150,
        originX: 'center',
        originY: 'center',
        name: 'Tag Text',
      },
      {
        type: 'textbox',
        text: (parsed.headline || 'HEADLINE').toUpperCase(),
        left: centerX,
        top: centerY - height * 0.12,
        fontFamily: 'Anton',
        fontSize: Math.round(Math.min(width, height) * 0.11),
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 0.95,
        originX: 'center',
        originY: 'center',
        name: 'AI Headline',
      },
      {
        type: 'textbox',
        text: parsed.subheading || 'Subheading details generated by AI.',
        left: centerX,
        top: centerY + height * 0.08,
        fontFamily: 'Inter',
        fontSize: Math.round(Math.min(width, height) * 0.034),
        fill: '#94a3b8',
        textAlign: 'center',
        lineHeight: 1.3,
        originX: 'center',
        originY: 'center',
        name: 'AI Subtitle',
      },
      {
        type: 'rect',
        left: centerX,
        top: centerY + height * 0.26,
        width: Math.min(width * 0.45, 360),
        height: 60,
        fill: palette[2] || '#38bdf8',
        rx: 14,
        ry: 14,
        originX: 'center',
        originY: 'center',
        name: 'CTA Button',
      },
      {
        type: 'textbox',
        text: (parsed.callToAction || 'LEARN MORE').toUpperCase(),
        left: centerX,
        top: centerY + height * 0.26 - 10,
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#000000',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        name: 'CTA Text',
      },
    ];

    return {
      title: parsed.title || prompt.slice(0, 30),
      category: parsed.category || 'social',
      width,
      height,
      backgroundColor: palette[0] || '#0f172a',
      colorPalette: palette,
      elements,
      copySuggestions: {
        headlines: parsed.headlines || [parsed.headline],
        subheadings: parsed.subheadings || [parsed.subheading],
        callToActions: parsed.callToActions || [parsed.callToAction],
      },
    };
  },

  /**
   * Calls Groq REST API (Llama 3.3 70B) for ultra-fast inference
   */
  async generateWithGroq(
    prompt: string,
    style: string = 'modern',
    apiKey: string
  ): Promise<AiDesignGeneration> {
    const systemPrompt = `You are an expert graphic design AI assistant. The user wants a design for: "${prompt}" with aesthetic style "${style}".
Respond with ONLY a raw valid JSON object (no markdown, no backticks, no markdown codeblock) with this exact schema:
{
  "title": "Short Project Title",
  "category": "social" | "banner" | "poster" | "presentation",
  "headline": "High impact headline in ALL CAPS",
  "subheading": "Engaging sub-headline with details",
  "callToAction": "Action CTA text",
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
  "headlines": ["Headline option 1", "Headline option 2", "Headline option 3"],
  "subheadings": ["Subheading 1", "Subheading 2", "Subheading 3"],
  "callToActions": ["CTA 1", "CTA 2", "CTA 3"]
}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: `Generate graphic design copy, layout category and color palette for: "${prompt}" in "${style}" style.`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error('No content returned from Groq');

      const parsed = JSON.parse(content);
      return this.constructLayoutFromAiJson(parsed, prompt, 'GROQ LLAMA 3.3');
    } catch (err) {
      console.warn('Groq API call failed, falling back to local procedural engine:', err);
      return this.generateDesignFromPrompt(prompt, style);
    }
  },

  /**
   * Calls Google Gemini REST API directly from the browser for real LLM design generation
   */
  async generateWithGemini(
    prompt: string,
    style: string = 'modern',
    apiKey: string
  ): Promise<AiDesignGeneration> {
    const systemPrompt = `You are an expert graphic design AI assistant. The user wants a design for: "${prompt}" with aesthetic style "${style}".
Respond with ONLY a raw JSON object (no markdown, no backticks) with this exact schema:
{
  "title": "Short Project Title",
  "category": "social" | "banner" | "poster" | "presentation",
  "headline": "High impact headline in ALL CAPS",
  "subheading": "Engaging sub-headline with details",
  "callToAction": "Action CTA text",
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
  "headlines": ["Headline option 1", "Headline option 2", "Headline option 3"],
  "subheadings": ["Subheading 1", "Subheading 2", "Subheading 3"],
  "callToActions": ["CTA 1", "CTA 2", "CTA 3"]
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('No content received from Gemini');

      const parsed = JSON.parse(rawText);
      return this.constructLayoutFromAiJson(parsed, prompt, 'GEMINI AI');
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local procedural engine:', err);
      return this.generateDesignFromPrompt(prompt, style);
    }
  }
};

