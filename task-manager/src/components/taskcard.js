import React from 'react';

function TaskCard({ task, onUpdate, onDelete }) {
  const styleClasses = {
    default: 'bg-white border border-gray-300',
    blue: 'bg-blue-100 border border-blue-300',
    red: 'bg-red-100 border border-red-300',
  };

  return (
    <div className={`p-4 rounded shadow-md ${styleClasses[task.style]}`}>
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="mb-2">{task.description}</p>
      <p className="mb-2"><strong>Status:</strong> {task.status}</p>
      <p className="mb-4"><strong>Priority:</strong> {task.priority?.tag} {task.priority?.endDate && `(Due: ${task.priority.endDate})`}</p>
      <div className="flex space-x-2">
        {task.status !== 'completed' && (
          <button 
            onClick={() => onUpdate(task.id, { status: 'completed' })} 
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Mark Complete
          </button>
        )}
        <button 
          onClick={() => onDelete(task.id)} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;