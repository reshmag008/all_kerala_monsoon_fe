import React, { useState, ChangeEvent, FormEvent } from "react";
import { Upload, Image as ImageIcon, Save,ArrowLeft } from "lucide-react";
import TeamService from "@/service/TeamService";
import PlayerService from "@/service/PlayerService";
import { Link } from 'react-router-dom';


const TeamRegistration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const [preview, setPreview] = useState("");

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
     setSelectedImage(e.target.files[0]);
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [formData, setFormData] = useState({
    team_name: "",
    team_logo: "",
  });

  const [errors, setErrors] = useState({
    team_name: "",
    // team_logo: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    console.log("name== ", name);
    console.log("value== ", value);
    setFormData({ ...formData, [name]: value });
  };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

  const validateForm = (): boolean => {
    let valid = true;
    const { team_name, team_logo } = formData;
    const newErrors = {
      team_name: "",
      // team_logo: "",
    };

    if (!team_name.trim()) {
      newErrors.team_name = "Team name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      formData.team_logo = formData.team_name.replace(/[^A-Z0-9]/ig, "_") + '.jpeg'
      // Perform form submission here
      TeamService()
        .addTeam(formData)
        .then((response: any) => {
          console.log("response== ", response.data);
          // getPresignedUrl();
          teamImageUpload(response.data.id)
        });
    }
  };

  const teamImageUpload = async (teamId:any) => {
    const formFileData = new FormData()
    if(selectedImage){
      formFileData.append('file_name', formData.team_name.replace(/[^A-Z0-9]/ig, "_") + '.jpeg',)
      formFileData.append('team_id', teamId)
      formFileData.append('file', selectedImage)
    }
     await PlayerService().PlayerImageGoogleStorageCloudUpload(formFileData);
     resetData();
     setIsLoading(false);
   
  }


  const resetData = () => {
    setPreview("");
    setLogo(null);
    setFormData({
      team_name: "",
      team_logo: "",
    });
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="gradient-hero p-6 text-center">
            <Link
            to="/teams"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Team Registration
          </h1>
          <p className="text-white/80 mt-2">
            Register your team for the tournament
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8"
        >
          {/* Team Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Team Name
            </label>

            <input
              type="text"
              id="team_name"
              name="team_name"
              placeholder="Enter Team Name"
              value={formData.team_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Team Logo
            </label>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Preview */}
              <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Team Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={60}
                    className="text-gray-400"
                  />
                )}
              </div>

              {/* Upload */}
              <div className="flex-1 w-full">
                <label className="gradient-hero text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition">
                  <Upload size={20} />
                  Upload Team Logo

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>

                <p className="text-sm text-gray-500 mt-3">
                  PNG, JPG or JPEG
                </p>

                {logo && (
                  <p className="mt-2 text-green-600 text-sm font-medium">
                    {logo.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
  type="submit"
  disabled={isLoading}
  className={`flex-1 gradient-hero text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
    isLoading
      ? "opacity-70 cursor-not-allowed"
      : "hover:opacity-90"
  }`}
>
  {isLoading ? (
    <>
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span>Registering...</span>
    </>
  ) : (
    <>
      <Save size={20} />
      <span>Register Team</span>
    </>
  )}
</button>

            <button
              type="reset"
              onClick={() => {
                resetData();
              }}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamRegistration;