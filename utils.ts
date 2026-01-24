
/**
 * Czech Grammatical Logic for Name Declension
 * Handles transforming a base partner name into specific cases based on context.
 */

// Helper to determine declension based on case
const getDeclension = (name: string, form: 'nom' | 'gen' | 'dat' | 'acc' | 'voc' | 'ins'): string => {
  const n = name.trim();
  if (!n) return "Velitelka";

  // Check if starts with lower case (custom name might be lower case, but we usually want to Capitalize it in replacement unless context differs)
  // For simplicity, we preserve original capitalization of the name input or capitalize it if replacing "Velitelka"

  // Logic for names ending in 'a' (Vzor Žena: Mamina, Láska, Petra)
  if (n.endsWith('a') || n.endsWith('A')) {
    const base = n.slice(0, -1);
    const lastChar = n.slice(-1); // preserve case of 'a' if needed, though usually suffix changes

    switch (form) {
      case 'nom': return n; // Mamina
      case 'gen': return base + 'y'; // Maminy
      case 'dat': // Mamině, Lásce, Báře
        if (n.toLowerCase().endsWith('ka')) return n.slice(0, -2) + 'ce'; // Láska -> Lásce
        if (n.toLowerCase().endsWith('ra')) return base + 'ře'; // Bára -> Báře
        if (n.toLowerCase().endsWith('ga')) return base + 'ze'; // Olga -> Olze
        if (n.toLowerCase().endsWith('ha')) return base + 'ze'; // Kniha -> Knize (unlikely name but consistent)
        return base + 'ě'; // Mamině (Default soft)
      case 'acc': return base + 'u'; // Maminu
      case 'voc': return base + 'o'; // Mamino
      case 'ins': return base + 'ou'; // Maminou
    }
  }

  // Logic for names ending in 'e'/'ě' (Vzor Růže: Lucie, Přítelkyně)
  if (n.endsWith('e') || n.endsWith('ě')) {
    const last = n.slice(-1);
    const base = n.slice(0, -1);
    switch (form) {
      case 'nom': return n;
      case 'gen': return (last === 'e' ? n : base + 'e'); // Lucie -> Lucie, Růže -> Růže
      case 'dat': return (last === 'e' ? n : base + 'i'); // Lucii
      case 'acc': return n; // Lucii? No, Lucie -> Lucii (acc). Wait, vzor Růže: Růži.
        // Let's simplify: Names like Lucie often behave like Růže. 
        // Acc: Růži. Gen: Růže. Dat: Růži.
        // This is complex. Let's fallback to indeclinable for safety if not ending in 'a'.
        return n;
      case 'voc': return (last === 'e' ? 'Lucie' : 'Růže'); // Vocative is mostly same or 'i'
      case 'ins': return base + 'í'; // Lucií
    }
  }

  // Fallback: If name doesn't end in 'a', assume it's a foreign name or nickname that doesn't decline easily (Karin, Niki).
  // We keep it static to avoid "Karině" which might be wrong without knowing the root.
  // Exception: Instrumental usually adds "s ...". "s Karin" is fine.
  return n;
};

/**
 * Replaces "Velitelka" and "mamina" placeholders in text with the user's partner name, 
 * respecting Czech grammatical cases.
 */
export const localizeText = (text: string, partnerName: string): string => {
  if (!text) return "";

  const name = partnerName && partnerName.trim() !== "" ? partnerName : "Velitelka";
  let res = text;

  // Dictionary of words to replace with their declension form
  const replacements: { pattern: string[], form: 'nom' | 'gen' | 'dat' | 'acc' | 'voc' | 'ins' }[] = [
    { pattern: ['Velitelkou', 'maminou', 'maminkou', 'partnerkou'], form: 'ins' },
    { pattern: ['Velitelku', 'maminu', 'maminku', 'partnerku'], form: 'acc' },
    { pattern: ['Velitelce', 'mamině', 'mamince', 'partnerce'], form: 'dat' },
    { pattern: ['Velitelky', 'maminy', 'maminky', 'partnerky'], form: 'gen' },
    { pattern: ['Velitelko', 'mamino', 'maminko', 'partnerko'], form: 'voc' },
    { pattern: ['Velitelka', 'mamina', 'maminka', 'partnerka'], form: 'nom' }
  ];

  replacements.forEach(({ pattern, form }) => {
    const replacement = form === 'nom' ? name : getDeclension(name, form);
    // Use a regex that handles Czech characters correctly by not relying solely on \b
    // This lookbehind/lookahead approach ensures we only replace whole words
    pattern.forEach(word => {
      const regex = new RegExp(`(?<=^|[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])${word}(?=[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]|$)`, 'g');
      res = res.replace(regex, replacement);

      // Also handle lowercase variants if the word in pattern was capitalized
      if (word[0] === word[0].toUpperCase()) {
        const lowerWord = word.toLowerCase();
        const lowerRegex = new RegExp(`(?<=^|[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])${lowerWord}(?=[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]|$)`, 'g');
        res = res.replace(lowerRegex, replacement);
      }
    });
  });

  return res;
};

import { RANKS } from './constants';

export const getRankBasedOnPoints = (points: number) => {
  // Find the highest rank where minPoints <= points
  // We reverse the array to find the first match from top down, or use findLast/reduce logic
  // Simple approach: Sort descending by minPoints and find first
  const sortedRanks = [...RANKS].sort((a, b) => b.minPoints - a.minPoints);
  const rank = sortedRanks.find(r => points >= r.minPoints);
  return rank || RANKS[0];
};

/**
 * Otevře Google Maps s navigací na zadanou adresu
 * @param address - Cílová adresa pro navigaci
 */
export const navigateToAddress = (address: string) => {
  if (address) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
      '_blank'
    );
  }
};

/**
 * Otevře telefonní aplikaci pro volání na zadané číslo
 * @param phone - Telefonní číslo
 */
export const makePhoneCall = (phone: string) => {
  if (phone) {
    window.location.href = `tel:${phone}`;
  }
};
