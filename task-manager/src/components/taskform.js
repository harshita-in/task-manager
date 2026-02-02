import React, { useState } from 'react';

function TaskForm({ onAdd, onClose, task = null }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'active');
  const [priorityTag, setPriorityTag] = useState(task?.priority?.tag || 'Low');
  const [endDate, setEndDate] = useState(task?.priority?.endDate || '');
  const [style, setStyle] = useState(task?.style || 'default');

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4">Add/Edit Task</h2>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="block w-full mb-2 p-2 border"
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="block w-full mb-2 p-2 border"
        />
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="block w-full mb-2 p-2 border"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select 
          value={priorityTag} 
          onChange={(e) => setPriorityTag(e.target.value)} 
          className="block w-full mb-2 p-2 border"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="block w-full mb-2 p-2 border"
        />
        <select 
          value={style} 
          onChange={(e) => setStyle(e.target.value)} 
          className="block w-full mb-4 p-2 border"
        >
          <option value="default">Default</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;