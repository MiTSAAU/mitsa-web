const App = () => (
  <main>
    <Nav/>
    <Hero/>
    <Meta/>
    <Panelists/>
    <About/>
    <Footer/>
  </main>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
