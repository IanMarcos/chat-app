import { Link } from 'react-router-dom';

function LinkText( {text, hypertext, path }) {
    return(
        <div className="row my-2">
            <p className="text-center">{text} <Link to ={path}>{hypertext}</Link></p>
        </div>
    )
}

export default LinkText;
