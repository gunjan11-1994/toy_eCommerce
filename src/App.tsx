import { useState } from "react";

import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/Registration/RegistrationForm";
import TopBar from "./components/TopBar/TopBar";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  return (
    <>
      <TopBar
        onLoginClick={() => setLoginOpen(true)}
        onRegitrsationClick={() => setRegistrationOpen(true)}
      />

      <Header />

      <AppRoutes onLoginClick={() => setLoginOpen(true)} />

      <LoginForm
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => {}}
      />

      <RegistrationForm
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
      />
    </>
  );
}

export default App;
