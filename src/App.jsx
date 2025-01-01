import { useState } from "react";
import Checkboxes from "./Checkboxes";

function App ()
{
  const [ checkboxesData, setCheckboxesData ] = useState( [
    {
      id: 1,
      name: 'Electronics',
      checked: false,
      children: [
        {
          id: 2,
          name: 'Mobile phones',
          checked: false,
          children: [
            {
              id: 3,
              name: 'iPhone',
              checked: false,
            },
            {
              id: 4,
              name: 'Android',
              checked: false,
            },
          ],
        },
        {
          id: 5,
          name: 'Laptops',
          checked: false,
          children: [
            {
              id: 6,
              name: 'MacBook',
              checked: false,
            },
            {
              id: 7,
              name: 'Surface Pro',
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'Books',
      checked: false,
      children: [
        {
          id: 9,
          name: 'Fiction',
          checked: false,
        },
        {
          id: 10,
          name: 'Non-fiction',
          checked: false,
        },
      ],
    },
    {
      id: 11,
      name: 'Toys',
      checked: false,
    },
  ] );

  function handleCheckboxClick ( event )
  {
    const newCheckboxes = helper( structuredClone( checkboxesData ), Number( event.target.id ), event.target.checked )
    setCheckboxesData( newCheckboxes )
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
    <>
      <Checkboxes checkboxesData={ checkboxesData } handleCheckboxClick={ handleCheckboxClick } />
    </>
  )
}

export default App
