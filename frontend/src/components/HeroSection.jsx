import { SignInButton } from "@clerk/clerk-react";
import { ArrowRightIcon, CheckIcon, VideoIcon, ZapIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-20 px-4">
      {/* LEFT SECTION */}
     <div className="space-y-8">
      <div className="badge badge-lg badge-primary">
        <ZapIcon aria-hidden="true" />
        <span>Real-Time Collaboration</span>
      </div>
      <h1 className="text-5xl lg:text-7xl font-black leading-tight">
        <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Code Together,</span> <br />
        <span className="text-base-content">Learn Together</span>
      </h1>
      <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
        The ultimate platform for collaborative coding interviews and pair programming. Connect face-to-face, code in real-time, and ace your technical interviews.
      </p>
      {/* FEATURE PILLS */}
      <div className="flex flex-wrap gap-3">
        <div className="badge badge-lg badge-outline">
          <CheckIcon className="size-4 text-success" aria-hidden="true" />
          <span>Live Video Chat</span>
        </div>
        <div className="badge badge-lg badge-outline">
          <CheckIcon className="size-4 text-success" aria-hidden="true" />
          <span>Code Editor</span>
        </div>
        <div className="badge badge-lg badge-outline">
          <CheckIcon className="size-4 text-success" aria-hidden="true" />
          <span>Multi-Language</span>
        </div>
      </div>
      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <SignInButton mode="modal">
          <button type="button" className="btn btn-primary btn-lg">
            <span>Start Coding Now</span>
            <ArrowRightIcon className="size-5" aria-hidden="true" />
          </button>
        </SignInButton>
        <button type="button" className="btn btn-outline btn-lg">
          <VideoIcon className="size-5" aria-hidden="true" />
          <span>Learn More</span>
        </button>

      </div>

      {/* STATS */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100">
        <div className="stat">
          <div className="stat-value text-primary">10K+</div>
          <div className="stat-title">Active Users</div>
        </div>

        <div className="stat">
          <div className="stat-value text-secondary">50k+</div>
          <div className="stat-title">Sessions</div>
        </div>

        <div className="stat">
          <div className="stat-value text-accent">99.9%</div>
          <div className="stat-title">Uptime</div>
        </div>
      </div>
     </div>

      {/* RIGHT SECTION - IMAGE */}
        <img
          src="/hero.png"
          alt="Code Collaboration Platform"
          className="w-full h-auto object-cover rounded-3xl border-4 border-base-100 shadow-2xl hover:scale-105 transition-all duration-500"
        />
    </div>
  )
}

export default HeroSection;