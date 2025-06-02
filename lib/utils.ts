import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format AI-generated text with proper styling
export function formatAIText(text: string) {
  if (!text) return text;
  
  // Split text into lines and format
  const lines = text.split('\n');
  const formattedLines = lines.map(line => {
    // Headers (lines starting with #)
    if (line.startsWith('### ')) {
      return `<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">${line.slice(4)}</h3>`;
    }
    if (line.startsWith('## ')) {
      return `<h2 class="text-xl font-semibold text-gray-900 mt-6 mb-4">${line.slice(3)}</h2>`;
    }
    if (line.startsWith('# ')) {
      return `<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4">${line.slice(2)}</h1>`;
    }
    
    // Bold text
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
    
    // Italic text
    line = line.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>');
    
    // Bullet points
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
      return `<li class="ml-4 mb-2 text-gray-700">${line.slice(line.indexOf(' ') + 1)}</li>`;
    }
    
    // Numbered lists
    if (/^\d+\.\s/.test(line.trim())) {
      return `<li class="ml-4 mb-2 text-gray-700 list-decimal">${line.slice(line.indexOf(' ') + 1)}</li>`;
    }
    
    // Regular paragraphs
    if (line.trim()) {
      return `<p class="mb-3 text-gray-700 leading-relaxed">${line}</p>`;
    }
    
    return '<div class="mb-2"></div>'; // Empty line spacing
  });
  
  return formattedLines.join('');
}
