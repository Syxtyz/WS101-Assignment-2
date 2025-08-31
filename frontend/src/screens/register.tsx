import {useState} from "react";

interface RegisterProps {
  onBack: () => void;
}

function Register({ onBack }: RegisterProps) {
  const [, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const addUsers = async () => {
    const userData = {
        email,
        password,
    };
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        setUsers((prev) => [...prev, data]);
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
        <button
            type="button"
            onClick={onBack}
            className="fixed top-4 left-4 text-lg text-gray-600 hover:text-black"
        >← Back</button>

        <h2 className="text-black text-2xl font-bold text-center mb-6">Register</h2>

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

        <button
            type="submit"
            onClick={addUsers}
            className="w-full text-black py-2 rounded-lg border hover:bg-neutral-200 transition disabled:opacity-50"
        >Submit
        </button>
    </div>
  );
}

export default Register;
