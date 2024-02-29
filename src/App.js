import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Grill } from './components/grill/Grill'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <span className="navbar-brand px-3">Technical test</span>
        </nav>
        <Grill></Grill>
      </div>
    </DndProvider>
  )
}

export default App
