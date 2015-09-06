import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostLootCard from '../../util/requests/requestPostLootCard';
import Events from '../../constants/Events';

export default function onLoot(loot) {
    const { socket, server } = this;
    const { matchMap, tokenSocketMap } = server;
    const { token } = socket;

    const { cardId } = loot;

    requestUserByToken(token)
        .then(userByToken => {
            return requestPostLootCard(userByToken.id, cardId)
        })
        .then(match => {
            const { cards, cardsLooted, matchId } = match;

            const userTokens = matchMap[matchId];

            const cardsLootedObjects = cardsLooted.map(cardId => {
                const cardIndex = cards.findIndex(card => card.id === cardId);
                return cards[cardIndex];
            });

            userTokens.forEach(userToken => {
                const userSocket = tokenSocketMap[userToken];
                userSocket.emit(Events.lootPerformed, { cardsLooted: cardsLootedObjects });
            });

            delete matchMap[matchId];
        })
        .catch(err => console.log(err.stack));
}