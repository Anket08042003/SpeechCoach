"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Play, BarChart2 } from "lucide-react";

export function DemoSection() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  const handleStartRecording = async () => {
    setError("");
    setTranscription("");
    chunksRef.current = [];
    setAudioFile(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        setAudioFile(file);
        setIsRecording(false);
      };
    } catch (err) {
      console.error("Recording error:", err);
      setError("Microphone access denied or error occurred");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleFileChange = (e) => {
    setError("");
    setTranscription("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      setError("Please upload an audio file (MP3, WAV, etc.)");
      return;
    }
    setAudioFile(file);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setError(isRecording ? "Please stop recording first" : "Please select an audio file");
      return;
    }

    setIsLoading(true);
    setError("");
    setTranscription("");

    try {
      // Verify audio file is playable (for debugging)
      if (audioRef.current) {
        const audioURL = URL.createObjectURL(audioFile);
        audioRef.current.src = audioURL;
        await audioRef.current.play().catch(e => console.log("Audio preview error:", e));
      }

      const formData = new FormData();
      formData.append("file", audioFile);

      const response = await fetch("http://127.0.0.1:5000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Transcription failed");
      }

      const data = await response.json();
      setTranscription(data.transcription || "No transcription returned");
    } catch (err) {
      console.error("Transcription error:", err);
      setError(err.message || "Failed to transcribe audio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              See It In Action
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How Our AI Speech Coach Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Experience the power of real-time speech analysis and personalized
              feedback
            </p>
          </div>
        </div>

        <audio ref={audioRef} controls className="hidden" />

        <div className="mx-auto max-w-5xl py-12">
          <Tabs defaultValue="record" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="record">1. Record Speech</TabsTrigger>
              <TabsTrigger value="analyze">2. AI Analysis</TabsTrigger>
              <TabsTrigger value="feedback">3. Get Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="record" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative h-48 w-48 rounded-full bg-muted flex items-center justify-center">
                      <Mic className="h-24 w-24 text-primary opacity-50" />
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-dashed animate-pulse"></div>
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Record Your Speech</h3>
                      <p className="text-muted-foreground">
                        Speak into your microphone or upload a recording. Try
                        answering a common interview question like "Tell me
                        about yourself."
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                      <input
                        type="file"
                        id="audio-upload"
                        accept="audio/*"
                        onChange={handleFileChange}
                        disabled={isLoading || isRecording}
                        className="hidden"
                      />
                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          className="gap-2"
                          onClick={
                            isRecording
                              ? handleStopRecording
                              : handleStartRecording
                          }
                          disabled={isLoading}
                        >
                          <Mic className="h-4 w-4" />
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </Button>

                        <Button
                          size="lg"
                          variant="outline"
                          className="gap-2"
                          onClick={() =>
                            document.getElementById("audio-upload")?.click()
                          }
                          disabled={isLoading || isRecording}
                        >
                          Upload Audio
                        </Button>
                      </div>
                      {audioFile && (
                        <div className="text-sm text-muted-foreground">
                          Selected: {audioFile.name}
                          {audioFile.name.endsWith(".webm") && " (Recording)"}
                        </div>
                      )}
                      {error && (
                        <div className="text-sm text-red-500">{error}</div>
                      )}
                      <Button
                        size="lg"
                        className="gap-2"
                        onClick={handleUpload}
                        disabled={isLoading || !audioFile || isRecording}
                      >
                        {isLoading ? "Processing..." : "Analyze Audio"}
                      </Button>
                      {transcription && (
                        <div className="mt-4 w-full max-w-xl text-sm bg-muted text-card-foreground p-4 rounded-md shadow-sm whitespace-pre-wrap">
                          <strong>Transcription:</strong>
                          <br />
                          {transcription}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Rest of your TabsContent components remain the same */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
