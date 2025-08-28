import { useState, useEffect } from "react";

export default function EditProfile() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");
    const savedAvatar = localStorage.getItem("profileImage");
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    if (avatar) localStorage.setItem("profileImage", avatar);
    if (password) localStorage.setItem("password", password);
    alert("Profile updated!");
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-10">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={avatar || "https://via.placeholder.com/100"}
              alt="avatar"
              className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            />
            <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl">
              Change
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              placeholder="New password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
