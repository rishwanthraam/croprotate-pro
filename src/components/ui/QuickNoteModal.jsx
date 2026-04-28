import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const QuickNoteModal = ({ isOpen, onClose, onSave }) => {
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('observation');

  const categories = [
    { id: 'observation', label: 'Observation', icon: 'Eye' },
    { id: 'task', label: 'Task', icon: 'CheckSquare' },
    { id: 'reminder', label: 'Reminder', icon: 'Bell' },
    { id: 'issue', label: 'Issue', icon: 'AlertTriangle' }
  ];

  const handleSave = () => {
    if (note.trim()) {
      onSave?.({ note, category, timestamp: new Date().toISOString() });
      setNote('');
      setCategory('observation');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card border border-border rounded-xl shadow-elevated w-full max-w-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-foreground">Quick Note</h2>
                    <p className="text-sm text-muted-foreground">Add a field observation</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                          category === cat.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-foreground border-border hover:border-primary'
                        }`}
                      >
                        <Icon name={cat.icon} size={16} />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Note</label>
                  <textarea
                    rows="4"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your observation..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handleSave} disabled={!note.trim()}>
                  Save Note
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickNoteModal;