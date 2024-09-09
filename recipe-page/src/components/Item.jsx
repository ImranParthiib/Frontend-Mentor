const Item = () => {
  return (
    <section className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto p-4 sm:p-6 rounded-lg shadow-lg mt-0 md:my-12">
      {/* Image Section */}
      <div>
        <img
          src="/src/assets/omlet.png"
          alt="Omelette"
          className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
        />
        <h1 className="text-xl sm:text-3xl font-bold opacity-85 mt-4">
          Simple Omelette Recipe
        </h1>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          An easy and quick dish, perfect for any meal. This classic omelette
          combines beaten eggs cooked to perfection, optionally filled with your
          choice of cheese, vegetables, or meats.
        </p>
      </div>

      {/* Preparation Time */}
      <div className="mt-6 bg-red-50 rounded-lg shadow-md p-4">
        <h2 className="text-orange-600 font-semibold text-lg sm:text-xl">
          Preparation Time
        </h2>
        <ul className="text-xs sm:text-sm list-disc px-4 sm:px-6 mt-2">
          <li>
            <strong>Total:</strong> Approximately 10 minutes
          </li>
          <li>
            <strong>Preparation:</strong> 5 minutes
          </li>
          <li>
            <strong>Cooking:</strong> 5 minutes
          </li>
        </ul>
      </div>

      {/* Ingredients Section */}
      <div className="mt-6 rounded-lg p-4">
        <h2 className="text-orange-600 font-semibold text-lg sm:text-xl">
          Ingredients
        </h2>
        <ul className="list-disc px-4 sm:px-6 text-xs sm:text-sm mt-2">
          <li>2 large eggs</li>
          <li>1/4 cup milk</li>
          <li>1/4 teaspoon salt</li>
          <li>1/8 teaspoon pepper</li>
          <li>1 tablespoon butter</li>
        </ul>
      </div>
      <hr />

      {/* Instructions Section */}
      <div className="mt-6 rounded-lg p-4">
        <h2 className="text-orange-600 font-semibold text-lg sm:text-xl">
          Instructions
        </h2>
        <ul className="list-disc px-4 sm:px-6 text-xs sm:text-sm mt-2">
          <li>
            <strong>Beat the eggs:</strong> In a bowl, beat the eggs with a
            pinch of salt and pepper until they are well mixed. Add water or
            milk for a fluffier texture.
          </li>
          <li>
            <strong>Heat the pan:</strong> Place a non-stick frying pan over
            medium heat and add butter or oil.
          </li>
          <li>
            <strong>Cook the omelette:</strong> Once the butter is melted and
            bubbling, pour in the eggs. Tilt the pan to coat evenly.
          </li>
          <li>
            <strong>Add fillings (optional):</strong> Sprinkle fillings over
            half the omelette when the edges set.
          </li>
          <li>
            <strong>Fold and serve:</strong> Fold the omelette over and cook for
            another minute, then slide onto a plate.
          </li>
          <li>
            <strong>Enjoy:</strong> Serve hot, with additional salt and pepper
            if needed.
          </li>
        </ul>
      </div>

      {/* Nutrition Section */}
      <div className="mt-2 rounded-lg p-4">
        <h2 className="text-orange-600 text-2xl">Nutrition</h2>
        <p className="mt-2 text-sm pb-4">
          The table below shows nutritional values per serving without the
          additional fillings:
        </p>
        <div className="grid grid-cols-2 py-1">
          <div>Calories</div>
          <div className="text-orange-600 font-semibold">277kcal</div>
        </div>
        <hr />
        <div className="grid grid-cols-2 py-1">
          <div>Carbs</div>
          <div className="text-orange-600 font-semibold">0g</div>
        </div>
        <hr />
        <div className="grid grid-cols-2 py-1">
          <div>Protein</div>
          <div className="text-orange-600 font-semibold">20gm</div>
        </div>
        <hr />
        <div className="grid grid-cols-2 py-1">
          <div>Fat</div>
          <div className="text-orange-600 font-semibold">22gm</div>
        </div>
      </div>
    </section>
  );
};

export default Item;
