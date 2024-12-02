import React, { useState } from 'react';
import axios from 'axios';

const FoodCalculator: React.FC = () => {
  const [food, setFood] = useState<string>('');
  const [foodData, setFoodData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFoodData(null);

    try {
      // Make a request to the backend API with the food name
      console.log("Sending request to backend with food:", food);
      const response = await axios.post('http://localhost:8000/ai-food-calculator', {
        foodName: food,
      });
      setFoodData(JSON.parse(response.data));
      setFood('');
    } catch (error: any) {
      setError('Failed to fetch food data. Please try again later.');
      console.error('Error fetching food data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 mt-10 rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold mb-4">Food Calorie and Carb Calculator</h1>
      <form onSubmit={handleCalculate}>
        <label htmlFor="food" className="block mb-2 text-sm font-medium text-gray-900">
          Enter Food Name:
        </label>
        <input
          type="text"
          id="food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
          placeholder="e.g., Apple"
          required
        />
        <button
          type="submit"
          className="text-white bg-[#F2803A] hover:bg-[#b4602c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {!error && foodData && (
        <div className="mt-4">
          <p>
            <strong>Calories:</strong> {foodData.Calories} kcal
          </p>
          <p>
            <strong>Carbs:</strong> {foodData.Carbs} grams
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodCalculator;
