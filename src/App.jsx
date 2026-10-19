import { BrowserRouter as Router } from "react-router-dom";
import RootRoutes from "@/routes";
import AuthProvider from "@/components/common/AuthProvider";
import FeedbackProvider from "@/components/common/FeedbackProvider";

import "@/css/tokens.css";
import "@/css/base.css";
import "@/css/layout.css";
import "@/css/main.css";
import "@/css/content.css";
import "@/css/popup.css";
import "@/css/my.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FeedbackProvider>
          <RootRoutes />
        </FeedbackProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
