import  { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { useAuth } from '../contexts/AuthContext';
import MetaverseScene from '../game/scenes/MetaverseScene';

const MetaverseComponent = () => {
    const gameRef = useRef(null);
    const { user, onUserSignIn } = useAuth();

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            scene: [MetaverseScene],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        return () => {
            game.destroy(true);
        };
    }, []);

    useEffect(() => {
        const scene = gameRef.current?.scene.getScene('MetaverseScene');
        if (scene && user) {
            scene.addNewUser(user);
        }
    }, [user]);

    useEffect(() => {
        const handleNewUser = (newUser) => {
            const scene = gameRef.current?.scene.getScene('MetaverseScene');
            if (scene) {
                scene.addNewUser(newUser);
            }
        };

        onUserSignIn(handleNewUser);

        return () => {
            // Clean up listener if necessary
        };
    }, [onUserSignIn]);

    return <div id="phaser-game" />;
};

export default MetaverseComponent;