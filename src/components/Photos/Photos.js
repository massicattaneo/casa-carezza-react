import React, { useEffect } from 'react';

export function Photos() {
    useEffect(() => {
        function Node(markup) {
            const div = document.createElement('div');
            div.innerHTML = markup;
            return div.children[0];
        }

        const elementById = document.getElementById('lightgallery');
        (new Array(29).fill(0).forEach((zero, index) => {
            const markup = `<a href="gallery-home/foto/images/${index + 1}.jpeg"><img src="gallery-home/foto/images/${index + 1}.jpeg" width="100px"></a>`;
            elementById.appendChild(Node(markup));
        }));
        window.lightGallery(elementById, {
            thumbnail: true
        });
    });
    return <section id="main" className="container">
        <header>
            <h2>Foto</h2>
            <p>La galleria di foto del nostro residence</p>
        </header>
        <div id="lightgallery" style={{ textAlign: 'center' }}>

        </div>
    </section>;
}
