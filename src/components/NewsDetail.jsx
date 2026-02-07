import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar, User } from 'lucide-react';

const NewsDetail = ({ newsId, onBack }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    // Charger l'actualité depuis localStorage ou API
    const allNews = JSON.parse(localStorage.getItem('news') || '[]');
    const found = allNews.find(n => n.id === newsId);
    setNews(found);
  }, [newsId]);

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Actualité introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux actualités
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${
            news.category === 'Victoire' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            news.category === 'Roster' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {news.category}
          </span>

          <h1 className="text-5xl font-black text-white mb-4">
            {news.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {news.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {news.author || 'Structure TravL'}
            </div>
          </div>
        </div>

        {/* Image */}
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
        )}

        {/* Contenu */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {news.content || news.description}
            </div>
          </div>
        </div>

        {/* Partage */}
        <div className="mt-8 flex items-center justify-between">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all">
            <Share2 className="w-5 h-5" />
            Partager
          </button>

          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold hover:scale-105 transition-all"
          >
            Voir plus d'actualités
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
