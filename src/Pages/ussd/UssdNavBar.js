// components/Navbar.js

import Link from 'next/link';

const UssdNavbar = () => {
    const navStyle = {
        backgroundColor: '#000000',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
    };

    const ulStyle = {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        width: '60%',
        padding: 0,
        margin: 0,
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li>
                    <Link href="/create-questions" passHref>
                        <p style={linkStyle}>Create Questions</p>
                    </Link>
                </li>
                <li>
                    <Link href="/create-subjects" passHref>
                        <p style={linkStyle}>Create subjects and classes</p>
                    </Link>
                </li>
            
                <li>
                    <Link href="/archived-quiz" passHref>
                        <p style={linkStyle}>Archived quiz</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default UssdNavbar;
