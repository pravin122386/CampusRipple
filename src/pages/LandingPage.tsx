import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Radio, 
  Eye, 
  AlertTriangle, 
  GitMerge, 
  Share2, 
  Users, 
  BellRing, 
  Wrench, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, setCursorState, setCursorLabel } = useApp();

  const storySteps = [
    {
      step: '01',
      title: 'A student notices a problem',
      subtitle: 'Observation & Field Signal',
      description: 'A student walking into Computer Science Lab 3 notices wireless disconnection and power drops during a live assignment session.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '02',
      title: 'The problem becomes an incident',
      subtitle: 'Structured Report Generation',
      description: 'Within seconds, the issue is cataloged in CampusRipple with location tags, category metadata, and initial impact parameters.',
      icon: AlertTriangle,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '03',
      title: 'The system discovers related reports',
      subtitle: 'Cross-Correlation Engine',
      description: 'CampusRipple analyzes concurrent reports from adjacent lecture halls and identifies a shared hardware trunk failure.',
      icon: GitMerge,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '04',
      title: 'The dependency network reveals affected resources',
      subtitle: 'Topology Graph Mapping',
      description: 'The core network switch connects to Block A routers, Computer Lab 3 workstations, and digital projector systems across 6 classrooms.',
      icon: Share2,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '05',
      title: 'Affected students are identified',
      subtitle: 'Human Impact Radius',
      description: 'Over 142 students enrolled in active lab hours and online lectures are dynamically mapped into the impact zone.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '06',
      title: 'Automated notifications are sent',
      subtitle: 'Targeted Alert Dispatch',
      description: 'Students and department faculty receive real-time notifications with estimated resolution timelines and workaround links.',
      icon: BellRing,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '07',
      title: 'Technicians resolve the problem',
      subtitle: 'Targeted Field Repair',
      description: 'Senior NetOps engineers are dispatched directly to the primary hardware failure point with pre-diagnosed telemetry.',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    },
    {
      step: '08',
      title: 'The incident is verified and closed',
      subtitle: 'Network Restoration & Ripple Reset',
      description: 'System metrics return to normal, full connectivity is restored, and the dependency ripple dissipates safely.',
      icon: CheckCircle2,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    }
  ];

  return (
    <div className="space-y-32 pb-24">
      
      {/* Editorial Magazine Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Full Width Campus Imagery with vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=2000"
            alt="University Campus Architecture"
            className="w-full h-full object-cover object-center brightness-[0.22] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-[#0F1115]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-transparent to-[#0F1115]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161920]/80 border border-white/10 text-xs font-mono tracking-widest text-neutral-300 backdrop-blur-md uppercase">
            <Radio className="w-4 h-4 text-[#D9383A] animate-pulse" />
            <span>Campus Incident Intelligence // System v2.6</span>
          </div>

          <h1 className="font-serif-headline text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white leading-[0.9] text-balance">
            One Report.<br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#D9383A]">
              Wider Impact.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-300 font-light leading-relaxed text-balance">
            CampusRipple helps you report issues, understand their wider impact across connected infrastructure, and keep your entire university connected.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={(e) => navigate('/report', { ripplePos: { x: e.clientX, y: e.clientY } })}
              onMouseEnter={() => { setCursorState('OPEN'); setCursorLabel('REPORT'); }}
              onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
              data-magnetic="true"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D9383A] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#b82a2c] transition-all shadow-2xl shadow-[#D9383A]/30 flex items-center justify-center gap-3 group"
            >
              <span>Report an Incident</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={(e) => navigate('/map', { ripplePos: { x: e.clientX, y: e.clientY } })}
              onMouseEnter={() => { setCursorState('TRACE'); setCursorLabel('EXPLORE'); }}
              onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
              data-magnetic="true"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Campus Grid</span>
            </button>
          </div>

          {/* Visual Ripple Chain Preview */}
          <div className="pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#161920]/80 backdrop-blur-md hairline-border flex items-center justify-between gap-2 overflow-x-auto text-xs font-mono text-neutral-300">
              <span className="px-3 py-1 bg-[#D9383A]/20 text-[#D9383A] border border-[#D9383A]/40 rounded-full font-bold">
                Student Report
              </span>
              <span>→</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                Classroom Router
              </span>
              <span>→</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                Block A Switch
              </span>
              <span>→</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                Computer Lab 3
              </span>
              <span>→</span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-bold">
                142 Affected Students
              </span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-400 text-[10px] font-mono tracking-widest uppercase animate-bounce">
          <span>Scroll to Discover Story</span>
          <ChevronDown className="w-4 h-4 text-[#D9383A] mt-1" />
        </div>
      </section>

      {/* Editorial Statement Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-white/10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 font-mono text-xs text-[#D9383A] uppercase tracking-widest">
            00 // CONCEPT & PHILOSOPHY
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif-headline text-4xl sm:text-6xl font-normal text-white leading-tight text-balance">
              Incidents are rarely isolated. A single faulty router creates a cascade that stops lectures, halts exams, and impacts hundreds.
            </h2>
            <p className="text-neutral-400 font-light text-base leading-relaxed max-w-2xl">
              Traditional campus feedback systems treat complaints as static support tickets. CampusRipple visualizes campus infrastructure as a living graph network — mapping the true propagation radius of every fault.
            </p>
          </div>
        </div>
      </section>

      {/* 8-Stage Progressive Scroll Storytelling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-[#D9383A]">
            PROGRESSIVE SYSTEM FLOW
          </div>
          <h2 className="font-serif-headline text-5xl sm:text-7xl font-bold text-white">
            The Lifecycle of a Campus Ripple
          </h2>
          <p className="text-neutral-400 font-light text-sm">
            Follow the journey from initial student observation to automated resolution across the campus network.
          </p>
        </div>

        <div className="space-y-32">
          {storySteps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Image Block */}
                <div 
                  className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  onMouseEnter={() => { setCursorState('EXPLORE'); setCursorLabel('EXPLORE'); }}
                  onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
                  data-cursor="true"
                >
                  <div className="relative rounded-2xl overflow-hidden hairline-border bg-[#161920] group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-6 left-6 font-mono text-3xl font-bold text-[#D9383A] bg-[#0F1115]/80 px-4 py-1 rounded-full border border-white/10">
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Text Editorial Block */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#D9383A]/40 bg-[#D9383A]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#D9383A]" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif-headline text-3xl sm:text-4xl font-bold text-white leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>

                  <div className="pt-2 font-mono text-xs text-[#D9383A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D9383A] animate-ping" />
                    <span>SYSTEM STEP {step.step} ACTIVE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* CTA Editorial Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#161920] via-[#1D222D] to-[#0F1115] p-12 sm:p-20 border border-white/10 overflow-hidden text-center space-y-8">
          
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9383A]/20 blur-3xl pointer-events-none" />

          <h2 className="font-serif-headline text-5xl sm:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Ready to experience intelligent campus incident management?
          </h2>

          <p className="text-neutral-300 text-base max-w-2xl mx-auto font-light">
            Report an issue in less than 60 seconds and visualize its immediate ripple across campus resources.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={(e) => navigate('/report', { ripplePos: { x: e.clientX, y: e.clientY } })}
              onMouseEnter={() => { setCursorState('OPEN'); setCursorLabel('START'); }}
              onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
              data-magnetic="true"
              className="px-8 py-4 rounded-full bg-[#D9383A] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#b82a2c] transition-all shadow-xl shadow-[#D9383A]/30 flex items-center gap-2"
            >
              <span>Submit First Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => navigate('/dashboard', { ripplePos: { x: e.clientX, y: e.clientY } })}
              onMouseEnter={() => { setCursorState('VIEW'); setCursorLabel('DASHBOARD'); }}
              onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
              data-magnetic="true"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest font-bold border border-white/20 transition-all"
            >
              <span>View Live Dashboard</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
