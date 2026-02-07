import { useState } from "react";
import { Search, MapPin, Stethoscope, Phone, MessageCircle } from "lucide-react";

// Hardcoded doctors data
const INITIAL_DOCTORS = [
    {
        id: "1",
        name: "Robson Seiji T. Koyama",
        city: "Belém",
        specialty: "Presidente",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/vp67eno7_WhatsApp%20Image%202026-01-22%20at%2009.35.13.jpeg"
    },
    {
        id: "2",
        name: "Filipe Moreira de Araújo",
        city: "Belém",
        specialty: "Conselheiro Fiscal Suplente",
        contact_info: "", 
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/ywr9fmpn_WhatsApp%20Image%202025-12-23%20at%2013.23.32.jpeg"
    },
    {
        id: "3",
        name: "Thaís Sousa Mendes",
        city: "Belém",
        specialty: "Diretoria da SPO",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/gsh1x86w_image.png"
    },
    {
        id: "4",
        name: "Alexandre Antônio Marques Rosa",
        city: "Belém",
        specialty: "Vice -presidente",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/zqgc9gb2_WhatsApp%20Image%202025-12-23%20at%2013.23.32%20%281%29.jpeg"
    },
    {
        id: "5",
        name: "José Ricardo Mouta Araújo",
        city: "Belém",
        specialty: "Membro",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/86mvenb5_WhatsApp%20Image%202025-12-23%20at%2013.23.32%20%282%29.jpeg"
    },
    {
        id: "6",
        name: "Thiago Sopper Boti",
        city: "Belém",
        specialty: "Diretor Financeiro",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/46bj9e0p_WhatsApp%20Image%202025-12-23%20at%2013.23.32%20%283%29.jpeg"
    },
    {
        id: "7",
        name: "Augusto César Costa de Almeida",
        city: "Belém",
        specialty: "Conselho Fiscal",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/g99n4wa1_WhatsApp%20Image%202025-12-23%20at%2013.24.00.jpeg"
    },
    {
        id: "8",
        name: "Márcia Silva Ferreira",
        city: "Belém",
        specialty: "Diretoria SPO",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/zs19ws0p_WhatsApp%20Image%202025-12-23%20at%2013.47.04.jpeg"
    },
    {
        id: "9",
        name: "Etiene França",
        city: "Belém",
        specialty: "Diretora de Marketing SPO",
        contact_info: "",
        image_url: "https://customer-assets.emergentagent.com/job_spo-medical/artifacts/k09l61li_teste1.jpeg"
    }
];

export default function Directory() {
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [cityFilter, setCityFilter] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!cityFilter.trim()) {
        setDoctors(INITIAL_DOCTORS);
        return;
    }
    
    const filtered = INITIAL_DOCTORS.filter(doc => 
        doc.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
        doc.name.toLowerCase().includes(cityFilter.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(cityFilter.toLowerCase())
    );
    setDoctors(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-primary-900 mb-6">Nossos Associados</h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          Conheça os profissionais que fazem parte da Sociedade Paraense de Oftalmologia.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome, especialidade ou cidade"
            className="block w-full pl-12 pr-32 py-4 bg-white border border-stone-200 rounded-full text-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-stone-400"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            data-testid="city-search-input"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-full font-medium hover:bg-primary-800 transition-colors"
            data-testid="search-button"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Results Grid */}
      {doctors.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
          <p className="text-stone-500 text-lg">Nenhum médico encontrado com estes critérios.</p>
          <button 
            onClick={() => {setCityFilter(""); setDoctors(INITIAL_DOCTORS);}}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

function DoctorCard({ doctor }) {
  // Extract only numbers from contact info for WhatsApp link
  const cleanPhone = doctor.contact_info?.replace(/\D/g, "");
  const hasValidPhone = cleanPhone && cleanPhone.length >= 10; // Basic validation

  return (
    <div className="group bg-white border border-stone-100 rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full" data-testid={`doctor-card-${doctor.id}`}>
      {/* Large Image Section */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-stone-100">
        {doctor.image_url ? (
          <img 
            src={doctor.image_url} 
            alt={doctor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-primary/30">
            <Stethoscope className="w-20 h-20" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary border border-white/20 shadow-sm">
          S.P.O. Membro
        </div>
      </div>
      
      <div className="px-2 pb-2 flex-grow flex flex-col">
        <h3 className="font-serif text-2xl font-bold text-primary-900 mb-2 group-hover:text-primary transition-colors">
          {doctor.name}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-accent font-medium text-base">
            <Stethoscope className="w-5 h-5 shrink-0" />
            {doctor.specialty}
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <MapPin className="w-5 h-5 shrink-0" />
            {doctor.city}
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-stone-100 flex items-center justify-between gap-3">
          {doctor.contact_info ? (
             <div className="flex items-center gap-2 text-sm text-stone-700 font-medium bg-stone-50 px-3 py-2 rounded-xl flex-grow">
               <Phone className="w-4 h-4 text-primary shrink-0" />
               <span className="truncate">{doctor.contact_info}</span>
             </div>
          ) : (
            <div className="flex-grow"></div>
          )}
          
          {hasValidPhone && (
            <a 
              href={`https://wa.me/55${cleanPhone}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-50 text-green-600 p-2.5 rounded-xl hover:bg-green-100 hover:text-green-700 transition-colors"
              title="Conversar no WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
