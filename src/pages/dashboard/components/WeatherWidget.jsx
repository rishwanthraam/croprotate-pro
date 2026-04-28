import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const weatherData = [
    {
      date: '2024-08-31',
      day: 'Today',
      high: 78,
      low: 62,
      condition: 'Partly Cloudy',
      icon: 'CloudSun',
      humidity: 65,
      windSpeed: 8,
      precipitation: 10,
      soilTemp: 68
    },
    {
      date: '2024-09-01',
      day: 'Tomorrow',
      high: 82,
      low: 64,
      condition: 'Sunny',
      icon: 'Sun',
      humidity: 58,
      windSpeed: 6,
      precipitation: 0,
      soilTemp: 70
    },
    {
      date: '2024-09-02',
      day: 'Mon',
      high: 75,
      low: 59,
      condition: 'Light Rain',
      icon: 'CloudRain',
      humidity: 78,
      windSpeed: 12,
      precipitation: 65,
      soilTemp: 66
    },
    {
      date: '2024-09-03',
      day: 'Tue',
      high: 73,
      low: 57,
      condition: 'Cloudy',
      icon: 'Cloud',
      humidity: 72,
      windSpeed: 10,
      precipitation: 25,
      soilTemp: 64
    },
    {
      date: '2024-09-04',
      day: 'Wed',
      high: 79,
      low: 61,
      condition: 'Partly Cloudy',
      icon: 'CloudSun',
      humidity: 63,
      windSpeed: 7,
      precipitation: 15,
      soilTemp: 67
    },
    {
      date: '2024-09-05',
      day: 'Thu',
      high: 84,
      low: 66,
      condition: 'Sunny',
      icon: 'Sun',
      humidity: 55,
      windSpeed: 5,
      precipitation: 0,
      soilTemp: 72
    },
    {
      date: '2024-09-06',
      day: 'Fri',
      high: 81,
      low: 63,
      condition: 'Partly Cloudy',
      icon: 'CloudSun',
      humidity: 60,
      windSpeed: 9,
      precipitation: 5,
      soilTemp: 69
    }
  ];

  const currentWeather = weatherData?.[selectedDay];

  const getConditionColor = (condition) => {
    if (condition?.includes('Rain')) return 'text-primary';
    if (condition?.includes('Sunny')) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <Icon name="CloudSun" size={16} color="white" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Weather Forecast
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            7-day agricultural forecast
          </p>
        </div>
      </div>
      {/* Current Day Detail */}
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-semibold text-xl text-foreground">
              {currentWeather?.day}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {new Date(currentWeather.date)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Icon 
                name={currentWeather?.icon} 
                size={32} 
                className={getConditionColor(currentWeather?.condition)}
              />
              <div>
                <span className="font-heading font-bold text-2xl text-foreground">
                  {currentWeather?.high}°
                </span>
                <span className="font-body text-lg text-muted-foreground">
                  /{currentWeather?.low}°
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {currentWeather?.condition}
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Droplets" size={16} className="text-primary" />
            <div>
              <p className="font-data text-xs text-muted-foreground">Humidity</p>
              <p className="font-data text-sm font-medium text-foreground">
                {currentWeather?.humidity}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Wind" size={16} className="text-muted-foreground" />
            <div>
              <p className="font-data text-xs text-muted-foreground">Wind</p>
              <p className="font-data text-sm font-medium text-foreground">
                {currentWeather?.windSpeed} mph
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CloudRain" size={16} className="text-primary" />
            <div>
              <p className="font-data text-xs text-muted-foreground">Rain Chance</p>
              <p className="font-data text-sm font-medium text-foreground">
                {currentWeather?.precipitation}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Thermometer" size={16} className="text-secondary" />
            <div>
              <p className="font-data text-xs text-muted-foreground">Soil Temp</p>
              <p className="font-data text-sm font-medium text-foreground">
                {currentWeather?.soilTemp}°F
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 7-Day Forecast */}
      <div className="space-y-2">
        <h4 className="font-heading font-medium text-sm text-foreground mb-3">
          7-Day Forecast
        </h4>
        {weatherData?.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`w-full flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${
              selectedDay === index 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="font-body text-sm font-medium min-w-[60px] text-left">
                {day?.day}
              </span>
              <Icon 
                name={day?.icon} 
                size={16} 
                className={selectedDay === index ? 'text-primary-foreground' : getConditionColor(day?.condition)}
              />
              <span className="font-body text-xs">
                {day?.condition}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-data text-sm font-medium">
                {day?.high}°
              </span>
              <span className="font-data text-sm opacity-75">
                {day?.low}°
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;