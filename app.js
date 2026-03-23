// =====================================
// Supabase configuration
// =====================================
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================
// App state
// =====================================
let currentUser = null;

// =====================================
// Login with magic link
// =====================================
async function login() {
    const email = document.getElementById("login-email").value;

    const { error } = await supabaseClient.auth.signInWithOtp({ email });

    if (error) {
        alert("Login error: " + error.message);
    } else {
        alert("Magic link sent! Check your email.");
    }
}

// =====================================
// Logout
// =====================================
async function logout() {
    await supabaseClient.auth.signOut();
}

// =====================================
// Auth state listener
// =====================================
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        currentUser = session.user;
        console.log("Logged in:", currentUser.email);

        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
        document.getElementById("user-email").innerText = currentUser.email;
    } else {
        currentUser = null;

        document.getElementById("login-section").style.display = "block";
        document.getElementById("app-section").style.display = "none";
    }
});
