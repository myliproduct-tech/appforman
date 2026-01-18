import wave
import struct
import math

# Parameters for mechanical click sound
sample_rate = 44100
duration = 0.08  # 80ms for a short, crisp click

# Generate click sound with two components:
# 1. Sharp attack (high frequency burst)
# 2. Quick decay with lower frequency

samples = []
num_samples = int(sample_rate * duration)

for i in range(num_samples):
    t = i / sample_rate
    
    # Envelope: sharp attack, quick decay
    envelope = math.exp(-t * 50)  # Fast exponential decay
    
    # Frequency components for mechanical sound
    # High frequency burst (simulates the "click")
    freq1 = 2000 + (1000 * math.exp(-t * 100))  # Frequency sweep down
    click_component = math.sin(2 * math.pi * freq1 * t) * envelope
    
    # Lower frequency for body (simulates mechanical resonance)
    freq2 = 400
    body_component = math.sin(2 * math.pi * freq2 * t) * envelope * 0.3
    
    # Add some noise for realism
    import random
    noise = (random.random() - 0.5) * 0.1 * envelope
    
    # Combine components
    sample = (click_component + body_component + noise) * 0.8
    
    # Convert to 16-bit integer
    sample_int = int(sample * 32767)
    sample_int = max(-32768, min(32767, sample_int))
    samples.append(sample_int)

# Write to WAV file
output_file = r'c:\Users\Home\Desktop\aplikace pro chlapy\public\click.wav'
with wave.open(output_file, 'w') as wav_file:
    wav_file.setnchannels(1)  # Mono
    wav_file.setsampwidth(2)  # 16-bit
    wav_file.setframerate(sample_rate)
    
    for sample in samples:
        wav_file.writeframes(struct.pack('<h', sample))

print(f"Mechanical click sound generated: {output_file}")
