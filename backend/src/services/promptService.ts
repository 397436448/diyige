type PromptType = 'TEXT_TO_IMAGE' | 'IMAGE_TO_VIDEO';

interface GenerationResult {
  success: boolean;
  type: PromptType;
  result: string;
  needsClarification?: boolean;
  clarification?: string;
}

const textToImageTemplates = {
  styles: [
    'photorealistic',
    'digital art',
    'oil painting',
    'watercolor',
    'anime style',
    '3D render',
    'pixel art',
    'minimalist',
    'cinematic',
    'vintage'
  ],
  lighting: [
    'soft natural lighting',
    'golden hour',
    'dramatic lighting',
    'studio lighting',
    'neon glow',
    'rim lighting',
    'volumetric fog',
    'sunset'
  ],
  composition: [
    'wide shot',
    'portrait',
    'close-up',
    'birds eye view',
    'low angle',
    'symmetrical composition',
    'rule of thirds'
  ],
  qualities: [
    'highly detailed',
    '4k resolution',
    'masterpiece',
    'sharp focus',
    'intricate details',
    'vibrant colors',
    'cinematic composition'
  ]
};

const imageToVideoTemplates = {
  motions: [
    'slow pan',
    'gentle zoom',
    'camera orbit',
    'subtle parallax',
    'smooth transition',
    'particle effects',
    'cinematic movement',
    'dynamic camera'
  ],
  transitions: [
    'fade in',
    'dissolve',
    'wipe',
    'smooth morph',
    'particle transition',
    'glitch effect'
  ],
  durations: [
    '3-5 seconds',
    '5-8 seconds',
    '8-12 seconds',
    'loopable animation',
    'cinematic shot'
  ],
  styles: [
    'cinematic',
    'dreamy',
    'epic',
    'artistic',
    'professional',
    'smooth motion'
  ]
};

export function analyzeIntent(input: string): { type: PromptType; confidence: number } {
  const lowerInput = input.toLowerCase();
  const textToImageKeywords = ['image', 'picture', 'photo', 'draw', 'paint', 'art', 'illustration', 'generate', 'create', '图', '图片', '画', '绘图', '照片', '艺术', '生成', '创建'];
  const imageToVideoKeywords = ['video', 'animate', 'animation', 'motion', 'move', 'dynamic', 'film', 'clip', '视频', '动画', '影片', '动态', '电影', '片段'];

  let ttiScore = 0;
  let itvScore = 0;

  textToImageKeywords.forEach(keyword => {
    if (lowerInput.includes(keyword)) ttiScore += 1;
  });

  imageToVideoKeywords.forEach(keyword => {
    if (lowerInput.includes(keyword)) itvScore += 1;
  });

  if (ttiScore > itvScore) {
    return { type: 'TEXT_TO_IMAGE', confidence: 0.7 + (ttiScore / 10) * 0.3 };
  } else if (itvScore > ttiScore) {
    return { type: 'IMAGE_TO_VIDEO', confidence: 0.7 + (itvScore / 10) * 0.3 };
  } else {
    return { type: 'TEXT_TO_IMAGE', confidence: 0.5 };
  }
}

export function checkInputClarity(input: string): { clear: boolean; suggestion?: string } {
  // 对中文更友好的检测
  const wordCount = input.length;
  // 只要超过3个字符就可以
  if (wordCount < 2) {
    return {
      clear: false,
      suggestion: '请提供更多细节，例如：主题、风格、场景描述等'
    };
  }

  return { clear: true };
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTextToImagePrompt(input: string): string {
  const style = randomElement(textToImageTemplates.styles);
  const lighting = randomElement(textToImageTemplates.lighting);
  const composition = randomElement(textToImageTemplates.composition);
  const quality = textToImageTemplates.qualities.slice(0, 3).join(', ');

  return `${input}, ${style}, ${lighting}, ${composition}, ${quality}`;
}

export function generateImageToVideoPrompt(input: string): string {
  const motion = randomElement(imageToVideoTemplates.motions);
  const transition = randomElement(imageToVideoTemplates.transitions);
  const duration = randomElement(imageToVideoTemplates.durations);
  const style = randomElement(imageToVideoTemplates.styles);

  return `Create a ${duration} video based on: ${input}, with ${motion}, ${transition} transitions, ${style} aesthetic, smooth motion blur, professional quality`;
}

export function generatePrompt(input: string): GenerationResult {
  const clarityCheck = checkInputClarity(input);
  
  if (!clarityCheck.clear) {
    return {
      success: false,
      type: 'TEXT_TO_IMAGE',
      result: '',
      needsClarification: true,
      clarification: clarityCheck.suggestion
    };
  }

  const intent = analyzeIntent(input);
  
  let result: string;
  if (intent.type === 'TEXT_TO_IMAGE') {
    result = generateTextToImagePrompt(input);
  } else {
    result = generateImageToVideoPrompt(input);
  }

  return {
    success: true,
    type: intent.type,
    result
  };
}

export function refinePrompt(prompt: string): string {
  const enhancements = [
    'ultra detailed',
    'professional quality',
    'high resolution',
    'trending on artstation',
    'award winning',
    'intricate details'
  ];

  const randomEnhancements = enhancements
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .join(', ');

  return `${prompt}, ${randomEnhancements}`;
}
