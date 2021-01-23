import React, { useState, useEffect, useRef } from 'react'

const options = [{
    label: "red",
    value: "red"
},
{
    label: "green",
    value: "green"
},
{
    label: "blue",
    value: "blue"
}]

const Dropdown = () => {
    const [selected, setSelected] = useState(options[0])
    const [open, setOpen] = useState(false)
    const ref = useRef();

    useEffect(()=> {
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return
            }
            setOpen(false)
        }
        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick)
        }
    },[])

    const renderedOptions = options.map((option) => {
        if (option === selected) {
            return null
        }
        return (
            <div key={option.value} className="item" onClick={() => setSelected(option)}>
                {option.label}
            </div>
        )

    })

    return <div ref={ref} className="ui form">
        <div className="field">
            <label className="label">
                select a color
            </label>
            <div onClick={()=> setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                <i className="dropdown icon"></i>
                <div className="text">{selected.label}</div>
                <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
            </div>
        </div>
    </div>
}


export default Dropdown