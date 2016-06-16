import React from 'react';
import { Link } from 'react-router';

// The first argument is the props, that we get in that case from his parent
const FilterLink = ({ filter, children }) => {
    // When we set children it means that the parent component can specify the children
    return (
        <Link
            to={ filter === 'all'? '' : filter }
            activeStyle = {{
                textDecoration: 'none',
                color: 'black'
            }}
        >
            { children }
        </Link>
    )
}

export default FilterLink;