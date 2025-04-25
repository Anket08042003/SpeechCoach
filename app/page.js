// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle2, Mic, Award, Users, Calendar, ArrowRight, Star } from "lucide-react"
// import { DemoSection } from "@/components/DemoSection"
// export default function LandingPage() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2 font-bold text-xl">
//             <Mic className="h-5 w-5" />
//             <span>AI Speech Coach</span>
//           </div>
//           <nav className="hidden md:flex gap-6">
//             <Link href="#services" className="text-sm font-medium hover:text-primary">
//               Services
//             </Link>
//             <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
//               Testimonials
//             </Link>
//             <Link href="#pricing" className="text-sm font-medium hover:text-primary">
//               Pricing
//             </Link>
//             <Link href="#contact" className="text-sm font-medium hover:text-primary">
//               Contact
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link href="#contact">
//               <Button>Get Started</Button>
//             </Link>
//           </div>
//         </div>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                     AI-Powered Speech Coach for Interview Success
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Eliminate filler words, perfect your pacing, and boost your confidence with real-time AI speech
//                     analysis and personalized coaching.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link href="#services">
//                     <Button size="lg" className="gap-1">
//                       Explore Services
//                       <ArrowRight className="h-4 w-4" />
//                     </Button>
//                   </Link>
//                   <Link href="#contact">
//                     <Button size="lg" variant="outline">
//                       Book a Free Consultation
//                     </Button>
//                   </Link>
//                 </div>
//                 <div className="flex items-center gap-4 pt-4">
//                   <div className="flex -space-x-2">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden"
//                       >
//                         <Image
//                           src={`/placeholder.svg?height=32&width=32`}
//                           alt="User"
//                           width={32}
//                           height={32}
//                           className="h-full w-full object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     <span className="font-medium">500+</span> professionals coached
//                   </div>
//                 </div>
//               </div>
//               <Image
//                 src="/placeholder.svg?height=550&width=550"
//                 width={550}
//                 height={550}
//                 alt="Professional speaker"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
//               />
//             </div>
//           </div>
//         </section>

//         <DemoSection />

//         <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
//                   Key Features
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">AI-Powered Speech Analysis</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
//                   Our cutting-edge AI technology analyzes your speech patterns and provides actionable feedback in
//                   real-time.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Mic className="h-5 w-5 text-primary" />
//                     Real-Time Speech Analysis
//                   </CardTitle>
//                   <CardDescription>
//                     Advanced AI that identifies speech patterns and areas for improvement
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="grid gap-2">
//                     {[
//                       'Detects filler words ("um," "like," "you know")',
//                       "Analyzes speech pacing (too fast or too slow)",
//                       "Evaluates tone and confidence levels",
//                       "Identifies clarity issues (repetition, rambling)",
//                       "Provides instant transcription of your speech",
//                     ].map((item, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <CheckCircle2 className="h-4 w-4 text-primary" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Users className="h-5 w-5 text-primary" />
//                     AI Feedback & Coaching
//                   </CardTitle>
//                   <CardDescription>Personalized guidance to improve your communication skills</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="grid gap-2">
//                     {[
//                       "Detailed performance reports with actionable insights",
//                       "AI-suggested answer improvements for common questions",
//                       "Interactive mock interviews with AI interviewer",
//                       "Progress tracking over time with visual analytics",
//                       "Customized practice exercises based on your weaknesses",
//                     ].map((item, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <CheckCircle2 className="h-4 w-4 text-primary" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>

//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
//                   Advanced Technology
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Cutting-Edge AI Powers Your Improvement
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
//                   Our platform leverages the latest in artificial intelligence to provide you with personalized coaching
//                   that was previously only available to executives.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               {[
//                 {
//                   icon: <Award className="h-10 w-10 text-primary" />,
//                   title: "Speech Recognition",
//                   description: "Powered by OpenAI's Whisper API for accurate transcription of your speech.",
//                 },
//                 {
//                   icon: <Users className="h-10 w-10 text-primary" />,
//                   title: "NLP Analysis",
//                   description: "GPT-4 analyzes your speech patterns and provides intelligent feedback.",
//                 },
//                 {
//                   icon: <Calendar className="h-10 w-10 text-primary" />,
//                   title: "Progress Tracking",
//                   description: "Track your improvement over time with detailed analytics and visualizations.",
//                 },
//                 {
//                   icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
//                   title: "Mock Interviews",
//                   description: "Practice with AI-powered interviewers that simulate real job interviews.",
//                 },
//                 {
//                   icon: <Star className="h-10 w-10 text-primary" />,
//                   title: "Video Analysis",
//                   description: "Optional video analysis to evaluate body language and eye contact.",
//                 },
//                 {
//                   icon: <Mic className="h-10 w-10 text-primary" />,
//                   title: "Multi-language Support",
//                   description: "Help for non-native English speakers to sound more fluent and confident.",
//                 },
//               ].map((feature, i) => (
//                 <Card key={i} className="flex flex-col items-center text-center">
//                   <CardHeader>
//                     <div className="p-2">{feature.icon}</div>
//                     <CardTitle>{feature.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground">{feature.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
//                   Testimonials
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Success Stories from Our Clients
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
//                   Hear from professionals who transformed their communication skills with our coaching.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
//               {[
//                 {
//                   quote:
//                     "The AI detected that I was saying 'um' 23 times in my mock interview. After two weeks of practice, I eliminated filler words completely and landed my dream job!",
//                   name: "Sarah J.",
//                   title: "Software Engineer at Google",
//                 },
//                 {
//                   quote:
//                     "The speech pacing analysis showed I was talking too fast during presentations. The AI coach helped me slow down and be more deliberate. My team feedback has improved dramatically.",
//                   name: "Michael T.",
//                   title: "Marketing Director",
//                 },
//                 {
//                   quote:
//                     "As a non-native English speaker, I struggled with interview confidence. The AI coach helped me sound more natural and fluent. I received three job offers last month!",
//                   name: "Priya K.",
//                   title: "Data Scientist",
//                 },
//                 {
//                   quote:
//                     "The mock interview feature is incredible. It asked me tough questions and gave detailed feedback on how to improve my answers. Worth every penny.",
//                   name: "David L.",
//                   title: "UX Designer",
//                 },
//                 {
//                   quote:
//                     "I used the video analysis feature before my TED talk. The AI detected my nervous hand movements and helped me appear more confident on stage.",
//                   name: "Emma R.",
//                   title: "Startup Founder",
//                 },
//                 {
//                   quote:
//                     "The progress tracking showed me how my confidence score improved by 43% in just one month. My promotion interview went perfectly thanks to this app.",
//                   name: "James W.",
//                   title: "Sales Executive",
//                 },
//               ].map((testimonial, i) => (
//                 <Card key={i} className="flex flex-col justify-between">
//                   <CardHeader>
//                     <div className="flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} className="h-4 w-4 fill-primary text-primary" />
//                       ))}
//                     </div>
//                   </CardHeader>
//                   <CardContent className="flex-1">
//                     <p className="italic">"{testimonial.quote}"</p>
//                     <div className="mt-4 flex items-center gap-2">
//                       <div className="h-10 w-10 rounded-full bg-muted-foreground/20">
//                         <Image
//                           src={`/placeholder.svg?height=40&width=40`}
//                           alt={testimonial.name}
//                           width={40}
//                           height={40}
//                           className="h-full w-full rounded-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-medium">{testimonial.name}</p>
//                         <p className="text-sm text-muted-foreground">{testimonial.title}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
//                   Pricing
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Invest in Your Communication Success
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
//                   Flexible coaching packages designed to fit your needs and budget.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
//               {[
//                 {
//                   title: "Free",
//                   price: "$0",
//                   description: "Basic speech analysis",
//                   features: [
//                     "5 minutes of speech analysis per month",
//                     "Basic filler word detection",
//                     "Simple performance report",
//                     "Text-only feedback",
//                     "Community forum access",
//                   ],
//                   cta: "Get Started",
//                 },
//                 {
//                   title: "Pro",
//                   price: "$19",
//                   description: "Advanced analysis and coaching",
//                   features: [
//                     "2 hours of speech analysis per month",
//                     "Advanced speech pattern detection",
//                     "Detailed performance reports",
//                     "AI-suggested improvements",
//                     "5 mock interviews per month",
//                     "Progress tracking",
//                     "Email support",
//                   ],
//                   cta: "Most Popular",
//                   highlighted: true,
//                 },
//                 {
//                   title: "Premium",
//                   price: "$49",
//                   description: "Complete interview preparation",
//                   features: [
//                     "Unlimited speech analysis",
//                     "Comprehensive speech pattern detection",
//                     "Video analysis (body language, eye contact)",
//                     "Unlimited mock interviews",
//                     "LinkedIn/CV review integration",
//                     "Multi-language support",
//                     "Custom industry-specific training",
//                     "Priority support",
//                     "API access",
//                   ],
//                   cta: "Get Started",
//                 },
//               ].map((plan, i) => (
//                 <Card key={i} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}>
//                   <CardHeader>
//                     <CardTitle>{plan.title}</CardTitle>
//                     <div className="flex items-baseline gap-1">
//                       <span className="text-3xl font-bold">{plan.price}</span>
//                       <span className="text-muted-foreground">/ month</span>
//                     </div>
//                     <CardDescription>{plan.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent className="flex-1">
//                     <ul className="grid gap-2">
//                       {plan.features.map((feature, j) => (
//                         <li key={j} className="flex items-center gap-2">
//                           <CheckCircle2 className="h-4 w-4 text-primary" />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                   <div className="p-6 pt-0">
//                     <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
//                       {plan.cta}
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//             <div className="mx-auto max-w-3xl text-center">
//               <p className="text-muted-foreground">
//                 All packages include a satisfaction guarantee. Not sure which package is right for you?
//                 <Link href="#contact" className="font-medium text-primary hover:underline ml-1">
//                   Contact us for a personalized recommendation.
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </section>

//         <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                 Ready to Eliminate "Um" and "Uh" Forever?
//               </h2>
//               <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
//                 Try our AI Speech Coach today and transform your interview performance with data-driven feedback.
//               </p>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
//                 <Button size="lg" className="gap-1">
//                   Start Free Trial
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//                 <Button size="lg" variant="outline">
//                   Watch Demo
//                 </Button>
//               </div>
//             </div>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Contact Information</CardTitle>
//                 <CardDescription>Reach out to us directly</CardDescription>
//               </CardHeader>
//               <CardContent className="grid gap-4">
//                 <div className="grid grid-cols-[25px_1fr] items-start gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5 text-primary"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//                   </svg>
//                   <div className="text-muted-foreground">(123) 456-7890</div>
//                 </div>
//                 <div className="grid grid-cols-[25px_1fr] items-start gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5 text-primary"
//                   >
//                     <rect width="20" height="16" x="2" y="4" rx="2" />
//                     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//                   </svg>
//                   <div className="text-muted-foreground">contact@speakconfident.com</div>
//                 </div>
//                 <div className="grid grid-cols-[25px_1fr] items-start gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5 text-primary"
//                   >
//                     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//                     <circle cx="12" cy="10" r="3" />
//                   </svg>
//                   <div className="text-muted-foreground">123 Communication Ave, Speaker City, SC 12345</div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       </main>
//       <footer className="w-full border-t bg-background">
//         <div className="container flex flex-col gap-6 py-8 md:py-12">
//           <div className="flex flex-col gap-6 md:flex-row md:justify-between">
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center gap-2 font-bold text-xl">
//                 <Mic className="h-5 w-5" />
//                 <span>AI Speech Coach</span>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-[300px]">
//                 Empowering professionals to communicate with confidence and clarity since 2015.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
//               <div className="flex flex-col gap-2">
//                 <h3 className="font-medium">Features</h3>
//                 <nav className="flex flex-col gap-2">
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Speech Analysis
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Mock Interviews
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Video Analysis
//                   </Link>
//                 </nav>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <h3 className="font-medium">Company</h3>
//                 <nav className="flex flex-col gap-2">
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     About Us
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Our Team
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Careers
//                   </Link>
//                 </nav>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <h3 className="font-medium">Resources</h3>
//                 <nav className="flex flex-col gap-2">
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Blog
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Podcast
//                   </Link>
//                   <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//                     Free Resources
//                   </Link>
//                 </nav>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <p className="text-xs text-muted-foreground">
//               &copy; {new Date().getFullYear()} AI Speech Coach. All rights reserved.
//             </p>
//             <div className="flex gap-4">
//               <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
//                 Privacy Policy
//               </Link>
//               <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
//                 Terms of Service
//               </Link>
//               <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



'use client';
import { useState } from 'react';

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (file && !file.type.startsWith('audio/')) {
      setError('Please upload an audio file (MP3, WAV, etc.)');
      return;
    }
    setAudioFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      setError('Please select an audio file');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranscription('');

    try {
      const formData = new FormData();
      formData.append('file', audioFile); // use 'file' key as Flask expects

      const response = await fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Transcription failed');
      }

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Audio Transcription</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="block w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={isLoading || !audioFile}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {transcription && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
          <p className="whitespace-pre-wrap">{transcription}</p>
        </div>
      )}
    </div>
  );
}
