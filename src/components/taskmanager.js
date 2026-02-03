import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import TaskCard from './taskcard';
import TaskForm from './taskform';
import { isAfter } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, 'users', user.uid, 'tasks'));
      const snapshot = await getDocs(q);
      const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Auto-manage missed tasks
      const updatedTasks = taskList.map(task => {
        if (task.priority?.endDate && isAfter(new Date(), new Date(task.priority.endDate)) && task.status === 'active') {
          updateDoc(doc(db, 'users', user.uid, 'tasks', task.id), { status: 'missed' });
          return { ...task, status: 'missed' };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (e) {
      console.error("Error fetching tasks. Check Firebase config.", e);
    }
  };

  const addTask = async (task) => {
    if (!user) {
      alert("You must be logged in to add a task.");
      return;
    }
    try {
      await addDoc(collection(db, 'users', user.uid, 'tasks'), task);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Error adding task: " + error.message + "\n\nDid you create the Firestore Database in the console?");
    }
  };

  const updateTask = async (id, updates) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'tasks', id), updates);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'tasks', id));
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 glass-panel p-6 rounded-2xl bg-white/40">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          {/* Updated gradient text for Light Pink theme */}
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500 drop-shadow-sm">
            Task Manager
          </h1>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/60 border border-white/50 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl flex items-center shadow-lg shadow-rose-400/30 transition-all active:scale-95"
          >
            <PlusIcon className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Add Task</span>
          </button>
          <button
            onClick={() => signOut(auth)}
            className="bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-500 px-4 py-2.5 rounded-xl transition-all shadow-sm border border-white"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {showForm && <TaskForm onAdd={addTask} onClose={() => setShowForm(false)} />}

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-slate-500"
            >
              <p className="text-lg">No tasks found. Create one to get started!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default TaskManager;