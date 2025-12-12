import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, LogOut, Search } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    city: "",
    contact_info: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDoctors();
  }, [token, navigate]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      toast.error("Falha ao buscar médicos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editingDoctor) {
        await axios.put(`${BACKEND_URL}/api/doctors/${editingDoctor.id}`, formData, { headers });
        toast.success("Médico atualizado com sucesso");
      } else {
        await axios.post(`${BACKEND_URL}/api/doctors`, formData, { headers });
        toast.success("Médico adicionado com sucesso");
      }
      
      setShowModal(false);
      setEditingDoctor(null);
      setFormData({ name: "", specialty: "", city: "", contact_info: "" });
      fetchDoctors();
    } catch (error) {
      console.error(error);
      toast.error("Operação falhou");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Médico removido");
      fetchDoctors();
    } catch (error) {
      toast.error("Falha ao excluir");
    }
  };

  const openEdit = (doc) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name,
      specialty: doc.specialty,
      city: doc.city,
      contact_info: doc.contact_info,
    });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingDoctor(null);
    setFormData({ name: "", specialty: "", city: "", contact_info: "" });
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-primary-900">Painel Admin</h1>
          <p className="text-stone-500">Gerenciar diretório de associados</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={openAdd}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-800 transition-colors flex items-center gap-2"
            data-testid="add-doctor-btn"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
          <button 
            onClick={handleLogout}
            className="bg-stone-100 text-stone-600 px-4 py-2 rounded-full font-medium hover:bg-stone-200 transition-colors flex items-center gap-2"
            data-testid="logout-btn"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Nome</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Especialidade</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Cidade</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{doc.name}</td>
                  <td className="px-6 py-4 text-stone-600">{doc.specialty}</td>
                  <td className="px-6 py-4 text-stone-600">{doc.city}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button 
                      onClick={() => openEdit(doc)}
                      className="p-2 text-stone-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 text-stone-400 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                      title="Excluir"
                      data-testid={`delete-doctor-${doc.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-stone-400">
                    Nenhum médico encontrado. Adicione um para começar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
              {editingDoctor ? "Editar Médico" : "Novo Médico"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nome Completo</label>
                <input
                  required
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Dr. Silva"
                  data-testid="input-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Especialidade</label>
                  <input
                    required
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    placeholder="Oftalmologia"
                    data-testid="input-specialty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Cidade</label>
                  <input
                    required
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Belém"
                    data-testid="input-city"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Contato</label>
                <input
                  required
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({...formData, contact_info: e.target.value})}
                  placeholder="(91) 98888-8888"
                  data-testid="input-contact"
                />
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-800 transition-colors"
                  data-testid="submit-doctor"
                >
                  {editingDoctor ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
