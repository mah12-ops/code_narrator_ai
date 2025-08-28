import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSave, FiUser } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
}

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Make sure token is stored on login

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setProfileImage(res.data.profileImage || null);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user profile");
      }
    };
    fetchUser();
  }, [token]);

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
         const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert(res.data.message);
      navigate("/dashboard"); // Redirect to dashboard after saving
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-2xl shadow border border-white/10 mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FiUser /> Edit Profile
      </h2>

      <div className="flex flex-col gap-4">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-white/20 grid place-items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-white/70 text-lg">?</span>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-white/80">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-white/80">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          <FiSave /> {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
