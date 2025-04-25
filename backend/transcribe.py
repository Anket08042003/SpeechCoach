import whisper
import sys

# Load the Whisper model
model = whisper.load_model("medium")  # You can choose "tiny", "base", "small", "medium", or "large"

def transcribe_audio(audio_file):
    # Transcribe the audio file
    result = model.transcribe(audio_file)
    
    # Print the transcribed text
    print(f"Transcription: {result['text']}")

if __name__ == "__main__":
    # Check if the audio file is provided as an argument
    if len(sys.argv) != 2:
        print("Usage: python transcribe.py <audio_file_path>")
        sys.exit(1)

    audio_file = sys.argv[1]
    transcribe_audio(audio_file)
