import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic frontend validation
    if (!activity.duration || !activity.caloriesBurned) {
      setError('Please fill in both Duration and Calories Burned.');
      return;
    }

    try {
      const response = await addActivity(activity);
      setSuccess('🎉 Activity added successfully!');
      onActivityAdded?.();
      setActivity({ type: 'RUNNING', duration: '', caloriesBurned: '', additionalMetrics: {} });
    } catch (err) {
      console.error(err);
      setError('Something went wrong while adding activity.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        🚀 Add a New Activity
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="activity-type-label">Activity Type</InputLabel>
          <Select
            labelId="activity-type-label"
            value={activity.type}
            onChange={(e) => setActivity({ ...activity, type: e.target.value })}
            label="Activity Type"
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Duration (Minutes)"
          type="number"
          value={activity.duration}
          onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Calories Burned"
          type="number"
          value={activity.caloriesBurned}
          onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
          Add Activity
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            ❌ {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" sx={{ mt: 2 }}>
            ✅ {success}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ActivityForm;
