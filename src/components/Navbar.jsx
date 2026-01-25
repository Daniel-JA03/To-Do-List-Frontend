
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("ide_usr");
    localStorage.removeItem("nom_usr");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center shadow-sm mb-8">
      {/* Centro */}
      <div className="flex-1 text-center">
        <h1
          className="font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/tareas")}
        >
          Mis Tareas
        </h1>
      </div>

      {/* Derecha: avatar + dropdown */}
      <div className="relative" ref={dropdownRef}>
        <img
          src="/undraw_profile.svg"
          alt="Perfil"
          className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm rounded-lg cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}