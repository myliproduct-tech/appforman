import React from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tab } from '../types';

export interface TourStep {
    target: string; // CSS selector or element ID
    title: string;
    content: string;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    disableBeacon?: boolean;
    tab?: Tab; // Which tab this step should be on
}

interface OnboardingTourProps {
    steps: TourStep[];
    onComplete: () => void;
    onSkip: () => void;
    onNavigate?: (tab: Tab) => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, onComplete, onSkip, onNavigate }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const step = steps[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    // Use a ResizeObserver or window resize listener to keep position updated
    const updatePosition = React.useCallback(() => {
        if (!step) return;

        if (step.placement === 'center') {
            setPosition({ top: 0, left: 0 });
            return;
        }

        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const cardElement = cardRef.current;
            const cardWidth = cardElement?.offsetWidth || 300;
            const cardHeight = cardElement?.offsetHeight || 200;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const padding = 16;

            let top = 0;
            let left = 0;

            // Base position based on placement
            switch (step.placement || 'bottom') {
                case 'top':
                    top = rect.top - cardHeight - 20;
                    left = rect.left + rect.width / 2 - cardWidth / 2;
                    break;
                case 'bottom':
                    top = rect.bottom + 20;
                    left = rect.left + rect.width / 2 - cardWidth / 2;
                    break;
                case 'left':
                    top = rect.top + rect.height / 2 - cardHeight / 2;
                    left = rect.left - cardWidth - 20;
                    break;
                case 'right':
                    top = rect.top + rect.height / 2 - cardHeight / 2;
                    left = rect.right + 20;
                    break;
            }

            // Clamping to viewport
            left = Math.max(padding, Math.min(viewportWidth - cardWidth - padding, left));
            top = Math.max(padding, Math.min(viewportHeight - cardHeight - padding, top));

            setPosition({ top, left });
        }
    }, [step]);

    React.useEffect(() => {
        if (!step) return;

        // Navigate to the correct tab if specified
        if (step.tab && onNavigate) {
            onNavigate(step.tab);
        }

        // Delay to allow content/tab to render
        const timer = setTimeout(() => {
            updatePosition();

            // Scroll target into view
            if (step.placement !== 'center') {
                const targetElement = document.querySelector(step.target);
                targetElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, step.tab ? 400 : 100);

        window.addEventListener('resize', updatePosition);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
        };
    }, [currentStep, step, onNavigate, updatePosition]);

    const handleNext = () => {
        if (isLast) {
            onComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirst) {
            setCurrentStep(prev => prev - 1);
        }
    };

    if (!step) return null;

    const isCentered = step.placement === 'center';

    return (
        <>
            {/* Dimmed Overlay */}
            <div className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in" onClick={onSkip} />

            {/* Tour Card */}
            <div
                ref={cardRef}
                className={`fixed z-[10000] transition-all duration-300 ${isCentered ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
                style={isCentered ? {} : { top: `${position.top}px`, left: `${position.left}px` }}
            >
                <div className="glass-card border-[#f6c453]/30 rounded-[2rem] p-6 w-[280px] xs:w-[300px] shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider bg-[#f6c453]/10 text-[#f6c453] border border-[#f6c453]/20">
                                    Krok {currentStep + 1}/{steps.length}
                                </span>
                            </div>
                            <h3 className="text-lg font-black accent-text uppercase tracking-tight leading-tight">
                                {step.title}
                            </h3>
                        </div>
                        <button
                            onClick={onSkip}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-all opacity-50 hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <p className="text-[11px] leading-relaxed opacity-80 mb-6 whitespace-pre-line">
                        {step.content}
                    </p>

                    {/* Navigation */}
                    <div className="flex justify-between items-center gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={isFirst}
                            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${isFirst
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <ChevronLeft className="w-3 h-3" />
                            Zpět
                        </button>

                        <button
                            onClick={onSkip}
                            className="px-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider opacity-40 hover:opacity-100 transition-all"
                        >
                            Přeskočit
                        </button>

                        <button
                            onClick={handleNext}
                            className="flex items-center gap-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#bb8712] to-[#f6c453] text-[#1f2933] hover:scale-105 transition-all shadow-lg"
                        >
                            {isLast ? 'Dokončit' : 'Další'}
                            {!isLast && <ChevronRight className="w-3 h-3" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Spotlight effect - rendered AFTER tour card to potentially show over it if needed, or better separation */}
            {!isCentered && position.top !== 0 && (
                <div
                    className="fixed z-[9999] pointer-events-none border-4 border-[#f6c453] rounded-2xl animate-pulse"
                    style={{
                        top: `${(document.querySelector(step.target)?.getBoundingClientRect().top || 0) - 8}px`,
                        left: `${(document.querySelector(step.target)?.getBoundingClientRect().left || 0) - 8}px`,
                        width: `${(document.querySelector(step.target)?.getBoundingClientRect().width || 0) + 16}px`,
                        height: `${(document.querySelector(step.target)?.getBoundingClientRect().height || 0) + 16}px`,
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 30px rgba(246, 196, 83, 0.5)',
                        transition: 'all 0.3s ease',
                    }}
                />
            )}
        </>
    );
};
