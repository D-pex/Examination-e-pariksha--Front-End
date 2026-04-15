import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services";
   


export const Register = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<any>({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    await api.register(form);
    navigate("/");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input placeholder="Name" className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email" className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password" className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleRegister} className="w-full bg-green-500 text-white p-2 rounded">
        Register
      </button>
    </div>
  );
};