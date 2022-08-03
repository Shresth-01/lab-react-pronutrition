import React from 'react';
export function Todaysfood({ myFruits, removeFruit, calories_count }) {
  return (
    <div className="right">
      <h1>Today's Food {calories_count} Calories</h1>
      {myFruits
        .filter((fruit) => {
          return fruit.text !== '';
        })
        .map((fruit) => {
          return (
            <div key={fruit.name} className="item" id={fruit.btn_id}>
              <span>{fruit.text}</span>
              <button onClick={removeFruit} value={fruit.btn_id}>
                X
              </button>
            </div>
          );
        })}
    </div>
  );
}