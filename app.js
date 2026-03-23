// =====================================
// Supabase configuration
// =====================================
const SUPABASE_URL = "https://uvgqbqpgymfgaelkqvsk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_a9FeejpGJD5oUHfc-JdKRQ_SCxrWVIZ";

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

    const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: "https://twoj-login.github.io/twoj-repo/"
        }
    });

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
