const FoodAnalysisResult = ({ foodItems, onConfirm }) => {
    return (
      <div className="p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">Analysis Results</h2>
        <ul className="space-y-2">
          {foodItems.map((item, index) => (
            <li key={index} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Item:</strong> {item.name}</p>
              <p><strong>Calories:</strong> {item.calories}</p>
              <p><strong>Protein:</strong> {item.protein}g</p>
              <p><strong>Carbs:</strong> {item.carbs}g</p>
              <p><strong>Fats:</strong> {item.fats}g</p>
            </li>
          ))}
        </ul>
        <button
          onClick={onConfirm}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Confirm & Save
        </button>
      </div>
    );
  };
  
  export default FoodAnalysisResult;