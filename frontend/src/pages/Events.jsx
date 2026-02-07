import { Calendar, MapPin, Clock } from "lucide-react";

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-primary-900 mb-6">Eventos e Cursos</h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          Fique por dentro das principais atividades científicas e sociais da oftalmologia paraense.
        </p>
      </div>

      <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
          <p className="text-stone-500 text-lg">Nenhum evento programado no momento.</p>
      </div>
    </div>
  );
}
