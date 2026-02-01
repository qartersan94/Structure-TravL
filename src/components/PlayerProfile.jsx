import React, { useState, useRef } from 'react';
import {
  User, Camera, Gamepad2, Shield, ArrowLeft,
  ChevronRight, Check, X, Upload, Twitch,
  Award, AlertCircle
} from 'lucide-react';

// ─── LEAGUE RANKS ───────────────────────────────────────────
const RANKS = [
  { value: '', label: 'Sélectionnez votre rang', color: '#888' },
  { value: 'Iron IV',       label: 'Iron IV',       color: '#8B7355', tier: 'iron' },
  { value: 'Iron III',      label: 'Iron III',      color: '#8B7355', tier: 'iron' },
  { value: 'Iron II',       label: 'Iron II',       color: '#8B7355', tier: 'iron' },
  { value: 'Iron I',        label: 'Iron I',        color: '#8B7355', tier: 'iron' },
  { value: 'Bronze IV',     label: 'Bronze IV',     color: '#CD7F32', tier: 'bronze' },
  { value: 'Bronze III',    label: 'Bronze III',    color: '#CD7F32', tier: 'bronze' },
  { value: 'Bronze II',     label: 'Bronze II',     color: '#CD7F32', tier: 'bronze' },
  { value: 'Bronze I',      label: 'Bronze I',      color: '#CD7F32', tier: 'bronze' },
  { value: 'Silver IV',     label: 'Silver IV',     color: '#C0C0C0', tier: 'silver' },
  { value: 'Silver III',    label: 'Silver III',    color: '#C0C0C0', tier: 'silver' },
  { value: 'Silver II',     label: 'Silver II',     color: '#C0C0C0', tier: 'silver' },
  { value: 'Silver I',      label: 'Silver I',      color: '#C0C0C0', tier: 'silver' },
  { value: 'Gold IV',       label: 'Gold IV',       color: '#FFD700', tier: 'gold' },
  { value: 'Gold III',      label: 'Gold III',      color: '#FFD700', tier: 'gold' },
  { value: 'Gold II',       label: 'Gold II',       color: '#FFD700', tier: 'gold' },
  { value: 'Gold I',        label: 'Gold I',        color: '#FFD700', tier: 'gold' },
  { value: 'Platinum IV',   label: 'Platinum IV',   color: '#00CED1', tier: 'plat' },
  { value: 'Platinum III',  label: 'Platinum III',  color: '#00CED1', tier: 'plat' },
  { value: 'Platinum II',   label: 'Platinum II',   color: '#00CED1', tier: 'plat' },
  { value: 'Platinum I',    label: 'Platinum I',    color: '#00CED1', tier: 'plat' },
  { value: 'Emerald IV',    label: 'Emerald IV',    color: '#50C878', tier: 'emerald' },
  { value: 'Emerald III',   label: 'Emerald III',   color: '#50C878', tier: 'emerald' },
  { value: 'Emerald II',    label: 'Emerald II',    color: '#50C878', tier: 'emerald' },
  { value: 'Emerald I',     label: 'Emerald I',     color: '#50C878', tier: 'emerald' },
  { value: 'Diamond IV',    label: 'Diamond IV',    color: '#B9F2FF', tier: 'diamond' },
  { value: 'Diamond III',   label: 'Diamond III',   color: '#B9F2FF', tier: 'diamond' },
  { value: 'Diamond II',    label: 'Diamond II',    color: '#B9F2FF', tier: 'diamond' },
  { value: 'Diamond I',     label: 'Diamond I',     color: '#B9F2FF', tier: 'diamond' },
  { value: 'Master',        label: 'Master',        color: '#FF8C00', tier: 'master' },
  { value: 'Grandmaster',   label: 'Grandmaster',   color: '#FF4500', tier: 'gm' },
  { value: 'Challenger',    label: 'Challenger',    color: '#00BFFF', tier: 'chall' },
];

export default function PlayerProfile({ onBack }) {
  const fileRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    pseudo: '',
    age: '',
    rank: '',
    riotId: '',
    twitch: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);

  // ─── PHOTO UPLOAD ───────────────────────────────────────
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Fichier image requis (jpg, png, gif)' }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'Image max 2 Mo' }));
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
    setErrors(prev => { const n = { ...prev }; delete n.photo; return n; });
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  // ─── INPUT CHANGE ───────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  // ─── VALIDATION ─────────────────────────────────────────
  const validate = () => {
    const errs = {};

    if (!formData.pseudo.trim()) {
      errs.pseudo = 'Le pseudo est obligatoire';
    } else if (formData.pseudo.trim().length < 2) {
      errs.pseudo = 'Minimum 2 caractères';
    } else if (formData.pseudo.trim().length > 24) {
      errs.pseudo = 'Maximum 24 caractères';
    }

    if (!formData.age) {
      errs.age = "L'âge est obligatoire";
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 13 || ageNum > 99) {
        errs.age = 'Âge entre 13 et 99';
      }
    }

    if (!formData.rank) {
      errs.rank = 'Sélectionnez votre rang';
    }

    if (!formData.riotId.trim()) {
      errs.riotId = 'Le Riot ID est obligatoire';
    } else {
      const riotPattern = /^.{3,16}#[A-Z0-9]{3,5}$/;
      if (!riotPattern.test(formData.riotId.trim())) {
        errs.riotId = 'Format invalide — ex: Pseudo#TAG';
      }
    }

    // Twitch est optionnel mais si rempli, on vérifie le format
    if (formData.twitch.trim()) {
      const twitchClean = formData.twitch.trim()
        .replace(/https?:\/\/(www\.)?twitch\.tv\/?/i, '');
      if (twitchClean.length < 4 || twitchClean.length > 25) {
        errs.twitch = 'Pseudo Twitch entre 4 et 25 caractères';
      }
    }

    return errs;
  };

  // ─── SUBMIT ─────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Normalize twitch
    const twitchClean = formData.twitch.trim()
      .replace(/https?:\/\/(www\.)?twitch\.tv\/?/i, '');

    const profile = {
      ...formData,
      pseudo: formData.pseudo.trim(),
      riotId: formData.riotId.trim(),
      twitch: twitchClean || null,
      photo: photoPreview || null,
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      }),
    };

    setSavedProfile(profile);
    setSubmitted(true);
  };

  // ─── RESET (new profile) ────────────────────────────────
  const handleReset = () => {
    setFormData({ pseudo: '', age: '', rank: '', riotId: '', twitch: '' });
    setPhoto(null);
    setPhotoPreview(null);
    setErrors({});
    setSubmitted(false);
    setSavedProfile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  // ─── GET RANK COLOR ─────────────────────────────────────
  const getRankColor = (rankValue) => {
    const found = RANKS.find(r => r.value === rankValue);
    return found ? found.color : '#888';
  };

  // ═══════════════════════════════════════════════════════
  // RENDER — PROFILE SAVED (success card)
  // ═══════════════════════════════════════════════════════
  if (submitted && savedProfile) {
    const rankColor = getRankColor(savedProfile.rank);

    return (
      <div className="min-h-screen flex items-start justify-center px-4 py-20">
        <div className="w-full max-w-2xl">

          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm font-bold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </button>

          {/* Success Card */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-red-900 border-opacity-40 rounded-3xl overflow-hidden"
            style={{ animation: 'fadeInScale 0.5s ease-out forwards' }}>

            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

            <div className="p-8 md:p-10">

              {/* Success banner */}
              <div className="flex items-center gap-3 bg-green-900 bg-opacity-20 border border-green-800 border-opacity-40 rounded-xl px-5 py-3 mb-8">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-green-400 font-bold text-sm">Profil créé avec succès !</p>
                  <p className="text-gray-500 text-xs">Bienvenue dans la communauté Structure TravL</p>
                </div>
              </div>

              {/* Profile display */}
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${rankColor}, rgba(220,20,60,0.6))`,
                        padding: '3px'
                      }}>
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        {savedProfile.photo ? (
                          <img src={savedProfile.photo} alt={savedProfile.pseudo} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-16 h-16 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl md:text-4xl font-bebas text-white tracking-wide mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", textShadow: '0 0 20px rgba(220,20,60,0.4)' }}>
                    {savedProfile.pseudo}
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">Membre depuis {savedProfile.createdAt}</p>

                  {/* Rank badge */}
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border"
                    style={{
                      borderColor: `${rankColor}55`,
                      background: `${rankColor}12`
                    }}>
                    <Award className="w-4 h-4" style={{ color: rankColor }} />
                    <span className="font-bold text-sm" style={{ color: rankColor }}>{savedProfile.rank}</span>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Âge</p>
                      <p className="text-lg font-bold text-white">{savedProfile.age} ans</p>
                    </div>
                    <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Riot ID</p>
                      <p className="text-sm font-bold text-red-400 break-all">{savedProfile.riotId}</p>
                    </div>
                    {savedProfile.twitch && (
                      <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Twitch</p>
                        <p className="text-sm font-bold text-purple-400 flex items-center gap-1">
                          <Twitch className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="break-all">{savedProfile.twitch}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 bg-opacity-15 border border-red-600 border-opacity-40 hover:bg-opacity-30 text-red-400 font-bold rounded-xl transition-all duration-300 text-sm"
                >
                  <User className="w-4 h-4" />
                  Créer un autre profil
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 text-sm"
                >
                  Retour au site
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // RENDER — CREATION FORM
  // ═══════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-20">
      <div className="w-full max-w-2xl">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm font-bold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </button>

        {/* Card */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-red-900 border-opacity-30 rounded-3xl overflow-hidden relative"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>

          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

          {/* Ambient glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-900 rounded-full blur-[80px] opacity-8 pointer-events-none"></div>

          <div className="relative z-10 p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 bg-opacity-10 border-2 border-red-600 border-opacity-30 rounded-2xl mb-4">
                <User className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", textShadow: '0 0 30px rgba(220,20,60,0.5)' }}>
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  CRÉER TON PROFIL
                </span>
              </h1>
              <p className="text-gray-500 text-sm">Complète tes informations pour rejoindre la structure</p>
            </div>

            {/* ─── PHOTO UPLOAD ─── */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-28 h-28 rounded-full border-2 border-dashed border-red-900 border-opacity-40 hover:border-red-600 hover:border-opacity-60 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden"
                >
                  {photoPreview ? (
                    <>
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Upload className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                      <span className="text-xs text-gray-600 group-hover:text-red-400 transition-colors">Photo</span>
                    </div>
                  )}
                </div>

                {/* Remove photo button */}
                {photoPreview && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-600 mt-2">JPG, PNG, GIF — max 2 Mo</p>
              {errors.photo && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.photo}
                </p>
              )}
            </div>

            {/* ─── FORM FIELDS ─── */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Pseudo */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                  <User className="w-3.5 h-3.5 text-red-500" />
                  Pseudo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                  placeholder="Ton pseudo en jeu"
                  maxLength={24}
                  className={`w-full bg-black bg-opacity-50 border rounded-xl px-5 py-3 text-white placeholder-gray-600 transition-all duration-300 text-sm font-rajdhani outline-none
                    ${errors.pseudo
                      ? 'border-red-500 border-opacity-80 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                      : 'border-red-900 border-opacity-25 focus:border-red-600 focus:border-opacity-60 focus:ring-2 focus:ring-red-600 focus:ring-opacity-15'
                    }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                />
                {errors.pseudo && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.pseudo}
                  </p>
                )}
              </div>

              {/* Age + Rang side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Age */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                    <span className="text-red-500 text-sm">◐</span>
                    Âge <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="18"
                    min="13"
                    max="99"
                    className={`w-full bg-black bg-opacity-50 border rounded-xl px-5 py-3 text-white placeholder-gray-600 transition-all duration-300 text-sm font-rajdhani outline-none
                      ${errors.age
                        ? 'border-red-500 border-opacity-80 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                        : 'border-red-900 border-opacity-25 focus:border-red-600 focus:border-opacity-60 focus:ring-2 focus:ring-red-600 focus:ring-opacity-15'
                      }`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  />
                  {errors.age && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.age}
                    </p>
                  )}
                </div>

                {/* Rang actuel */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                    <Award className="w-3.5 h-3.5 text-red-500" />
                    Rang actuel <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="rank"
                      value={formData.rank}
                      onChange={handleChange}
                      className={`w-full bg-black bg-opacity-50 border rounded-xl px-5 py-3 text-sm transition-all duration-300 outline-none appearance-none cursor-pointer
                        ${errors.rank
                          ? 'border-red-500 border-opacity-80 text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                          : 'border-red-900 border-opacity-25 focus:border-red-600 focus:border-opacity-60 focus:ring-2 focus:ring-red-600 focus:ring-opacity-15'
                        }
                        ${formData.rank ? 'text-white' : 'text-gray-500'}
                      `}
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: formData.rank ? getRankColor(formData.rank) : undefined
                      }}
                    >
                      {RANKS.map((rank) => (
                        <option
                          key={rank.value}
                          value={rank.value}
                          style={{ backgroundColor: '#111', color: rank.color }}
                        >
                          {rank.label}
                        </option>
                      ))}
                    </select>
                    {/* Custom arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#DC143C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {errors.rank && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.rank}
                    </p>
                  )}
                </div>
              </div>

              {/* Riot ID */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                  <Gamepad2 className="w-3.5 h-3.5 text-red-500" />
                  Riot ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="riotId"
                  value={formData.riotId}
                  onChange={handleChange}
                  placeholder="Pseudo#TAG"
                  className={`w-full bg-black bg-opacity-50 border rounded-xl px-5 py-3 text-white placeholder-gray-600 transition-all duration-300 text-sm font-rajdhani outline-none
                    ${errors.riotId
                      ? 'border-red-500 border-opacity-80 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                      : 'border-red-900 border-opacity-25 focus:border-red-600 focus:border-opacity-60 focus:ring-2 focus:ring-red-600 focus:ring-opacity-15'
                    }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                />
                <p className="text-xs text-gray-600 mt-1">Format : Pseudo#TAG (ex: FlameWave#FR1)</p>
                {errors.riotId && (
                  <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.riotId}
                  </p>
                )}
              </div>

              {/* Twitch (optionnel) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                  <Twitch className="w-3.5 h-3.5 text-purple-400" />
                  Chaîne Twitch
                  <span className="text-gray-600 text-xs font-normal normal-case tracking-normal">(optionnel)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">
                    twitch.tv/
                  </span>
                  <input
                    type="text"
                    name="twitch"
                    value={formData.twitch}
                    onChange={handleChange}
                    placeholder="ton-pseudo-twitch"
                    className={`w-full bg-black bg-opacity-50 border rounded-xl pl-24 pr-5 py-3 text-white placeholder-gray-600 transition-all duration-300 text-sm font-rajdhani outline-none
                      ${errors.twitch
                        ? 'border-red-500 border-opacity-80 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                        : 'border-purple-900 border-opacity-30 focus:border-purple-600 focus:border-opacity-60 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-15'
                      }`}
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  />
                </div>
                {errors.twitch && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.twitch}
                  </p>
                )}
              </div>

              {/* ─── SUBMIT BUTTON ─── */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bebas text-lg tracking-widest py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] mt-2"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  boxShadow: '0 0 20px rgba(220,20,60,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(220,20,60,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220,20,60,0.3)'}
              >
                <Shield className="w-5 h-5" />
                CRÉER MON PROFIL
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Fields required note */}
              <p className="text-center text-xs text-gray-600 mt-2">
                Les champs marqués par <span className="text-red-500">*</span> sont obligatoires
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
