import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

function TaskForm({ onAdd, onClose, task = null }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'active');
  const [priorityTag, setPriorityTag] = useState(task?.priority?.tag || 'Low');
  const [style, setStyle] = useState(task?.style || 'default');
  const [endDate, setEndDate] = useState(task?.priority?.endDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      priority: { tag: priorityTag, endDate },
      style,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onAdd(newTask);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel w-full max-w-md p-6 rounded-2xl relative bg-white/80 border-white/60 shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-slate-800 mb-6 font-poppins">
            {task ? 'Edit Task' : 'New Task'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-500 text-sm mb-1 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-300 shadow-sm"
                placeholder="What needs to be done?"
              />
            </div>

            <div>
              <label className="block text-slate-500 text-sm mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all h-24 resize-none placeholder:text-slate-300 shadow-sm"
                placeholder="Add details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 text-sm mb-1 font-medium">Priority</label>
                <select
                  value={priorityTag}
                  onChange={(e) => setPriorityTag(e.target.value)}
                  className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 text-sm mb-1 font-medium">Card Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="minimal">Minimal</option>
                  <option value="glass">Glass</option>
                  <option value="colorful">Cyber</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-sm mb-1 font-medium">Due Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-rose-400/30 transition-all mt-6 active:scale-95"
            >
              Save Task
            </button>
          </form >
        </motion.div >
      </div >
    </AnimatePresence >
  );
}

export default TaskForm;