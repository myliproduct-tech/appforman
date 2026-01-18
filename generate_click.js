import fs from 'fs';

// WAV file parameters
const sampleRate = 44100;
const duration = 0.08; // 80ms
const numSamples = Math.floor(sampleRate * duration);

// Create buffer for WAV file
const dataSize = numSamples * 2; // 16-bit samples
const buffer = Buffer.alloc(44 + dataSize);

// Write WAV header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // fmt chunk size
buffer.writeUInt16LE(1, 20); // audio format (PCM)
buffer.writeUInt16LE(1, 22); // number of channels (mono)
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
buffer.writeUInt16LE(2, 32); // block align
buffer.writeUInt16LE(16, 34); // bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Generate mechanical click sound
for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    // Sharp exponential decay envelope
    const envelope = Math.exp(-t * 50);

    // High frequency component (the "click")
    const freq1 = 2000 + (1000 * Math.exp(-t * 100));
    const clickComponent = Math.sin(2 * Math.PI * freq1 * t) * envelope;

    // Lower frequency for mechanical body
    const freq2 = 400;
    const bodyComponent = Math.sin(2 * Math.PI * freq2 * t) * envelope * 0.3;

    // Add noise for realism
    const noise = (Math.random() - 0.5) * 0.1 * envelope;

    // Combine and scale
    let sample = (clickComponent + bodyComponent + noise) * 0.8;

    // Convert to 16-bit integer
    let sampleInt = Math.floor(sample * 32767);
    sampleInt = Math.max(-32768, Math.min(32767, sampleInt));

    // Write to buffer
    buffer.writeInt16LE(sampleInt, 44 + i * 2);
}

// Write file
const outputPath = 'public/click.wav';
fs.writeFileSync(outputPath, buffer);
console.log(`Mechanical click sound generated: ${outputPath}`);
