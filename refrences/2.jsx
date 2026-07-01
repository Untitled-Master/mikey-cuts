import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  ShieldCheck,
  Check,
  ArrowRight,
  Globe,
  ChevronDown,
  Zap,
  Play
} from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <header className="border-b border-[#333333]">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
          <div className="flex-1 p-8 sm:p-16 lg:border-r border-[#333333]">
            <div className="inline-block border border-[#00FF66] text-[#00FF66] font-mono text-[10px] px-2.5 py-1 mb-8 uppercase tracking-[0.2em] bg-[#00FF66]/5">
              [ Dedicated Compute Infrastructure ]
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase mb-8 text-white font-mono">
              DEDICATED VPS. <br />
              <span className="text-[#00FF66]">CUSTOM POWER.</span><br />
              AUTOMATED <br />
              <span className="bg-white text-black px-2">PANELS.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl font-sans">
              Each server package provisions an isolated Virtual Private Server with native system memory allocations, direct `.enderhost.dz` subdomain registration, and our custom-tuned web management console.
            </p>
            <div className="flex flex-col sm:flex-row gap-0 border border-[#333333] w-fit">
              <Link to="/services" className="bg-[#00FF66] text-black font-mono font-bold uppercase text-xs tracking-widest py-5 px-10 hover:bg-[#00D156] transition-all flex items-center justify-center gap-3">
                Deploy Instance <ArrowRight size={16} />
              </Link>
              <a href="#controlpanel" className="bg-[#0a0a0f] text-white font-mono font-bold uppercase text-xs tracking-widest py-5 px-10 border-t sm:border-t-0 sm:border-l border-[#333333] hover:bg-[#14141f] transition-all flex items-center justify-center gap-3">
                <Play size={14} className="fill-current text-white" /> View Panel Demo
              </a>
            </div>
          </div>

          <div className="lg:w-2/5 relative overflow-hidden lg:min-h-[500px] flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(https://i.pinimg.com/originals/31/d0/a9/31d0a912e58198b5170af0fb328842b1.gif)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.08] pointer-events-none" />
            <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-between min-h-[500px]">
              <div>
                <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-[#00FF66]/30 px-3 py-1.5 text-[10px] font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[#00FF66] animate-pulse rounded-full"></span>
                  <span className="text-[#00FF66] uppercase">INSTANCE_ROUTE_TRAFFIC</span>
                  <span className="text-slate-400 mx-1">//</span>
                  <span className="text-[#00FF66]">STATUS: ONLINE</span>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4">EnderHost Minecraft Gameplay Loop</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00FF66]" /> Algérie Télécom
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00FF66]" /> Mobilis LTE
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00FF66]" /> Ooredoo Core
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00FF66]" /> Djezzy Net
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How it Works / Workflow Steps */}
      <section id="workflow" className="border-b border-[#333333] py-24 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">
            <div className="lg:w-1/3">
              <p className="text-[#00FF66] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">DEPLOYMENT SEQUENCE</p>
              <h2 className="text-4xl font-black uppercase tracking-tight leading-[0.9] text-white">Value Delivery Pipeline.</h2>
              <p className="text-slate-400 font-mono text-xs leading-relaxed mt-4">
                We maintain strict architectural boundaries for on-demand performance. Here is exactly how your deployment behaves from transaction to first connection.
              </p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#333333] border border-[#333333]">
              <WorkflowCard phase="01" title="Select Spec Allocation" text="Choose your plan based on world limits. Complete your checkout securely using BaridiMob, CCP, or E-Dahabia." />
              <WorkflowCard phase="02" title="VPS Provisioning" text="Our automated orchestrator creates an isolated virtual private server container, ensuring 100% of the hardware specs belong strictly to you." />
              <WorkflowCard phase="03" title="App Engine Installation" text="We safely install and configure our custom control panel directly onto your dedicated system environment." />
              <WorkflowCard phase="04" title="Subdomain Generation" text="The network maps two custom domains (*.enderhost.dz) pointing straight to your machine core and console." />
            </div>
          </div>
        </div>
      </section>

      {/* Pelican Panel Section */}
      <section id="controlpanel" className="border-b border-[#333333] py-24 bg-[#0f0f1a] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00FF66] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">MANAGEMENT TERMINAL</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">Our Control Panel</h2>
            <p className="text-slate-400 text-xs font-mono mt-4 max-w-2xl mx-auto leading-relaxed">
              The ultimate, free game server control panel offering high flying security. Manage your servers with our sleek interface — all running in isolated Docker containers.
            </p>
          </div>

          {/* Why Pelican - Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[
              {
                icon: Zap,
                title: 'Updated Interface',
                desc: 'Intuitive interface, one click installations, comprehensive documentation, active community support, automatic updates.'
              },
              {
                icon: ShieldCheck,
                title: 'Free to Use & Open Source',
                desc: 'Our panel is 100% free to use forever for you, your friends, family, and others. All code is completely open source on GitHub.'
              },
              {
                icon: Cpu,
                title: 'Eggs',
                desc: 'We support Minecraft, Terraria, Palworld, Valheim, Enshrouded, Factorio, and so much more. Check our eggs out, we like them scrambled!'
              },
              {
                icon: Globe,
                title: 'Powered by Docker',
                desc: 'Each server runs in its own container, completely isolated. This allows you to use almost any of your machines with our panel.'
              },
              {
                icon: Zap,
                title: 'Scaleable to the Sky',
                desc: 'Whether you are some friends that want to play together, or a gaming community, we have got you covered.'
              },
              {
                icon: ShieldCheck,
                title: 'Security',
                desc: 'Our panel takes security extremely seriously and natively supports SSL, 2FA, AES-256 encryption, and more.'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="border border-[#2a2a3a] bg-[#14141f] rounded-lg p-5 hover:border-[#00FF66]/30 transition-all">
                  <div className="w-9 h-9 bg-[#1a1a2a] border border-[#333333] rounded-lg flex items-center justify-center mb-3" style={{ color: '#00FF66' }}>
                    <Icon size={16} />
                  </div>
                  <h3 className="text-white text-sm font-bold font-mono uppercase tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Screenshots / GIFs - Feature Layout */}
          <div className="space-y-16">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white font-mono text-center mb-4">Shots of the Screen</h3>
            
            {/* Client Area */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="lg:w-1/2 w-full">
                <div className="border border-[#2a2a3a] bg-[#14141f] rounded-lg p-2 hover:border-[#00FF66]/30 transition-all">
                  <div className="aspect-video w-full overflow-hidden rounded border border-[#333333] bg-[#0a0a0f]">
                    <img
                      src="https://peli.nyc3.digitaloceanspaces.com/docs/serverconsoled.gif"
                      alt="Client Area"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <span className="text-[#00FF66] text-[10px] font-bold font-mono uppercase tracking-[0.25em]">01 // Interface</span>
                <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white font-mono mt-4 mb-4">
                  <span className="bg-[#00FF66] text-black px-2">Client</span> Area
                </h4>
                <p className="text-slate-400 text-sm font-sans leading-relaxed max-w-lg">
                  Manage all your servers from one unified dashboard. Monitor resource usage, start and stop instances, and access the file manager — all from a single, intuitive interface.
                </p>
              </div>
            </div>

            {/* Panel Settings */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
              <div className="lg:w-1/2 w-full">
                <div className="border border-[#2a2a3a] bg-[#14141f] rounded-lg p-2 hover:border-[#00FF66]/30 transition-all">
                  <div className="aspect-video w-full overflow-hidden rounded border border-[#333333] bg-[#0a0a0f]">
                    <img
                      src="https://peli.nyc3.digitaloceanspaces.com/docs/panelsettingsd.gif"
                      alt="Panel Settings"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <span className="text-[#00FF66] text-[10px] font-bold font-mono uppercase tracking-[0.25em]">02 // Configuration</span>
                <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white font-mono mt-4 mb-4">
                  <span className="bg-[#00FF66] text-black px-2">Panel</span> Settings
                </h4>
                <p className="text-slate-400 text-sm font-sans leading-relaxed max-w-lg">
                  Configure every aspect of your hosting environment. From user permissions to server eggs, tweak and tune your panel to match exactly how you want to manage your infrastructure.
                </p>
              </div>
            </div>

            {/* Create Server */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="lg:w-1/2 w-full">
                <div className="border border-[#2a2a3a] bg-[#14141f] rounded-lg p-2 hover:border-[#00FF66]/30 transition-all">
                  <div className="aspect-video w-full overflow-hidden rounded border border-[#333333] bg-[#0a0a0f]">
                    <img
                      src="https://peli.nyc3.digitaloceanspaces.com/docs/createserverd.gif"
                      alt="Create Server"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <span className="text-[#00FF66] text-[10px] font-bold font-mono uppercase tracking-[0.25em]">03 // Deployment</span>
                <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white font-mono mt-4 mb-4">
                  <span className="bg-[#00FF66] text-black px-2">Create</span> Server
                </h4>
                <p className="text-slate-400 text-sm font-sans leading-relaxed max-w-lg">
                  Deploy a new game server in seconds with one click. Pick your game from our library of eggs, allocate your resources, and let Pelican handle the rest — no manual configuration required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section className="border-b border-[#333333]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Globe size={20} />}
              title="Regional Peering"
              desc="Direct optical transit straight through local Algerian ISP backbones."
            />
            <FeatureCard
              icon={<Cpu size={20} />}
              title="AMD Ryzen Core Hardware"
              desc="Fast compute threads allocated securely to your specific instance map."
              className="md:border-l lg:border-l border-[#333333]"
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title="Layer-7 Security"
              desc="Dynamic traffic monitoring systems mapping and nullifying server intrusions."
              className="lg:border-l border-[#333333] border-t md:border-t-0"
            />
          </div>
        </div>
      </section>

      {/* Local Payment Methods */}
      <section id="billing" className="py-24 px-4 sm:px-8 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <p className="text-[#00FF66] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">DIRECT BILLING</p>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 leading-[0.9] text-white font-mono">Domestic Payments.</h2>
              <p className="text-slate-400 font-mono text-xs leading-relaxed mb-8">
                EnderHost works directly within domestic Algerian banking structures, eliminating high conversion overhead and complex setups.
              </p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#333333] border border-[#333333]">
              <IndustryItem title="BaridiMob" text="Submit transactions through your national Post portal. Quickest processing pathway." />
              <IndustryItem title="E-Dahabia" text="Enter card details directly at checkout to complete safe online transactions." />
              <IndustryItem title="CCP Transfer" text="Deposit directly at your local post office. Upload your scan receipt inside the portal." />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-24 bg-[#0a0a0f] border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white font-mono">Plans</h2>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Transparent VPS compute profiles. No shared node memory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#333333] border border-[#333333]">
            <PricingCard
              tier="Starter"
              price="1 500 DA"
              desc="For small communities and personal projects."
              features={['2 GB Dedicated RAM', '1 Dedicated Ryzen vCore', '20 GB Gen4 NVMe Storage', 'Full Pelican Control Panel', 'Unlimited Server Creation*', 'Minecraft, Bedrock & Supported Games', 'Free *.enderhost.dz Subdomains', 'Weekly Backups', 'DDoS Protection']}
              allocations={['1 × Minecraft Server (2 GB)', '2 × Lightweight Servers (1 GB each)']}
              footnote="*Limited only by your allocated resources."
            />
            <PricingCard
              tier="Advanced"
              price="2 500 DA"
              desc="Ideal for active SMPs and growing communities."
              features={['4 GB Dedicated RAM', '2 Dedicated Ryzen vCores', '40 GB Gen4 NVMe Storage', 'Full Pelican Control Panel', 'Unlimited Server Creation*', 'Minecraft, Bedrock & Supported Games', 'Plugin Support', 'Free *.enderhost.dz Subdomains', 'Daily Backups', 'DDoS Protection']}
              allocations={['1 × Large SMP', '2 × Medium Servers', 'Minecraft + Discord Bot', 'Minecraft + Proxy Server']}
              footnote="*Limited only by your allocated resources."
              highlight
            />
            <PricingCard
              tier="Performance"
              price="3 500 DA"
              desc="Built for networks and heavy plugin stacks."
              features={['6 GB Dedicated RAM', '3 Dedicated Ryzen vCores', '60 GB Gen4 NVMe Storage', 'Full Pelican Control Panel', 'Unlimited Server Creation*', 'Plugin Support (Heavy)', 'Modpack Support (Medium)', 'Free *.enderhost.dz Subdomains', 'Daily Backups', 'DDoS Protection']}
              allocations={['Survival + Lobby + Proxy', 'Multiple Game Modes', 'Modded Minecraft Instances', 'Community Network']}
              footnote="*Limited only by your allocated resources."
            />
            <PricingCard
              tier="Ultimate"
              price="4 900 DA"
              desc="Maximum flexibility for serious operators."
              features={['8 GB Dedicated RAM', '4 Dedicated Ryzen vCores', '100 GB Gen4 NVMe Storage', 'Full Pelican Control Panel', 'Unlimited Server Creation*', 'Heavy Modpack Support', 'Priority Support', 'Free *.enderhost.dz Subdomains', 'Daily Backups', 'DDoS Protection']}
              allocations={['Bungee/Velocity Network', 'Multiple Public Servers', 'Large Modpacks', 'Mixed Game Hosting']}
              footnote="*Limited only by your allocated resources."
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-24 bg-[#0f0f1a] border-b border-[#333333] px-4 sm:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00FF66 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#00FF66] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#00FF66]/20 bg-[#00FF66]/5 rounded mb-4">
              <span className="text-[#00FF66] text-[10px] font-bold tracking-[0.25em] uppercase">// COMMON CONCERNS</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white font-mono mb-3">FAQ</h2>
            <p className="text-slate-500 text-xs font-mono tracking-wider">Everything you need to know about EnderHost infrastructure.</p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { value: '4.8/5', label: 'Client Rating', sub: 'Based on 200+ reviews' },
              { value: '<2min', label: 'Setup Time', sub: 'After payment confirmed' },
              { value: '99.9%', label: 'Uptime SLA', sub: 'Network reliability' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 border border-[#2a2a3a] bg-[#14141f]/80 backdrop-blur-sm rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00FF66]/5 to-transparent pointer-events-none" />
                <span className="text-[#00FF66] text-2xl font-black font-mono block relative">{stat.value}</span>
                <span className="text-white text-[10px] font-bold font-mono uppercase tracking-wider block mt-1 relative">{stat.label}</span>
                <span className="text-slate-500 text-[8px] font-mono block mt-0.5 relative">{stat.sub}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[
              {
                q: "What does it mean to get a private VPS instead of standard shared hosting?",
                a: "Traditional hosts put thousands of servers on one machine, causing performance dips (TPS loss). EnderHost provisions an isolated Virtual Private Server (VPS) for your server, guaranteeing you 100% of your RAM and CPU cores."
              },
              {
                q: "Do I get standard subdomain links for free?",
                a: "Yes. Every client gets two clean subdomains on our registered Algerian domain: one for your panel access (e.g. play-panel.enderhost.dz) and one for game console connections (e.g. play.enderhost.dz)."
              },
              {
                q: "Can I create multiple servers?",
                a: "Yes. Unlike traditional Minecraft hosting, EnderHost provisions a private VPS and installs the Pelican management panel directly on your instance. This means your resources belong entirely to you. You may create as many Minecraft or supported game servers as your RAM, CPU and storage allocations allow. For example, a 4 GB Advanced plan could run: one 4 GB SMP server, two 2 GB servers, or four lightweight 1 GB servers. The choice is entirely yours."
              },
              {
                q: "How does control panel app installation work?",
                a: "The entire process is automated. The moment your billing is confirmed, we allocate your private VPS, configure port structures, install our optimized web console app, assign subdomains, and send your login credentials."
              },
              {
                q: "What level of access do I have to the files?",
                a: "You get full directory file system access. You can upload custom worlds, manage complex configurations, add custom plugin structures, or install Forge and Fabric mods."
              }
            ].map((faq, idx) => (
              <div key={idx} className={`border rounded-lg overflow-hidden font-mono transition-all duration-200 relative ${
                activeFaq === idx
                  ? 'border-[#00FF66]/40 bg-[#1a1a2a] shadow-[0_0_30px_rgba(0,255,102,0.05)]'
                  : 'border-[#2a2a3a] bg-[#14141f]/80 backdrop-blur-sm hover:border-[#3a3a4a]'
              }`}>
                {activeFaq === idx && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF66]" />
                )}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                      activeFaq === idx
                        ? 'bg-[#00FF66] text-black shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                        : 'bg-[#0a0a0f] border border-[#333333] text-slate-400'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white text-sm font-bold leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-[#00FF66]' : 'text-slate-500'
                  }`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 pt-0 text-slate-400 text-sm leading-relaxed font-sans ml-12 mr-6 border-t border-[#2a2a3a] mt-0 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 border border-[#2a2a3a] bg-[#14141f]/60 backdrop-blur-sm rounded-lg">
            <p className="text-slate-400 text-[10px] font-mono tracking-wider">
              Still have questions?{' '}
              <a href="https://panel.enderhost.dz" target="_blank" rel="noreferrer" className="text-[#00FF66] underline decoration-dotted underline-offset-2 hover:text-white transition-colors font-bold">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

const FeatureCard = ({ icon, title, desc, className = "" }) => (
  <div className={`p-10 bg-[#0a0a0f] group hover:bg-[#14141f] transition-colors ${className}`}>
    <div className="w-10 h-10 bg-[#00FF66]/10 text-[#00FF66] flex items-center justify-center mb-8 transition-transform group-hover:scale-105 border border-[#333333]">
      {icon}
    </div>
    <h3 className="text-base font-bold uppercase tracking-tight mb-4 text-white font-mono">{title}</h3>
    <p className="text-slate-400 font-sans text-xs leading-relaxed">{desc}</p>
  </div>
);

const WorkflowCard = ({ phase, title, text }) => (
  <div className="bg-[#0a0a0f] p-8 group hover:bg-[#14141f] transition-all">
    <span className="text-[9px] font-bold text-slate-500 font-mono block mb-2">PHASE {phase}</span>
    <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-white font-mono">
      <div className="w-1.5 h-1.5 bg-[#00FF66]"></div> {title}
    </h4>
    <p className="text-xs text-slate-400 font-sans leading-relaxed">{text}</p>
  </div>
);

const IndustryItem = ({ title, text }) => (
  <div className="bg-[#0a0a0f] p-8 group hover:bg-[#14141f] transition-all">
    <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-[#00FF66] font-mono">
      <div className="w-1.5 h-1.5 bg-[#00FF66]"></div> {title}
    </h4>
    <p className="text-xs text-slate-400 font-sans leading-relaxed">{text}</p>
  </div>
);

const PricingCard = ({ tier, price, desc, features, allocations, footnote, highlight = false }) => (
  <div className={`p-8 ${highlight ? 'bg-[#14141f]' : 'bg-[#0a0a0f]'} flex flex-col h-full relative border-0`}>
    {highlight && (
      <div className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#00FF66] mb-3 inline-block">
        [ Best Value ]
      </div>
    )}
    <h3 className="text-2xl font-black uppercase tracking-tighter text-white font-mono mb-1">{tier}</h3>
    <div className="mb-5 font-mono">
      <span className="text-3xl font-bold text-white">{price}</span>
      <span className="text-xs text-slate-500 uppercase ml-1">/mo</span>
    </div>
    <p className="text-[10px] font-mono text-slate-400 uppercase leading-relaxed mb-6">{desc}</p>

    <div className="mb-5">
      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono mb-2">What's Included</h4>
      <ul className="space-y-2.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[10px] font-mono text-slate-300">
            <Check size={10} className="text-[#00FF66] shrink-0 mt-0.5" /> {f}
          </li>
        ))}
      </ul>
    </div>

    {footnote && (
      <p className="text-[8px] font-mono text-slate-600 italic mb-5">{footnote}</p>
    )}

    <div className="mt-auto mb-5">
      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono mb-2">Recommended Allocation</h4>
      <div className="grid grid-cols-2 gap-2">
        {allocations.map((a, i) => {
          const parts = a.match(/^(\d+)\s*×\s*(.+)$/);
          if (parts) {
            return (
              <div key={i} className="border border-[#2a2a3a] bg-[#0a0a0f] rounded p-3 text-center">
                <span className="text-2xl font-black text-[#00FF66] font-mono block">{parts[1]}</span>
                <span className="text-[8px] text-slate-400 font-mono uppercase tracking-wider leading-tight block">× {parts[2]}</span>
              </div>
            );
          }
          return (
            <div key={i} className="border border-[#2a2a3a] bg-[#0a0a0f] rounded p-3 text-center flex items-center justify-center min-h-[60px]">
              <span className="text-[9px] text-slate-400 font-mono leading-tight">{a}</span>
            </div>
          );
        })}
      </div>
    </div>

    <button className={`w-full py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all rounded ${
      highlight
        ? 'bg-[#00FF66] text-black border-[#00FF66] hover:bg-[#0a0a0f] hover:text-[#00FF66]'
        : 'border-[#333333] text-white hover:bg-white hover:text-black hover:border-white'
    }`}>
      Choose {tier}
    </button>
  </div>
);