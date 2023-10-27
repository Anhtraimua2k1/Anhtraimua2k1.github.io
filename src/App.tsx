import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider';
import { DialogProvider } from './context/DialogProvide';
import AuthRedirect from './pages/auth';
import HomePage from './pages/home';

function App() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogSize, setDialogSize] = useState<string>('md')
  const [dialogContent, setDialogContent] = useState<React.JSX.Element | null>(
    null
  )

  const dialogProps = {
    dialogSize,
    openDialog,
    dialogContent,
  }

  const dialogControlProps = {
    setDialogSize,
    setDialogShow: (status: boolean) => setOpenDialog(status),
    setDialogContent: (customElement: React.JSX.Element) => {
      const newElement = React.cloneElement(customElement, {
        setOpenDialog,
      })
      setDialogContent(newElement)
    },
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={6001}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
        style={{ width: 'fit-content', fontWeight: 600, letterSpacing: 1 }}
      />
      <AuthProvider>
        <DialogProvider
          children={
            <Routes>
              {[
                '/login',
                '/register',
                '/forget-password',
                '/change-password',
              ].map((path, i) => (
                <Route
                  key={`auth_route_${i}`}
                  path={path}
                  element={<AuthRedirect />}
                />
              ))}

<Route path='*' element={<HomePage/>} />
              {/* <Route path='*' element={<Navigate to={'/login'} />} /> */}

            </Routes>
          }
          props={dialogControlProps}
        />
      </AuthProvider>
      {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    </BrowserRouter>

  );
}

export default App;
