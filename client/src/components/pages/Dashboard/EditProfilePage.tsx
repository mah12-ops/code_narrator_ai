import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSave, FiUpload } from "react-icons/fi";
import { useApp } from "./context/AppContext";

const EditProfilePage: React.FC = () => {
  const { user, fetchUser, axiosConfig, settings } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreview(user.profileImage || null);
    }
  }, [user]);

  // Handle file upload & local preview
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  // Generate correct preview URL for deployed app
const getPreviewUrl = (p?: string | null) => {
  if (!p) return "";
  if (p.startsWith("blob:")) return p;
  // Replace localhost with deployed backend URL
  if (p.startsWith("http://localhost:8080")) {
    return p.replace(
      "http://localhost:8080",
      settings.apiBaseUrl.replace(/\/$/, "")
    );
  }
  if (p.startsWith("http")) return p;
  return `${settings.apiBaseUrl}/${p.replace(/^\/?/, "")}`;
};


  // Save profile
  const handleSave = async () => {
    if (!name || !email) return alert("Name and email are required");

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      if (file) form.append("profileImage", file);

      await axios.put("/api/auth/me", form, {
        ...axiosConfig,
        headers: {
          ...(axiosConfig.headers || {}),
          Accept: "application/json",
        },
      });

      await fetchUser();
      alert("✅ Profile updated successfully");
      navigate("/dashboard/settings");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-white p-6">Loading profile...</div>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="col-span-1 bg-[#0b0b0d]/70 border border-white/10 rounded-2xl p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-36 w-36 rounded-full overflow-hidden bg-white/5 grid place-items-center">
              {preview ? (
                <img
                  src={getPreviewUrl(preview)}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-white/60 text-2xl">
                  {(name && name[0]) || "?"}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
              >
                <FiUpload /> Upload
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(user.profileImage ?? null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
              >
                Reset
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="col-span-2 bg-[#0b0b0d]/70 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <label className="text-sm text-white/80">Full name</label>
          <input
            className="rounded-lg px-4 py-2 bg-black/40 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="text-sm text-white/80">Email</label>
          <input
            className="rounded-lg px-4 py-2 bg-black/40 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              disabled={loading}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold disabled:opacity-60"
            >
              <FiSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
