import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

import TrustLayerLayout from "../layout/TrustLayerLayout";
// Reusing the views we built:
import ThreatOverview from "../components/TrustLayer/Main/ThreatOverview";
import ScamDetection from "../components/TrustLayer/Main/ScamDetection";
import PhishingEmailAnalyzer from "../components/TrustLayer/Main/PhishingEmailAnalyzer";
import DomainImpersonationChecker from "../components/TrustLayer/Main/DomainImpersonationChecker";
import DocumentVerification from "../components/TrustLayer/Main/DocumentVerification";
import ThreatAnalyticsCharts from "../components/TrustLayer/Main/ThreatAnalyticsCharts";

import VishingDeepfakeDetector from "../components/TrustLayer/Main/VishingDeepfakeDetector";
import ModelManagement from "../components/TrustLayer/Main/ModelManagement";

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
    element: <TrustLayerLayout />, // Our new Tech-Brutalist Shell
    children: [
      {
        index: true,
        // The dashboard home combines Overview and Charts
        element: (
          <div className="flex flex-col gap-6 lg:gap-8">
            <ThreatOverview />
            <ModelManagement />
            <ThreatAnalyticsCharts />
          </div>
        )
      },
      {
        path: "scam-detection",
        element: <ScamDetection />
      },
      {
        path: "vishing-deepfake",
        element: <VishingDeepfakeDetector />
      },
      {
        path: "phishing-analyzer",
        element: <PhishingEmailAnalyzer />
      },
      {
        path: "domain-checker",
        element: <DomainImpersonationChecker />
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
