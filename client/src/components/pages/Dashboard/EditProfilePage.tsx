import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const EditProfilePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token");

  // Fetch user info
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setProfileImage(res.data.profileImage ? `http://localhost:8080${res.data.profileImage}` : null);
      })
      .catch(console.error);
  }, [token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (fileInputRef.current?.files?.[0]) {
        formData.append("profileImage", fileInputRef.current.files[0]);
      }

      const res = await axios.put("http://localhost:8080/api/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated!");
      setProfileImage(res.data.user.profileImage ? `http://localhost:8080${res.data.user.profileImage}` : null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black/50 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>
      <div className="flex flex-col gap-4">
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <div
            className="h-20 w-20 rounded-full bg-white/20 overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={previewImage || profileImage || undefined}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        </div>

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500/50"
        />

        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500/50"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
