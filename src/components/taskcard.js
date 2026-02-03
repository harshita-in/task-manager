import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, TrashIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

const priorityColors = {
  High: 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-rose-500/20',
  Medium: 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-orange-500/20',
  Low: 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-emerald-500/20',
};

const statusStyles = {
  active: 'text-blue-600 bg-blue-100 border-blue-200',
  completed: 'text-emerald-600 bg-emerald-100 border-emerald-200',
  missed: 'text-rose-600 bg-rose-100 border-rose-200',
  incomplete: 'text-rose-600 bg-rose-100 border-rose-200',
};

function TaskCard({ task, onUpdate, onDelete }) {
  const priorityTheme = priorityColors[task.priority?.tag] || priorityColors.Low;
  const statusTheme = statusStyles[task.status] || statusStyles.active;

  // Style Variants
  const styles = {
    default: "glass-panel bg-white/80 border-white/60",
    minimal: "bg-white border border-slate-200 shadow-sm",
    glass: "bg-white/30 backdrop-blur-xl border border-white/50 shadow-2xl",
    colorful: "bg-gradient-to-br from-indigo-900 to-purple-900 border-purple-500/30 text-white",
  };

  const cardStyle = styles[task.style] || styles.default;
  const isDark = task.style === 'colorful';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      whileHover={{
        y: -5,
        scale: 1.01,
        boxShadow: "0 20px 40px -10px rgba(251, 113, 133, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-6 rounded-2xl relative overflow-hidden group hover:border-rose-200/50 transition-all ${cardStyle}`}
    >
      {/* Dynamic Glow Background */}
      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 pointer-events-none ${priorityTheme}`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${statusTheme} mb-3 inline-block`}>
            {task.status === 'incomplete' ? 'Missed' : task.status}
          </span>
          <h3 className={`text-xl font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{task.title}</h3>
        </div>
        <div className={`p-2.5 rounded-xl ${priorityTheme} text-white shadow-md`}>
          <TagIcon className="w-5 h-5" />
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed line-clamp-3 font-normal relative z-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {task.description}
      </p>

      <div className="flex items-center justify-between text-slate-500 text-xs mt-auto relative z-10 border-t border-rose-100/50 pt-4">
        <div className="flex items-center space-x-4">
          {task.priority?.endDate && (
            <div className="flex items-center space-x-1.5 hover:text-rose-500 transition-colors">
              <CalendarIcon className="w-4 h-4" />
              <span className="font-medium">{task.priority.endDate}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <span className="font-semibold tracking-wide text-slate-500">{task.priority?.tag} Priority</span>
          </div>
        </div>

        <div className="flex space-x-2">
          {task.status !== 'completed' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdate(task.id, { status: 'completed' })}
              className="p-2 bg-emerald-100 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl transition-all shadow-sm"
              title="Mark Complete"
            >
              <CheckCircleIcon className="w-5 h-5" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="p-2 bg-rose-100 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all shadow-sm"
            title="Delete"
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;