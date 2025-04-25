import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Play, BarChart2 } from "lucide-react";

export function DemoSection() {
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
              Experience the power of real-time speech analysis and personalized feedback
            </p>
          </div>
        </div>

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
                        Speak into your microphone or upload a recording. Try answering a common interview question like
                        "Tell me about yourself."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button size="lg" className="gap-2">
                        <Mic className="h-4 w-4" />
                        Start Recording
                      </Button>
                      <Button size="lg" variant="outline" className="gap-2">
                        Upload Audio
                      </Button>
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
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">Transcription</h3>
                        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                          <p className="text-sm">
                            "So, <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">um</span>, I've been
                            working in software development for{" "}
                            <span className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">like</span> five years now. I
                            started at a small startup where I{" "}
                            <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">uh</span> worked on their
                            mobile app. <span className="bg-red-100 dark:bg-red-900/30 px-1 rounded">You know</span>, I
                            really enjoyed the fast-paced environment..."
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button size="sm" variant="outline" className="gap-2">
                            <Play className="h-3 w-3" />
                            Play
                          </Button>
                          <div className="text-xs text-muted-foreground">00:32 / 01:45</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">Real-time Analysis</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Filler Words</span>
                              <span className="font-medium text-red-500">High (12 detected)</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-3/4 rounded-full bg-red-500"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Speaking Pace</span>
                              <span className="font-medium text-amber-500">Too Fast (180 wpm)</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-2/3 rounded-full bg-amber-500"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Clarity</span>
                              <span className="font-medium text-green-500">Good</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-4/5 rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Confidence</span>
                              <span className="font-medium text-amber-500">Medium</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-1/2 rounded-full bg-amber-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button size="lg" className="gap-2">
                        <BarChart2 className="h-4 w-4" />
                        View Full Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="feedback" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">AI Feedback & Suggestions</h3>
                      <p className="text-muted-foreground">
                        Here's how our AI coach would help you improve your response
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm space-y-4">
                      <div>
                        <h4 className="font-medium">Filler Word Reduction</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          You used "um" 5 times, "uh" 3 times, and "like" 4 times. Try replacing these with strategic
                          pauses instead.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Improved Version</h4>
                        <p className="text-sm mt-1 p-3 bg-primary/10 rounded-md">
                          "I've been working in software development for five years now. I started at a small startup
                          where I worked on their mobile app. I really enjoyed the fast-paced environment..."
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Pacing Recommendation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your speaking pace was 180 words per minute, which is slightly too fast. Aim for 140-160 wpm
                          for optimal comprehension.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Confidence Boosters</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 ml-5 list-disc">
                          <li>Use more definitive statements instead of qualifiers</li>
                          <li>Maintain consistent volume throughout your response</li>
                          <li>Add brief pauses after key points for emphasis</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button size="lg">Try Another Question</Button>
                      <Button size="lg" variant="outline">
                        Save Feedback
                      </Button>
                    </div>
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