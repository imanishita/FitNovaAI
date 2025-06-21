import React, { useEffect, useState } from 'react';
import { Clock, Flame, ChevronRight, Activity } from 'lucide-react';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activityConfig = {
    RUNNING: { icon: '🏃‍♂️', color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
    WALKING: { icon: '🚶‍♂️', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
    CYCLING: { icon: '🚴‍♂️', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  };

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Function to handle activity click - you can customize this
  const handleActivityClick = (activityId) => {
    // Navigate to activity detail page
    // You can use react-router's useNavigate hook here
    console.log('Navigate to activity:', activityId);
    // Example: navigate(`/activities/${activityId}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-2xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Activities</h1>
        <p className="text-gray-600">Track your progress and achievements</p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => {
          const config = activityConfig[activity.type] || activityConfig.RUNNING;
          return (
            <div
              key={activity.id}
              onClick={() => handleActivityClick(activity.id)}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${config.color} p-6 text-white relative`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{activity.type}</h3>
                      <p className="text-white/80 text-sm">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 font-medium">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{activity.duration}</p>
                    <p className="text-sm text-gray-500">minutes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Flame className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 font-medium">Calories</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{activity.caloriesBurned}</p>
                    <p className="text-sm text-gray-500">burned</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${config.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min((activity.caloriesBurned / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Progress towards daily goal</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {activities.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities yet</h3>
          <p className="text-gray-600">Start tracking your fitness journey today!</p>
        </div>
      )}
    </div>
  );
};

export default ActivityList;