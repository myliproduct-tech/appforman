import fs from 'fs';

// WAV file parameters for radio beep notification
const sampleRate = 44100;
const duration = 0.4; // 400ms - short and crisp
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

// Generate radio beep with static
for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    // Envelope: quick attack, sustained, quick release
    let envelope;
    const attackTime = 0.02;
    const releaseTime = 0.05;

    if (t < attackTime) {
        // Attack
        envelope = t / attackTime;
    } else if (t > duration - releaseTime) {
        // Release
        envelope = (duration - t) / releaseTime;
    } else {
        // Sustain
        envelope = 1.0;
    }

    // Main beep tone (1800 Hz - high pitched radio beep)
    const beepFreq = 1800;
    const beep = Math.sin(2 * Math.PI * beepFreq * t) * envelope * 0.6;

    // Radio static/noise (white noise filtered)
    const staticNoise = (Math.random() - 0.5) * 0.15 * envelope;

    // Low frequency radio hum
    const radioHum = Math.sin(2 * Math.PI * 120 * t) * envelope * 0.05;

    // Slight frequency modulation for radio effect
    const fmMod = Math.sin(2 * Math.PI * 8 * t) * 0.02;
    const fmBeep = Math.sin(2 * Math.PI * beepFreq * t * (1 + fmMod)) * envelope * 0.1;

    // Combine all components
    let sample = beep + staticNoise + radioHum + fmBeep;

    // Convert to 16-bit integer
    let sampleInt = Math.floor(sample * 32767);
    sampleInt = Math.max(-32768, Math.min(32767, sampleInt));

    // Write to buffer
    buffer.writeInt16LE(sampleInt, 44 + i * 2);
}

// Write file
const outputPath = 'public/notification.wav';
fs.writeFileSync(outputPath, buffer);
console.log(`Radio beep notification sound generated: ${outputPath}`);
