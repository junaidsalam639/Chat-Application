import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext  } from "react";
import { AuthContext } from "./context/AuthContext";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const { currentUser } = useContext(AuthContext);
  
  // const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  // const startListening = () => SpeechRecognition.startListening({ continuous: true , language : 'en-IN' });
  // if (!browserSupportsSpeechRecognition) {
  //   return null
  // }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
     {/* <p>{transcript}</p>
     <button onClick={startListening}>Start</button>
     <button onClick={SpeechRecognition.stopListening}>Off</button> */}
    </>
  );
}

export default App;
