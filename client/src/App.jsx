import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import Profile from "./pages/Profile";
import ProfileForm from "./pages/ProfileForm";

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import SubtaskPage from "./pages/SubtaskPage";
import { SubtaskProvider } from "./context/SubtasksContext";
import SubTaskFormPage from "./pages/SubTaskFormPage";
import ModalWrapper from "./components/ModalWrapper";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <SubtaskProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10 font-thin">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route
                    path="/add-task"
                    element={
                      <ModalWrapper>
                        <TaskFormPage />
                      </ModalWrapper>
                    }
                  />
                  <Route
                    path="/tasks/:id"
                    element={
                      <ModalWrapper>
                        <TaskFormPage />
                      </ModalWrapper>
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:id" element={<ProfileForm />} />

                  <Route
                    path="/tasks/:id/subtasks"
                    element={
                      <ModalWrapper>
                        <SubtaskPage />
                      </ModalWrapper>
                    }
                  />
                  <Route
                    path="/tasks/:id/add-subtask"
                    element={
                      <ModalWrapper>
                        <SubTaskFormPage />
                      </ModalWrapper>
                    }
                  />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </SubtaskProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
