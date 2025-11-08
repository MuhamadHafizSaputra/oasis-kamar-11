// src/components/FilterModal.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Checkbox from './Checkbox';

// Definisikan semua opsi filter kita di satu tempat
const FILTER_OPTIONS = {
  process: [
    { key: 'fully_handmade', label: 'Fully Handmade' },
    { key: 'hand_woven', label: 'Ditenun Tangan' },
    { key: 'hand_carved', label: 'Diukir Tangan' },
    { key: 'natural_dyes', label: 'Pewarna Alami' },
    { key: 'small_batch', label: 'Produksi Skala Kecil' },
    { key: 'locally_sourced', label: 'Material Lokal' },
  ],
  creator: [
    { key: 'female_founded', label: 'Didirikan oleh Perempuan' },
    { key: 'artisan_coop', label: 'Koperasi Pengrajin' },
    { key: 'family_owned', label: 'Bisnis Keluarga' },
    { key: 'social_enterprise', label: 'Usaha Sosial' },
    { key: 'rural_community', label: 'Komunitas Pedesaan' },
  ],
  impact: [
    { key: 'empowers_women', label: 'Memberdayakan Perempuan' },
    { key: 'empowers_disabled', label: 'Memberdayakan Disabilitas' },
    { key: 'eco_friendly', label: 'Material Ramah Lingkungan' },
    { key: 'preserves_cultural_heritage', label: 'Melestarikan Budaya' },
    { key: 'fair_trade', label: 'Fair Trade Certified' },
    { key: 'community_empowerment', label: 'Pemberdayaan Komunitas' },
  ],
  customization: [
    { key: 'made_to_order', label: 'Made-to-Order' },
    { key: 'personalizable', label: 'Bisa Personalisasi' },
    { key: 'custom_orders', label: 'Menerima Pesanan Khusus' },
  ],
};

const FilterGroup = ({ title, options, activeTags, onTagToggle }) => (
  <fieldset className="mb-6">
    <legend className="text-lg font-semibold text-gray-900 mb-3">
      {title}
    </legend>
    <div className="space-y-2">
      {options.map((option) => (
        <Checkbox
          key={option.key}
          id={option.key}
          label={option.label}
          checked={activeTags.has(option.key)}
          onChange={() => onTagToggle(option.key)}
        />
      ))}
    </div>
  </fieldset>
);

export default function FilterModal({
  isOpen,
  onClose,
  activeTags,
  setActiveTags,
}) {
  if (!isOpen) return null;

  const handleTagToggle = (tagKey) => {
    const newTags = new Set(activeTags);
    if (newTags.has(tagKey)) {
      newTags.delete(tagKey);
    } else {
      newTags.add(tagKey);
    }
    setActiveTags(newTags);
  };

  const handleResetFilters = () => {
    setActiveTags(new Set());
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 z-40"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50 
                   max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">Filter Lanjutan</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <FilterGroup
            title="Berdasarkan Proses"
            options={FILTER_OPTIONS.process}
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
          />
          <FilterGroup
            title="Berdasarkan Kreator"
            options={FILTER_OPTIONS.creator}
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
          />
          <FilterGroup
            title="Berdasarkan Dampak"
            options={FILTER_OPTIONS.impact}
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
          />
          <FilterGroup
            title="Berdasarkan Kustomisasi"
            options={FILTER_OPTIONS.customization}
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
          />
        </div>

        <div className="flex justify-between items-center p-5 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Reset Filter
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}