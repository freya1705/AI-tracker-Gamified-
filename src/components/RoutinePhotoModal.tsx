import React from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';

interface RoutinePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoutinePhotoModal: React.FC<RoutinePhotoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800 font-display">
                Original Handwritten Schedule Note
              </h3>
              <p className="text-xs text-slate-500">
                "My compulsory - allocate time" (Morning, Studies & After Studies)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Container */}
        <div className="flex-1 overflow-y-auto py-3 text-center">
          <img
            src="/routine_note.jpg"
            alt="Handwritten Compulsory Schedule Note"
            className="w-full max-h-[70vh] object-contain rounded-2xl border border-slate-200 shadow-sm mx-auto"
          />
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          All tasks from this note are built into your interactive daily quest tracker!
        </div>

      </div>
    </div>
  );
};
