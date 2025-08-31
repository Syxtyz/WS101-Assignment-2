import { useEffect, useState } from "react";

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

function Login({ onBack, onLoginSuccess }: LoginProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const loginUser = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <button
        type="button"
        onClick={onBack}
        className="fixed top-4 left-4 text-lg text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-black text-2xl font-bold text-center mb-6">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="text-black w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="text-black w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        onClick={loginUser}
        className="w-full text-black py-2 rounded-lg border hover:bg-neutral-200 transition disabled:opacity-50"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
