import { useState } from "react";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";

function App() {
  const [activePage, setActivePage] = useState<"login" | "register" | "home" | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-5">
      {!activePage && (
        <>
          <h1 className="text-black font-bold text-2xl">Second Assignment Login/Register</h1>
          <div className="space-x-4 mb-6">
            <button
              onClick={() => setActivePage("login")}
              className="w-30 py-2 border text-black rounded-lg hover:bg-neutral-200 transition"
            >
              Login
            </button>
            <button
              onClick={() => setActivePage("register")}
              className="w-30 py-2 border text-black rounded-lg hover:bg-neutral-200 transition"
            >
              Register
            </button>
          </div>
        </>
      )}

      <div className="w-full max-w-md fixed">
        {activePage === "login" && (
          <Login
            onBack={() => setActivePage(null)}
            onLoginSuccess={() => setActivePage("home")}
          />
        )}
        {activePage === "register" && <Register onBack={() => setActivePage(null)} />}
        {activePage === "home" && <Home onLogout={() => setActivePage(null)}/>}
      </div>
    </div>
  );
}

export default App;
