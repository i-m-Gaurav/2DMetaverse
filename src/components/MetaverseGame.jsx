import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MetaverseScene from '../game/scenes/MetaverseScene';

const MetaverseGame = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false
                }
            },
            scene: [MetaverseScene]
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <div id="game-container" className="flex-1" />
        </div>
    );
};

export default MetaverseGame;
