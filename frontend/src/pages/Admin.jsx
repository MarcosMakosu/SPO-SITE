import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, LogOut, Search, Upload, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

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
    image_url: "",
  });
  
  // Image Upload State
  const [imageMode, setImageMode] = useState("url"); // 'url' or 'upload'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let finalImageUrl = formData.image_url;

      // Handle Image Upload if selected
      if (imageMode === "upload" && selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        
        try {
          const uploadRes = await axios.post(`${BACKEND_URL}/api/upload`, uploadData, {
            headers: { 
              ...headers,
              "Content-Type": "multipart/form-data" 
            }
          });
          // Construct full URL
          finalImageUrl = `${BACKEND_URL}${uploadRes.data.url}`;
        } catch (uploadError) {
          console.error("Upload failed", uploadError);
          toast.error("Falha no upload da imagem");
          setUploading(false);
          return;
        }
      }

      const doctorData = { ...formData, image_url: finalImageUrl };
      
      if (editingDoctor) {
        await axios.put(`${BACKEND_URL}/api/doctors/${editingDoctor.id}`, doctorData, { headers });
        toast.success("Médico atualizado com sucesso");
      } else {
        await axios.post(`${BACKEND_URL}/api/doctors`, doctorData, { headers });
        toast.success("Médico adicionado com sucesso");
      }
      
      setShowModal(false);
      setEditingDoctor(null);
      setFormData({ name: "", specialty: "", city: "", contact_info: "", image_url: "" });
      setSelectedFile(null);
      fetchDoctors();
    } catch (error) {
      console.error(error);
      toast.error("Operação falhou");
    } finally {
      setUploading(false);
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
      image_url: doc.image_url || "",
    });
    setImageMode(doc.image_url && !doc.image_url.includes("/uploads/") ? "url" : "upload");
    if (doc.image_url && doc.image_url.includes("/uploads/")) {
       setImageMode("upload"); // If it's a local upload, default to upload tab (even though we don't show the file input populated)
       // Actually, maybe better to just stick to what the user wants to do. 
       // Let's default to URL if there's a value, unless user wants to change it.
       setImageMode("url");
    }
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingDoctor(null);
    setFormData({ name: "", specialty: "", city: "", contact_info: "", image_url: "" });
    setImageMode("upload"); // Default to upload for new
    setSelectedFile(null);
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
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Médico</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Especialidade</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Cidade</th>
                <th className="px-6 py-4 font-serif font-semibold text-primary-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden flex-shrink-0">
                      {doc.image_url ? (
                        <img src={doc.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-stone-900">{doc.name}</span>
                  </td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
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

              {/* Image Management Section */}
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-medium text-stone-700">Foto do Médico</label>
                
                {/* Tabs */}
                <div className="flex bg-stone-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${imageMode === "upload" ? "bg-white text-primary shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${imageMode === "url" ? "bg-white text-primary shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                  >
                    <LinkIcon className="w-4 h-4" /> Link URL
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  {imageMode === "upload" ? (
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:bg-white transition-colors cursor-pointer relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2 text-stone-500">
                           <Upload className="w-8 h-8 text-stone-400" />
                           <span className="text-sm font-medium">
                             {selectedFile ? selectedFile.name : "Clique para selecionar uma foto"}
                           </span>
                           <span className="text-xs text-stone-400">JPG, PNG (Max 5MB)</span>
                        </div>
                      </div>
                      {/* Current Image Preview for Context */}
                      {formData.image_url && !selectedFile && (
                        <div className="text-xs text-stone-500 flex items-center gap-2">
                           <ImageIcon className="w-3 h-3" /> Imagem atual mantida
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input
                        className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                      {formData.image_url && (
                        <div className="relative h-32 w-full rounded-lg overflow-hidden bg-stone-200 border border-stone-200">
                           <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                  data-testid="submit-doctor"
                >
                  {uploading ? "Enviando..." : (editingDoctor ? "Salvar" : "Adicionar")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
