/* ============================================
   Web Speech API Helpers
   SpeechSynthesis (TTS) + SpeechRecognition
   ============================================ */

let voices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    if (typeof speechSynthesis === 'undefined') {
      resolve([]);
      return;
    }
    const existing = speechSynthesis.getVoices();
    if (existing.length > 0) {
      voices = existing;
      resolve(voices);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    };
    // fallback timeout
    setTimeout(() => resolve(speechSynthesis.getVoices()), 500);
  });
}

loadVoices();

export function speak(text: string, opts: { rate?: number; lang?: string } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof speechSynthesis === 'undefined') {
      reject(new Error('Speech synthesis not supported'));
      return;
    }
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = opts.lang || 'en-US';
    utter.rate = opts.rate ?? 0.9;
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.default) || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    utter.onend = () => resolve();
    utter.onerror = () => reject(new Error('Speech error'));
    speechSynthesis.speak(utter);
  });
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export interface RecognitionResult {
  transcript: string;
  confidence: number;
}

export function recognizeSpeech(lang = 'en-US'): Promise<RecognitionResult> {
  return new Promise((resolve, reject) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      reject(new Error('Speech recognition not supported'));
      return;
    }
    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.onresult = (event: any) => {
      const result = event.results[0];
      const transcript = result[0].transcript.trim();
      const confidence = result[0].confidence;
      resolve({ transcript, confidence });
    };
    recognition.onerror = (e: any) => reject(new Error(e.error || 'recognition error'));
    recognition.start();
  });
}

export function normalizeWord(s: string): string {
  return s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
}

export function wordSimilarity(spoken: string, target: string): number {
  const a = normalizeWord(spoken);
  const b = normalizeWord(target);
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.85;
  // simple char overlap
  const setA = new Set(a.split(''));
  const setB = new Set(b.split(''));
  const inter = [...setA].filter(c => setB.has(c)).length;
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? inter / union : 0;
}
