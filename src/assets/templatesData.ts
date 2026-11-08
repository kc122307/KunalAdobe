import { TemplateData } from '../types/editor';

export const TEMPLATES: TemplateData[] = [
  // 1. INSTAGRAM POST (1080 x 1080)
  {
    id: 'ig-summer-sale',
    title: 'Summer Mega Sale',
    category: 'instagram',
    width: 1080,
    height: 1080,
    backgroundColor: '#0f172a',
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=500&q=80',
    description: 'Vibrant retail sale promo with high-impact typography and discount badge',
    elements: [
      // Background accent box
      {
        type: 'rect',
        left: 540,
        top: 540,
        width: 1000,
        height: 1000,
        fill: '#1e293b',
        rx: 32,
        ry: 32,
        stroke: '#f43f5e',
        strokeWidth: 4,
        originX: 'center',
        originY: 'center',
        selectable: true
      },
      // Decorative top badge
      {
        type: 'rect',
        left: 540,
        top: 200,
        width: 320,
        height: 54,
        fill: '#f43f5e',
        rx: 27,
        ry: 27,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'LIMITED TIME OFFER',
        left: 540,
        top: 187,
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        charSpacing: 200,
        originX: 'center',
        originY: 'center'
      },
      // Main headline
      {
        type: 'textbox',
        text: 'SUMMER\nFLASH SALE',
        left: 540,
        top: 380,
        fontFamily: 'Anton',
        fontSize: 108,
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 0.9,
        originX: 'center',
        originY: 'center'
      },
      // Subtitle
      {
        type: 'textbox',
        text: 'UP TO 50% OFF EVERYTHING',
        left: 540,
        top: 550,
        fontFamily: 'Inter',
        fontSize: 34,
        fontWeight: 'bold',
        fill: '#38bdf8',
        textAlign: 'center',
        charSpacing: 100,
        originX: 'center',
        originY: 'center'
      },
      // Price tag circle
      {
        type: 'circle',
        left: 540,
        top: 730,
        radius: 110,
        fill: '#e11d48',
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'USE CODE\nSUMMER50',
        left: 540,
        top: 715,
        fontFamily: 'Montserrat',
        fontSize: 26,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.2,
        originX: 'center',
        originY: 'center'
      },
      // Footer text
      {
        type: 'textbox',
        text: 'www.yourbrand.com • Shop in-store & online',
        left: 540,
        top: 930,
        fontFamily: 'Inter',
        fontSize: 24,
        fill: '#94a3b8',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      }
    ]
  },
  {
    id: 'ig-quote-minimal',
    title: 'Inspiring Daily Quote',
    category: 'instagram',
    width: 1080,
    height: 1080,
    backgroundColor: '#faf8f5',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80',
    description: 'Clean, elegant editorial quote layout with classical serif typography',
    elements: [
      // Outer border frame
      {
        type: 'rect',
        left: 540,
        top: 540,
        width: 940,
        height: 940,
        fill: 'transparent',
        stroke: '#1c1917',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center'
      },
      // Decorative quote mark
      {
        type: 'textbox',
        text: '“',
        left: 540,
        top: 290,
        fontFamily: 'Playfair Display',
        fontSize: 180,
        fontWeight: 'bold',
        fill: '#d97706',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      },
      // The Quote
      {
        type: 'textbox',
        text: 'Simplicity is the\nultimate sophistication.',
        left: 540,
        top: 480,
        fontFamily: 'Playfair Display',
        fontSize: 54,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#1c1917',
        textAlign: 'center',
        lineHeight: 1.3,
        originX: 'center',
        originY: 'center'
      },
      // Divider line
      {
        type: 'rect',
        left: 540,
        top: 660,
        width: 120,
        height: 4,
        fill: '#d97706',
        originX: 'center',
        originY: 'center'
      },
      // Author
      {
        type: 'textbox',
        text: 'LEONARDO DA VINCI',
        left: 540,
        top: 720,
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#78716c',
        textAlign: 'center',
        charSpacing: 250,
        originX: 'center',
        originY: 'center'
      }
    ]
  },

  // 2. YOUTUBE THUMBNAIL (1280 x 720)
  {
    id: 'yt-code-mastery',
    title: 'Full Stack Web Dev 2026',
    category: 'youtube',
    width: 1280,
    height: 720,
    backgroundColor: '#0a0a14',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    description: 'High-clickthrough developer tutorial thumbnail with bold text & badges',
    elements: [
      // Background glow card
      {
        type: 'rect',
        left: 420,
        top: 360,
        width: 760,
        height: 600,
        fill: '#14142b',
        rx: 24,
        ry: 24,
        stroke: '#3b82f6',
        strokeWidth: 4,
        originX: 'center',
        originY: 'center'
      },
      // Pill badge
      {
        type: 'rect',
        left: 200,
        top: 140,
        width: 220,
        height: 50,
        fill: '#ef4444',
        rx: 8,
        ry: 8,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'FULL COURSE',
        left: 200,
        top: 130,
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        charSpacing: 100,
        originX: 'center',
        originY: 'center'
      },
      // Giant Title
      {
        type: 'textbox',
        text: 'REACT &\nAI APPS',
        left: 420,
        top: 290,
        fontFamily: 'Anton',
        fontSize: 105,
        fill: '#facc15',
        textAlign: 'left',
        lineHeight: 0.9,
        originX: 'center',
        originY: 'center'
      },
      // Feature tags
      {
        type: 'textbox',
        text: 'From Zero to Production in 2 Hours',
        left: 420,
        top: 450,
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'left',
        originX: 'center',
        originY: 'center'
      },
      // Badge Right
      {
        type: 'circle',
        left: 1040,
        top: 360,
        radius: 140,
        fill: '#3b82f6',
        stroke: '#ffffff',
        strokeWidth: 8,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: '100%\nFREE',
        left: 1040,
        top: 340,
        fontFamily: 'Anton',
        fontSize: 58,
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 0.9,
        originX: 'center',
        originY: 'center'
      }
    ]
  },
  {
    id: 'yt-fitness-workout',
    title: '15 Min Home Workout',
    category: 'youtube',
    width: 1280,
    height: 720,
    backgroundColor: '#18181b',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
    description: 'High energy fitness workout thumbnail with neon gradient accents',
    elements: [
      {
        type: 'rect',
        left: 640,
        top: 360,
        width: 1220,
        height: 660,
        fill: '#27272a',
        rx: 20,
        ry: 20,
        stroke: '#22c55e',
        strokeWidth: 4,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: '15 MIN',
        left: 360,
        top: 220,
        fontFamily: 'Anton',
        fontSize: 130,
        fill: '#22c55e',
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'FAT BURN\nNO EQUIPMENT',
        left: 430,
        top: 380,
        fontFamily: 'Montserrat',
        fontSize: 56,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'left',
        lineHeight: 1.1,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'rect',
        left: 360,
        top: 540,
        width: 440,
        height: 60,
        fill: '#eab308',
        rx: 12,
        ry: 12,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'BEGINNER FRIENDLY',
        left: 360,
        top: 530,
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#000000',
        originX: 'center',
        originY: 'center'
      }
    ]
  },

  // 3. POSTER (1240 x 1754 - A4)
  {
    id: 'poster-music-fest',
    title: 'Neon Nights Cyber Music Festival',
    category: 'poster',
    width: 1240,
    height: 1754,
    backgroundColor: '#05050f',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
    description: 'Electric music concert poster with cyberpunk gradients and lineup styling',
    elements: [
      // Top header banner
      {
        type: 'rect',
        left: 620,
        top: 150,
        width: 1100,
        height: 90,
        fill: 'transparent',
        stroke: '#06b6d4',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'PRESENTS THE ANNUAL AUDIOVISUAL EXPERIENCE',
        left: 620,
        top: 140,
        fontFamily: 'Montserrat',
        fontSize: 26,
        fontWeight: 'bold',
        fill: '#06b6d4',
        textAlign: 'center',
        charSpacing: 200,
        originX: 'center',
        originY: 'center'
      },
      // Massive festival title
      {
        type: 'textbox',
        text: 'CYBER\nSOUNDS\n2026',
        left: 620,
        top: 470,
        fontFamily: 'Anton',
        fontSize: 160,
        fill: '#ec4899',
        textAlign: 'center',
        lineHeight: 0.85,
        originX: 'center',
        originY: 'center'
      },
      // Glowing divider
      {
        type: 'rect',
        left: 620,
        top: 760,
        width: 800,
        height: 6,
        fill: '#facc15',
        originX: 'center',
        originY: 'center'
      },
      // Headliners
      {
        type: 'textbox',
        text: 'SYNTHESIS • NEON PULSE • CYBERWAVE\nTHE GLITCH MOB • VECTOR HORIZON',
        left: 620,
        top: 920,
        fontFamily: 'Montserrat',
        fontSize: 38,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.4,
        charSpacing: 80,
        originX: 'center',
        originY: 'center'
      },
      // Secondary acts
      {
        type: 'textbox',
        text: 'ASTRAL FREQUENCY • ECHO CHAMBER • RETRO WAVE\nBASS MATRIX • PULSAR COLLECTIVE • QUANTUM',
        left: 620,
        top: 1120,
        fontFamily: 'Inter',
        fontSize: 28,
        fill: '#94a3b8',
        textAlign: 'center',
        lineHeight: 1.5,
        originX: 'center',
        originY: 'center'
      },
      // Date and Venue Box
      {
        type: 'rect',
        left: 620,
        top: 1400,
        width: 1000,
        height: 180,
        fill: '#1e1b4b',
        rx: 24,
        ry: 24,
        stroke: '#ec4899',
        strokeWidth: 4,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'OCTOBER 24-26, 2026\nMETROPOLIS ARENA • DOORS OPEN 6 PM',
        left: 620,
        top: 1390,
        fontFamily: 'Montserrat',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.3,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'TICKETS AVAILABLE AT CYBERSOUNDS.LIVE',
        left: 620,
        top: 1620,
        fontFamily: 'Inter',
        fontSize: 24,
        fill: '#38bdf8',
        textAlign: 'center',
        charSpacing: 150,
        originX: 'center',
        originY: 'center'
      }
    ]
  },

  // 4. BANNER / FACEBOOK COVER (1200 x 630)
  {
    id: 'banner-webinar',
    title: 'Executive AI Masterclass Banner',
    category: 'banner',
    width: 1200,
    height: 630,
    backgroundColor: '#022c22',
    thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=500&q=80',
    description: 'Professional high-converting webinar and LinkedIn banner',
    elements: [
      {
        type: 'rect',
        left: 600,
        top: 315,
        width: 1140,
        height: 570,
        fill: '#064e3b',
        rx: 20,
        ry: 20,
        stroke: '#34d399',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'rect',
        left: 230,
        top: 120,
        width: 260,
        height: 44,
        fill: '#10b981',
        rx: 22,
        ry: 22,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'LIVE WEBINAR',
        left: 230,
        top: 110,
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        charSpacing: 120,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'SCALING AI IN\nTHE ENTERPRISE',
        left: 450,
        top: 250,
        fontFamily: 'Anton',
        fontSize: 78,
        fill: '#ffffff',
        textAlign: 'left',
        lineHeight: 0.95,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'Strategies, Case Studies & ROI Frameworks for 2026',
        left: 450,
        top: 370,
        fontFamily: 'Inter',
        fontSize: 26,
        fill: '#a7f3d0',
        textAlign: 'left',
        originX: 'center',
        originY: 'center'
      },
      // Call to action button
      {
        type: 'rect',
        left: 240,
        top: 470,
        width: 280,
        height: 64,
        fill: '#34d399',
        rx: 12,
        ry: 12,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'RESERVE SEAT',
        left: 240,
        top: 460,
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#064e3b',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      },
      // Date badge right
      {
        type: 'rect',
        left: 980,
        top: 315,
        width: 300,
        height: 380,
        fill: '#065f46',
        rx: 16,
        ry: 16,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'THURSDAY\nNOV 19\n2:00 PM EST',
        left: 980,
        top: 305,
        fontFamily: 'Montserrat',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.4,
        originX: 'center',
        originY: 'center'
      }
    ]
  },

  // 5. FLYER (1200 x 1800)
  {
    id: 'flyer-grand-opening',
    title: 'Artisan Coffee Grand Opening',
    category: 'flyer',
    width: 1200,
    height: 1800,
    backgroundColor: '#1c1917',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80',
    description: 'Warm, cozy boutique bakery & coffee house opening announcement',
    elements: [
      {
        type: 'rect',
        left: 600,
        top: 900,
        width: 1100,
        height: 1700,
        fill: '#292524',
        rx: 30,
        ry: 30,
        stroke: '#d97706',
        strokeWidth: 4,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'YOU ARE CORDIALLY INVITED TO THE',
        left: 600,
        top: 220,
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: 'bold',
        fill: '#d97706',
        textAlign: 'center',
        charSpacing: 250,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'GRAND\nOPENING',
        left: 600,
        top: 450,
        fontFamily: 'Playfair Display',
        fontSize: 130,
        fontWeight: 'bold',
        fill: '#fafaf9',
        textAlign: 'center',
        lineHeight: 0.9,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'THE ROASTERY & BAKERY CO.',
        left: 600,
        top: 660,
        fontFamily: 'Montserrat',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#f59e0b',
        textAlign: 'center',
        charSpacing: 180,
        originX: 'center',
        originY: 'center'
      },
      // Special perks badge
      {
        type: 'rect',
        left: 600,
        top: 900,
        width: 800,
        height: 240,
        fill: '#44403c',
        rx: 20,
        ry: 20,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'FIRST 100 GUESTS GET\nFREE COFFEE & PASTRY\n+ 25% OFF STOREWIDE',
        left: 600,
        top: 890,
        fontFamily: 'Montserrat',
        fontSize: 34,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.4,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'SATURDAY, DECEMBER 12TH • 8:00 AM ONWARDS\n452 HIGHLAND AVE, BROOKLYN, NY',
        left: 600,
        top: 1250,
        fontFamily: 'Inter',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#e7e5e4',
        textAlign: 'center',
        lineHeight: 1.5,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'Artisan Espresso • Fresh Sourdough • Specialty Matcha',
        left: 600,
        top: 1420,
        fontFamily: 'Inter',
        fontSize: 26,
        fontStyle: 'italic',
        fill: '#a8a29e',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      }
    ]
  },

  // 6. PRESENTATION SLIDE (1920 x 1080)
  {
    id: 'deck-title-slide',
    title: 'Company Pitch Deck — Title Slide',
    category: 'presentation',
    width: 1920,
    height: 1080,
    backgroundColor: '#090d16',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80',
    description: 'Executive widescreen presentation title slide with clean modern grid',
    elements: [
      {
        type: 'rect',
        left: 960,
        top: 540,
        width: 1840,
        height: 1000,
        fill: '#0f172a',
        rx: 16,
        ry: 16,
        stroke: '#1e293b',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'rect',
        left: 300,
        top: 240,
        width: 220,
        height: 48,
        fill: '#3b82f6',
        rx: 8,
        ry: 8,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'SERIES A PITCH',
        left: 300,
        top: 230,
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        charSpacing: 100,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'REVOLUTIONIZING\nCREATIVE AI',
        left: 600,
        top: 460,
        fontFamily: 'Anton',
        fontSize: 130,
        fill: '#ffffff',
        textAlign: 'left',
        lineHeight: 0.9,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: 'Empowering millions of creators with instant, intelligent graphic design engines.',
        left: 600,
        top: 630,
        fontFamily: 'Inter',
        fontSize: 34,
        fill: '#94a3b8',
        textAlign: 'left',
        originX: 'center',
        originY: 'center'
      },
      // 3 Stat Cards
      {
        type: 'rect',
        left: 350,
        top: 840,
        width: 320,
        height: 140,
        fill: '#1e293b',
        rx: 12,
        ry: 12,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: '10M+\nActive Creators',
        left: 350,
        top: 830,
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#38bdf8',
        textAlign: 'center',
        lineHeight: 1.2,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'rect',
        left: 730,
        top: 840,
        width: 320,
        height: 140,
        fill: '#1e293b',
        rx: 12,
        ry: 12,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: '3.4x\nYoY ARR Growth',
        left: 730,
        top: 830,
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#34d399',
        textAlign: 'center',
        lineHeight: 1.2,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'rect',
        left: 1110,
        top: 840,
        width: 320,
        height: 140,
        fill: '#1e293b',
        rx: 12,
        ry: 12,
        originX: 'center',
        originY: 'center'
      },
      {
        type: 'textbox',
        text: '92%\nRetention Rate',
        left: 1110,
        top: 830,
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#f43f5e',
        textAlign: 'center',
        lineHeight: 1.2,
        originX: 'center',
        originY: 'center'
      }
    ]
  }
];

