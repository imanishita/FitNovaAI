import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Flame, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Shield, 
  ChevronRight 
} from 'lucide-react';
import { getActivityDetail } from '../services/api';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const activityConfig = {
    RUNNING: { icon: '🏃‍♂️', color: 'from-red-500 to-pink-500' },
    WALKING: { icon: '🚶‍♂️', color: 'from-green-500 to-emerald-500' },
    CYCLING: { icon: '🚴‍♂️', color: 'from-blue-500 to-cyan-500' },
  };

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivityDetail();
  }, [id]);

  const handleBack = () => {
    navigate('/activities'); // Adjust this path based on your routing setup
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Activity not found</h3>
          <p className="text-gray-600 mb-4">The activity you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  const config = activityConfig[activity.type] || activityConfig.RUNNING;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to Activities
      </button>

      {/* Main Activity Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-6">
        <div className={`bg-gradient-to-r ${config.color} p-8 text-white relative`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
              {config.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{activity.type} Session</h1>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4" />
                <span>{new Date(activity.createdAt).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Duration</span>
              </div>
              <p className="text-3xl font-bold">{activity.duration} <span className="text-lg font-normal">min</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">Calories</span>
              </div>
              <p className="text-3xl font-bold">{activity.caloriesBurned} <span className="text-lg font-normal">cal</span></p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* AI Recommendations */}
      {recommendation && (
        <div className="space-y-6">
          {/* Analysis Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Analysis</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{recommendation}</p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Improvements */}
            {activity?.improvements && activity.improvements.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Improvements</h3>
                </div>
                <div className="space-y-3">
                  {activity.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {activity?.suggestions && activity.suggestions.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {activity.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="w-3 h-3 text-amber-600" />
                      </div>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety */}
            {activity?.safety && activity.safety.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Safety</h3>
                </div>
                <div className="space-y-3">
                  {activity.safety.map((safety, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-gray-700">{safety}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;