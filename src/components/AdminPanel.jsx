import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaUpload, FaPlus, FaBriefcase, FaBook, FaFolderPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  const [activeForm, setActiveForm] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Manage UI States
  const [managedItems, setManagedItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form States
  const [thoughtFile, setThoughtFile] = useState(null);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [thoughtTitle, setThoughtTitle] = useState('');
  const [thoughtExcerpt, setThoughtExcerpt] = useState('');
  const [thoughtContent, setThoughtContent] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [projectPeriod, setProjectPeriod] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [projectLink, setProjectLink] = useState('');
  
  const [expTitle, setExpTitle] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expResponsibilities, setExpResponsibilities] = useState('');
  
  const [paperTitle, setPaperTitle] = useState('');
  const [paperPublisher, setPaperPublisher] = useState('');
  const [paperAuthors, setPaperAuthors] = useState('');
  const [paperAbstract, setPaperAbstract] = useState('');
  const [paperLink, setPaperLink] = useState('');
  const [paperDate, setPaperDate] = useState('');

  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) setSession({ access_token: savedToken });
    
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (session && session.access_token) {
      if (sessionStorage.getItem('adminToken') !== session.access_token) {
        sessionStorage.setItem('adminToken', session.access_token);
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, [session]);

  const getEndpointForForm = (formType) => {
    if (formType === 'project') return 'projects';
    if (formType === 'thought') return 'thoughts';
    if (formType === 'paper') return 'papers';
    return formType; // e.g. 'experience', 'cv'
  };

  useEffect(() => {
    if (activeForm && activeForm !== 'cv') {
      clearForms();
      fetchManagedItems(activeForm);
    }
  }, [activeForm]);

  const fetchManagedItems = async (formType) => {
    setIsLoadingItems(true);
    try {
      const ep = getEndpointForForm(formType);
      const res = await fetch(`${apiBaseUrl}/api/${ep}`);
      if (res.ok) {
        const data = await res.json();
        setManagedItems(data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoadingItems(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const VALID_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!VALID_PASS) {
      alert('Missing VITE_ADMIN_PASSWORD (do not use this in production).');
      return;
    }
    
    if (email !== 'adewoleolumide05@gmail.com') {
      alert('Error');
      return;
    }
    
    if (password === VALID_PASS) {
      setSession({ access_token: password });
      window.dispatchEvent(new Event("storage"));
    } else {
      alert('Invalid Credentials');
    }
  };

  const clearForms = () => {
    setEditingId(null);
    setThoughtFile(null); setThoughtTitle(''); setThoughtExcerpt(''); setThoughtContent('');
    setProjectTitle(''); setProjectPeriod(''); setProjectDescription(''); setProjectDetails(''); setProjectTech(''); setProjectLink('');
    setExpTitle(''); setExpCompany(''); setExpLocation(''); setExpPeriod(''); setExpResponsibilities('');
    setPaperTitle(''); setPaperPublisher(''); setPaperAuthors(''); setPaperAbstract(''); setPaperLink(''); setPaperDate('');
  };

  const loadIntoEdit = (item) => {
    setEditingId(item.id);
    if (activeForm === 'project') {
      setProjectTitle(item.title); setProjectPeriod(item.period); setProjectDescription(item.description);
      setProjectDetails(item.details ? item.details.join('\n') : '');
      setProjectTech(item.tech ? item.tech.join(', ') : '');
      setProjectLink(item.link || '');
    } else if (activeForm === 'experience') {
      setExpTitle(item.title); setExpCompany(item.company); setExpLocation(item.location); setExpPeriod(item.period);
      setExpResponsibilities(item.responsibilities ? item.responsibilities.join('\n') : '');
    } else if (activeForm === 'paper') {
      setPaperTitle(item.title); setPaperPublisher(item.publisher); setPaperAuthors(item.authors); setPaperAbstract(item.abstract); setPaperLink(item.link || ''); setPaperDate(item.published_date || '');
    } else if (activeForm === 'thought') {
      setThoughtTitle(item.title); setThoughtExcerpt(item.excerpt); setThoughtContent(item.content);
    }
    
    // Smooth scroll inside the main container to the form
    document.getElementById('form-container').scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (ep, id) => {
    if (!window.confirm("Are you incredibly sure you want to permanently delete this record?")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/api/${ep}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      if (res.ok) {
        fetchManagedItems(activeForm);
        if (editingId === id) clearForms(); // Reset if they delete what they are currently editing
      } else {
        alert("Delete failed.");
      }
    } catch (e) {
      console.error(e);
      alert("Network Error");
    }
  };

  const genericSubmit = async (endpoint, payload, fallbackSuccessMsg) => {
    if (!session) return alert('Session expired');
    const isEdit = editingId !== null;
    const url = isEdit ? `${apiBaseUrl}/api/${endpoint}/${editingId}` : `${apiBaseUrl}/api/${endpoint}`;
    
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert(isEdit ? 'Record successfully updated!' : fallbackSuccessMsg);
        clearForms();
        fetchManagedItems(activeForm);
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Network error - Is backend running on port 5002?');
    }
  };

  const handleSubmitThoughtDoc = async (e) => {
    e.preventDefault();
    if (!thoughtFile) return alert('Please select a .docx file first!');
    if (!session) return alert('Session expired');

    setIsProcessingAI(true);
    try {
      const formData = new FormData();
      formData.append('document', thoughtFile);

      const res = await fetch(`${apiBaseUrl}/api/thoughts`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
        body: formData 
      });

      if (res.ok) {
        alert('Document processed by AI and published successfully!');
        clearForms();
        fetchManagedItems('thought');
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Network error - Is backend running?');
    }
    setIsProcessingAI(false);
  };

  const handleEditThought = async (e) => {
    e.preventDefault();
    genericSubmit('thoughts', {
      title: thoughtTitle, excerpt: thoughtExcerpt, content: thoughtContent
    }, 'Thought updated successfully!');
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    genericSubmit('projects', {
      title: projectTitle, period: projectPeriod, description: projectDescription,
      details: projectDetails.split('\n').filter(x => x.trim()),
      tech: projectTech.split(',').map(x => x.trim()).filter(x => x), link: projectLink
    }, 'Project published successfully!');
  };

  const handleSubmitExperience = (e) => {
    e.preventDefault();
    genericSubmit('experience', {
      title: expTitle, company: expCompany, location: expLocation, period: expPeriod,
      responsibilities: expResponsibilities.split('\n').filter(x => x.trim())
    }, 'Experience published successfully!');
  };

  const handleSubmitPaper = (e) => {
    e.preventDefault();
    genericSubmit('papers', {
      title: paperTitle, publisher: paperPublisher, authors: paperAuthors, abstract: paperAbstract, link: paperLink,
      published_date: paperDate || new Date().toISOString().split('T')[0]
    }, 'Paper published successfully!');
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('dragIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetIndex, endpointString) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData('dragIndex'));
    if (dragIndex === targetIndex || isNaN(dragIndex)) return;

    // Mutate local state optimistically
    const newItems = [...managedItems];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    setManagedItems(newItems);

    // Map new configurations
    const updates = newItems.map((item, idx) => ({ id: item.id, display_order: idx }));
    try {
      const res = await fetch(`${apiBaseUrl}/api/${endpointString}/batch/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to reorder');
    } catch (err) {
      console.error(err);
      alert('Network sync failed. Reverting order.');
      fetchManagedItems(activeForm);
    }
  };

  const renderManageList = (endpointString) => (
    <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-wixText dark:text-wixWhite">Manage Existing Records</h3>
        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-wixTextSecondary dark:text-wixDarkTextSecondary px-3 py-1 rounded-full font-medium tracking-wide">Hover & Drag to Reorder</span>
      </div>
      
      {isLoadingItems ? (
        <p className="text-wixTextSecondary text-sm">Loading records...</p>
      ) : managedItems.length === 0 ? (
        <p className="text-wixTextSecondary text-sm">No records found for this module.</p>
      ) : (
        <div className="space-y-4">
          {managedItems.map((item, index) => (
            <div 
              key={item.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index, endpointString)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-wixLight dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-wixAccent dark:hover:border-wixAccent transition-all cursor-move group shadow-sm hover:shadow"
            >
              <div className="mb-4 sm:mb-0 flex items-center gap-4">
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-wixAccent transition-colors hidden sm:block">
                  <svg width="12" height="24" viewBox="0 0 12 24" fill="currentColor"><circle cx="4" cy="4" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="10" cy="4" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="10" cy="20" r="2"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-wixText dark:text-wixWhite text-base mb-1">{item.title || item.company}</h4>
                  <p className="text-xs font-medium text-wixTextSecondary dark:text-wixDarkTextSecondary">
                    ID: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{item.id}</span> • Order: {item.display_order || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => loadIntoEdit(item)} className="px-5 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-xl text-sm font-bold transition-colors cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(endpointString, item.id)} className="px-5 py-2 text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-xl text-sm font-bold transition-colors cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-wixWhite dark:bg-wixDarkCard p-8 rounded-3xl shadow-soft dark:shadow-soft-dark max-w-md w-full border border-gray-100 dark:border-gray-800"
        >
          <div className="flex flex-col items-center mb-8">
             <div className="w-16 h-16 bg-wixLight dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FaLock className="text-wixAccent text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">Admin Portal</h2>
            <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-sm mt-2 font-medium">Secure Access Node</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-wixText dark:text-wixWhite mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-wixLight dark:bg-gray-800 border-none focus:ring-2 focus:ring-wixAccent text-wixText dark:text-wixWhite outline-none transition-all" placeholder="Your email here" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-wixText dark:text-wixWhite mb-1">Secure Passkey</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-wixLight dark:bg-gray-800 border-none focus:ring-2 focus:ring-wixAccent text-wixText dark:text-wixWhite outline-none transition-all" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-wixAccent text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-300 mt-4 shadow-sm">Authenticate</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'cv', icon: FaUpload, title: 'Upload CV', desc: 'Update your resume' },
    { id: 'project', icon: FaFolderPlus, title: 'Projects', desc: 'Manage portfolio' },
    { id: 'experience', icon: FaBriefcase, title: 'Experience', desc: 'Manage roles' },
    { id: 'paper', icon: FaBook, title: 'Papers', desc: 'Manage publications' },
    { id: 'thought', icon: FaPlus, title: 'Thoughts', desc: 'Manage AI articles' }
  ];

  return (
    <div className="h-screen pt-16 flex overflow-hidden bg-wixLight dark:bg-wixDark">
      
      {/* Resizable Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="h-full flex-shrink-0 bg-wixWhite dark:bg-wixDarkCard border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 relative z-20"
      >
        <div className="p-4 flex items-center justify-end border-b border-gray-100 dark:border-gray-800 min-h-[70px]">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-wixTextSecondary dark:text-wixDarkTextSecondary transition-colors"
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-3 custom-scrollbar">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveForm(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 rounded-2xl flex items-center gap-4 transition-colors relative border ${activeForm === item.id ? 'bg-blue-50 dark:bg-blue-900/10 border-wixAccent dark:border-wixAccent shadow-sm' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
              title={!isSidebarOpen ? item.title : ""}
            >
              <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors ${activeForm === item.id ? 'bg-wixAccent text-white' : 'bg-gray-100 dark:bg-gray-800 text-wixTextSecondary dark:text-wixDarkTextSecondary'}`}>
                <item.icon className="text-lg" />
              </div>
              
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <h3 className="font-bold text-wixText dark:text-wixWhite text-sm mt-0.5">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{item.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main id="form-container" className="flex-1 h-full overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
        <div className="max-w-4xl mx-auto w-full bg-wixWhite dark:bg-wixDarkCard rounded-3xl p-6 sm:p-10 shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800 min-h-[calc(100vh-8rem)] relative">
          
          <AnimatePresence mode="wait">
            {!activeForm && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-wixTextSecondary dark:text-wixDarkTextSecondary"
              >
                <div className="w-24 h-24 mb-6 opacity-20"><FaFolderPlus className="w-full h-full" /></div>
                <h2 className="text-3xl font-bold text-wixText dark:text-wixWhite mb-3">Welcome to your Dashboard</h2>
                <p className="max-w-md text-sm leading-relaxed">Select a module from the sidebar to seamlessly manage your portfolio blocks, view existing records, upload files, or draft formatted AI articles.</p>
              </motion.div>
            )}

            {/* Forms rendering dynamically */}
            {activeForm === 'cv' && (
              <motion.div key="cv" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Update CV Document</h2>
                <div className="p-8 sm:p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800/30">
                  <FaUpload className="text-5xl text-wixAccent mb-4 opacity-70" />
                  <p className="text-wixText dark:text-wixWhite font-medium mb-1">Drag and drop your PDF here</p>
                  <p className="text-sm text-wixTextSecondary dark:text-wixDarkTextSecondary mb-8">Strictly PDF. Max file size 5MB.</p>
                  <button className="bg-wixWhite dark:bg-gray-800 text-wixText dark:text-wixWhite font-bold px-8 py-3 rounded-full border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all">Browse Local Files</button>
                </div>
              </motion.div>
            )}

            {activeForm === 'thought' && (
              <motion.div key="thought" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">{editingId ? 'Edit Thought' : 'AI Thought Integration'}</h2>
                  {editingId && (
                    <button onClick={clearForms} className="text-sm font-bold text-wixTextSecondary hover:text-wixText">Cancel Edit</button>
                  )}
                </div>
                
                {editingId ? (
                  <form onSubmit={handleEditThought} className="space-y-5">
                    <div><label className="block text-sm font-semibold mb-1">Title</label><input type="text" value={thoughtTitle} onChange={(e) => setThoughtTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none border-gray-200" required /></div>
                    <div><label className="block text-sm font-semibold mb-1">Excerpt</label><textarea value={thoughtExcerpt} onChange={(e) => setThoughtExcerpt(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none border-gray-200 h-20 resize-none" required /></div>
                    <div><label className="block text-sm font-semibold mb-1">Raw Markdown Content</label><textarea value={thoughtContent} onChange={(e) => setThoughtContent(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border outline-none border-gray-200 min-h-[300px] resize-y font-mono text-sm" required /></div>
                    <div className="flex justify-end pt-2"><button type="submit" className="bg-wixAccent text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700">Save Edits</button></div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmitThoughtDoc} className="space-y-6">
                    <div className="p-8 sm:p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center bg-blue-50/50 dark:bg-blue-900/10">
                      <FaBook className="text-5xl text-wixAccent mb-4 opacity-70" />
                      <p className="text-wixText dark:text-wixWhite font-medium mb-1 text-lg">Ingest .docx Document</p>
                      <p className="text-sm text-wixTextSecondary dark:text-wixDarkTextSecondary mb-8 max-w-md mx-auto leading-relaxed">Our AI backend will dynamically extract the metadata, perfect the markdown styling, and inject embedded citations properly before publishing.</p>
                      
                      <input 
                        type="file" 
                        accept=".docx" 
                        onChange={(e) => setThoughtFile(e.target.files[0])} 
                        className="block w-full max-w-xs mx-auto text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-wixAccent file:text-white hover:file:bg-blue-700 cursor-pointer"
                        required
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" disabled={isProcessingAI} className={`bg-wixAccent text-white font-bold py-3 px-10 rounded-xl shadow-sm w-full sm:w-auto transition-all ${isProcessingAI ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:bg-blue-700 hover:scale-[1.02]'}`}>
                        {isProcessingAI ? 'AI Engine Processing...' : 'Ingest & Publish'}
                      </button>
                    </div>
                  </form>
                )}
                {renderManageList('thoughts')}
              </motion.div>
            )}

            {activeForm === 'project' && (
              <motion.div key="project" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">{editingId ? 'Edit Project' : 'Create New Project'}</h2>
                  {editingId && (
                    <button onClick={clearForms} className="text-sm font-bold text-wixTextSecondary hover:text-wixText transition-colors">Cancel Edit</button>
                  )}
                </div>
                <form onSubmit={handleSubmitProject} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Title</label><input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Period</label><input type="text" value={projectPeriod} onChange={(e) => setProjectPeriod(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" placeholder="e.g. 2023 - Present" required /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Technologies</label><input type="text" value={projectTech} onChange={(e) => setProjectTech(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" placeholder="Comma separated" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">External Link</label><input type="url" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" placeholder="Optional URL" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Short Description</label><textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none h-20 resize-none" required /></div>
                  <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Bullet Points</label><textarea value={projectDetails} onChange={(e) => setProjectDetails(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none min-h-[120px] resize-y" placeholder="One per line" required /></div>
                  <div className="flex justify-end pt-2"><button type="submit" className="bg-wixAccent text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:bg-blue-700 hover:scale-[1.02] transition-all">{editingId ? 'Save Edits' : 'Publish Project'}</button></div>
                </form>
                {renderManageList('projects')}
              </motion.div>
            )}

            {activeForm === 'experience' && (
              <motion.div key="experience" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">{editingId ? 'Edit Job Experience' : 'Add Job Experience'}</h2>
                  {editingId && (
                    <button onClick={clearForms} className="text-sm font-bold text-wixTextSecondary hover:text-wixText transition-colors">Cancel Edit</button>
                  )}
                </div>
                <form onSubmit={handleSubmitExperience} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Role Title</label><input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Company</label><input type="text" value={expCompany} onChange={(e) => setExpCompany(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Period</label><input type="text" value={expPeriod} onChange={(e) => setExpPeriod(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Location</label><input type="text" value={expLocation} onChange={(e) => setExpLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Responsibilities</label><textarea value={expResponsibilities} onChange={(e) => setExpResponsibilities(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none min-h-[150px] resize-y" placeholder="One per line" required /></div>
                  <div className="flex justify-end pt-2"><button type="submit" className="bg-wixAccent text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:bg-blue-700 hover:scale-[1.02] transition-all">{editingId ? 'Save Edits' : 'Save Record'}</button></div>
                </form>
                {renderManageList('experience')}
              </motion.div>
            )}

            {activeForm === 'paper' && (
              <motion.div key="paper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">{editingId ? 'Edit Research Paper' : 'Publish Research Paper'}</h2>
                  {editingId && (
                    <button onClick={clearForms} className="text-sm font-bold text-wixTextSecondary hover:text-wixText transition-colors">Cancel Edit</button>
                  )}
                </div>
                <form onSubmit={handleSubmitPaper} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Title</label><input type="text" value={paperTitle} onChange={(e) => setPaperTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Publisher</label><input type="text" value={paperPublisher} onChange={(e) => setPaperPublisher(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Authors</label><input type="text" value={paperAuthors} onChange={(e) => setPaperAuthors(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                    <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">External Link</label><input type="url" value={paperLink} onChange={(e) => setPaperLink(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Publish Date</label><input type="date" value={paperDate} onChange={(e) => setPaperDate(e.target.value)} className="w-full max-w-xs px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none" required /></div>
                  <div><label className="block text-sm font-semibold text-wixText dark:text-wixWhite mb-1">Abstract</label><textarea value={paperAbstract} onChange={(e) => setPaperAbstract(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-wixAccent outline-none h-40 resize-y" required /></div>
                  <div className="flex justify-end pt-2"><button type="submit" className="bg-wixAccent text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:bg-blue-700 hover:scale-[1.02] transition-all">{editingId ? 'Save Edits' : 'Commit Paper'}</button></div>
                </form>
                {renderManageList('papers')}
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </main>

    </div>
  );
};

export default AdminPanel;
