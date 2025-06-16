import React from "react";
import TodoContainer from "./components/todoContainer";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center">
      <TodoContainer />
    </div>
  );
};

export default App;
