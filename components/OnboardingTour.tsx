import React from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tab } from '../types';
import { localizeText } from '../utils';

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
    partnerName: string; // Added prop
    onComplete: () => void;
    onSkip: () => void;
    onNavigate?: (tab: Tab) => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, partnerName, onComplete, onSkip, onNavigate }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [spotlightRect, setSpotlightRect] = React.useState({ top: 0, left: 0, width: 0, height: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const step = steps[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    // Use a ResizeObserver or window resize listener to keep position updated
    const updatePosition = React.useCallback(() => {
        if (!step) return;

        if (step.placement === 'center') {
            setPosition({ top: 0, left: 0 });
            setSpotlightRect({ top: 0, left: 0, width: 0, height: 0 });
            return;
        }

        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();

            // Update spotlight position
            setSpotlightRect({
                top: rect.top - 8,
                left: rect.left - 8,
                width: rect.width + 16,
                height: rect.height + 16
            });

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
        window.addEventListener('scroll', updatePosition, true); // Capture scroll events

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
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
            {/* Solid Overlay without blur to keep target sharp */}
            <div className="fixed inset-0 bg-black/60 z-[9998] animate-fade-in transition-opacity duration-300" onClick={onSkip} />

            {/* Tour Card */}
            <div
                ref={cardRef}
                className={`fixed z-[10000] w-[92vw] max-w-[340px] transition-all duration-300 ease-out will-change-transform ${isCentered ? 'top-1/2 left-1/2' : 'top-0 left-0'}`}
                style={{
                    transform: isCentered
                        ? 'translate3d(-50%, -50%, 0)'
                        : `translate3d(${position.left}px, ${position.top}px, 0)`,
                    opacity: position.top === 0 && !isCentered ? 0 : 1
                }}
            >
                <div className="glass-card border-[#f6c453]/30 rounded-[2rem] p-5 sm:p-6 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider bg-[#f6c453]/10 text-[#f6c453] border border-[#f6c453]/20">
                                    Krok {currentStep + 1}/{steps.length}
                                </span>
                            </div>
                            <h3 className="text-lg font-black accent-text uppercase tracking-tight leading-tight">
                                {localizeText(step.title, partnerName)}
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
                    <div key={currentStep} className="animate-fade-in">
                        <p className="text-[11px] leading-relaxed opacity-80 mb-6 whitespace-pre-line">
                            {localizeText(step.content, partnerName)}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={isFirst}
                            className={`flex items-center gap-1 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all min-w-[70px] justify-center ${isFirst
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-white/10 opacity-60 hover:opacity-100 bg-white/5'
                                }`}
                        >
                            <ChevronLeft className="w-3 h-3" />
                            ZPĚT
                        </button>

                        <button
                            onClick={onSkip}
                            className="px-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider opacity-40 hover:opacity-100 transition-all"
                        >
                            PŘESKOČIT
                        </button>

                        <button
                            onClick={handleNext}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#bb8712] to-[#f6c453] text-[#1f2933] hover:scale-105 transition-all shadow-lg min-w-[100px]"
                        >
                            {isLast ? 'DOKONČIT' : 'DALŠÍ'}
                            {!isLast && <ChevronRight className="w-3 h-3" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Spotlight effect - sharp cut out using box-shadow */}
            {!isCentered && spotlightRect.width > 0 && (
                <div
                    className="fixed z-[9999] pointer-events-none border-2 border-[#f6c453] rounded-2xl will-change-transform"
                    style={{
                        top: 0,
                        left: 0,
                        width: `${spotlightRect.width}px`,
                        height: `${spotlightRect.height}px`,
                        transform: `translate3d(${spotlightRect.left}px, ${spotlightRect.top}px, 0)`,
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                        transition: 'all 0.3s ease-out',
                    }}
                >
                    <div className="absolute inset-0 rounded-2xl animate-pulse-slow border border-[#f6c453]/40" />
                    {/* Inner highlight for clarity */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(246,196,83,0.1)]" />
                </div>
            )}
        </>
    );
};
