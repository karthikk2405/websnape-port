import React from 'react';
import { Monitor, Smartphone, Cpu, Workflow, QrCode, TrendingUp, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Digital Experiences',
    desc: 'Cinematic 3D websites and high-converting marketing platforms built to capture attention and command authority.',
    icon: <Monitor className="w-6 h-6 text-[#00F0FF]" />,
  },
  {
    title: 'Web Applications',
    desc: 'Complex dashboards, internal tools, and SaaS platforms engineered for high performance and seamless user experience.',
    icon: <Smartphone className="w-6 h-6 text-[#00F0FF]" />,
  },
  {
    title: 'AI Systems',
    desc: 'Custom neural networks, LLM integrations, and intelligent automation systems to give your business a cognitive edge.',
    icon: <Cpu className="w-6 h-6 text-[#00F0FF]" />,
  },
  {
    title: 'Business Automation',
    desc: 'Connecting software ecosystems and automating repetitive tasks to scale operations without scaling headcount.',
    icon: <Workflow className="w-6 h-6 text-[#00F0FF]" />,
  },
  {
    title: 'Smart Ordering',
    desc: 'Futuristic QR and digital ordering ecosystems connecting customer intent directly to kitchen/fulfillment systems.',
    icon: <QrCode className="w-6 h-6 text-[#00F0FF]" />,
  },
  {
    title: 'Digital Growth',
    desc: 'Data-driven analytics, conversion optimization, and scalable cloud infrastructure to power exponential business expansion.',
    icon: <TrendingUp className="w-6 h-6 text-[#00F0FF]" />,
  },
];

export const WebServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-4 block font-mono">
          DIGITAL CAPABILITIES
        </span>
        <h2 className="rynd-title text-4xl sm:text-6xl text-white mb-6">
          Architects of the <br />
          <span className="gradient-text">new internet.</span>
        </h2>
        <p className="text-[#A9B1BD] text-lg leading-relaxed font-medium">
          We don't just build websites. We engineer complete digital ecosystems—from cinematic frontends to autonomous backend operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="glass-card p-8 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#00F0FF]/10 group-hover:border-[#00F0FF]/30 transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
            <p className="text-[#8A8D93] text-sm leading-relaxed mb-8">{service.desc}</p>
            
            <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:text-[#00F0FF] transition-colors">
              Learn More <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
