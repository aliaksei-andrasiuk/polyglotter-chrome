import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Settings from './components/Settings'
import './Popup.scss'
import { Link } from 'react-router-dom'
import { usePauseExtension } from './hooks'

function Popup() {
    const {isPaused, handlePauseChange } = usePauseExtension();

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            <div>
                <label htmlFor="pause-checkbox">Pause</label>
                <input
                    type="checkbox"
                    name=""
                    id="pause-checkbox"
                    checked={isPaused}
                    onChange={handlePauseChange}
                />
            </div>
        </div>
    )
}

export default Popup