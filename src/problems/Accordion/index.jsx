import "./Accordion.css"
import { useState } from "react"
import PropTypes from "prop-types"

export default function Accordion ( { title, content } )
{
    const [ isActive, setIsActive ] = useState( false )

    return (
        <div className="accordion-item">
            <button className="accordion-trigger" aria-expanded={ isActive } onClick={ () => setIsActive( !isActive ) }>
                <span>{ title }</span>
                <span>{ isActive ? "-" : "+" }</span>
            </button>
            {
                isActive && (
                    <div className="accordion-content" role="region">
                        { content }
                    </div>
                )
            }
        </div >
    )
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
