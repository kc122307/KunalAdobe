import { aiService } from './src/services/aiService';
import { TEMPLATES } from './src/assets/templatesData';
import { CANVAS_PRESETS } from './src/assets/canvasPresets';

console.log('--- RUNNING ADOBE EXPRESS STUDIO AUTOMATED TEST SUITE ---');

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

// Test 1: Canvas Presets
assert(CANVAS_PRESETS.length >= 7, `Should have at least 7 presets (found ${CANVAS_PRESETS.length})`);
const igPreset = CANVAS_PRESETS.find(p => p.id === 'instagram-post');
assert(!!igPreset && igPreset.width === 1080 && igPreset.height === 1080, 'Instagram preset dimensions are 1080x1080');

const ytPreset = CANVAS_PRESETS.find(p => p.id === 'youtube-thumbnail');
assert(!!ytPreset && ytPreset.width === 1280 && ytPreset.height === 720, 'YouTube preset dimensions are 1280x720');

// Test 2: Templates dataset
assert(TEMPLATES.length >= 6, `Should have templates across all requested categories (found ${TEMPLATES.length})`);
TEMPLATES.forEach(t => {
  assert(!!t.elements && t.elements.length > 0, `Template "${t.title}" contains ${t.elements?.length} elements`);
  assert(t.width > 0 && t.height > 0, `Template "${t.title}" has valid dimensions ${t.width}x${t.height}`);
});

// Test 3: AI Design Generation
const techPrompt = aiService.generateDesignFromPrompt('Modern tech podcast episode thumbnail', 'cyber');
assert(techPrompt.width === 1280 && techPrompt.height === 720, 'AI generated 1280x720 thumbnail for YouTube/podcast prompt');
assert(techPrompt.elements.length >= 4, `AI generated ${techPrompt.elements.length} editable canvas elements`);
assert(techPrompt.copySuggestions.headlines.length > 0, 'AI generated headline copy suggestions');
assert(techPrompt.copySuggestions.callToActions.length > 0, 'AI generated CTA suggestions');

const flyerPrompt = aiService.generateDesignFromPrompt('Coffee bakery grand opening flyer', 'nature');
assert(flyerPrompt.width === 1200 && flyerPrompt.height === 1800, 'AI generated 1200x1800 flyer for opening flyer prompt');
assert(flyerPrompt.colorPalette.length === 5, 'AI generated 5-color harmonious palette');
assert(typeof aiService.generateWithGroq === 'function', 'AI service exposes generateWithGroq method');
assert(typeof aiService.generateWithGemini === 'function', 'AI service exposes generateWithGemini method');

// Test 4: Export service options validation
import { exportService } from './src/services/exportService';
assert(typeof exportService.exportCanvas === 'function', 'Export service provides exportCanvas function');
assert(typeof exportService.generateThumbnail === 'function', 'Export service provides generateThumbnail function');

// Test 5: Fabric service instance validation
import { fabricServiceInstance } from './src/services/fabricService';
assert(typeof fabricServiceInstance.addText === 'function', 'Fabric service exposes addText API');
assert(typeof fabricServiceInstance.addShape === 'function', 'Fabric service exposes addShape API');
assert(typeof fabricServiceInstance.addSvgIcon === 'function', 'Fabric service exposes addSvgIcon API');
assert(typeof fabricServiceInstance.applyImageClipMask === 'function', 'Fabric service exposes applyImageClipMask API');
assert(typeof fabricServiceInstance.groupActiveObjects === 'function', 'Fabric service exposes groupActiveObjects API');
assert(typeof fabricServiceInstance.ungroupActiveObject === 'function', 'Fabric service exposes ungroupActiveObject API');

console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);

