import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Routes>
      <Route>
        {() =>
          props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
        }
      </Route>
    </Routes>
  )
}

export default ProtectedRoute