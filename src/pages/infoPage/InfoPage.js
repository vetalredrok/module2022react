import React from 'react';

const InfoPage = () => {
    return (
        <div>
            <p>Thank you for teaching!</p>
            <h1>
                Here all what I've done at this site.
            </h1>

            <div>
                <h2>Login</h2>
                <ul>
                    <li> You can create account with email, password and name</li>
                    <li> You will be remembered even after refresh of a page</li>
                    <li> To log out press button</li>
                    <li>Name will be discovered in Navigation component after logination</li>
                    <li>Random background on Navigation component, reload page to change it</li>
                    <li>Dark/Light theme</li>
                </ul>
                <h2>Home page</h2>
                <ul>
                    <li>First time when you visit this page you will get Top rated films and 6 random genres</li>
                    <li>To get another 6 random genres reload the page</li>
                    <li>Pagination 500 pages</li>
                    <li>Press on film image to open full info and trailer</li>
                    <li>If image of film will not be found - it will be replaced with my 404 image</li>
                </ul>
                <h2>Movie List</h2>
                <ul>
                    <li>Random films with pagination</li>
                    <li>Page can be shared with anyone to get the same result(ex. http://localhost:3000/movies?page=5)</li>
                    <li>Point cursor to image of a film to see additional info</li>
                    <li>Press on film image or film title to open full info and trailer</li>
                    <li>If image of film will not be found - it will be replaced with my 404 image</li>
                </ul>
                <h2>Search Movie</h2>
                <ul>
                    <li>You can search by film title</li>
                    <li>Pagination</li>
                    <li>Point cursor to image of a film to see additional info</li>
                    <li>Page can be shared with anyone to get the same result(ex. http://localhost:3000/search/harry?page=2)</li>
                    <li>Press on film image or film title to open full info and trailer</li>
                    <li>If image of film will not be found - it will be replaced with my 404 image (ex. http://localhost:3000/search/harry?page=5)</li>
                </ul>
                <h2>Discover by genre</h2>
                <ul>
                    <li>List of all genres, choose one</li>
                    <li>Pagination</li>
                    <li>Point cursor to image of a film to see additional info</li>
                    <li>Page can be shared with anyone to get the same result(ex. http://localhost:3000/discoverGenre/36?page=3)</li>
                    <li>Press on film image or film title to open full info and trailer</li>
                    <li>If image of film will not be found - it will be replaced with my 404 image (ex. http://localhost:3000/discoverGenre/36?page=498)</li>
                </ul>
                <h2>Footer</h2>
                <ul>
                    <li>Links to my profiles</li>
                </ul>
            </div>
        </div>
    );
};

export {InfoPage};