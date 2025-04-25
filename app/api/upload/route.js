import { Whisper } from 'whisper-node';
import { promises as fs } from 'fs';
import path from 'path';


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Save uploaded file
    const formData = await req.formData();
    const file = formData.get('audio');
    const buffer = await file.arrayBuffer();
    const tempPath = path.join(process.cwd(), 'temp', file.name);
    await fs.writeFile(tempPath, Buffer.from(buffer));

    // Transcribe using Whisper
    const whisper = new Whisper('medium'); // Match your Python model size
    const transcription = await whisper.transcribe(tempPath);

    // Clean up temp file
    await fs.unlink(tempPath);

    return Response.json({ transcription });
  } catch (err) {
    return Response.json(
      { error: err.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}