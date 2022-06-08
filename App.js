import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Bird from "./components/Bird";
import {useEffect, useState} from "react";
import Obstacles from "./components/Obstacles";
import {TouchableWithoutFeedback} from "react-native-web";

export default function App() {

    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const birdLeft = screenWidth / 2;
    const gravity = 3;
    let gameTimerId;
    let obstacleTimerId;
    let obstacleTimerIdTwo;

    const obstacleHeight = screenHeight / 2;
    const obstacleWidth = 60;
    const obstacleGap = 200;

    const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
    const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
    const [obstaclesNegativeHeight, setObstaclesNegativeHeight] = useState(0);
    const [obstaclesNegativeHeightTwo, setObstaclesNegativeHeightTwo] = useState(0);

    const [obstacleLeftTwo, setObstacleLeftTwo] = useState(screenWidth + screenWidth / 2 + 30);


    const [gameIsOver, setGameIsOver] = useState(false);
    const [score, setScore] = useState(0);


    useEffect(() => {

        if (birdBottom > 0) {

            gameTimerId = setInterval(() => {

                setBirdBottom(birdBottom => birdBottom - gravity);

            }, 30);
        }

        return () => {
            clearInterval(gameTimerId);
        }
    }, [birdBottom]);


    const jumpBird = () => {

        if (!gameIsOver && (birdBottom < screenHeight)) {
            setBirdBottom(birdBottom => birdBottom + 50);
        }
    }
    // start first obstacles
    useEffect(() => {

        if (obstacleLeft > -obstacleWidth) {

            obstacleTimerId = setInterval(() => {
                setObstacleLeft(obstaclesLeft => obstaclesLeft - 5);
            }, 30);

            return () => {
                clearInterval(obstacleTimerId);
            }
        } else {
            setObstacleLeft(screenWidth);
            setObstaclesNegativeHeight(-Math.random() * 100);
            setScore(score => score + 1);
        }


    }, [obstacleLeft]);

    // start second obstacles
    useEffect(() => {

        if (obstacleLeftTwo > -obstacleWidth) {

            obstacleTimerIdTwo = setInterval(() => {
                setObstacleLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5);
            }, 30);

            return () => {
                clearInterval(obstacleTimerIdTwo);
            }
        } else {
            setObstacleLeftTwo(screenWidth);
            setObstaclesNegativeHeightTwo(-Math.random() * 150);
            setScore(score => score + 1);
        }


    }, [obstacleLeftTwo]);


    //check for collisions
    useEffect(() => {
        if (
            ((birdBottom < (obstaclesNegativeHeight + obstacleHeight + 30) ||
                    birdBottom > (obstaclesNegativeHeight + obstacleHeight + gap - 30)) &&
                (obstacleLeft > screenWidth / 2 - 30 && obstacleLeft < screenWidth / 2 + 30)
            )
            ||
            ((birdBottom < (obstaclesNegativeHeightTwo + obstacleHeight + 30) ||
                    birdBottom > (obstaclesNegativeHeightTwo + obstacleHeight + gap - 30)) &&
                (obstacleLeftTwo > screenWidth / 2 - 30 && obstacleLeftTwo < screenWidth / 2 + 30)
            )
        ) {
            gameOver();
        }


    });

    const gameOver = () => {
        clearInterval(gameTimerId);
        clearInterval(obstacleTimerId);
        clearInterval(obstacleTimerIdTwo);
        setGameIsOver(true);
    }
    return (
        <TouchableWithoutFeedback onPress={jumpBird}>
            <View style={styles.container}>
                {gameIsOver && <Text>{score}</Text>}
                <Bird
                    birdBottom={birdBottom}
                    birdLeft={birdLeft}
                />
                <Obstacles obstacleHeight={obstacleHeight} obstacleLeft={obstacleLeft} obstacleWidth={obstacleWidth}
                           color={'green'} randomBottom={obstaclesNegativeHeight} obstacleGap={obstacleGap}/>
                <Obstacles obstacleHeight={obstacleHeight} obstacleLeft={obstacleLeftTwo} obstacleWidth={obstacleWidth}
                           color={'yellow'} randomBottom={obstaclesNegativeHeightTwo} obstacleGap={obstacleGap}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
