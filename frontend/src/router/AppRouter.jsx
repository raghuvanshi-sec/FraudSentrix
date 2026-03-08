import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import ScamDetection from "../pages/ScamDetection";
import VishingDetection from "../pages/VishingDetection";
import DeepfakeDetector from "../pages/DeepfakeDetector";
import PhishingAnalyzer from "../pages/PhishingAnalyzer";
import DomainChecker from "../pages/DomainChecker";
import DocumentVerification from "../pages/DocumentVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "scam-detection",
        element: <ScamDetection />
      },
      {
        path: "vishing-detection",
        element: <VishingDetection />
      },
      {
        path: "deepfake-detector",
        element: <DeepfakeDetector />
      },
      {
        path: "phishing-analyzer",
        element: <PhishingAnalyzer />
      },
      {
        path: "domain-checker",
        element: <DomainChecker />
      },
      {
        path: "document-verification",
        element: <DocumentVerification />
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
