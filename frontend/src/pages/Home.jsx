import { ArrowRight, Activity, Users, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary-900 text-white py-20 px-8 md:px-16 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1691507000305-c0006a062338?crop=entropy&cs=srgb&fm=jpg&q=85')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-[1.1]">
            Excellence in <br/>
            <span className="font-semibold text-accent-100">Modern Healthcare</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl">
            Connecting patients with the region's most qualified specialists. 
            We are dedicated to maintaining the highest standards of medical practice.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/directory" 
              className="bg-white text-primary-900 hover:bg-stone-100 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              data-testid="hero-cta-directory"
            >
              Find a Doctor <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Stats Bento Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-all duration-300">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Activity className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-primary-900 mb-2">Evidence-Based</h3>
              <p className="text-stone-500">Our members strictly adhere to the latest clinical guidelines and research.</p>
            </div>
          </div>
          
          <div className="bg-secondary border border-primary/10 rounded-2xl p-8 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-all duration-300 md:col-span-2">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-full">
                <div className="max-w-md">
                   <h3 className="font-serif text-3xl text-primary-900 mb-4">Our Mission</h3>
                   <p className="text-primary-800/80 text-lg">
                     To foster a community of medical excellence, providing continuous education for doctors and trust for patients.
                   </p>
                </div>
                <div className="bg-white/50 p-6 rounded-xl backdrop-blur-sm">
                   <div className="text-4xl font-serif font-bold text-accent">500+</div>
                   <div className="text-sm font-medium text-primary-800 uppercase tracking-wider mt-1">Specialists</div>
                </div>
             </div>
          </div>

          <div className="bg-primary text-white rounded-2xl p-8 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-all duration-300">
             <div>
               <Users className="w-8 h-8 opacity-80 mb-6" />
               <h3 className="font-serif text-2xl mb-2">Patient First</h3>
               <p className="text-primary-100/80">Every decision we make starts with patient well-being.</p>
             </div>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-all duration-300 md:col-span-2">
             <div className="flex items-center gap-6">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-accent w-8 h-8" />
                </div>
                <div>
                   <h3 className="font-serif text-2xl text-primary-900 mb-2">Verified Credentials</h3>
                   <p className="text-stone-500">
                     All doctors in our directory undergo a rigorous verification process to ensure they meet our high standards of qualification and experience.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
