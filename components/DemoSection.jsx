"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Play, BarChart2 } from "lucide-react";

// Add these right after your imports
const GEMINI_API_KEY = "AIzaSyDPMMofqofxSmDrbsS-y_HqixtzzwwDUiY";
const FILLER_WORDS = [
  "um",
  "uh",
  "like",
  "you know",
  "so",
  "basically",
  "actually",
];
const ANALYSIS_PROMPT = `
Analyze this speech transcript and return a JSON object with:
- fillerWordCount (total number)
- fillerWords (array with each instance)
- paceWPM (words per minute)
- clarityScore (0-1)
- confidenceScore (0-1)
- suggestions (array of improvement suggestions)

Transcript: {TRANSCRIPT}
`;

export function DemoSection() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream?.getTracks().forEach((track) => track.stop());
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
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
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
      setError(
        isRecording
          ? "Please stop recording first"
          : "Please select an audio file"
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setTranscription("");

    try {
      // 1. Get transcription (your existing code)
      const formData = new FormData();
      formData.append("file", audioFile);
      const response = await fetch("http://127.0.0.1:5000/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const transcript = data.transcription;
      setTranscription(transcript);

      // 2. Get analysis from Gemini
      const analysis = await analyzeWithGemini(transcript);
      if (!analysis) throw new Error("Analysis failed");

      // 3. Store analysis results in state
      setAnalysis(analysis); // You'll need to add this state: const [analysis, setAnalysis] = useState(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze audio");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeWithGemini = async (text) => {
    try {
      // Improved prompt to explicitly request JSON format
      const prompt = `Analyze this speech transcript and return a JSON object with these exact properties:
  - fillerWordCount (total number)
  - fillerWords (array with each instance)
  - paceWPM (words per minute)
  - clarityScore (0-1)
  - confidenceScore (0-1)
  - suggestions (array of improvement suggestions)
  
  Return ONLY the JSON object, without any additional text or explanation.
  Wrap the JSON in triple backticks (\`\`\`json \`\`\`) for proper formatting.
  
  Transcript: ${text}`;
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      if (!data.candidates || !data.candidates.length) {
        console.error("Gemini API Error Response:", data);
        throw new Error(data.error?.message || "No candidates returned from Gemini API");
      }
  
      let jsonStr = data.candidates[0].content.parts[0].text;
  
      // More robust JSON extraction
      // First try to find JSON within markdown code blocks
      const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      // If no code blocks, try to find the first JSON object in the string
      else {
        const firstBrace = jsonStr.indexOf('{');
        const lastBrace = jsonStr.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
        }
      }
  
      // Clean up any remaining whitespace
      jsonStr = jsonStr.trim();
  
      // Parse and validate the JSON
      const result = JSON.parse(jsonStr);
      
      // Basic validation of the expected structure
      if (typeof result.fillerWordCount !== 'number' || 
          !Array.isArray(result.fillerWords) ||
          typeof result.paceWPM !== 'number') {
        throw new Error("Invalid analysis structure returned from Gemini");
      }
  
      return result;
  
    } catch (err) {
      console.error("Gemini analysis error:", err);
      console.error("Original response text:", data?.candidates?.[0]?.content?.parts?.[0]?.text);
      return null;
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
            <TabsContent value="analyze" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Transcription Panel */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">Transcription</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => audioRef.current?.play()}
                            disabled={!audioFile}
                          >
                            <Play className="h-3 w-3" />
                            Play
                          </Button>
                        </div>
                        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm h-64 overflow-y-auto">
                          {transcription ? (
                            <p className="text-sm">
                              {transcription.split(" ").map((word, i) => {
                                const isFiller = FILLER_WORDS.includes(
                                  word.toLowerCase().replace(/[.,]/g, "")
                                );
                                return (
                                  <span
                                    key={i}
                                    className={
                                      isFiller
                                        ? "bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded"
                                        : ""
                                    }
                                  >
                                    {word}{" "}
                                  </span>
                                );
                              })}
                            </p>
                          ) : (
                            <p className="text-muted-foreground">
                              No transcription available
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Analysis Panel */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">
                          Real-time Analysis
                        </h3>
                        {analysis ? (
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Filler Words</span>
                                <span className="font-medium text-red-500">
                                  {analysis.fillerWordCount > 5
                                    ? "High"
                                    : "Moderate"}{" "}
                                  ({analysis.fillerWordCount} detected)
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-red-500"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      analysis.fillerWordCount * 5
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Speaking Pace</span>
                                <span
                                  className={`font-medium ${
                                    analysis.paceWPM > 170
                                      ? "text-amber-500"
                                      : analysis.paceWPM < 130
                                      ? "text-blue-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  {analysis.paceWPM} wpm (
                                  {analysis.paceWPM > 170
                                    ? "Too Fast"
                                    : analysis.paceWPM < 130
                                    ? "Too Slow"
                                    : "Good"}
                                  )
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-amber-500"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      analysis.paceWPM / 2
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Clarity</span>
                                <span
                                  className={`font-medium ${
                                    analysis.clarityScore > 0.8
                                      ? "text-green-500"
                                      : analysis.clarityScore > 0.5
                                      ? "text-amber-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {analysis.clarityScore > 0.8
                                    ? "Clear"
                                    : analysis.clarityScore > 0.5
                                    ? "Moderate"
                                    : "Needs Work"}
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-green-500"
                                  style={{
                                    width: `${analysis.clarityScore * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            {transcription
                              ? "Analyzing..."
                              : "Record or upload audio first"}
                          </p>
                        )}
                      </div>
                    </div>
                    {analysis?.suggestions && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">AI Suggestions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {analysis.suggestions.map((suggestion, i) => (
                            <li key={i} className="text-sm">
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="feedback" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        AI Feedback & Suggestions
                      </h3>
                      <p className="text-muted-foreground">
                        Here's how our AI coach would help you improve your
                        response
                      </p>
                    </div>
                    {analysis ? (
                      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm space-y-4">
                        <div>
                          <h4 className="font-medium">Filler Word Reduction</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You used {analysis.fillerWords.join(", ")}{" "}
                            {analysis.fillerWordCount} times. Try replacing
                            these with strategic pauses instead.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Pacing Recommendation</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your speaking pace was {analysis.paceWPM} words per
                            minute, which is
                            {analysis.paceWPM > 170
                              ? " too fast"
                              : analysis.paceWPM < 130
                              ? " too slow"
                              : " good"}
                            . Aim for 140-160 wpm for optimal comprehension.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Confidence Boosters</h4>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1 ml-5 list-disc">
                            {analysis.suggestions?.map((suggestion, i) => (
                              <li key={i}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Analyze audio to see feedback
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
