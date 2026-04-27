import React, { useState } from 'react';
import { Play, Zap, Clock, Flame } from 'lucide-react';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    additionalMetrics: {},
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activityTypes = [
    { value: 'RUNNING', label: 'Running', icon: '🏃‍♂️', color: 'from-red-500 to-pink-500' },
    { value: 'WALKING', label: 'Walking', icon: '🚶‍♂️', color: 'from-green-500 to-emerald-500' },
    { value: 'CYCLING', label: 'Cycling', icon: '🚴‍♂️', color: 'from-blue-500 to-cyan-500' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log("Token:", token);
    console.log("User ID:", userId);

    if (!activity.duration || !activity.caloriesBurned) {
      setError('Please fill in both Duration and Calories Burned.');
      setIsLoading(false);
      return;
    }

    // Validate that duration and caloriesBurned are valid numbers
    const durationNum = parseInt(activity.duration, 10);
    const caloriesNum = parseInt(activity.caloriesBurned, 10);

    if (isNaN(durationNum) || durationNum <= 0) {
      setError('Please enter a valid duration (positive number).');
      setIsLoading(false);
      return;
    }

    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      setError('Please enter a valid calories burned (positive number).');
      setIsLoading(false);
      return;
    }

    if (!token || !userId) {
      setError('⚠️ You are not logged in. Please sign in again.');
      setIsLoading(false);
      return;
    }

    try {
      // Convert string values to integers for backend
      const activityPayload = {
        type: activity.type,
        duration: durationNum,
        caloriesBurned: caloriesNum,
        additionalMetrics: activity.additionalMetrics || {},
      };

      await addActivity(activityPayload); 
      setSuccess('🎉 Activity added successfully!');
      onActivityAdded?.();
      setActivity({ type: 'RUNNING', duration: '', caloriesBurned: '', additionalMetrics: {} });
    } catch (err) {
      console.error("❌ Axios Error:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong while adding activity.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedActivity = activityTypes.find(type => type.value === activity.type);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 dark:border-white/10">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedActivity.color} p-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Add New Activity</h1>
                <p className="text-white/80">Track your fitness journey</p>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Activity Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Activity Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {activityTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setActivity({ ...activity, type: type.value })}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 group hover:shadow-lg ${
                    activity.type === type.value
                      ? `border-transparent bg-gradient-to-r ${type.color} text-white shadow-lg scale-105`
                      : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className={`text-sm font-medium ${
                    activity.type === type.value ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration (Minutes)
            </label>
            <div className="relative">
              <input
                type="number"
                value={activity.duration}
                onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:text-white transition-all duration-300 text-lg"
                placeholder="Enter duration in minutes"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Calories Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Calories Burned
            </label>
            <div className="relative">
              <input
                type="number"
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                className="w-full px-4 py-4 bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:text-white transition-all duration-300 text-lg"
                placeholder="Enter calories burned"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${selectedActivity.color} hover:opacity-90`
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding Activity...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Add Activity
              </div>
            )}
          </button>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-700 font-medium">❌ {error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-green-700 font-medium">✅ {success}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;