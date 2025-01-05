import { useState } from 'react'
import './counter.css'

export default function UndoableCounter ()
{
    const [ counter, setCounter ] = useState( [ 0 ] )
    const [ position, setPosition ] = useState( 0 )
    const [ history, setHistory ] = useState( [] )

    function handleBtnClick ( value )
    {
        let cloneCounter = [ ...counter ]
        if ( position < counter.length - 1 )
        {
            cloneCounter = cloneCounter.slice( 0, position + 1 )
        }

        let newCounterVal = cloneCounter[ position ] + value
        setCounter( [
            ...cloneCounter,
            cloneCounter[ position ] + value
        ] )
        setPosition( ( pos ) => pos + 1 )
        setHistory( [
            {
                action: value,
                before: cloneCounter[ position ],
                after: newCounterVal
            },
            ...history,
        ] )
    }

    function handleUndo ()
    {
        if ( position === 0 )
        {
            return
        }

        setPosition( ( pos ) => pos - 1 )

        let cloneHistory = [ ...history ]
        cloneHistory = cloneHistory.slice( 1 )
        setHistory( cloneHistory )
    }

    function handleRedo ()
    {
        if ( position === counter.length - 1 )
        {
            return
        }

        setPosition( ( pos ) => pos + 1 )

        let before = counter[ position ]
        let after = counter[ position + 1 ]
        setHistory( [
            {
                action: after - before,
                before,
                after
            },
            ...history,
        ] )
    }

    return (
        <div className="container">
            <h1 className="title">Undoable Counter</h1>

            {/* Undo and Redo Buttons */ }
            <div className="undo-redo">
                <button className="button undo" disabled={ position === 0 } onClick={ handleUndo }>Undo</button>
                <button className="button redo" disabled={ position === counter.length - 1 } onClick={ handleRedo }>Redo</button>
            </div>

            {/* Counter Buttons and Display */ }
            <div className="counter-controls">
                <button className="button decrement" onClick={ () => handleBtnClick( -100 ) }>-100</button>
                <button className="button decrement" onClick={ () => handleBtnClick( -10 ) }>-10</button>
                <button className="button decrement" onClick={ () => handleBtnClick( -1 ) }>-1</button>
                <span className="counter-value">{ counter[ position ] }</span>
                <button className="button increment" onClick={ () => handleBtnClick( 1 ) }>+1</button>
                <button className="button increment" onClick={ () => handleBtnClick( 10 ) }>+10</button>
                <button className="button increment" onClick={ () => handleBtnClick( 100 ) }>+100</button>
            </div>

            {/* History Section */ }
            {
                history.length > 0 && (
                    <div className="history">
                        <h2>History</h2>
                        <ul className="history-list">
                            {
                                history.map( ( { action, before, after }, i ) =>
                                {
                                    return (
                                        <li key={ i }>
                                            { `${ action } (${ before } → ${ after })` }
                                        </li>
                                    )
                                } )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
