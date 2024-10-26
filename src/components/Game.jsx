import  { useEffect } from 'react';
import Phaser from 'phaser';
import MetaverseScene from '../game/scenes/MetaverseScene';
import { useAuth } from '../contexts/AuthContext';

const Game = () => {
    const { user } = useAuth();

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {x: 0, y: 0 },
                    debug: false
                }
            },
            scene: MetaverseScene
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="bg-gray-800 text-white p-4">
                Welcome, {user?.displayName}
            </div>
            <div id="game-container" className="flex-1" />
        </div>
    );
};

export default Game;