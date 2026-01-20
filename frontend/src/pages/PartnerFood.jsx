import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, Edit3, Trash2, Search, UtensilsCrossed, 
  Image as ImageIcon, Leaf, X, Upload, 
  CheckCircle2, AlertCircle 
} from "lucide-react";
import { apiRequest } from "../utils/api";

const PartnerFood = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "In Stock",
    veg: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ For real-time preview

  /* ---------------- FETCH FOOD ---------------- */
  const fetchFood = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/food", {}, "partner");
      const foodItems = res.data || res.foods || res;
      setItems(Array.isArray(foodItems) ? foodItems : []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  /* ---------------- IMAGE PREVIEW LOGIC ---------------- */
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  /* ---------------- HANDLERS ---------------- */
  const openModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        status: item.status,
        veg: item.veg,
      });
      // If item has an existing image from server
      setPreview(item.image); 
    } else {
      setEditItem(null);
      setFormData({ name: "", description: "", price: "", status: "In Stock", veg: false });
      setPreview(null);
    }
    setImage(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("status", formData.status);
      data.append("veg", formData.veg);

      if (image) {
        data.append("image", image);
      }

      const endpoint = editItem ? `/food/${editItem._id}` : "/food/add";
      const method = editItem ? "PUT" : "POST";

      await apiRequest(endpoint, { method, body: data }, "partner");
      
      setModalOpen(false);
      fetchFood();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dish?")) return;
    try {
      await apiRequest(`/food/${id}`, { method: "DELETE" }, "partner");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 italic">Menu Manager</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your dishes, pricing, and availability.</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Dish
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="bg-white p-2 rounded-2xl flex items-center gap-3 flex-1 shadow-sm border border-slate-100">
            <div className="bg-slate-100 p-2 rounded-xl text-slate-400">
              <Search size={20} />
            </div>
            <input
              className="w-full outline-none bg-transparent font-medium text-slate-600"
              placeholder="Search dishes by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="bg-emerald-50 px-6 py-2 rounded-2xl flex items-center gap-3 border border-emerald-100">
            <UtensilsCrossed className="text-emerald-600" size={20} />
            <span className="text-emerald-700 font-bold">{items.length} Total Items</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
               <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
               <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Menu...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Dish Information</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Price</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Image Thumbnail */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0 shadow-sm">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 text-lg">{item.name}</span>
                            {item.veg ? (
                              <div className="w-4 h-4 border-2 border-emerald-500 p-0.5 flex items-center justify-center">
                                <div className="w-full h-full bg-emerald-500 rounded-full" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 border-2 border-rose-500 p-0.5 flex items-center justify-center">
                                <div className="w-full h-full bg-rose-500 rounded-full" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-400 px-2 py-0.5 bg-slate-100 rounded-md uppercase tracking-tighter">
                            {item.veg ? "Pure Veg" : "Non-Veg"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-semibold text-slate-500">{item.description}</td>
                    <td className="p-6 text-center font-black text-slate-900 text-lg">₹{item.price}</td>
                    <td className="p-6 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openModal(item)} 
                          className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-emerald-600 hover:border-emerald-200 transition"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-rose-600 hover:border-rose-200 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-8 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black italic">{editItem ? "Edit Dish" : "Create New Dish"}</h2>
                <p className="text-slate-400 text-sm font-medium">Provide the details for your culinary creation.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Side: Upload & Veg Toggle */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dish Photo</label>
                    <div className="relative group">
                      <div className="w-full h-48 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-emerald-300 group-hover:bg-emerald-50/30">
                        {preview ? (
                          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="text-slate-300 mb-2" size={32} />
                            <p className="text-xs font-bold text-slate-400">Click to upload image</p>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      {preview && (
                        <button 
                          type="button"
                          onClick={() => {setImage(null); setPreview(null);}}
                          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-rose-500 shadow-sm"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Leaf className={formData.veg ? "text-emerald-500" : "text-slate-300"} size={20} />
                      <span className="font-bold text-sm">Vegetarian Dish</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="veg" 
                        checked={formData.veg} 
                        onChange={handleChange} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                {/* Right Side: Form Details */}
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dish Name</label>
                    <input 
                      name="name" value={formData.name} onChange={handleChange} 
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-medium" 
                      placeholder="e.g. Maharaja Burger" required 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                    <input 
                      name="description" value={formData.description} onChange={handleChange} 
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-medium" 
                      placeholder="e.g. Main Course" required 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price (₹)</label>
                      <input 
                        type="number" name="price" value={formData.price} onChange={handleChange} 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-bold" 
                        placeholder="0.00" required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Availability</label>
                      <select 
                        name="status" value={formData.status} onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-bold text-slate-600 appearance-none"
                      >
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-8 py-4 font-bold text-slate-400 hover:text-slate-900 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  {editItem ? "Update Dish" : "Save Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerFood;