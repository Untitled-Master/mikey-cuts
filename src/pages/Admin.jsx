import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { 
  Tv, 
  Folder, 
  MessageSquare, 
  Youtube, 
  HelpCircle, 
  Play, 
  Share2, 
  Trash2, 
  Edit, 
  Plus, 
  ExternalLink, 
  LogOut,
  LayoutGrid,
  List
} from "lucide-react";

const TABLES = [
  { name: "shorts", label: "Shorts", icon: Tv },
  { name: "projects", label: "Projects", icon: Folder },
  { name: "reviews", label: "Reviews", icon: MessageSquare },
  { name: "channels", label: "Channels", icon: Youtube },
  { name: "faq", label: "FAQ", icon: HelpCircle },
  { name: "mainVid", label: "Main Video", icon: Play },
  { name: "connect", label: "Connect Links", icon: Share2 },
];

const FIELD_ORDER = {
  shorts: ["title", "duration", "views", "platform", "src", "url"],
  projects: ["id", "title", "category", "duration", "aspect", "channel", "channelUrl", "channelLogo", "meta", "desc", "preview", "videoUrl", "views", "date"],
  reviews: ["quote", "author", "role", "rating", "logo"],
  channels: ["name", "views", "logo", "url"],
  faq: ["q", "a"],
  mainVid: ["id", "title", "category", "duration", "aspect", "meta", "desc", "preview", "videoUrl"],
  connect: ["platform", "handle", "url"],
};

const QUERY_MAP = {
  shorts: api.content.getShorts,
  projects: api.content.getProjects,
  reviews: api.content.getReviews,
  channels: api.content.getChannels,
  faq: api.content.getFaq,
  mainVid: api.content.getMainVid,
  connect: api.content.getConnect,
};

// Helper to determine if a field is an image/thumbnail URL
function isImageField(key) {
  return ["preview", "logo", "src", "channelLogo"].includes(key);
}

function TableBrowser({ table, onEdit, onDelete, onAddNew }) {
  const queryResult = useQuery(QUERY_MAP[table]);
  const docs = table === "mainVid" ? (queryResult ? [queryResult] : []) : (queryResult || []);
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

  const getVisualThumbnail = (doc) => {
    const visualKey = ["preview", "logo", "src", "channelLogo"].find(key => doc[key] && typeof doc[key] === "string" && doc[key].startsWith("http"));
    return visualKey ? doc[visualKey] : null;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0f0f] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-6">
          <div>
            <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">Studio Panel &gt; {table}</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block" />
              Content Channel Database ({docs.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#161618] border border-zinc-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {table !== "mainVid" && (
              <button
                onClick={onAddNew}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2.5 px-4 rounded-md flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Plus className="w-4.5 h-4.5" />
                CREATE ENTRY
              </button>
            )}
          </div>
        </div>

        {docs.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl p-16 text-center">
            <p className="text-zinc-500 text-sm font-mono">No entries found in this table.</p>
            {table !== "mainVid" && (
              <button
                onClick={onAddNew}
                className="mt-4 border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-4 py-2 text-xs font-mono rounded-lg transition-colors"
              >
                Create First Item
              </button>
            )}
          </div>
        ) : viewMode === "list" ? (
          /* List View Table Rendering */
          <div className="bg-[#161618] border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#1c1c1e] text-zinc-400 select-none">
                    <th className="py-3.5 px-4 font-bold tracking-wider uppercase">Preview</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider uppercase">Primary Details</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider uppercase hidden md:table-cell">Additional Meta</th>
                    <th className="py-3.5 px-4 text-right font-bold tracking-wider uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {docs.map((doc) => {
                    const thumbUrl = getVisualThumbnail(doc);
                    return (
                      <tr key={doc._id} className="hover:bg-zinc-900/40 transition-colors group">
                        {/* Thumbnail Cell */}
                        <td className="py-4 px-4 w-28">
                          {thumbUrl ? (
                            <div className="w-20 aspect-video rounded-md overflow-hidden bg-black border border-zinc-800 relative shadow-inner">
                              <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-20 aspect-video rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 text-[10px]">
                              No Media
                            </div>
                          )}
                        </td>

                        {/* Title & Description Cell */}
                        <td className="py-4 px-4 max-w-sm">
                          <p className="text-white font-bold text-sm truncate group-hover:text-red-500 transition-colors">
                            {doc.title || doc.name || doc.q || doc._id}
                          </p>
                          <p className="text-zinc-500 text-[11px] truncate mt-1">
                            {doc.desc || doc.quote || doc.a || doc.handle || `ID: ${doc.id || doc._id}`}
                          </p>
                        </td>

                        {/* Extra Metrics Badges */}
                        <td className="py-4 px-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {doc.platform && <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">{doc.platform}</span>}
                            {doc.duration && <span className="bg-red-950/40 text-red-400 px-2 py-0.5 rounded text-[10px]">{doc.duration}</span>}
                            {doc.views && <span className="bg-blue-950/40 text-blue-400 px-2 py-0.5 rounded text-[10px]">{doc.views} views</span>}
                            {doc.category && <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">{doc.category}</span>}
                            {doc.rating && <span className="bg-yellow-950/40 text-yellow-500 px-2 py-0.5 rounded text-[10px]">★ {doc.rating}</span>}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => onEdit(doc)}
                              className="text-zinc-400 hover:text-white flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-800 py-1.5 px-3 rounded-lg border border-zinc-700/50 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </button>
                            <button
                              onClick={() => onDelete(doc._id)}
                              className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View Layout Option */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {docs.map((doc) => {
              const thumbUrl = getVisualThumbnail(doc);
              return (
                <div key={doc._id} className="bg-[#161618] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col hover:border-zinc-700 transition-colors group shadow-lg">
                  {/* Card Thumbnail Section */}
                  {thumbUrl ? (
                    <div className="aspect-video w-full bg-black border-b border-zinc-800 overflow-hidden relative">
                      <img src={thumbUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-zinc-900 border-b border-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                      No Visual Media
                    </div>
                  )}

                  {/* Card Content Section */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-red-500 transition-colors mb-1">
                        {doc.title || doc.name || doc.q || doc._id}
                      </h4>
                      <p className="text-zinc-500 text-[11px] line-clamp-3 mb-3">
                        {doc.desc || doc.quote || doc.a || doc.handle || `ID: ${doc.id || doc._id}`}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Meta Tags container */}
                      <div className="flex flex-wrap gap-1">
                        {doc.platform && <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[9px]">{doc.platform}</span>}
                        {doc.duration && <span className="bg-red-950/40 text-red-400 px-1.5 py-0.5 rounded text-[9px]">{doc.duration}</span>}
                        {doc.views && <span className="bg-blue-950/40 text-blue-400 px-1.5 py-0.5 rounded text-[9px]">{doc.views} views</span>}
                        {doc.category && <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[9px]">{doc.category}</span>}
                        {doc.rating && <span className="bg-yellow-950/40 text-yellow-500 px-1.5 py-0.5 rounded text-[9px]">★ {doc.rating}</span>}
                      </div>

                      {/* Card Action Strip */}
                      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3 mt-1">
                        <button
                          onClick={() => onEdit(doc)}
                          className="text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 py-1.5 px-3 rounded-lg border border-zinc-700/60 transition-colors text-[11px] font-semibold"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Configure</span>
                        </button>
                        <button
                          onClick={() => onDelete(doc._id)}
                          className="text-zinc-500 hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [editingDoc, setEditingDoc] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const loginMut = useMutation(api.admin.login);
  const updateDoc = useMutation(api.admin.updateDoc);
  const insertDoc = useMutation(api.admin.insertDoc);
  const deleteDoc = useMutation(api.admin.deleteDoc);

  useEffect(() => {
    const saved = localStorage.getItem("adminLoggedIn");
    if (saved === "true") setLoggedIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginMut({ username, password });
    if (result.success) {
      setLoggedIn(true);
      setLoginError(false);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setSelectedTable(null);
  };

  const startEdit = (doc) => {
    const order = FIELD_ORDER[selectedTable] || Object.keys(doc).filter(k => !k.startsWith("_"));
    const fields = {};
    for (const key of order) {
      fields[key] = doc[key] !== undefined ? doc[key] : "";
    }
    setEditingDoc(doc._id);
    setEditFields(fields);
    setShowAddForm(false);
  };

  const startAdd = () => {
    const order = FIELD_ORDER[selectedTable] || [];
    const fields = {};
    for (const key of order) {
      fields[key] = key === "rating" ? 5 : "";
    }
    setEditFields(fields);
    setShowAddForm(true);
    setEditingDoc(null);
  };

  const handleSave = async () => {
    if (!editingDoc) return;
    await updateDoc({ table: selectedTable, id: editingDoc, fields: editFields });
    setEditingDoc(null);
  };

  const handleAdd = async () => {
    await insertDoc({ table: selectedTable, fields: editFields });
    setShowAddForm(false);
    setEditFields({});
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this document?")) {
      await deleteDoc({ table: selectedTable, id });
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full top-1/4 left-1/4 -translate-x-1/2 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full bottom-1/4 right-1/4 translate-x-1/2 pointer-events-none" />

        <div className="w-full max-w-md bg-[#0f0f10] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase block font-bold">// PARTNER CONSOLE</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white font-mono mt-1">Creator Studio</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 font-mono">
            <div>
              <label className="text-zinc-500 text-[10px] uppercase font-bold mb-1.5 block">Operator Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161618] border border-zinc-800 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                placeholder="system-admin"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[10px] uppercase font-bold mb-1.5 block">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161618] border border-zinc-800 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs">Invalid credentials</p>}
            <button type="submit" className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs hover:bg-red-700 transition-all active:scale-[0.98] mt-2">
              Authenticate
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-zinc-500 py-2 text-xs hover:text-white transition-colors">
              Exit Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  const fieldKeys = editingDoc || showAddForm ? Object.keys(editFields) : [];

  return (
    <div className="h-screen w-screen bg-[#070708] flex text-zinc-300 font-mono overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f0f10] border-r border-zinc-800/80 flex flex-col h-full select-none shrink-0 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
            YS
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-xs tracking-wide uppercase truncate">Creator Studio</h1>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block truncate">Content Director</span>
          </div>
        </div>
        
        {/* Navigation list container */}
        <div className="p-4 space-y-1 flex-1 overflow-hidden">
          <span className="text-[9px] font-bold text-zinc-500 px-3.5 uppercase tracking-widest block mb-2">Content Tables</span>
          {TABLES.map((t) => {
            const SidebarIcon = t.icon;
            return (
              <button
                key={t.name}
                onClick={() => { setSelectedTable(t.name); setEditingDoc(null); setShowAddForm(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                  selectedTable === t.name 
                    ? "bg-red-950/20 text-red-500 border-l-2 border-red-600" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <SidebarIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <div className="bg-zinc-900/40 rounded-lg p-3 border border-zinc-800/80 flex items-center justify-between mb-2">
            <span className="text-[10px] text-zinc-400 truncate pr-2">Active Admin</span>
            <button 
              onClick={handleLogout} 
              className="text-red-500 hover:text-red-400 text-[10px] font-bold flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="w-full text-zinc-500 hover:text-white text-[10px] py-1 transition-colors flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Exit to Site</span>
          </button>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {!selectedTable ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#0f0f10]">
            <div className="text-center max-w-md p-6">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-8 h-8 text-zinc-600" />
              </div>
              <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Select Channel Table</h2>
              <p className="text-zinc-500 text-xs">Choose a content asset category on the left sidebar directory to populate metadata properties.</p>
            </div>
          </div>
        ) : editingDoc || showAddForm ? (
          /* Split Panel Studio Editor & Live Mockup Preview */
          <div className="flex-1 flex overflow-hidden bg-[#0f0f10]">
            {/* Form Fields Section */}
            <div className="w-3/5 overflow-y-auto p-8 border-r border-zinc-800/80">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">// METADATA COMPOSER</span>
                    <h3 className="text-white text-base font-bold uppercase tracking-tight mt-0.5">
                      {showAddForm ? `Create New: ${selectedTable}` : `Edit: ${selectedTable}`}
                    </h3>
                  </div>
                  <button 
                    onClick={() => { setEditingDoc(null); setShowAddForm(false); }} 
                    className="text-zinc-500 hover:text-white text-xs border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Close Editor
                  </button>
                </div>

                <div className="space-y-4">
                  {fieldKeys.map((key) => {
                    const isImg = isImageField(key);
                    return (
                      <div key={key} className="bg-[#161618] border border-zinc-800/50 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-zinc-400 text-[10.5px] uppercase tracking-wider font-bold block">{key}</label>
                          {isImg && <span className="text-[9px] text-zinc-500 uppercase">Image URL Preview Supported</span>}
                        </div>
                        
                        {key === "quote" || key === "desc" ? (
                          <textarea
                            rows={3}
                            value={editFields[key] || ""}
                            onChange={(e) => setEditFields({ ...editFields, [key]: e.target.value })}
                            className="w-full bg-[#0f0f10] border border-zinc-800 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-red-600 transition-colors"
                            placeholder={`Enter text narrative for ${key}...`}
                          />
                        ) : key === "rating" ? (
                          <input
                            type="number"
                            min="1" max="5"
                            value={editFields[key] || ""}
                            onChange={(e) => setEditFields({ ...editFields, [key]: parseInt(e.target.value) || 0 })}
                            className="w-full bg-[#0f0f10] border border-zinc-800 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-red-600 transition-colors"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editFields[key] || ""}
                            onChange={(e) => setEditFields({ ...editFields, [key]: e.target.value })}
                            className="w-full bg-[#0f0f10] border border-zinc-800 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-red-600 transition-colors"
                            placeholder={`Enter values for ${key}...`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={showAddForm ? handleAdd : handleSave}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider text-xs transition-all shadow-lg active:scale-95"
                  >
                    {showAddForm ? "Publish Entry" : "Commit Changes"}
                  </button>
                  <button
                    onClick={() => { setEditingDoc(null); setShowAddForm(false); }}
                    className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Preview Sidecar (Right Panel Mockup) */}
            <div className="w-2/5 bg-[#0b0b0c] p-8 flex flex-col justify-start">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-4">Live Layout Sandbox</span>
              
              <div className="border border-zinc-800 rounded-2xl bg-[#0f0f10]/80 p-6 shadow-2xl space-y-4">
                {/* Visual Thumbnail Rendering */}
                {Object.keys(editFields).some(k => isImageField(k)) ? (
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">Mockup Media Render</span>
                    <div className="aspect-video w-full rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden relative flex items-center justify-center">
                      {Object.keys(editFields)
                        .filter(isImageField)
                        .map(k => editFields[k])
                        .find(val => val && val.startsWith("http")) ? (
                          <img 
                            src={Object.keys(editFields).filter(isImageField).map(k => editFields[k]).find(val => val && val.startsWith("http"))} 
                            alt="Mockup Thumbnail Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-zinc-600 text-xs text-center px-4">Provide active http image URL to load layout mockup</span>
                        )}
                    </div>
                  </div>
                ) : null}

                {/* Simulated Content Card Presentation */}
                <div className="space-y-3">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Simulated Typography Layout</span>
                  <div className="bg-[#161618] border border-zinc-800/60 p-4 rounded-xl space-y-2">
                    <div className="h-2 w-16 bg-red-600 rounded" />
                    <h4 className="text-white text-sm font-bold truncate">
                      {editFields.title || editFields.name || editFields.q || "Document Title Placeholder"}
                    </h4>
                    <p className="text-zinc-400 text-xs line-clamp-2">
                      {editFields.desc || editFields.quote || editFields.a || "Write item descriptions or questions inside the left panel schema to see structural text wrap details in real-time."}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-zinc-500 border-t border-zinc-800/80">
                      {editFields.duration && <span>Duration: {editFields.duration}</span>}
                      {editFields.views && <span>Views: {editFields.views}</span>}
                      {editFields.rating && <span>Rating: ★ {editFields.rating}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Main Document List */
          <TableBrowser
            key={selectedTable}
            table={selectedTable}
            onEdit={startEdit}
            onDelete={handleDelete}
            onAddNew={startAdd}
          />
        )}
      </div>
    </div>
  );
}