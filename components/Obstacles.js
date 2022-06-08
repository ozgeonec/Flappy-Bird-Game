import React from "react";
import {View} from 'react-native';


const Obstacles = ({obstacleLeft, obstacleWidth, obstacleHeight, color, randomBottom,obstacleGap}) => {



    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight ,
                bottom: obstacleGap + obstacleHeight + randomBottom,
                left: obstacleLeft
            }}/>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                bottom: randomBottom,
                left: obstacleLeft
            }}/>
        </>
    );

}

export default Obstacles;
