import React, { useState } from 'react';
import { 
  FiTarget, 
  FiTrendingUp, 
  FiEdit2, 
  FiX, 
  FiCheck,
  FiAward,
  FiActivity,
  FiHeart
} from 'react-icons/fi';
import './HealthGoals.css';

const initialGoals = [
  {
    id: 1,
    icon: FiHeart,
    title: "Lower Blood Pressure",
    target: "120/80 mmHg",
    current: "128/85 mmHg",
    progress: 75,
    category: "vital",
    deadline: "2024-03-01",
    status: "in-progress"
  },
  {
    id: 2,
    icon: FiActivity,
    title: "Daily Steps",
    target: "10,000 steps",
    current: "8,500 steps",
    progress: 85,
    category: "activity",
    deadline: "2024-02-15",
    status: "in-progress"
  },
  {
    id: 3,
    icon: FiTarget,
    title: "Weight Goal",
    target: "75 kg",
    current: "78 kg",
    progress: 60,
    category: "weight",
    deadline: "2024-04-01",
    status: "in-progress"
  }
];

const GoalCard = ({ goal, onEdit }) => {
  const Icon = goal.icon;
  const progressColor = 
    goal.progress >= 80 ? '#059669' :
    goal.progress >= 50 ? '#0EA5E9' :
    '#DC2626';

  return (
    <div className="goal-card">
      <div className="goal-header">
        <div className="goal-icon">
          <Icon />
        </div>
        <button className="edit-button" onClick={() => onEdit(goal)}>
          <FiEdit2 />
        </button>
      </div>

      <h3>{goal.title}</h3>
      
      <div className="goal-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${goal.progress}%`,
              backgroundColor: progressColor
            }}
          />
        </div>
        <span className="progress-text">{goal.progress}%</span>
      </div>

      <div className="goal-metrics">
        <div className="metric">
          <label>Target</label>
          <span>{goal.target}</span>
        </div>
        <div className="metric">
          <label>Current</label>
          <span>{goal.current}</span>
        </div>
      </div>

      <div className="goal-footer">
        <div className="deadline">
          Due {new Date(goal.deadline).toLocaleDateString()}
        </div>
        <div className={`status-badge ${goal.status}`}>
          {goal.status.replace('-', ' ')}
        </div>
      </div>
    </div>
  );
};

const GoalEditModal = ({ goal, onSave, onClose }) => {
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGoal);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Edit Goal</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editedGoal.title}
              onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Target</label>
            <input
              type="text"
              value={editedGoal.target}
              onChange={(e) => setEditedGoal({ ...editedGoal, target: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Current</label>
            <input
              type="text"
              value={editedGoal.current}
              onChange={(e) => setEditedGoal({ ...editedGoal, current: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editedGoal.progress}
              onChange={(e) => setEditedGoal({ ...editedGoal, progress: Number(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={editedGoal.deadline}
              onChange={(e) => setEditedGoal({ ...editedGoal, deadline: e.target.value })}
              required
            />
          </div>
          <div className="edit-modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HealthGoals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleEdit = (goal) => {
    setEditingGoal(goal);
  };

  const handleSave = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    setEditingGoal(null);
  };

  const calculateOverallProgress = () => {
    const total = goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(total / goals.length);
  };

  return (
    <div className="health-goals">
      <div className="goals-header">
        <div className="title-section">
          <h2>Health Goals</h2>
          <p>Track your progress</p>
        </div>
        <div className="overall-progress">
          <FiAward />
          <span>Overall Progress: {calculateOverallProgress()}%</span>
        </div>
      </div>

      <div className="goals-grid">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {editingGoal && (
        <GoalEditModal
          goal={editingGoal}
          onSave={handleSave}
          onClose={() => setEditingGoal(null)}
        />
      )}
    </div>
  );
};

export default HealthGoals; 