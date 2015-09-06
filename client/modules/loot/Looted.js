import React from 'react';
import Card from '../common/Card';

export default class Looted extends React.Component {

    render() {
        const { winner, cardsLooted } = this.props.match;

        const title = winner === 'N/A'
            ? 'It\'s a Draw!'
            : winner === true
            ? 'You Won!'
            : 'You Lost!';

        const text = winner === true
            ? 'You acquired the following cards:'
            : 'You lost the following cards:';

        return (
            <div>
                <h2>{title}</h2>
                {text}
                {cardsLooted.map(this.renderCard.bind(this))}
                <button onClick={this.handleBackClick.bind(this)}>Back</button>
            </div>
        );
    }

    renderCard(card) {
        return <Card key={card.id} selected={false} card={card} />;
    }

    handleBackClick(event) {
        event.preventDefault();

        this.props.onExitLoot();
    }
}