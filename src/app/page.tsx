import Image from "next/image";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/Navbar";


export default function Home() {
  return (
      <main className="min-h-screen relative">
        <h1 className="text-white font-heading text-2xl mr-5 absolute top-0 left-0 p-5">LazyApp</h1>
        <div className="m-5 p-3 absolute top-0 left-0 right-0 flex items-center justify-center">
          <Navbar />
        </div>
       
       {/* Hero Section */}
       <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-neutral-900">
         <div className="max-w-4xl mx-auto">
           <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
             Audits Lighthouse
             <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"> 
               {" "}boostés par l'IA
             </span>
           </h1>
           
           <p className="font-sans text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
             Optimisez automatiquement les performances de votre site web avec notre IA spécialisée. 
             Des rapports détaillés et des corrections automatiques en quelques minutes.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             <Button 
               size="lg" 
               className="font-heading bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
             >
               Analyser mon site gratuitement
             </Button>
             <Button 
               variant="outline" 
               size="lg" 
               className="font-heading border-slate-400 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
             >
               Voir une démo
             </Button>
           </div>
           
           {/* Metrics */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div>
               <div className="font-heading text-3xl font-bold text-blue-400 mb-2">98%</div>
               <div className="font-sans text-slate-400">Score moyen obtenu</div>
             </div>
             <div>
               <div className="font-heading text-3xl font-bold text-green-400 mb-2">5min</div>
               <div className="font-sans text-slate-400">Temps d'analyse</div>
             </div>
             <div>
               <div className="font-heading text-3xl font-bold text-purple-400 mb-2">500+</div>
               <div className="font-sans text-slate-400">Sites optimisés</div>
             </div>
           </div>
         </div>
       </section>
     </main>
  );
}
