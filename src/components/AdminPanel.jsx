import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaPlus, FaBriefcase, FaBook, FaFolderPlus, FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";


const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  const [activeForm, setActiveForm] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [modal, setModal] = useState(null);

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
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setSession({ access_token: token });
    }
    
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

  const showNotice = ({ title, message, tone = 'info' }) => {
    setModal({ type: 'notice', title, message, tone });
  };

  const showConfirm = ({ title, message, confirmLabel = 'Confirm', tone = 'danger', onConfirm }) => {
    setModal({ type: 'confirm', title, message, confirmLabel, tone, onConfirm, isWorking: false });
  };

  const closeModal = () => {
    setModal(null);
  };

  const getAdminToken = async () => {
    const token = session?.access_token || sessionStorage.getItem('adminToken');

    if (token && (!session || token !== session.access_token)) {
      setSession({ access_token: token });
      sessionStorage.setItem('adminToken', token);
    }

    return token;
  };

  const handleAuthFailure = () => {
    sessionStorage.removeItem('adminToken');
    setSession(null);
    showNotice({
      title: 'Session expired',
      message: 'Please sign in again before changing dashboard records.',
      tone: 'danger'
    });
  };

  const getErrorMessage = async (res, fallback) => {
    try {
      const data = await res.json();
      return data?.error || fallback;
    } catch {
      return fallback;
    }
  };

  const getAuthHeaders = async (extraHeaders = {}) => {
    const token = await getAdminToken();
    if (!token) {
      handleAuthFailure();
      return null;
    }
    return { ...extraHeaders, Authorization: `Bearer ${token}` };
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Please enter your email and password.');
      return;
    }
    
    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          setSession({ access_token: data.access_token });
          sessionStorage.setItem('adminToken', data.access_token);
          window.dispatchEvent(new Event("storage"));
        } else {
          setAuthError('Authentication failed.');
        }
      } else {
        const errData = await res.json();
        setAuthError(errData?.error || 'Authentication failed.');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Network error. Could not reach backend.');
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
    const item = managedItems.find((record) => record.id === id);
    const label = item?.title || item?.company || id;

    showConfirm({
      title: 'Delete record',
      message: `Are you incredibly sure you want to permanently delete "${label}"? This cannot be undone.`,
      confirmLabel: 'Delete permanently',
      tone: 'danger',
      onConfirm: async () => {
        await performDelete(ep, id);
      }
    });
  };

  const performDelete = async (ep, id) => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;

      const res = await fetch(`${apiBaseUrl}/api/${ep}/${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        closeModal();
        fetchManagedItems(activeForm);
        if (editingId === id) clearForms(); // Reset if they delete what they are currently editing
        showNotice({
          title: 'Record deleted',
          message: 'The dashboard record was permanently removed.',
          tone: 'success'
        });
      } else if (res.status === 401 || res.status === 403) {
        closeModal();
        handleAuthFailure();
      } else {
        const message = await getErrorMessage(res, 'Delete failed.');
        setModal((current) => current ? { ...current, isWorking: false } : current);
        showNotice({ title: 'Delete failed', message, tone: 'danger' });
      }
    } catch (e) {
      console.error(e);
      showNotice({ title: 'Network error', message: 'The dashboard could not reach the backend.', tone: 'danger' });
    }
  };

  const genericSubmit = async (endpoint, payload, fallbackSuccessMsg) => {
    const headers = await getAuthHeaders({ 'Content-Type': 'application/json' });
    if (!headers) return;

    const isEdit = editingId !== null;
    const url = isEdit ? `${apiBaseUrl}/api/${endpoint}/${editingId}` : `${apiBaseUrl}/api/${endpoint}`;
    
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotice({
          title: isEdit ? 'Record updated' : 'Record created',
          message: isEdit ? 'Record successfully updated.' : fallbackSuccessMsg,
          tone: 'success'
        });
        clearForms();
        fetchManagedItems(activeForm);
      } else if (res.status === 401 || res.status === 403) {
        handleAuthFailure();
      } else {
        const message = await getErrorMessage(res, 'Unknown error');
        showNotice({ title: 'Save failed', message, tone: 'danger' });
      }
    } catch (error) {
      console.error(error);
      showNotice({ title: 'Network error', message: 'Is the backend running on port 5002?', tone: 'danger' });
    }
  };

  const handleSubmitThoughtDoc = async (e) => {
    e.preventDefault();
    if (!thoughtFile) {
      showNotice({ title: 'Missing file', message: 'Please select a .docx file first.', tone: 'danger' });
      return;
    }

    const headers = await getAuthHeaders();
    if (!headers) return;

    setIsProcessingAI(true);
    try {
      const formData = new FormData();
      formData.append('document', thoughtFile);

      const res = await fetch(`${apiBaseUrl}/api/thoughts`, { 
        method: 'POST',
        headers,
        body: formData 
      });

      if (res.ok) {
        showNotice({
          title: 'Thought published',
          message: 'Document processed and published successfully.',
          tone: 'success'
        });
        clearForms();
        fetchManagedItems('thought');
      } else if (res.status === 401 || res.status === 403) {
        handleAuthFailure();
      } else {
        const message = await getErrorMessage(res, 'Unknown error');
        showNotice({ title: 'Upload failed', message, tone: 'danger' });
      }
    } catch (error) {
      console.error(error);
      showNotice({ title: 'Network error', message: 'Is the backend running?', tone: 'danger' });
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
      const headers = await getAuthHeaders({ 'Content-Type': 'application/json' });
      if (!headers) throw new Error('Unauthorized');

      const res = await fetch(`${apiBaseUrl}/api/${endpointString}/batch/reorder`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });
      if (res.status === 401 || res.status === 403) {
        handleAuthFailure();
        throw new Error('Unauthorized');
      }
      if (!res.ok) throw new Error('Failed to reorder');
    } catch (err) {
      console.error(err);
      showNotice({ title: 'Reorder failed', message: 'The order could not be saved. Reverting the list.', tone: 'danger' });
      fetchManagedItems(activeForm);
    }
  };

  const handleModalConfirm = async () => {
    if (!modal?.onConfirm || modal.isWorking) return;
    setModal((current) => current ? { ...current, isWorking: true } : current);
    try {
      await modal.onConfirm();
    } catch (error) {
      console.error(error);
      setModal((current) => current ? { ...current, isWorking: false } : current);
      showNotice({ title: 'Action failed', message: 'The dashboard could not complete that action.', tone: 'danger' });
    }
  };

  const renderModal = () => {
    if (!modal) return null;

    const isDanger = modal.tone === 'danger';
    const isSuccess = modal.tone === 'success';

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-gray-950/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="w-full max-w-md rounded-2xl bg-wixWhite dark:bg-wixDarkCard border border-gray-100 dark:border-gray-800 shadow-2xl p-6"
          >
            <div className="flex gap-4">
              <div className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${isDanger ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : isSuccess ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-blue-50 text-wixAccent dark:bg-blue-900/20'}`}>
                {isSuccess ? <FaCheckCircle /> : <FaExclamationTriangle />}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold text-wixText dark:text-wixWhite">{modal.title}</h3>
                <p className="mt-2 text-sm leading-6 text-wixTextSecondary dark:text-wixDarkTextSecondary">{modal.message}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              {modal.type === 'confirm' && (
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={modal.isWorking}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-wixText dark:text-wixWhite text-sm font-bold transition-colors disabled:opacity-60"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={modal.type === 'confirm' ? handleModalConfirm : closeModal}
                disabled={modal.isWorking}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 ${isDanger ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-wixAccent hover:bg-blue-700 text-white'}`}
              >
                {modal.isWorking ? 'Working...' : modal.type === 'confirm' ? modal.confirmLabel : 'OK'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
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
      <>
        {renderModal()}
        <div className="min-h-screen flex items-center justify-center py-20 px-4 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-wixWhite dark:bg-wixDarkCard p-8 rounded-3xl shadow-soft dark:shadow-soft-dark max-w-md w-full border border-gray-100 dark:border-gray-800"
          >
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite">Admin Portal</h2>
              <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-sm mt-2 font-medium">Secure Access Node</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <AnimatePresence>
                {authError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold text-center mb-2">
                    {authError}
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <label className="block text-sm font-medium text-wixText dark:text-wixWhite mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-wixLight dark:bg-gray-800 border-none focus:ring-2 focus:ring-wixAccent text-wixText dark:text-wixWhite outline-none transition-all" placeholder="Your email here" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-wixText dark:text-wixWhite mb-1">Secure Passkey</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 pr-12 py-3 rounded-xl bg-wixLight dark:bg-gray-800 border-none focus:ring-2 focus:ring-wixAccent text-wixText dark:text-wixWhite outline-none transition-all" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-wixTextSecondary hover:text-wixText dark:hover:text-wixWhite transition-colors">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-wixAccent text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-300 mt-4 shadow-sm">Authenticate</button>
            </form>
          </motion.div>
        </div>
      </>
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
      {renderModal()}
      
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
