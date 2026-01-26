import { Shield, Eye, Users, CheckCircle, Target, Quote } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-24">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl text-primary-900 font-bold">
          Sobre a Sociedade
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Fundada com o compromisso de elevar os padrões da oftalmologia no Pará, a S.P.O. é a referência máxima em saúde ocular na região.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl text-primary-900">Nossa História e Propósito</h2>
          <p className="text-stone-600 leading-relaxed">
            A Sociedade Paraense de Oftalmologia reúne os mais qualificados profissionais da área, atuando como um pilar de excelência médica e ética. Nosso objetivo é garantir que a população paraense tenha acesso a tratamentos modernos, seguros e humanizados.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Além de certificar especialistas, promovemos congressos, atualizações científicas e campanhas de prevenção, mantendo nossos associados na vanguarda da medicina ocular mundial.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <img 
             src="https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=600" 
             className="rounded-2xl shadow-lg w-full h-64 object-cover -translate-y-4" 
             alt="Equipamento oftalmológico moderno"
           />
           <img 
             src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600" 
             className="rounded-2xl shadow-lg w-full h-64 object-cover translate-y-4" 
             alt="Atendimento humanizado"
           />
        </div>
      </div>

      {/* President's Message */}
      <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-100">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-1/3 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full translate-x-2 translate-y-2"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_6e125dd0-724d-42ad-90c4-2b3d56d9357e/artifacts/ymnppwu0_image.png" 
                alt="Presidente da SPO" 
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg relative z-10 border-4 border-white"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-900">Dr. Presidente da SPO</h3>
              <span className="text-sm text-stone-500 font-medium uppercase tracking-wider">Gestão 2025-2026</span>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Quote className="w-8 h-8 text-primary/20 rotate-180" />
              <h2 className="font-serif text-3xl text-primary-900">Palavra do Presidente</h2>
            </div>
            
            <div className="space-y-4 text-stone-600 leading-relaxed text-justify">
              <p>
                A Sociedade Paraense de Oftalmologia tem como missão promover a excelência no cuidado com a saúde ocular, fortalecendo a prática médica ética, científica e humanizada em nosso estado.
              </p>
              <p>
                Vivemos um momento de constante evolução da Oftalmologia, com avanços tecnológicos, científicos e educacionais que exigem atualização permanente e compromisso coletivo. Nesse cenário, a SPO reafirma seu papel como espaço de integração, aprendizado contínuo e valorização do oftalmologista, estimulando a troca de experiências, o aprimoramento profissional e a difusão do conhecimento de qualidade.
              </p>
              <p>
                Nossa atuação vai além da formação científica. Buscamos também contribuir ativamente com a sociedade, por meio de campanhas de prevenção, ações educativas e parcerias institucionais que ampliem o acesso à informação e ao cuidado visual, sempre com responsabilidade social e respeito às necessidades da população paraense.
              </p>
              <p>
                Acreditamos que o fortalecimento da Oftalmologia no Pará passa pela união da classe, pelo incentivo à pesquisa, pelo apoio às novas gerações de especialistas e pela construção de uma Sociedade cada vez mais participativa, moderna e comprometida com o futuro.
              </p>
              <p className="font-medium text-primary-900">
                Convido todos os colegas a participarem ativamente das iniciativas da SPO, compartilhando saberes, experiências e projetos. Juntos, seguimos trabalhando para elevar o padrão da Oftalmologia em nosso estado e contribuir para uma melhor qualidade de vida por meio da visão.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-3xl p-12 border border-stone-100 shadow-sm">
        <h2 className="font-serif text-3xl text-primary-900 text-center mb-12">Nossos Pilares</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Shield className="w-8 h-8 text-primary" />}
            title="Ética Médica"
            description="Compromisso inegociável com a integridade e transparência na relação médico-paciente."
          />
          <ValueCard 
            icon={<Target className="w-8 h-8 text-primary" />}
            title="Excelência Científica"
            description="Incentivo constante à pesquisa e educação continuada de nossos membros."
          />
          <ValueCard 
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Responsabilidade Social"
            description="Ações comunitárias para democratizar o acesso à saúde visual de qualidade."
          />
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="text-center space-y-4 p-4 hover:bg-stone-50 rounded-xl transition-colors">
      <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-primary-900">{title}</h3>
      <p className="text-stone-500">{description}</p>
    </div>
  );
}
