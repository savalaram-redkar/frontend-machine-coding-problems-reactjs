import './Checkbox.css'
import PropTypes from "prop-types"

export default function Checkbox ( { checkboxes, handleCheckboxClick } )
{
    return (
        <>
            {
                checkboxes?.length > 0 && checkboxes?.map( ( checkbox ) =>
                {
                    return (
                        <div key={ checkbox.id } className="checkbox-container">
                            <input
                                type="checkbox"
                                name={ checkbox.name }
                                id={ checkbox.id }
                                checked={ checkbox.checked === true }
                                onChange={ handleCheckboxClick }
                                ref={ ( el ) =>
                                {
                                    if ( el )
                                    {
                                        el.indeterminate = checkbox.checked === "indeterminate"
                                    }
                                } }
                                className="checkbox"
                            />
                            <label htmlFor={ checkbox.id } className="checkbox-label">{ checkbox.name }</label>
                            {
                                checkbox?.children && (
                                    <Checkbox
                                        checkboxes={ checkbox.children }
                                        handleCheckboxClick={ handleCheckboxClick }
                                    />
                                )
                            }
                        </div>
                    )
                } )
            }
        </>
    )
}

Checkbox.propTypes = {
    checkboxes: PropTypes.arrayOf( PropTypes.shape( {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.oneOfType( [
            PropTypes.bool,
            PropTypes.oneOf( [ 'indeterminate' ] )
        ] ).isRequired,
        children: PropTypes.arrayOf( PropTypes.shape( {
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            checked: PropTypes.oneOfType( [
                PropTypes.bool,
                PropTypes.oneOf( [ 'indeterminate' ] )
            ] ).isRequired,
            children: PropTypes.array
        } ) )
    } ) ),
    handleCheckboxClick: PropTypes.func
}
