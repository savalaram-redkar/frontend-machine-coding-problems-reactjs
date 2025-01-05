import { useState } from "react";
import PropTypes from "prop-types"
import Checkbox from "./Checkbox";

export default function NestedCheckboxes ( { checkboxesData } )
{
    const [ checkboxes, setCheckboxes ] = useState( checkboxesData );

    function handleCheckboxClick ( event )
    {
        const newCheckboxes = helper( structuredClone( checkboxes ), Number( event.target.id ), event.target.checked )
        setCheckboxes( newCheckboxes )
    }

    function helper ( obj, id, checked )
    {
        if ( Array.isArray( obj ) )
        {
            return obj.map( ( child ) => helper( child, id, checked ) )
        }

        if ( obj.id === id )
        {
            obj.checked = checked

            // Update children's checked status based on all parent's status
            if ( obj?.children )
            {
                obj.children = obj.children.map( ( child ) => helper( child, child.id, checked ) )
            }
        } else if ( obj?.children )
        {
            obj.children = obj.children.map( ( child ) => helper( child, id, checked ) )

            // Update parent's checked status based on all children's status
            const allChecked = obj.children.every( ( child ) => child.checked === true )
            const someChecked = obj.children.some( ( child ) => child.checked === true || child.checked === "indeterminate" )
            obj.checked = allChecked ? true : someChecked ? "indeterminate" : false
        }

        return obj
    }

    return (
        <Checkbox checkboxes={ checkboxes } handleCheckboxClick={ handleCheckboxClick } />
    )
}

NestedCheckboxes.propTypes = {
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
}