import fs from 'fs';

// WAV file parameters for sonar sound
const sampleRate = 44100;
const duration = 1.2; // 1.2 seconds for sonar ping
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

// Generate sonar ping sound
// Sonar characteristics:
// - Initial high-pitched "ping" (1000-1500 Hz)
// - Exponential decay
// - Echo/reverb effect (multiple decaying pings)
for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    // Main ping - exponential decay
    const mainDecay = Math.exp(-t * 8);
    const mainFreq = 1200 - (200 * t); // Frequency sweep down
    const mainPing = Math.sin(2 * Math.PI * mainFreq * t) * mainDecay;

    // First echo (delayed, quieter)
    const echo1Delay = 0.15;
    const echo1 = t > echo1Delay
        ? Math.sin(2 * Math.PI * 1100 * (t - echo1Delay)) * Math.exp(-(t - echo1Delay) * 10) * 0.4
        : 0;

    // Second echo (more delayed, even quieter)
    const echo2Delay = 0.3;
    const echo2 = t > echo2Delay
        ? Math.sin(2 * Math.PI * 1000 * (t - echo2Delay)) * Math.exp(-(t - echo2Delay) * 12) * 0.2
        : 0;

    // Low frequency rumble for depth
    const rumble = Math.sin(2 * Math.PI * 80 * t) * mainDecay * 0.15;

    // Combine all components
    let sample = (mainPing + echo1 + echo2 + rumble) * 0.7;

    // Convert to 16-bit integer
    let sampleInt = Math.floor(sample * 32767);
    sampleInt = Math.max(-32768, Math.min(32767, sampleInt));

    // Write to buffer
    buffer.writeInt16LE(sampleInt, 44 + i * 2);
}

// Write file
const outputPath = 'public/sonar.wav';
fs.writeFileSync(outputPath, buffer);
console.log(`Sonar sound generated: ${outputPath}`);
