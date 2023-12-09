import React from 'react';

const Voted = ({setIsVoting, content}) => {
    const confirm = () => setIsVoting(false)
    if (!Object.keys(content).length) return null
    return (
        <main className="page">

            <section className="done">
                <div className="done__container">
                    <div className="done__body _icon-cheked">
                        <div className="done__title title">{content.vote.done_title}</div>
                        <div className="done__text text">{content.vote.done_description}</div>
                        <button onClick={confirm} className="done__link button">{content.vote.continue}</button>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Voted;
