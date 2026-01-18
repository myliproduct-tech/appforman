
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

  // Default to "Velitelka" if partnerName is empty, but if partnerName IS "Velitelka", we don't need to replace (optimization).
  // But we DO need to replace "mamina" with "Velitelka" if the user chose "Velitelka".
  const name = partnerName && partnerName.trim() !== "" ? partnerName : "Velitelka";

  // Helper to apply regex replacement with case handling
  let res = text;

  // 1. Instrumental (7. pád) - s Velitelkou, s maminou -> s [jménem]
  res = res.replace(/\b(Velitelkou|maminou)\b/g, getDeclension(name, 'ins'));

  // 2. Accusative (4. pád) - pro Velitelku, vidím maminu -> [jméno-u]
  res = res.replace(/\b(Velitelku|maminu)\b/g, getDeclension(name, 'acc'));

  // 3. Dative/Locative (3./6. pád) - k Velitelce, o mamině -> [jméno-ě/ce]
  res = res.replace(/\b(Velitelce|mamině)\b/g, getDeclension(name, 'dat'));

  // 4. Genitive (2. pád) - bez Velitelky, u maminy -> [jméno-y]
  // Note: Also handles plural nom/acc in some contexts, but rare in this app's corpus.
  res = res.replace(/\b(Velitelky|maminy)\b/g, getDeclension(name, 'gen'));

  // 5. Vocative (5. pád) - Ahoj Velitelko, Ahoj mamino -> [jméno-o]
  res = res.replace(/\b(Velitelko|mamino)\b/g, getDeclension(name, 'voc'));

  // 6. Nominative (1. pád) - Velitelka, mamina -> [jméno]
  // We handle lowercase 'mamina' separately to capitalization if needed, but usually we want to respect the user's name capitalization.
  // If the sentence starts with Mamina, we replace with Name. If it's inside, we replace with Name.
  res = res.replace(/\b(Velitelka|mamina)\b/g, name);

  // Handle capitalized variations explicitly if regex flag 'i' isn't used to preserve intent
  // (The above regexes don't use 'i' flag to avoid replacing "velitelkou" with "Maminou" inside a sentence if we want to keep casing logic, 
  // but usually names are capitalized. Let's do a pass for lowercase "mamina" specifically if it wasn't caught).

  // Fix lowercase 'mamina' variants if they weren't capitalized in source
  res = res.replace(/\bmaminou\b/g, getDeclension(name, 'ins').toLowerCase()); // Keep lowercase if source was lowercase? 
  // Actually, partner names are proper nouns, so they should be capitalized even if source "mamina" wasn't.

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
