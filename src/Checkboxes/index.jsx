import './Checkboxes.css'
import PropTypes from "prop-types"

export default function Checkboxes ( { checkboxesData, handleCheckboxClick } )
{
    return (
        <>
            {
                checkboxesData?.length > 0 && checkboxesData?.map( ( checkbox ) =>
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
                                    <Checkboxes
                                        checkboxesData={ checkbox.children }
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

Checkboxes.propTypes = {
    checkboxesData: PropTypes.arrayOf( PropTypes.shape( {
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
