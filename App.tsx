
import React, { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  Settings2, 
  AlertCircle,
  RefreshCw,
  Maximize2,
  Zap,
  User,
  Users,
  Palette,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
  CheckCircle,
  Trash2
} from 'lucide-react';
import { MOCKUP_STYLES, TSHIRT_COLORS } from './constants';
import { MockupStyle, GenerationSettings, MockupResult, Gender } from './types';
import { generateMockup, checkApiKeySelection, openApiKeySelector } from './services/geminiService';

const ButterflyIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 19c-2 0-3-1-3-3 0-2.5 3-4 3-4s3 1.5 3 4c0 2-1 3-3 3Z" />
    <path d="M12 5c-2 0-3-1-3 3 0-2.5 3-4 3-4s3-1.5 3-4c0-2-1-3-3-3Z" />
    <path d="M9 12c-3.5 0-6-2.5-6-6s3.5-3 6-3 4 1 4 3" />
    <path d="M15 12c3.5 0 6-2.5 6-6s-3.5-3-6-3-4 1-4 3" />
    <path d="M9 12c-3.5 0-6 2.5-6 6s3.5 3 6 3 4-1 4-3" />
    <path d="M15 12c3.5 0 6 2.5 6 6s-3.5 3-6 3-4-1-4-3" />
  </svg>
);

const App: React.FC = () => {
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<MockupStyle>(MOCKUP_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<MockupResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProMode, setIsProMode] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    model: 'gemini-2.5-flash-image',
    aspectRatio: '1:1',
    quality: '1K',
    gender: 'Neutral',
    color: 'Pure Alabaster'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesignImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProMode = async () => {
    if (!isProMode) {
      const hasKey = await checkApiKeySelection();
      if (!hasKey) {
        await openApiKeySelector();
      }
      setIsProMode(true);
      setSettings(prev => ({ ...prev, model: 'gemini-3-pro-image-preview', quality: '4K' }));
    } else {
      setIsProMode(false);
      setSettings(prev => ({ ...prev, model: 'gemini-2.5-flash-image', quality: '1K' }));
    }
  };

  const handleGenerate = async () => {
    if (!designImage) return;
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateMockup(designImage, selectedStyle.prompt, settings);
      setResults(prev => [{
        id: Math.random().toString(36).substring(2, 9).toUpperCase(),
        imageUrl,
        prompt: selectedStyle.prompt,
        createdAt: Date.now()
      }, ...prev]);
    } catch (err: any) {
      if (err.message === 'API_KEY_RESET') {
        setError("Pro engine requires key authorization.");
        await openApiKeySelector();
      } else {
        setError("The visualization sequence failed.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setResults([]);
    setDesignImage(null);
    setError(null);
  };

  const downloadImage = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `MOCKSHOP_${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen flex flex-col bg-charcoal-deep text-off-white font-sans overflow-hidden">
      
      {/* LUXURY HEADER */}
      <header className="px-8 py-4 border-b border-white/5 flex items-center justify-between shrink-0 glass-card z-50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-soft transition-all float-animation">
            <ButterflyIcon className="text-cyan-soft w-6 h-6 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-white leading-none">MOCKSHOP</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[1px] w-4 bg-crimson-muted"></div>
              <span className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.3em]">Neural Asset Lab</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">
            <span>Pipeline Status</span>
            <div className={`px-3 py-1 rounded-full border border-white/10 ${isProMode ? 'bg-cyan-soft/10 text-cyan-soft' : 'bg-white/5 text-white/40'}`}>
              {isProMode ? '3-PRO-X 8K Active' : '2.5-Lite 1K'}
            </div>
          </div>
          <button 
            onClick={toggleProMode}
            className={`px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all border ${
              isProMode 
                ? 'bg-cyan-soft/5 border-cyan-soft/50 text-cyan-soft glow-cyan' 
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isProMode ? 'Ultra HD Locked' : 'Enable Pro Unit'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        
        {/* REFINED CONFIG PANEL */}
        <aside className="xl:w-[400px] border-r border-white/5 p-6 space-y-8 bg-charcoal-deep overflow-y-auto custom-scrollbar shrink-0">
          
          {/* STEP 1: UPLOAD */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">01_Artwork Source</h2>
              {designImage && <CheckCircle className="w-3 h-3 text-cyan-soft" />}
            </div>
            <div className="relative group transition-all">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className={`rounded-2xl aspect-video flex flex-col items-center justify-center bg-charcoal transition-all overflow-hidden border ${
                designImage ? 'border-cyan-soft/30 glow-cyan' : 'border-dashed border-white/10 group-hover:border-white/20'
              }`}>
                {designImage ? (
                  <img src={designImage} className="w-full h-full object-contain p-4" alt="PREVIEW" />
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-cyan-soft/10 transition-colors">
                      <Upload className="w-6 h-6 text-white/20 group-hover:text-cyan-soft transition-colors" />
                    </div>
                    <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Drop Neural Graphic</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* STEP 2: CONFIG */}
          <section className="space-y-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">02_Asset Configuration</h2>
            
            <div className="space-y-6">
              {/* COLORS */}
              <div>
                <label className="block text-[9px] font-bold text-white/20 uppercase mb-4 tracking-widest">Garment Palette</label>
                <div className="grid grid-cols-6 gap-3">
                  {TSHIRT_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSettings(s => ({ ...s, color: c.name }))}
                      className={`relative w-full aspect-square rounded-lg transition-all border p-0.5 ${
                        settings.color === c.name 
                          ? 'border-cyan-soft glow-cyan scale-110' 
                          : 'border-white/5 hover:border-white/20'
                      }`}
                      style={{ background: c.value }}
                      title={c.name}
                    >
                      {settings.color === c.name && (
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <CheckCircle className="w-3 h-3 text-white mix-blend-difference" />
                         </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBJECT */}
              {!selectedStyle.isProductOnly && (
                <div>
                  <label className="block text-[9px] font-bold text-white/20 uppercase mb-4 tracking-widest">Human Host Selection</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Male', 'Female', 'Neutral'] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setSettings(s => ({ ...s, gender: g }))}
                        className={`text-[10px] py-2.5 rounded-lg font-bold uppercase tracking-widest border transition-all ${
                          settings.gender === g 
                            ? 'bg-cyan-soft/5 border-cyan-soft/50 text-cyan-soft glow-cyan' 
                            : 'bg-white/5 border-white/10 text-white/30 hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* STEP 3: MOCKUP STYLES */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">MockUp Styles</h2>
            <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              {MOCKUP_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all group ${
                    selectedStyle.id === style.id 
                      ? 'bg-cyan-soft/5 border-cyan-soft/40' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/5">
                    <img src={style.thumbnail} className={`w-full h-full object-cover transition-all duration-500 ${selectedStyle.id === style.id ? 'opacity-100 scale-110' : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105'}`} alt={style.name} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className={`text-[11px] font-bold uppercase tracking-tight ${selectedStyle.id === style.id ? 'text-cyan-soft' : 'text-white/60'}`}>{style.name}</h4>
                    <p className="text-[9px] text-white/30 truncate mt-1">{style.description}</p>
                  </div>
                  <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${selectedStyle.id === style.id ? 'text-cyan-soft translate-x-1' : 'text-white/10 group-hover:text-white/30'}`} />
                </button>
              ))}
            </div>
          </section>

          {/* MASTER ACTION */}
          <div className="pt-4 sticky bottom-0 bg-charcoal-deep space-y-3">
            <button
              onClick={handleGenerate}
              disabled={!designImage || isGenerating}
              className={`w-full py-6 rounded-2xl text-sm font-display font-bold uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn ${
                !designImage || isGenerating 
                  ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed opacity-50' 
                  : 'bg-white text-black hover:bg-cyan-soft hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] active:scale-95'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Synthesizing Assets...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Execute Generation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
              )}
            </button>
            
            {(designImage || results.length > 0) && (
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl text-[9px] font-bold uppercase tracking-[0.4em] border border-white/10 text-white/30 hover:text-crimson-muted hover:border-crimson-muted/30 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                Reset Sequence
              </button>
            )}

            {error && (
              <div className="mt-4 bg-crimson-muted/10 text-crimson-muted p-4 rounded-xl border border-crimson-muted/30 flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN RENDER SHOWCASE */}
        <section className="flex-1 p-10 bg-charcoal overflow-y-auto custom-scrollbar flex flex-col items-center">
          
          {results.length === 0 && !isGenerating && (
            <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center text-center p-16 rounded-[3rem] border border-white/5 border-dashed bg-charcoal-deep/50 space-y-10">
              <div className="relative">
                <div className="absolute inset-0 bg-crimson-muted/20 blur-[80px] rounded-full"></div>
                <h2 className="relative text-[5vw] xl:text-[3.5vw] font-display font-bold italic leading-tight text-white tracking-tighter uppercase opacity-90">
                  ready for <span className="text-crimson-muted">transformation</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-3 gap-12 pt-6">
                <div className="flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-crimson-muted/50 transition-colors">
                    <Zap className="w-6 h-6 text-crimson-muted opacity-60" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Neural Engine</span>
                </div>
                <div className="flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-cyan-soft/50 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-cyan-soft opacity-60" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Verified Output</span>
                </div>
                <div className="flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                    <Layers className="w-6 h-6 text-white opacity-40" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Lossless Map</span>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex-1 w-full max-w-xl aspect-square rounded-[3rem] border border-cyan-soft/20 bg-charcoal-deep flex flex-col items-center justify-center p-16 animate-pulse glow-cyan relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-soft/5 to-transparent"></div>
              <RefreshCw className="w-16 h-16 text-cyan-soft animate-spin mb-8" />
              <h2 className="text-4xl font-display font-bold italic text-cyan-soft text-center leading-none uppercase tracking-tight">Active Generation</h2>
              <p className="text-[10px] font-bold bg-cyan-soft text-charcoal px-3 py-1 mt-6 uppercase tracking-[0.3em]">Pixel Reconstruction Sequence</p>
            </div>
          )}

          <div className="space-y-20 max-w-3xl mx-auto w-full py-10">
            {results.map((result) => (
              <div key={result.id} className="relative rounded-[3rem] bg-charcoal-deep border border-white/5 group transition-all duration-700 hover:border-cyan-soft/30 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="relative aspect-square overflow-hidden rounded-[3rem]">
                  <img src={result.imageUrl} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" alt="RENDER" />
                  
                  {/* FLOATING HUD */}
                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <div className="bg-black/40 backdrop-blur-xl text-cyan-soft px-4 py-2 rounded-xl border border-white/10 font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl">
                      Unit_Sig_{result.id}
                    </div>
                  </div>

                  {/* DOWNLOAD OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-charcoal-deep/30 backdrop-blur-sm">
                    <button 
                      onClick={() => downloadImage(result.imageUrl, result.id)}
                      className="bg-white text-black px-10 py-5 rounded-2xl text-lg font-display font-bold uppercase tracking-widest transition-all shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 flex items-center gap-4"
                    >
                      <Download className="w-6 h-6" />
                      Grab Visual
                    </button>
                  </div>
                </div>

                {/* PREMIUM METADATA */}
                <div className="border-t border-white/5 p-8 grid grid-cols-4 gap-8 bg-black/20 rounded-b-[3rem]">
                  <div className="space-y-2">
                    <span className="block text-white/20 text-[9px] font-bold uppercase tracking-widest">Pipeline</span>
                    <span className="text-[11px] font-bold text-white/80">Neural_V3</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-white/20 text-[9px] font-bold uppercase tracking-widest">Asset Quality</span>
                    <span className="text-[11px] font-bold text-cyan-soft">Lossless 8K</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-white/20 text-[9px] font-bold uppercase tracking-widest">Batch ID</span>
                    <span className="text-[11px] font-bold text-white/80">#{result.id}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-white/20 text-[9px] font-bold uppercase tracking-widest">Gen Cycle</span>
                    <span className="text-[11px] font-bold text-white/80">{new Date(result.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* REFINED FOOTER */}
      <footer className="px-8 py-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 shrink-0 bg-charcoal-deep z-50">
        <div className="flex items-center gap-3">
          <ButterflyIcon className="w-4 h-4 text-crimson-muted opacity-50" />
          <span className="text-white/40">MockShop // Protocol_Neural_Asset_Lab</span>
        </div>
        <div className="flex gap-8">
          <span className="hover:text-cyan-soft transition-colors cursor-pointer tracking-[0.3em]">System.Optimal</span>
          <span className="hover:text-cyan-soft transition-colors cursor-pointer tracking-[0.3em]">Status.Verified</span>
          <span className="hover:text-cyan-soft transition-colors cursor-pointer tracking-[0.3em]">Enc.Secure</span>
        </div>
        <span className="opacity-40 font-medium">© 2024 Visual Destruction Labs • Nairobi</span>
      </footer>
    </div>
  );
};

export default App;
