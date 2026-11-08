import { fabric } from 'fabric';
import jsPDF from 'jspdf';

export interface ExportOptions {
  format: 'png' | 'jpeg' | 'pdf';
  quality?: number; // 0.1 to 1.0 for jpeg
  multiplier?: number; // 1, 2, 3 for high-dpi
  transparent?: boolean;
  fileName?: string;
}

export const exportService = {
  /**
   * Export the canvas to PNG / JPG / PDF
   */
  async exportCanvas(
    canvas: fabric.Canvas,
    options: ExportOptions
  ): Promise<void> {
    const {
      format = 'png',
      quality = 0.92,
      multiplier = 2,
      transparent = false,
      fileName = 'adobe-express-design'
    } = options;

    // Deselect any active object before exporting so bounding boxes are not drawn!
    const activeObject = canvas.getActiveObject();
    canvas.discardActiveObject();
    canvas.renderAll();

    try {
      if (format === 'pdf') {
        // High quality PDF generation
        const dataUrl = canvas.toDataURL({
          format: 'png',
          multiplier: multiplier || 2,
        });

        const width = canvas.getWidth();
        const height = canvas.getHeight();

        // Determine orientation
        const orientation = width >= height ? 'landscape' : 'portrait';

        const pdf = new jsPDF({
          orientation: orientation,
          unit: 'pt',
          format: [width, height],
          compress: true,
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
        pdf.save(`${fileName}.pdf`);
      } else {
        // Image export (PNG or JPEG)
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
        
        let originalBg = canvas.backgroundColor;
        if (format === 'jpeg' && (!originalBg || originalBg === 'transparent')) {
          canvas.backgroundColor = '#ffffff';
          canvas.renderAll();
        } else if (format === 'png' && transparent) {
          canvas.backgroundColor = '';
          canvas.renderAll();
        }

        const dataUrl = canvas.toDataURL({
          format: format === 'jpeg' ? 'jpeg' : 'png',
          quality: quality,
          multiplier: multiplier,
        });

        // Restore background
        canvas.backgroundColor = originalBg;
        canvas.renderAll();

        // Trigger browser download
        const link = document.createElement('a');
        link.download = `${fileName}.${format === 'jpeg' ? 'jpg' : 'png'}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
      // Restore selection if it existed
      if (activeObject) {
        canvas.setActiveObject(activeObject);
        canvas.renderAll();
      }
    }
  },

  /**
   * Generate a small thumbnail dataURL for project saving
   */
  generateThumbnail(canvas: fabric.Canvas): string {
    const active = canvas.getActiveObject();
    canvas.discardActiveObject();
    canvas.renderAll();

    const maxThumbDim = 320;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const scale = Math.min(maxThumbDim / canvasWidth, maxThumbDim / canvasHeight, 0.5);

    const dataUrl = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.7,
      multiplier: Math.max(scale, 0.15),
    });

    if (active) {
      canvas.setActiveObject(active);
      canvas.renderAll();
    }

    return dataUrl;
  }
};

