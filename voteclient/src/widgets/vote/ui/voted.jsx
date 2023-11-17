import React from 'react';

const Voted = ({setIsVoting}) => {
    const confirm = () => setIsVoting(false)
    return (
        <main className="page">

            <section className="done">
                <div className="done__container">
                    <div className="done__body _icon-cheked">
                        <div className="done__title title">Ваш голос принят!</div>
                        <div className="done__text text">Благодарим за участие в голосовании</div>
                        <button onClick={confirm} className="done__link button">Принять</button>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Voted;
