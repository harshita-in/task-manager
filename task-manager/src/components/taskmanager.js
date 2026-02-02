import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { isAfter } from 'date-fns';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    const q = query(collection(db, 'users', user.uid, 'tasks'));
    const snapshot = await getDocs(q);
    const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Auto-manage incomplete tasks
    const updatedTasks = taskList.map(task => {
      if (task.priority?.endDate && isAfter(new Date(), new Date(task.priority.endDate)) && task.status === 'active') {
        updateDoc(doc(db, 'users', user.uid, 'tasks', task.id), { status: 'incomplete' });
        return { ...task, status: 'incomplete' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = async (task) => {
    await addDoc(collection(db, 'users', user.uid, 'tasks'), task);
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await updateDoc(doc(db, 'users', user.uid, 'tasks', id), updates);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'tasks', id));
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <input 
        type="text" 
        placeholder="Search tasks" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="block w-full mb-4 p-2 border"
      />
      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Task</button>
      {showForm && <TaskForm onAdd={addTask} onClose={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}

export default TaskManager;