
import { MockupStyle } from './types';

export const MOCKUP_STYLES: MockupStyle[] = [
  {
    id: 'nairobi-cbd-urban',
    name: 'Kenyatta Urban Editorial',
    description: 'High-contrast street photography in Nairobi’s financial district.',
    prompt: 'A professional high-fidelity fashion photograph of a stylish [SUBJECT] wearing a premium heavy-weight cotton [COLOR] t-shirt featuring the provided design. Location: Kenyatta Avenue, Nairobi CBD. Background features the iconic KICC and modern architecture with soft evening bokeh. Technical: Shot on Hasselblad H6D, 100mm lens, f/2.8, 8k resolution. The design is realistically screen-printed into the fabric, following every wrinkle and shadow. Subsurface scattering on skin, cinematic lighting.',
    thumbnail: 'https://images.unsplash.com/photo-1523810191221-5264879de70e?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'crewneck-urban-shoreditch',
    name: 'Shoreditch Crewneck Edit',
    description: 'Oversized sweatshirt fit in a gritty urban industrial setting.',
    prompt: 'A professional high-end street fashion photograph of a [SUBJECT] wearing a premium heavy-weight [COLOR] crewneck sweatshirt featuring the provided design. Location: An industrial alleyway with brick walls and overhead pipes. The sweatshirt has an oversized, dropped-shoulder fit with thick ribbed cuffs. Technical: Shot on Sony A7R IV, 35mm lens, f/1.8. The design is realistically printed into the heavy fleece fabric, following the soft folds and heavy drape of the sweatshirt. High-fidelity textures, cinematic moody lighting.',
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'shibuya-nocturnal',
    name: 'Neo-Tokyo Midnight',
    description: 'Intense neon-lit streets with rainy reflections and cyberpunk energy.',
    prompt: 'A futuristic fashion editorial of a [SUBJECT] wearing a [COLOR] t-shirt with the design. Shot in a rain-slicked Shibuya crossing at night. Cyberpunk aesthetics, neon cyan and magenta lights reflecting off the fabric and pavement. Technical: 8k resolution, cinematic grain, volumetric fog, sharp focus on the garment print. Realistic fabric physics, high-contrast lighting.',
    thumbnail: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'crewneck-studio-high-fashion',
    name: 'Minimalist Sweatshirt Studio',
    description: 'Clean editorial look focusing on the silhouette and fabric weight.',
    prompt: 'A high-fashion studio portrait of a [SUBJECT] wearing a structured [COLOR] crewneck sweatshirt with the provided design. Solid deep charcoal background. The sweatshirt features high-quality heavy fleece texture and a relaxed silhouette. Technical: Sharp studio lighting, highlighting the premium stitch details and the matte finish of the print. 8k resolution, commercial fashion grade, ultra-realistic skin and fabric mapping.',
    thumbnail: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'matatu-culture',
    name: 'Avant-Garde Terminal',
    description: 'Bold street style featuring iconic custom vehicle art.',
    prompt: 'A vibrant, ultra-detailed editorial fashion shot of a stylish [SUBJECT] wearing a [COLOR] t-shirt featuring the provided graphic design. The person is posing next to a world-famous decorated Nairobi Matatu with neon lights and graffiti art. Technical: Hyper-realistic textures, 8k UHD, sharp focus on the fabric weave. The design shows realistic ink absorption into the cotton fibers. Dynamic lighting, high contrast, commercial fashion grade.',
    thumbnail: 'https://images.unsplash.com/photo-1516248301550-2f9540b61884?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'crewneck-flatlay-premium',
    name: 'Sweatshirt Archive Flatlay',
    description: 'Product-focused layout on a textured marble surface.',
    prompt: 'A premium product flatlay photograph of a heavy [COLOR] crewneck sweatshirt featuring the provided design. The sweatshirt is laid out artistically on a white Carrara marble floor with soft natural window light. Technical: Shot from a direct top-down angle, 100MP detail. The design is perfectly integrated into the heavy cotton fleece texture. Sharp focus, minimal aesthetic, high-end e-commerce quality.',
    thumbnail: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=400&h=400',
    isProductOnly: true
  },
  {
    id: 'brutalist-echo',
    name: 'Brutalist Monolith',
    description: 'Minimalist composition against raw concrete architecture.',
    prompt: 'A high-end fashion portrait of a [SUBJECT] in a [COLOR] t-shirt with the design. Background is a massive raw concrete brutalist structure with sharp angular shadows. Technical: Stark architectural lighting, monochrome palette with the t-shirt color as a focal point. Shot on Phase One XF, extreme detail in the fabric knit and concrete grain.',
    thumbnail: 'https://images.unsplash.com/photo-1518005020411-38b80d03f751?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'crewneck-ghost-mannequin',
    name: 'Ghost Mannequin Sweatshirt',
    description: 'Invisible model technique for clean retail presentation.',
    prompt: 'A professional invisible model (ghost mannequin) product shot of a [COLOR] crewneck sweatshirt with the provided design. The garment appears to be worn by an invisible person, showing the full 3D shape and interior collar detail. Technical: Studio lighting, pure white background, perfectly color-balanced. The design is accurately mapped to the chest with realistic distortion from the garment’s curvature. 8k, sharp retail catalog style.',
    thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=400',
    isProductOnly: true
  },
  {
    id: 'gallery-chic',
    name: 'Westlands Gallery',
    description: 'Minimalist high-fashion look in a contemporary space.',
    prompt: 'A sophisticated fashion portrait of a [SUBJECT] wearing a premium [COLOR] t-shirt with the provided design, standing in a contemporary art gallery in Westlands, Nairobi. Minimalist white walls, modern abstract art in the background. Technical: Soft diffused gallery lighting, high-end fashion magazine aesthetic, 8k, sharp focus on the garment print and skin texture.',
    thumbnail: 'https://images.unsplash.com/photo-1492033447105-23cc97952f41?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'industrial-loft',
    name: 'Underground Studio',
    description: 'Raw industrial vibe with exposed brick and warm accent lighting.',
    prompt: 'A professional studio shoot of a [SUBJECT] in a [COLOR] t-shirt. Location: A converted industrial loft with exposed red bricks and metallic pipes. Technical: Low-key lighting with warm orange highlights. 8k resolution, shallow depth of field, focus on the fabric texture and screen-print quality.',
    thumbnail: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'obsidian-studio',
    name: 'Obsidian Studio',
    description: 'Pure portraiture with focus on garment micro-detail.',
    prompt: 'A high-fashion studio portrait of a stunning [SUBJECT] wearing a [COLOR] t-shirt with the provided design. Solid charcoal grey background. Technical: Professional three-point studio lighting, highlighting skin micro-texture and fabric quality. The design is seamlessly mapped to the body contours. Ultra-realistic, 8k, fashion magazine cover quality.',
    thumbnail: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'folded-heritage',
    name: 'Artisan Flatlay',
    description: 'Studio product shot with natural soapstone textures.',
    prompt: 'A macro product photograph of a neatly folded premium [COLOR] cotton t-shirt featuring the provided design. Placed on a dark, polished Kenyan soapstone surface with soft side-lighting. Next to it are handcrafted Maasai beads. Technical: 100MP resolution, extreme detail in the fabric knit. The design is perfectly integrated, showing fabric grain. Professional catalog quality.',
    thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400&h=400',
    isProductOnly: true
  },
  {
    id: 'boutique-hanger',
    name: 'Retail Signature',
    description: 'Clean boutique display highlighting drape and silhouette.',
    prompt: 'A high-end retail mockup of a [COLOR] t-shirt with the provided design hanging on a sleek wooden hanger. Set in a minimalist Nairobi boutique with warm clay walls. Technical: Realistic cloth physics, subtle shadows in the folds. The design is high-resolution, accurately distorted by the natural drape. Professional commercial photography, clean aesthetic.',
    thumbnail: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=400&h=400',
    isProductOnly: true
  }
];

export const TSHIRT_COLORS = [
  { name: 'Pure Alabaster', value: '#FFFFFF', prompt: 'white' },
  { name: 'Obsidian Black', value: '#080808', prompt: 'black' },
  { name: 'Cloud Grey', value: '#D1D5DB', prompt: 'heather grey' },
  { name: 'Midnight Navy', value: '#0F172A', prompt: 'navy blue' },
  { name: 'Crimson Peak', value: '#7F1D1D', prompt: 'crimson red' },
  { name: 'Savannah Sage', value: '#14532D', prompt: 'forest green' },
];
