import './App.css';

function App() {
  return (
    <div className="container">
      <head>
        <title>Sign up for Vaepr | Vaepr.io</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="main">
        <h1 className="title">
          Sign up for <a href="/">Vaepr</a>
        </h1>

        <p className="description">
          Sign up now to be notified when our next
          <span className="code">amazing project</span>
          launches.
        </p>

        <form action="http://127.0.0.1:5000/api/signup" method="POST">
          <div className="grid">
            <div className="card">
              <div className="label">
                <label htmlFor="username">Userame</label>
              </div>
              <div>
                <input id="username" name="username" type="text" />
              </div>

              <div className="label">
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input id="email" name="email" type="text" />
              </div>

              <div className="label">
                <label htmlFor="text">Password</label>
              </div>
              <div>
                <input id="password" name="password" type="text" />
              </div>
              <br />
              <button type="submit">Sign up!</button>
            </div>
          </div>
        </form>
      </main>

      <footer className="footer">
        Powered by{' '}
        <span>Vaepr | ware</span>
      </footer>
    </div>
  );
}

export default App;
