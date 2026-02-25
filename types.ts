
export type Gender = 'Male' | 'Female' | 'Neutral';

export type MockupStyle = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
  isProductOnly?: boolean;
};

export type GenerationSettings = {
  model: 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview';
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  quality: '1K' | '2K' | '4K';
  gender: Gender;
  color: string;
};

export interface MockupResult {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: number;
}
