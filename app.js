const courses = [
  {title:"JEE Mastery", category:"competitive", tag:"JEE / Engineering", description:"A complete, concept-first program for JEE Main and Advanced.", duration:"12 months", fee:"₹84,000", image:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"},
  {title:"NEET Achievers", category:"competitive", tag:"NEET / Medical", description:"Build the depth and speed you need to make medical dreams real.", duration:"12 months", fee:"₹78,000", image:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"},
  {title:"Future Ready 10", category:"school", tag:"CBSE / ICSE", description:"Stronger fundamentals, better grades, and confidence that lasts.", duration:"10 months", fee:"₹42,000", image:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"},
  {title:"CAT Launchpad", category:"competitive", tag:"CAT / MBA", description:"A focused sprint for the percentile that opens better doors.", duration:"6 months", fee:"₹38,000", image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"},
  {title:"The Speaking Lab", category:"skills", tag:"Communication", description:"Find your voice, sharpen your thinking, and speak with impact.", duration:"8 weeks", fee:"₹12,000", image:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80"},
  {title:"Olympiad Edge", category:"school", tag:"Maths & Science", description:"Stretch your curiosity beyond the textbook with expert problem solving.", duration:"5 months", fee:"₹24,000", image:"https://images.unsplash.com/photo-1596495578068-6e0763fa1178?w=800&q=80"}
];
const faculty = [
  ["Dr. Kavita Rao","Physics · 16 years","https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80","IIT Delhi · PhD Physics"],
  ["Aman Verma","Mathematics · 12 years","https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80","IIT Bombay · M.Sc. Maths"],
  ["Meera Nair","Biology · 14 years","https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80","AIIMS · MBBS"],
  ["Rohan Kapoor","Verbal & CAT · 10 years","https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80","IIM Ahmedabad · MBA"]
];
const roleData = {
  Student: {
    name: "Arjun", fullName: "Arjun Mehta", initials: "AM", batch: "JEE Mastery · Batch A",
    subtitle: "Here’s your learning snapshot for today.", progress: "78", progressNote: "+12% this month",
    nextTitle: "Advanced Mechanics", nextMeta: "with Dr. Kavita Rao · Room 204", nextLabel: "Next live class",
    testTitle: "Physics — Weekly 08", testMeta: "25 questions · 60 minutes", testLabel: "Upcoming test",
    quote: "“Consistency beats intensity.”", quoteMeta: "Keep your daily practice streak alive, Arjun. You’re closer than you think.",
    tabs: ["attendance", "updates", "calendar", "results", "fees", "communication"]
  },
  Parent: {
    name: "Sunny", fullName: "Sunny Mehta", initials: "SM", batch: "Parent account · 1 linked child",
    subtitle: "A clear view of Arjun’s learning journey.", progress: "94", progressNote: "Arjun’s monthly attendance",
    nextTitle: "Parent-teacher meet", nextMeta: "2 Nov · 11:00 AM · Main campus", nextLabel: "Next reminder",
    testTitle: "Physics — Weekly 08", testMeta: "Arjun scored 86/100 · Rank #02", testLabel: "Latest result",
    quote: "“Arjun is building great momentum.”", quoteMeta: "Dr. Kavita Rao sent a new progress note today.",
    tabs: ["updates", "calendar", "results", "fees", "communication"]
  },
  Faculty: {
    name: "Kavita", fullName: "Dr. Kavita Rao", initials: "KR", batch: "Faculty · Physics · 3 assigned batches",
    subtitle: "Your teaching console for today’s classes.", progress: "24", progressNote: "Students in today’s session",
    nextTitle: "Advanced Mechanics", nextMeta: "JEE Mastery / Batch A · Room 204", nextLabel: "Next class",
    testTitle: "Weekly Physics 08", testMeta: "Marks entry closes Friday · 4:00 PM", testLabel: "Assessment task",
    quote: "“Small feedback creates big progress.”", quoteMeta: "Your last update reached 48 students and parents.",
    tabs: ["attendance", "updates", "calendar", "results", "communication"]
  },
  Admin: {
    name: "Sunny", fullName: "Sunny · Summit Admin", initials: "SM", batch: "Institute operations · All campuses",
    subtitle: "Here’s the institute performance snapshot.", progress: "1,248", progressNote: "Active students this term",
    nextTitle: "Revenue this month", nextMeta: "₹18.4L collected · 92% of target", nextLabel: "Finance overview",
    testTitle: "Pending fee accounts", testMeta: "84 students need a reminder", testLabel: "Action required",
    quote: "“Great systems make great teaching possible.”", quoteMeta: "12 admissions and 4 batch changes need your review.",
    tabs: ["attendance", "updates", "calendar", "results", "fees", "communication"]
  }
};
const $ = (selector) => document.querySelector(selector);
function renderCourses(filter = "all") {
  $("#course-grid").innerHTML = courses.filter(c => filter === "all" || c.category === filter).map(c => `
    <article class="course-card">
      <div class="course-art"><img src="${c.image}" alt="${c.title}" loading="lazy"><span class="course-tag">${c.tag}</span></div>
      <div class="course-body"><h3>${c.title}</h3><p>${c.description}</p><div class="course-meta"><span>${c.duration}</span><b>${c.fee}</b></div></div>
    </article>`).join("");
}
function renderFaculty() {
  $("#faculty-grid").innerHTML = faculty.map(f => `<article class="faculty-card"><div class="faculty-photo"><img src="${f[2]}" alt="${f[0]}" loading="lazy"></div><div><h3>${f[0]}</h3><p>${f[1]}</p><small>${f[3]}</small></div></article>`).join("");
}
function applyRole(role) {
  const data = roleData[role] || roleData.Student;
  const portal = $(".portal-page");
  portal.dataset.role = role.toLowerCase();
  $("#portal-role").textContent = role;
  document.querySelector(".portal-top h1").innerHTML = `Good morning, <em>${data.name}.</em>`;
  document.querySelector(".portal-top>div>p:last-child").textContent = data.subtitle;
  document.querySelector(".portal-user>span").textContent = data.initials;
  document.querySelector(".portal-user strong").textContent = data.fullName;
  document.querySelector(".portal-user small").textContent = data.batch;
  const cards = document.querySelectorAll(".portal-card");
  cards[0].querySelector(".portal-card-label").firstChild.textContent = role === "Admin" ? "Active students " : data.progressNote + " ";
  cards[0].querySelector("strong").innerHTML = `${data.progress}${role === "Admin" ? "" : "<span>%</span>"}`;
  cards[0].querySelector("small").textContent = data.progressNote;
  cards[1].querySelector(".portal-card-label").firstChild.textContent = data.nextLabel + " ";
  cards[1].querySelector("h3").textContent = data.nextTitle;
  cards[1].querySelector("p").textContent = data.nextMeta;
  cards[2].querySelector(".portal-card-label").firstChild.textContent = data.testLabel + " ";
  cards[2].querySelector("h3").textContent = data.testTitle;
  cards[2].querySelector("p").textContent = data.testMeta;
  document.querySelector(".notice-panel h2").textContent = data.quote;
  document.querySelector(".notice-panel>p:last-of-type").textContent = data.quoteMeta;
  document.querySelectorAll(".ops-tab").forEach(tab => { tab.hidden = !data.tabs.includes(tab.dataset.ops); });
  const activeTab = document.querySelector(".ops-tab.active");
  if (!activeTab || activeTab.hidden) {
    const firstTab = document.querySelector(`.ops-tab[data-ops="${data.tabs[0]}"]`);
    document.querySelectorAll(".ops-tab").forEach(tab => tab.classList.toggle("active", tab === firstTab));
    document.querySelectorAll(".ops-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.opsPanel === data.tabs[0]));
  }
  const attendanceIntro = document.querySelector(".attendance-head .eyebrow");
  if (attendanceIntro) attendanceIntro.textContent = role === "Admin" ? "Admin overview · All batches" : role === "Faculty" ? "Faculty console · JEE Mastery / Batch A" : "Attendance overview · JEE Mastery / Batch A";
  const canEditAttendance = role === "Faculty" || role === "Admin";
  document.querySelectorAll(".attendance-mode,.save-attendance,#mark-all").forEach(item => { item.hidden = !canEditAttendance; });
  document.querySelector(".qr-wrap").style.display = canEditAttendance ? "block" : "none";
  document.querySelector(".manual-roll").classList.toggle("visible", !canEditAttendance);
}
function navigate(route) {
  document.querySelectorAll(".page-section").forEach(section => section.classList.toggle("active", section.dataset.page === route));
  document.querySelector(".portal-operations").classList.toggle("visible", route === "portal");
  document.querySelectorAll("[data-route]").forEach(link => link.classList.toggle("active", link.dataset.route === route));
  document.querySelector(".main-nav")?.classList.remove("open");
  window.scrollTo({top:0, behavior:"smooth"});
}
document.addEventListener("click", event => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) { event.preventDefault(); const route = routeLink.dataset.route; history.replaceState(null, "", `#${route}`); navigate(route); }
});
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active"); renderCourses(button.dataset.filter);
}));
$("#theme-toggle").addEventListener("click", () => document.body.classList.toggle("dark-mode"));
$("#mobile-menu").addEventListener("click", () => $(".main-nav").classList.toggle("open"));
document.querySelectorAll(".login-trigger").forEach(button => button.addEventListener("click", () => $("#login-modal").classList.add("open")));
$(".modal-close").addEventListener("click", () => $("#login-modal").classList.remove("open"));
$("#login-modal").addEventListener("click", e => { if (e.target.id === "login-modal") e.currentTarget.classList.remove("open"); });
document.querySelectorAll(".role-switcher button").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".role-switcher button").forEach(item => item.classList.remove("active")); button.classList.add("active"); $("#login-status").textContent = ""; }));
$("#enquiry-form").addEventListener("submit", event => { event.preventDefault(); $("#form-status").textContent = "Thanks — your enquiry is in. We’ll call you within one working day."; event.target.reset(); });
$("#login-form").addEventListener("submit", event => {
  event.preventDefault();
  const role = document.querySelector(".role-switcher button.active").textContent;
  const fields = event.target.elements;
  if (fields[0].value.trim().length < 3 || fields[1].value.length < 3) {
    $("#login-status").textContent = "Enter at least 3 characters for your login and password.";
    return;
  }
  applyRole(role);
  $("#login-modal").classList.remove("open");
  history.replaceState(null, "", "#portal");
  navigate("portal");
});
$("#portal-logout").addEventListener("click", () => { history.replaceState(null, "", "#home"); navigate("home"); });
document.querySelectorAll(".ops-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".ops-tab").forEach(item => item.classList.toggle("active", item === tab));
  document.querySelectorAll(".ops-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.opsPanel === tab.dataset.ops));
}));
document.querySelectorAll(".attendance-mode").forEach(mode => mode.addEventListener("click", () => {
  document.querySelectorAll(".attendance-mode").forEach(item => item.classList.toggle("active", item === mode));
  $("#qr-wrap").style.display = mode.dataset.mode === "qr" ? "block" : "none";
  $("#manual-roll").classList.toggle("visible", mode.dataset.mode === "manual");
}));
document.querySelectorAll(".attendance-toggle").forEach(toggle => toggle.addEventListener("click", () => {
  const states = ["present", "late", "absent"];
  const current = states.findIndex(state => toggle.classList.contains(state));
  toggle.classList.remove(...states);
  const next = states[(current + 1) % states.length];
  toggle.classList.add(next);
  toggle.textContent = next[0].toUpperCase() + next.slice(1);
}));
$("#mark-all").addEventListener("click", () => document.querySelectorAll(".attendance-toggle").forEach(toggle => { toggle.className = "attendance-toggle present"; toggle.textContent = "Present"; }));
$("#save-attendance").addEventListener("click", () => { $("#save-status").textContent = "Saved. SMS, email, and in-app parent notifications queued."; });
$("#update-form").addEventListener("submit", event => { event.preventDefault(); $("#update-status").textContent = "Published to students and parents. Daily digest updated."; event.target.reset(); });
let qrSeconds = 30;
setInterval(() => { qrSeconds = qrSeconds <= 1 ? 30 : qrSeconds - 1; const timer = $("#qr-timer"); if (timer) timer.textContent = qrSeconds; if (qrSeconds === 30) $("#qr-code").textContent = `SUMMIT-${Math.random().toString(16).slice(2, 6).toUpperCase()}`; }, 1000);
document.querySelectorAll(".calendar-view").forEach(view => view.addEventListener("click", () => { document.querySelectorAll(".calendar-view").forEach(item => item.classList.toggle("active", item === view)); }));
$("#export-csv").addEventListener("click", () => { const blob = new Blob(["Roll No,Student,Status\n01,Arjun Mehta,Present\n02,Riya Sharma,Late\n03,Dev Patel,Absent"], {type:"text/csv"}); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "summit-attendance.csv"; link.click(); URL.revokeObjectURL(link.href); });
$("#export-pdf").addEventListener("click", () => window.print());
$("#marks-form").addEventListener("submit", event => { event.preventDefault(); $("#marks-status").textContent = "Marks saved. Rank, percentage, and parent progress report recalculated."; });
$("#marks-csv").addEventListener("change", event => { if (event.target.files[0]) $("#marks-status").textContent = `${event.target.files[0].name} ready for bulk upload. 24 rows detected.`; });
$("#download-report").addEventListener("click", () => window.print());
$("#pay-fees").addEventListener("click", () => { $("#fee-status").textContent = "Payment gateway placeholder opened. Connect Razorpay or Stripe in production."; });
document.querySelectorAll(".receipt-download").forEach(button => button.addEventListener("click", () => window.print()));
$("#download-receipt").addEventListener("click", event => { event.preventDefault(); window.print(); });
$("#message-form").addEventListener("submit", event => { event.preventDefault(); $("#message-status").textContent = "Message sent. Delivery and read status will update here."; event.target.reset(); });
const initialRoute = location.hash.replace("#", "") || "home";
renderCourses(); renderFaculty(); applyRole("Student"); navigate(document.querySelector(`[data-page="${initialRoute}"]`) ? initialRoute : "home");
