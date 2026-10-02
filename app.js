/**
 * CampusGrievance 360 - Modern Client-Side Architecture
 * Fully operational for GitHub Pages with 0 backend dependencies
 * Utilizes LocalStorage for persistent state across browser reloads
 */

// ==========================================
// 1. DATA DEFINITIONS & INITIAL SEED DATA
// ==========================================

const STORAGE_KEYS = {
  COMPLAINTS: 'cg360_complaints_v1',
  USERS: 'cg360_users_v1',
  CURRENT_USER: 'cg360_current_user_v1'
};

const CATEGORIES = [
  { id: 'canteen', name: 'Canteen & Mess Hygiene', incharge: 'Mr. Muthu (Canteen Manager)', sla: 24, icon: 'utensils', color: 'amber', desc: 'Food quality, drinking water, cafeteria cleanliness & pricing' },
  { id: 'wifi', name: 'IT Infrastructure & Wi-Fi', incharge: 'Network Admin Anand', sla: 12, icon: 'wifi', color: 'cyan', desc: 'Hostel/campus Wi-Fi drops, LAN ports, portal accessibility' },
  { id: 'classroom', name: 'Classroom & Smart Boards', incharge: 'Academic Maintenance', sla: 24, icon: 'monitor', color: 'blue', desc: 'Projectors, microphones, podiums, seating furniture' },
  { id: 'labs', name: 'Laboratories & Equipments', incharge: 'Lab Superintendent', sla: 48, icon: 'flask-conical', color: 'indigo', desc: 'Hardware kits, oscilloscopes, chemicals, OS licenses' },
  { id: 'electrical', name: 'Electrical & Lighting', incharge: 'Chief Electrician Selvam', sla: 12, icon: 'zap', color: 'yellow', desc: 'Power cuts, classroom fans, streetlights, tube lights' },
  { id: 'sanitation', name: 'Water & Restroom Sanitation', incharge: 'Sanitation Inspector', sla: 12, icon: 'droplets', color: 'sky', desc: 'Restroom hygiene, running water, leaking taps, sanitizers' },
  { id: 'transport', name: 'College Transport & Buses', incharge: 'Transport Manager Rajesh', sla: 24, icon: 'bus', color: 'emerald', desc: 'Bus route delays, AC breakdown, driver discipline, seating' },
  { id: 'library', name: 'Library & Digital Books', incharge: 'Chief Librarian Dr. Meena', sla: 48, icon: 'book-open', color: 'teal', desc: 'Book availability, IEEE digital access, reading room AC' },
  { id: 'safety', name: 'Safety, Discipline & Anti-Ragging', incharge: 'Dean of Student Affairs', sla: 6, icon: 'shield-alert', color: 'rose', desc: 'Strict zero-tolerance committee with 100% confidential reporting' }
];

const INITIAL_USERS = [
  {
    name: 'Hema Nagaraj',
    email: 'hema.ppps@gmail.com',
    role: 'student',
    reg_no: '23CS101',
    password: 'college123'
  },
  {
    name: 'Dr. A. Ramanathan',
    email: 'staff.ppps@gmail.com',
    role: 'admin',
    reg_no: 'FAC-701',
    password: 'staff123'
  }
];

const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-8001',
    title: 'Drinking water dispenser UV filter defective in Main Canteen',
    category: 'Canteen & Mess Hygiene',
    location: 'Main Food Court, Near Counter 2',
    priority: 'High',
    description: 'The cold water dispenser taste seems metallic and the red UV indicator light is continuously blinking for the past 2 days.',
    status: 'Resolved',
    student_name: 'Hema Nagaraj',
    student_email: 'hema.ppps@gmail.com',
    student_reg_no: '23CS101',
    is_anonymous: false,
    created_at: '2026-09-28 09:30 AM',
    incharge: 'Mr. Muthu (Canteen Manager)',
    resolution_notes: 'UV chamber sanitized and brand new carbon filter cartridge installed. Water tested and TDS confirmed at 85 ppm safe.',
    admin_remark: 'Inspected and certified by Campus Sanitation Officer.',
    rating: 5,
    rating_feedback: 'Fixed within 24 hours, drinking water is completely clean now. Thank you!',
    timeline: [
      { status: 'Lodged', time: '2026-09-28 09:30 AM', note: 'Grievance registered with Priority High' },
      { status: 'Under Review', time: '2026-09-28 11:15 AM', note: 'Acknowledged by Canteen Committee' },
      { status: 'In Progress', time: '2026-09-28 02:40 PM', note: 'Assigned to Mr. Muthu (Canteen Manager)' },
      { status: 'Resolved', time: '2026-09-29 08:30 AM', note: 'Filter cartridge replaced & tested' }
    ]
  },
  {
    id: 'CMP-2026-8002',
    title: 'Lab 3 Projector HDMI loose connection and color tinting',
    category: 'Classroom & Smart Boards',
    location: 'Computer Science Block, 3rd Floor, Lab 3',
    priority: 'Medium',
    description: 'During algorithm lectures, the projector loses signal repeatedly or shifts to a magenta tint whenever the cable is touched.',
    status: 'In Progress',
    student_name: 'Karthik Raja',
    student_email: 'karthik.ppps@gmail.com',
    student_reg_no: '23CS045',
    is_anonymous: false,
    created_at: '2026-10-01 11:20 AM',
    incharge: 'Academic Maintenance',
    resolution_notes: '',
    admin_remark: 'Procurement team ordered 15m high-shielded HDMI cable.',
    rating: null,
    rating_feedback: '',
    timeline: [
      { status: 'Lodged', time: '2026-10-01 11:20 AM', note: 'Grievance submitted' },
      { status: 'Under Review', time: '2026-10-01 01:10 PM', note: 'Acknowledged by HOD Office' },
      { status: 'In Progress', time: '2026-10-01 04:30 PM', note: 'New HDMI cable requested from central store' }
    ]
  },
  {
    id: 'CMP-2026-8003',
    title: 'Hostel Block B 2nd Floor Wi-Fi access point not broadcasting SSID',
    category: 'IT Infrastructure & Wi-Fi',
    location: 'Boys Hostel B, Wing 2 Corridor',
    priority: 'Urgent',
    description: 'Since yesterday evening 7 PM, the ceiling access point has no power LED. Students cannot access course portal for online lab submissions.',
    status: 'Under Review',
    student_name: 'Anonymous Student',
    student_email: 'anonymous@campus.internal',
    student_reg_no: 'ANON-xxxx',
    is_anonymous: true,
    created_at: '2026-10-02 08:15 AM',
    incharge: 'Network Admin Anand',
    resolution_notes: '',
    admin_remark: 'PoE Switch port 14 power reboot scheduled.',
    rating: null,
    rating_feedback: '',
    timeline: [
      { status: 'Lodged', time: '2026-10-02 08:15 AM', note: '100% Anonymous grievance registered' },
      { status: 'Under Review', time: '2026-10-02 09:00 AM', note: 'Assigned to IT Network Desk' }
    ]
  },
  {
    id: 'CMP-2026-8004',
    title: 'College Bus Route 14 AC cooling failure during evening return',
    category: 'College Transport & Buses',
    location: 'Bus Route 14 (Tambaram - Campus)',
    priority: 'Medium',
    description: 'The bus AC compressor shuts down after 15 minutes of driving, causing severe suffocation and heat inside the packed bus.',
    status: 'Pending',
    student_name: 'Hema Nagaraj',
    student_email: 'hema.ppps@gmail.com',
    student_reg_no: '23CS101',
    is_anonymous: false,
    created_at: '2026-10-02 10:45 AM',
    incharge: 'Transport Manager Rajesh',
    resolution_notes: '',
    admin_remark: '',
    rating: null,
    rating_feedback: '',
    timeline: [
      { status: 'Lodged', time: '2026-10-02 10:45 AM', note: 'Ticket initialized, awaiting staff allocation' }
    ]
  },
  {
    id: 'CMP-2026-8005',
    title: 'Continuous water tap leakage in Mechanical Block Ground Floor Restroom',
    category: 'Water & Restroom Sanitation',
    location: 'Mechanical Block Ground Floor Restroom 002',
    priority: 'High',
    description: 'Third basin tap valve is broken and continuously leaking fresh water, causing water pooling on the floor and slippery surface.',
    status: 'Resolved',
    student_name: 'Vignesh K',
    student_email: 'vignesh.ppps@gmail.com',
    student_reg_no: '23ME089',
    is_anonymous: false,
    created_at: '2026-09-29 02:10 PM',
    incharge: 'Sanitation Inspector',
    resolution_notes: 'Plumber replaced valve spindle with brass washer. Basin drained and floor anti-skid sanitized.',
    admin_remark: 'Verified during evening campus round.',
    rating: 4,
    rating_feedback: 'Leakage stopped completely.',
    timeline: [
      { status: 'Lodged', time: '2026-09-29 02:10 PM', note: 'Ticket lodged' },
      { status: 'Under Review', time: '2026-09-29 02:30 PM', note: 'Reviewed by Sanitation team' },
      { status: 'In Progress', time: '2026-09-29 03:00 PM', note: 'Plumbing contractor dispatched' },
      { status: 'Resolved', time: '2026-09-29 04:30 PM', note: 'Washer replaced and leakage rectified' }
    ]
  },
  {
    id: 'CMP-2026-8006',
    title: 'Oscilloscope probe missing in Circuit Theory Laboratory Desk 4',
    category: 'Laboratories & Equipments',
    location: 'ECE Department Block, 1st Floor, Lab 102',
    priority: 'Low',
    description: 'BNC to crocodile probe cable is torn at the joint, causing 50Hz hum pickup during analog filter experiments.',
    status: 'In Progress',
    student_name: 'Priya S',
    student_email: 'priya.ppps@gmail.com',
    student_reg_no: '23EC052',
    is_anonymous: false,
    created_at: '2026-10-01 03:30 PM',
    incharge: 'Lab Superintendent',
    resolution_notes: '',
    admin_remark: 'Replacement 100MHz probe allocated from stock cabinet.',
    rating: null,
    rating_feedback: '',
    timeline: [
      { status: 'Lodged', time: '2026-10-01 03:30 PM', note: 'Grievance submitted' },
      { status: 'In Progress', time: '2026-10-02 09:30 AM', note: 'Store requisition approved' }
    ]
  }
];

// ==========================================
// 2. STATE INITIALIZATION & HELPERS
// ==========================================

function getStoredComplaints() {
  const data = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
    return [...INITIAL_COMPLAINTS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...INITIAL_COMPLAINTS];
  }
}

function saveComplaints(complaints) {
  localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
}

function getStoredUsers() {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    return [...INITIAL_USERS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...INITIAL_USERS];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
  updateNavState();
}

// Global active filters
let activeStudentFilter = 'all';
let selectedLoginRole = 'student';
let categoryChartInstance = null;
let statusChartInstance = null;

// ==========================================
// 3. TOAST & NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = 'info') {
  const toast = document.getElementById('globalToast');
  const toastContent = document.getElementById('toastContent');
  const toastMsg = document.getElementById('toastMessage');
  
  if (!toast || !toastContent || !toastMsg) return;

  toastMsg.textContent = message;

  // Style according to type
  toastContent.className = 'p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 border shadow-md';
  if (type === 'success') {
    toastContent.classList.add('bg-emerald-500/20', 'text-emerald-200', 'border-emerald-500/40');
  } else if (type === 'error') {
    toastContent.classList.add('bg-rose-500/20', 'text-rose-200', 'border-rose-500/40');
  } else if (type === 'warning') {
    toastContent.classList.add('bg-amber-500/20', 'text-amber-200', 'border-amber-500/40');
  } else {
    toastContent.classList.add('bg-blue-500/20', 'text-cyan-200', 'border-blue-500/40');
  }

  toast.classList.remove('hidden');
  
  // Re-run icons
  if (window.lucide) lucide.createIcons();

  // Auto hide in 5 seconds
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  const toast = document.getElementById('globalToast');
  if (toast) toast.classList.add('hidden');
}

// ==========================================
// 4. ROUTER & VIEW SWITCHER
// ==========================================

function switchView(viewName, params = {}) {
  // Hide all views
  const views = document.querySelectorAll('.spa-view');
  views.forEach(v => v.classList.add('hidden'));

  // Target view
  const target = document.getElementById(`view-${viewName}`);
  if (!target) {
    console.warn(`View view-${viewName} not found, defaulting to home`);
    document.getElementById('view-home').classList.remove('hidden');
    renderHome();
    return;
  }

  // Auth Guards
  const currentUser = getCurrentUser();

  if (viewName === 'student' || viewName === 'new-complaint') {
    if (!currentUser) {
      showToast('Please log in with your student email to access this page.', 'warning');
      switchView('login');
      return;
    }
    if (currentUser.role !== 'student') {
      showToast('This section is reserved for students. Redirected to Admin Operations Desk.', 'info');
      switchView('admin');
      return;
    }
  }

  if (viewName === 'admin') {
    if (!currentUser) {
      showToast('Please sign in with Staff credentials to view Admin Operations Desk.', 'warning');
      selectLoginRole('admin');
      switchView('login');
      return;
    }
    if (currentUser.role !== 'admin') {
      showToast('Access restricted: Only authorized staff and faculty can access Operations Desk.', 'error');
      switchView('student');
      return;
    }
  }

  // Show target view
  target.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update hash safely
  if (window.location.hash !== `#${viewName}`) {
    history.pushState(null, '', `#${viewName}`);
  }

  // Trigger View Renders
  if (viewName === 'home') {
    renderHome();
  } else if (viewName === 'student') {
    renderStudentDashboard();
  } else if (viewName === 'new-complaint') {
    renderNewComplaintView();
  } else if (viewName === 'admin') {
    renderAdminDashboard();
  } else if (viewName === 'track') {
    if (params.ticketId) {
      const trackInput = document.getElementById('trackInput');
      if (trackInput) trackInput.value = params.ticketId;
      executeTrackSearch(params.ticketId);
    }
  }

  // Refresh lucide icons
  if (window.lucide) lucide.createIcons();
}

function handleLodgeClick() {
  const user = getCurrentUser();
  if (user && user.role === 'student') {
    switchView('new-complaint');
  } else {
    showToast('Please log in to lodge an official grievance.', 'info');
    switchView('login');
  }
}

// ==========================================
// 5. NAVBAR STATE & AUTH CONTROLS
// ==========================================

function updateNavState() {
  const user = getCurrentUser();
  const navStudentLinks = document.getElementById('navStudentLinks');
  const navStaffLinks = document.getElementById('navStaffLinks');
  const navUserLoggedIn = document.getElementById('navUserLoggedIn');
  const navUserLoggedOut = document.getElementById('navUserLoggedOut');
  const navUserName = document.getElementById('navUserName');
  const navUserBadge = document.getElementById('navUserBadge');

  if (user) {
    if (navUserLoggedIn) navUserLoggedIn.classList.remove('hidden');
    if (navUserLoggedOut) navUserLoggedOut.classList.add('hidden');

    if (navUserName) navUserName.textContent = user.name || user.email.split('@')[0];
    if (navUserBadge) {
      navUserBadge.textContent = `${user.role.toUpperCase()} • ${user.email}`;
    }

    if (user.role === 'student') {
      if (navStudentLinks) navStudentLinks.classList.remove('hidden');
      if (navStaffLinks) navStaffLinks.classList.add('hidden');
    } else {
      if (navStudentLinks) navStudentLinks.classList.add('hidden');
      if (navStaffLinks) navStaffLinks.classList.remove('hidden');
    }
  } else {
    if (navUserLoggedIn) navUserLoggedIn.classList.add('hidden');
    if (navUserLoggedOut) navUserLoggedOut.classList.remove('hidden');
    if (navStudentLinks) navStudentLinks.classList.add('hidden');
    if (navStaffLinks) navStaffLinks.classList.add('hidden');
  }

  if (window.lucide) lucide.createIcons();
}

function handleLogout() {
  const user = getCurrentUser();
  setCurrentUser(null);
  showToast(`Signed out successfully. Goodbye ${user?.name || ''}!`, 'info');
  switchView('home');
}

// ==========================================
// 6. LOGIN & REGISTRATION LOGIC
// ==========================================

function setAuthTab(tab) {
  const tabSignIn = document.getElementById('tabSignIn');
  const tabRegister = document.getElementById('tabRegister');
  const authLoginForm = document.getElementById('authLoginForm');
  const authRegisterForm = document.getElementById('authRegisterForm');

  if (tab === 'login') {
    tabSignIn.className = 'flex-1 py-2 rounded-lg font-bold bg-blue-600 text-white shadow-xs transition-all';
    tabRegister.className = 'flex-1 py-2 rounded-lg text-slate-400 font-medium hover:text-white transition-all';
    authLoginForm.classList.remove('hidden');
    authRegisterForm.classList.add('hidden');
  } else {
    tabRegister.className = 'flex-1 py-2 rounded-lg font-bold bg-blue-600 text-white shadow-xs transition-all';
    tabSignIn.className = 'flex-1 py-2 rounded-lg text-slate-400 font-medium hover:text-white transition-all';
    authLoginForm.classList.add('hidden');
    authRegisterForm.classList.remove('hidden');
  }
}

function selectLoginRole(role) {
  selectedLoginRole = role;
  const btnStudent = document.getElementById('btnRoleStudent');
  const btnStaff = document.getElementById('btnRoleStaff');
  const labelEmail = document.getElementById('loginEmailLabel');
  const hintEmail = document.getElementById('loginEmailHint');
  const hintPass = document.getElementById('loginPassHint');
  const submitText = document.getElementById('loginSubmitText');
  const emailInput = document.getElementById('loginEmail');

  if (role === 'student') {
    btnStudent.className = 'py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 bg-blue-600 text-white shadow-md';
    btnStaff.className = 'py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 text-slate-400 hover:text-white';
    if (labelEmail) labelEmail.textContent = 'Student Email ID *';
    if (hintEmail) hintEmail.innerHTML = 'Any student can log in with <strong class="text-cyan-400">yourname.ppps@gmail.com</strong>';
    if (hintPass) hintPass.textContent = 'Default: college123';
    if (submitText) submitText.textContent = 'Sign In as Student';
    if (emailInput && !emailInput.value) emailInput.placeholder = 'e.g. hema.ppps@gmail.com';
  } else {
    btnStaff.className = 'py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 bg-indigo-600 text-white shadow-md';
    btnStudent.className = 'py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 text-slate-400 hover:text-white';
    if (labelEmail) labelEmail.textContent = 'Faculty / Staff Official Email ID *';
    if (hintEmail) hintEmail.innerHTML = 'Any staff can log in with <strong class="text-indigo-400">staffname.ppps@gmail.com</strong>';
    if (hintPass) hintPass.textContent = 'Default: staff123';
    if (submitText) submitText.textContent = 'Sign In as Staff / Faculty';
    if (emailInput && !emailInput.value) emailInput.placeholder = 'e.g. staff.ppps@gmail.com';
  }

  if (window.lucide) lucide.createIcons();
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPassword');

  const email = emailInput.value.trim().toLowerCase();
  const password = passInput.value.trim();

  if (!email || !password) {
    showToast('Please enter both Email and Password.', 'error');
    return;
  }

  const users = getStoredUsers();
  let user = users.find(u => u.email.toLowerCase() === email);

  // UNIVERSAL CAMPUS LOGIN LOGIC (As requested: any student or staff with their email)
  const defaultPass = (selectedLoginRole === 'student') ? 'college123' : 'staff123';

  if (!user) {
    // If not found in localStorage, allow immediate entry if default password provided
    if (password === defaultPass) {
      // Auto-create user
      const rawName = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const regNo = selectedLoginRole === 'student' ? `23CS${Math.floor(100 + Math.random() * 899)}` : `FAC-${Math.floor(100 + Math.random() * 899)}`;

      user = {
        name: formattedName,
        email: email,
        role: selectedLoginRole,
        reg_no: regNo,
        password: password
      };

      users.push(user);
      saveUsers(users);
      showToast(`Welcome ${user.name}! Your account has been initialized.`, 'success');
    } else {
      showToast(`Invalid password for new account. First-time default password is: ${defaultPass}`, 'error');
      return;
    }
  } else {
    // Check role match
    if (user.role !== selectedLoginRole) {
      showToast(`This account is registered as ${user.role}. Please switch role toggle.`, 'warning');
      return;
    }

    // Check password
    if (user.password !== password) {
      showToast('Incorrect password. Please check your credentials.', 'error');
      return;
    }
  }

  // Set user session
  setCurrentUser(user);
  showToast(`Welcome back, ${user.name}! Access granted.`, 'success');

  // Reset inputs
  emailInput.value = '';
  passInput.value = '';

  // Redirect to their respective workspace
  if (user.role === 'student') {
    switchView('student');
  } else {
    switchView('admin');
  }
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const roleInput = document.querySelector('input[name="regRole"]:checked');
  const nameInput = document.getElementById('regName');
  const emailInput = document.getElementById('regEmail');
  const passInput = document.getElementById('regPassword');

  const role = roleInput ? roleInput.value : 'student';
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passInput.value.trim();

  if (!name || !email || !password) {
    showToast('Please fill in all registration fields.', 'error');
    return;
  }

  const users = getStoredUsers();
  if (users.some(u => u.email.toLowerCase() === email)) {
    showToast('An account with this email already exists. Please Sign In.', 'warning');
    setAuthTab('login');
    document.getElementById('loginEmail').value = email;
    return;
  }

  const regNo = role === 'student' ? `23CS${Math.floor(100 + Math.random() * 899)}` : `FAC-${Math.floor(100 + Math.random() * 899)}`;

  const newUser = {
    name,
    email,
    role,
    reg_no: regNo,
    password
  };

  users.push(newUser);
  saveUsers(users);

  setCurrentUser(newUser);
  showToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');

  // Reset
  nameInput.value = '';
  emailInput.value = '';
  passInput.value = '';

  if (role === 'student') {
    switchView('student');
  } else {
    switchView('admin');
  }
}

// ==========================================
// 7. PASSWORD CHANGE (PROTECTION FROM MISUSE)
// ==========================================

function openChangePwdModal() {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please sign in first.', 'warning');
    return;
  }
  const modal = document.getElementById('changePwdModal');
  if (modal) modal.classList.remove('hidden');
}

function closeChangePwdModal() {
  const modal = document.getElementById('changePwdModal');
  if (modal) modal.classList.add('hidden');
  document.getElementById('pwdCurrent').value = '';
  document.getElementById('pwdNew').value = '';
  document.getElementById('pwdConfirm').value = '';
}

function handleChangePasswordSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;

  const currentPwd = document.getElementById('pwdCurrent').value.trim();
  const newPwd = document.getElementById('pwdNew').value.trim();
  const confirmPwd = document.getElementById('pwdConfirm').value.trim();

  if (user.password !== currentPwd) {
    showToast('Current password does not match.', 'error');
    return;
  }

  if (newPwd.length < 4) {
    showToast('New password must be at least 4 characters long.', 'warning');
    return;
  }

  if (newPwd !== confirmPwd) {
    showToast('New password and Confirmation do not match.', 'error');
    return;
  }

  // Update in users storage
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (userIndex !== -1) {
    users[userIndex].password = newPwd;
    saveUsers(users);
  }

  // Update current session
  user.password = newPwd;
  setCurrentUser(user);

  closeChangePwdModal();
  showToast('Password updated successfully! Your account is now secured with your private secret password.', 'success');
}

// ==========================================
// 8. HOME VIEW RENDERING
// ==========================================

function renderHome() {
  const complaints = getStoredComplaints();

  // Metrics
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress' || c.status === 'Under Review').length;

  const statTotal = document.getElementById('statTotalLogged');
  const statRes = document.getElementById('statResolved');
  const statInProg = document.getElementById('statInProgress');

  if (statTotal) statTotal.textContent = total;
  if (statRes) statRes.textContent = resolved;
  if (statInProg) statInProg.textContent = inProgress;

  // Categories Grid
  const grid = document.getElementById('homeCategoriesGrid');
  if (grid) {
    grid.innerHTML = CATEGORIES.map(cat => {
      const catCount = complaints.filter(c => c.category === cat.name).length;
      return `
        <div class="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 group">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
            </div>
            <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              SLA: ${cat.sla}h
            </span>
          </div>
          <h4 class="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">${cat.name}</h4>
          <p class="text-xs text-slate-400 mt-1 line-clamp-2">${cat.desc}</p>
          <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span class="truncate max-w-[180px]">Incharge: <strong class="text-slate-200 font-medium">${cat.incharge.split('(')[0]}</strong></span>
            <span class="font-mono text-cyan-400 font-bold">${catCount} ${catCount === 1 ? 'ticket' : 'tickets'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 9. STUDENT DASHBOARD
// ==========================================

function filterStudentComplaints(status) {
  activeStudentFilter = status;
  // Update button classes
  document.querySelectorAll('.student-flt-btn').forEach(btn => {
    if (btn.getAttribute('data-flt') === status) {
      btn.className = 'student-flt-btn px-3 py-1.5 rounded-lg border bg-blue-600 text-white border-blue-500 font-bold';
    } else {
      btn.className = 'student-flt-btn px-3 py-1.5 rounded-lg border bg-white/5 text-slate-400 border-white/10 hover:text-white';
    }
  });
  renderStudentDashboard();
}

function renderStudentDashboard() {
  const user = getCurrentUser();
  if (!user || user.role !== 'student') return;

  const nameEl = document.getElementById('studentDisplayName');
  const regNoEl = document.getElementById('studentRegNoBadge');
  const emailEl = document.getElementById('studentEmailBadge');

  if (nameEl) nameEl.textContent = user.name;
  if (regNoEl) regNoEl.textContent = user.reg_no || '23CS101';
  if (emailEl) emailEl.textContent = user.email;

  const allComplaints = getStoredComplaints();
  // Filter complaints filed by this student
  const studentComplaints = allComplaints.filter(c => c.student_email.toLowerCase() === user.email.toLowerCase());

  // KPIs
  const total = studentComplaints.length;
  const pending = studentComplaints.filter(c => c.status === 'Pending' || c.status === 'Under Review').length;
  const resolved = studentComplaints.filter(c => c.status === 'Resolved').length;

  const statTotal = document.getElementById('studentStatTotal');
  const statPending = document.getElementById('studentStatPending');
  const statResolved = document.getElementById('studentStatResolved');

  if (statTotal) statTotal.textContent = total;
  if (statPending) statPending.textContent = pending;
  if (statResolved) statResolved.textContent = resolved;

  // Filter list
  let displayed = studentComplaints;
  if (activeStudentFilter !== 'all') {
    displayed = studentComplaints.filter(c => c.status === activeStudentFilter);
  }

  const listEl = document.getElementById('studentComplaintsList');
  if (!listEl) return;

  if (displayed.length === 0) {
    listEl.innerHTML = `
      <div class="p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center mx-auto">
          <i data-lucide="inbox" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-white text-base">No grievances found</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">You have not registered any complaints in this status category.</p>
        <button onclick="switchView('new-complaint')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          <span>Lodge Your First Complaint</span>
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  listEl.innerHTML = displayed.map(c => {
    let statusBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (c.status === 'Resolved') statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (c.status === 'In Progress') statusBadgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    if (c.status === 'Rejected') statusBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';

    return `
      <div class="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-2 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">${c.id}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full border font-mono font-medium ${statusBadgeClass}">${c.status}</span>
            <span class="text-[11px] font-mono text-slate-400">• ${c.category}</span>
            ${c.is_anonymous ? '<span class="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md">Anonymous</span>' : ''}
          </div>

          <h4 class="font-bold text-white text-base leading-snug">${c.title}</h4>
          <p class="text-xs text-slate-400 line-clamp-2">${c.description}</p>

          <div class="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
            <span class="flex items-center gap-1 font-mono">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-400"></i>
              ${c.location}
            </span>
            <span class="flex items-center gap-1 font-mono">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-500"></i>
              ${c.created_at}
            </span>
            ${c.incharge ? `
              <span class="flex items-center gap-1 font-mono text-indigo-300">
                <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
                Incharge: ${c.incharge}
              </span>` : ''}
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 md:self-center">
          <button onclick="switchView('track', { ticketId: '${c.id}' })" class="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/30 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm">
            <i data-lucide="activity" class="w-4 h-4"></i>
            <span>Track Timeline</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 10. FILE NEW COMPLAINT VIEW
// ==========================================

function renderNewComplaintView() {
  const categorySelect = document.getElementById('newCompCategory');
  if (!categorySelect) return;

  categorySelect.innerHTML = CATEGORIES.map(cat => `
    <option value="${cat.name}">${cat.name} (SLA: ${cat.sla}h — Incharge: ${cat.incharge.split('(')[0]})</option>
  `).join('');
}

function handleNewComplaintSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    showToast('Please sign in to lodge a complaint.', 'warning');
    switchView('login');
    return;
  }

  const category = document.getElementById('newCompCategory').value;
  const title = document.getElementById('newCompTitle').value.trim();
  const location = document.getElementById('newCompLocation').value.trim();
  const priority = document.querySelector('input[name="newCompPriority"]:checked')?.value || 'Medium';
  const desc = document.getElementById('newCompDesc').value.trim();
  const isAnonymous = document.getElementById('newCompAnonymous').checked;

  if (!title || !location || !desc) {
    showToast('Please fill in all mandatory fields.', 'error');
    return;
  }

  // Generate unique Ticket ID
  const ticketNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `CMP-2026-${ticketNum}`;

  const now = new Date();
  const timeFormatted = now.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const matchingCat = CATEGORIES.find(c => c.name === category);

  const newComplaint = {
    id: ticketId,
    title: title,
    category: category,
    location: location,
    priority: priority,
    description: desc,
    status: 'Pending',
    student_name: isAnonymous ? 'Anonymous Student' : user.name,
    student_email: isAnonymous ? 'anonymous@campus.internal' : user.email,
    student_reg_no: isAnonymous ? 'ANON-xxxx' : (user.reg_no || '23CS101'),
    is_anonymous: isAnonymous,
    created_at: timeFormatted,
    incharge: matchingCat ? matchingCat.incharge : 'Campus Redressal Cell',
    resolution_notes: '',
    admin_remark: '',
    rating: null,
    rating_feedback: '',
    timeline: [
      {
        status: 'Lodged',
        time: timeFormatted,
        note: `Grievance registered with Priority: ${priority}. Auto-dispatched to ${matchingCat?.name || 'Department'}.`
      }
    ]
  };

  const complaints = getStoredComplaints();
  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  // Clear inputs
  document.getElementById('newCompTitle').value = '';
  document.getElementById('newCompLocation').value = '';
  document.getElementById('newCompDesc').value = '';
  document.getElementById('newCompAnonymous').checked = false;

  showToast(`Complaint registered successfully! Your Ticket ID is ${ticketId}`, 'success');

  // Navigate to tracker
  switchView('track', { ticketId: ticketId });
}

// ==========================================
// 11. TRACKING & LIVE AUDIT STEPPER
// ==========================================

function handleQuickSearch(event) {
  event.preventDefault();
  const input = document.getElementById('quickSearchInput');
  const ticketId = input.value.trim().toUpperCase();
  if (!ticketId) return;
  switchView('track', { ticketId });
}

function handleTrackSearch(event) {
  event.preventDefault();
  const input = document.getElementById('trackInput');
  const ticketId = input.value.trim().toUpperCase();
  if (!ticketId) return;
  executeTrackSearch(ticketId);
}

function executeTrackSearch(ticketId) {
  const container = document.getElementById('trackResultContainer');
  if (!container) return;

  const complaints = getStoredComplaints();
  const complaint = complaints.find(c => c.id.toUpperCase() === ticketId.toUpperCase());

  container.classList.remove('hidden');

  if (!complaint) {
    container.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl text-center space-y-3 border-rose-500/30">
        <div class="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <i data-lucide="alert-triangle" class="w-6 h-6"></i>
        </div>
        <h3 class="text-lg font-bold text-white">Ticket Not Found</h3>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          We couldn't locate any grievance registered with Ticket ID <strong class="text-cyan-400 font-mono">${ticketId}</strong>. Please verify the code or file a new grievance.
        </p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Stepper Calculation
  // 1: Lodged, 2: Under Review, 3: In Progress, 4: Resolved
  const stages = [
    { key: 'Lodged', label: '1. Lodged', sub: 'Ticket Initialized' },
    { key: 'Under Review', label: '2. Under Review', sub: 'Desk Allocation' },
    { key: 'In Progress', label: '3. In Progress', sub: 'Technician Dispatched' },
    { key: 'Resolved', label: '4. Resolved', sub: 'Closed & Audited' }
  ];

  let currentStageIndex = 0;
  if (complaint.status === 'Under Review') currentStageIndex = 1;
  else if (complaint.status === 'In Progress') currentStageIndex = 2;
  else if (complaint.status === 'Resolved') currentStageIndex = 3;

  let priorityColor = 'border-blue-500/30 text-cyan-400 bg-blue-500/10';
  if (complaint.priority === 'High') priorityColor = 'border-amber-500/30 text-amber-400 bg-amber-500/10';
  if (complaint.priority === 'Urgent') priorityColor = 'border-rose-500/30 text-rose-400 bg-rose-500/10';

  container.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8">
      
      <!-- Ticket Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-base sm:text-lg font-mono font-black text-cyan-400">${complaint.id}</span>
            <span class="text-xs font-mono px-2.5 py-0.5 rounded-full border font-bold ${priorityColor}">${complaint.priority} Priority</span>
            ${complaint.is_anonymous ? '<span class="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md">100% Anonymous</span>' : ''}
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white mt-2">${complaint.title}</h2>
          <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
            <span><strong>Category:</strong> ${complaint.category}</span>
            <span>•</span>
            <span><strong>Location:</strong> ${complaint.location}</span>
          </div>
        </div>

        <div class="text-left sm:text-right shrink-0">
          <div class="text-[11px] font-mono text-slate-400">Current Status</div>
          <div class="text-lg font-mono font-black text-emerald-400 capitalize mt-0.5">${complaint.status}</div>
        </div>
      </div>

      <!-- 4-Stage Stepper -->
      <div class="space-y-4">
        <h4 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Lifecycle Tracking Pipeline</h4>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${stages.map((st, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            let cardBg = 'bg-slate-900/60 border-white/10 text-slate-500';
            let circleBg = 'bg-white/10 text-slate-500';

            if (isCompleted) {
              cardBg = 'bg-blue-950/40 border-cyan-500/40 text-slate-200';
              circleBg = 'bg-cyan-500 text-slate-950';
            }
            if (isCurrent && complaint.status !== 'Resolved') {
              cardBg = 'bg-blue-900/50 border-cyan-400 shadow-md shadow-cyan-500/20 text-white';
              circleBg = 'bg-cyan-400 text-slate-950 animate-pulse';
            }
            if (complaint.status === 'Resolved' && idx === 3) {
              cardBg = 'bg-emerald-950/50 border-emerald-500/40 text-white';
              circleBg = 'bg-emerald-400 text-slate-950';
            }

            return `
              <div class="p-3.5 rounded-2xl border ${cardBg} transition-all">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${circleBg}">
                    ${isCompleted ? '✓' : (idx + 1)}
                  </div>
                  <span class="text-xs font-bold leading-tight">${st.label}</span>
                </div>
                <div class="text-[10px] text-slate-400 font-mono">${st.sub}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Incharge & Description Card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Assigned Department Incharge</span>
          <div class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="user-check" class="w-4 h-4 text-cyan-400"></i>
            <span>${complaint.incharge || 'Assigned to Central Campus Maintenance'}</span>
          </div>
          <p class="text-xs text-slate-400">Directly responsible for field inspection, vendor coordination, and closure approval.</p>
        </div>

        <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Lodged By</span>
          <div class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="${complaint.is_anonymous ? 'lock' : 'graduation-cap'}" class="w-4 h-4 text-cyan-400"></i>
            <span>${complaint.student_name} (${complaint.student_reg_no})</span>
          </div>
          <p class="text-xs text-slate-400">Lodged on: ${complaint.created_at}</p>
        </div>
      </div>

      <!-- Detailed Description -->
      <div class="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Original Grievance Report</span>
        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${complaint.description}</p>
      </div>

      <!-- Resolution Summary (If available) -->
      ${complaint.resolution_notes ? `
        <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
          <div class="flex items-center gap-2 text-emerald-400">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
            <h4 class="font-bold text-sm">Official Resolution Report & Audit Proof</h4>
          </div>
          <p class="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">${complaint.resolution_notes}</p>
          ${complaint.admin_remark ? `
            <div class="text-[11px] text-emerald-300/80 font-mono pt-1">
              <strong>Admin Remark:</strong> ${complaint.admin_remark}
            </div>` : ''}
        </div>
      ` : ''}

      <!-- Rating Widget (If resolved) -->
      ${complaint.status === 'Resolved' ? `
        <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-amber-300 text-sm">Student Redressal Satisfaction</h4>
              <p class="text-xs text-amber-200/80">Rate the speed and quality of this resolution.</p>
            </div>
            ${complaint.rating ? `
              <div class="flex items-center gap-1 text-amber-400 font-bold text-sm font-mono">
                <span>★ ${complaint.rating}/5</span>
              </div>
            ` : ''}
          </div>

          ${!complaint.rating ? `
            <div class="flex items-center gap-2 pt-2">
              <span class="text-xs font-mono text-slate-300 mr-2">Click to rate:</span>
              ${[1, 2, 3, 4, 5].map(star => `
                <button type="button" onclick="submitRating('${complaint.id}', ${star})" 
                        class="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 text-amber-400 hover:scale-110 transition-transform">
                  ★ ${star}
                </button>
              `).join('')}
            </div>
          ` : `
            <div class="text-xs text-emerald-300 font-mono">
              ✓ Thank you! You rated this resolution ${complaint.rating} out of 5 stars.
            </div>
          `}
        </div>
      ` : ''}

      <!-- Audit Timeline History -->
      <div class="space-y-4 pt-4 border-t border-white/10">
        <h4 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Detailed Audit Trail & Timestamp Log</h4>
        
        <div class="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
          ${complaint.timeline.map((entry, i) => `
            <div class="relative flex items-start gap-4 pl-8">
              <div class="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900"></div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-white">${entry.status}</span>
                  <span class="text-[10px] font-mono text-slate-500">${entry.time}</span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">${entry.note}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function submitRating(ticketId, stars) {
  const complaints = getStoredComplaints();
  const index = complaints.findIndex(c => c.id === ticketId);
  if (index === -1) return;

  complaints[index].rating = stars;
  complaints[index].timeline.push({
    status: 'Audited & Rated',
    time: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    note: `Student submitted satisfaction rating: ${stars} out of 5 stars.`
  });

  saveComplaints(complaints);
  showToast(`Thank you! Your ${stars}-star rating has been registered.`, 'success');
  executeTrackSearch(ticketId);
}

// ==========================================
// 12. ADMIN OPERATIONS DESK & ANALYTICS
// ==========================================

function renderAdminDashboard() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') return;

  const complaints = getStoredComplaints();

  // KPIs
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress' || c.status === 'Under Review').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const urgent = complaints.filter(c => c.priority === 'Urgent').length;

  const elTotal = document.getElementById('adminKpiTotal');
  const elPending = document.getElementById('adminKpiPending');
  const elInProg = document.getElementById('adminKpiInProgress');
  const elResolved = document.getElementById('adminKpiResolved');
  const elUrgent = document.getElementById('adminKpiUrgent');

  if (elTotal) elTotal.textContent = total;
  if (elPending) elPending.textContent = pending;
  if (elInProg) elInProg.textContent = inProgress;
  if (elResolved) elResolved.textContent = resolved;
  if (elUrgent) elUrgent.textContent = urgent;

  // Populate Filter Categories
  const catFilter = document.getElementById('adminCatFilter');
  if (catFilter && catFilter.children.length <= 1) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.name;
      opt.textContent = cat.name;
      catFilter.appendChild(opt);
    });
  }

  // Render Charts
  renderAdminCharts(complaints);

  // Render Table
  renderAdminTable();
}

function renderAdminCharts(complaints) {
  // 1. Category Distribution
  const catCanvas = document.getElementById('adminCategoryChart');
  if (catCanvas) {
    const catLabels = CATEGORIES.map(c => c.name.split(' ')[0]);
    const catCounts = CATEGORIES.map(cat => complaints.filter(c => c.category === cat.name).length);

    if (categoryChartInstance) categoryChartInstance.destroy();

    categoryChartInstance = new Chart(catCanvas, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catCounts,
          backgroundColor: [
            '#f59e0b', '#06b6d4', '#3b82f6', '#6366f1',
            '#eab308', '#0284c7', '#10b981', '#14b8a6', '#f43f5e'
          ],
          borderWidth: 2,
          borderColor: '#0b1120'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', font: { size: 10 } }
          }
        }
      }
    });
  }

  // 2. Status Breakdown
  const statusCanvas = document.getElementById('adminStatusChart');
  if (statusCanvas) {
    const statuses = ['Pending', 'Under Review', 'In Progress', 'Resolved'];
    const statusCounts = statuses.map(s => complaints.filter(c => c.status === s).length);

    if (statusChartInstance) statusChartInstance.destroy();

    statusChartInstance = new Chart(statusCanvas, {
      type: 'bar',
      data: {
        labels: statuses,
        datasets: [{
          label: 'Total Tickets',
          data: statusCounts,
          backgroundColor: ['#f59e0b', '#38bdf8', '#818cf8', '#10b981'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
          y: { ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: '#1e293b' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

function renderAdminTable() {
  const complaints = getStoredComplaints();
  const search = (document.getElementById('adminSearchInput')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('adminCatFilter')?.value || 'all';
  const status = document.getElementById('adminStatusFilter')?.value || 'all';

  let filtered = complaints.filter(c => {
    const matchesSearch = !search || 
      c.id.toLowerCase().includes(search) || 
      c.title.toLowerCase().includes(search) || 
      c.location.toLowerCase().includes(search) ||
      c.student_name.toLowerCase().includes(search);

    const matchesCat = cat === 'all' || c.category === cat;
    const matchesStatus = status === 'all' || c.status === status;

    return matchesSearch && matchesCat && matchesStatus;
  });

  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-500 font-mono text-xs">
          No matching grievances found matching the current search filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    let priorityBadge = 'bg-blue-500/10 text-cyan-400 border-blue-500/30';
    if (c.priority === 'High') priorityBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (c.priority === 'Urgent') priorityBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/30';

    let statusBadge = 'bg-amber-500/20 text-amber-300';
    if (c.status === 'Resolved') statusBadge = 'bg-emerald-500/20 text-emerald-300';
    if (c.status === 'In Progress') statusBadge = 'bg-cyan-500/20 text-cyan-300';

    return `
      <tr class="hover:bg-white/[0.02] transition-colors">
        <td class="py-3 px-4 font-mono font-bold text-cyan-400 text-xs">${c.id}</td>
        
        <td class="py-3 px-4 max-w-xs">
          <div class="font-bold text-white text-xs truncate">${c.title}</div>
          <div class="text-[11px] text-slate-400 truncate">${c.category} • <span class="text-slate-300">${c.location}</span></div>
        </td>

        <td class="py-3 px-4 font-mono text-xs">
          <div class="text-white">${c.student_name}</div>
          <div class="text-slate-400 text-[10px]">${c.student_reg_no}</div>
        </td>

        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono border font-bold ${priorityBadge}">${c.priority}</span>
        </td>

        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${statusBadge}">${c.status}</span>
        </td>

        <td class="py-3 px-4 text-xs text-slate-300 font-mono">
          ${c.incharge ? c.incharge.split('(')[0] : '<span class="text-slate-500">Unassigned</span>'}
        </td>

        <td class="py-3 px-4 text-right">
          <button onclick="openAdminModal('${c.id}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono transition-colors shadow-xs">
            Action / Update
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function resetAdminFilters() {
  const searchInput = document.getElementById('adminSearchInput');
  const catFilter = document.getElementById('adminCatFilter');
  const statusFilter = document.getElementById('adminStatusFilter');

  if (searchInput) searchInput.value = '';
  if (catFilter) catFilter.value = 'all';
  if (statusFilter) statusFilter.value = 'all';

  renderAdminTable();
}

// ==========================================
// 13. ADMIN ACTION MODAL
// ==========================================

function openAdminModal(ticketId) {
  const complaints = getStoredComplaints();
  const c = complaints.find(item => item.id === ticketId);
  if (!c) return;

  const modal = document.getElementById('adminActionModal');
  const modalCompId = document.getElementById('modalCompId');
  const modalTicketId = document.getElementById('modalTicketId');
  const modalTicketTitle = document.getElementById('modalTicketTitle');
  const modalMetaInfo = document.getElementById('modalMetaInfo');
  const modalDescText = document.getElementById('modalDescText');
  const modalStatusSelect = document.getElementById('modalStatusSelect');
  const modalInchargeInput = document.getElementById('modalInchargeInput');
  const modalResolutionNotes = document.getElementById('modalResolutionNotes');
  const modalAdminRemark = document.getElementById('modalAdminRemark');

  if (modalCompId) modalCompId.value = c.id;
  if (modalTicketId) modalTicketId.textContent = `${c.id} • ${c.priority} Priority`;
  if (modalTicketTitle) modalTicketTitle.textContent = c.title;
  if (modalMetaInfo) modalMetaInfo.textContent = `${c.category} • Location: ${c.location} • Lodged: ${c.created_at}`;
  if (modalDescText) modalDescText.textContent = c.description;

  if (modalStatusSelect) modalStatusSelect.value = c.status;
  if (modalInchargeInput) modalInchargeInput.value = c.incharge || '';
  if (modalResolutionNotes) modalResolutionNotes.value = c.resolution_notes || '';
  if (modalAdminRemark) modalAdminRemark.value = c.admin_remark || '';

  if (modal) modal.classList.remove('hidden');
}

function closeAdminModal() {
  const modal = document.getElementById('adminActionModal');
  if (modal) modal.classList.add('hidden');
}

function handleAdminActionSubmit(event) {
  event.preventDefault();
  const ticketId = document.getElementById('modalCompId').value;
  const newStatus = document.getElementById('modalStatusSelect').value;
  const incharge = document.getElementById('modalInchargeInput').value.trim();
  const resolutionNotes = document.getElementById('modalResolutionNotes').value.trim();
  const adminRemark = document.getElementById('modalAdminRemark').value.trim();

  const complaints = getStoredComplaints();
  const index = complaints.findIndex(c => c.id === ticketId);
  if (index === -1) return;

  const now = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const prevStatus = complaints[index].status;
  complaints[index].status = newStatus;
  complaints[index].incharge = incharge;
  complaints[index].resolution_notes = resolutionNotes;
  complaints[index].admin_remark = adminRemark;

  // Add timeline note
  let timelineNote = `Status updated to ${newStatus}.`;
  if (incharge) timelineNote += ` Assigned to: ${incharge}.`;
  if (resolutionNotes) timelineNote += ` Resolution summary logged.`;

  complaints[index].timeline.push({
    status: newStatus,
    time: now,
    note: timelineNote
  });

  saveComplaints(complaints);
  closeAdminModal();
  showToast(`Ticket ${ticketId} updated successfully to ${newStatus}!`, 'success');

  renderAdminDashboard();
}

// ==========================================
// 14. INITIAL BOOTSTRAP
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
  // Ensure default seed data exists in local storage
  getStoredComplaints();
  getStoredUsers();

  // Initialize Navbar state
  updateNavState();

  // Parse initial route from URL hash
  const hash = window.location.hash.replace('#', '') || 'home';
  switchView(hash);

  // Initialize icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Listen to browser forward/back buttons
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  switchView(hash);
});
