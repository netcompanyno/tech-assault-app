import io from 'socket.io-client';
import getUserToken from './util/getUserToken';
import Events from '../constants/Events';

// Server events.
import eventHandlers from './eventHandlers';

(function () {

    const userToken = getUserToken();

    if (!userToken) {
        return;
    }

    const socket = io();

    socket.token = userToken;

    socket.on(Events.loginRequested, eventHandlers.onLoginRequested);
    socket.on(Events.loginAccepted, eventHandlers.onLoginAccepted);
    socket.on(Events.loginRefused, eventHandlers.onLoginRefused);
    socket.on(Events.userUnauthorized, eventHandlers.onUserUnauthorized);
    socket.on(Events.matchStarted, eventHandlers.onMatchStarted);
    socket.on(Events.turnPerformed, eventHandlers.onTurnPerformed);

    document.getElementById('enlist').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(Events.playerEnlisted);
    });

    document.getElementById('perform').addEventListener('click', function (event) {
        event.preventDefault();
        socket.emit(
            Events.performTurn,
            {
                actionType: 'cardPlaced',
                cardId: document.getElementById('cardid').value,
                cardPosition: parseInt(document.getElementById('cardpos').value)
            });
    });
})();