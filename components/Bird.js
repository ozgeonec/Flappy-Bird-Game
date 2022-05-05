import React from "react";
import {View} from 'react-native';


const Bird = ({birdBottom, birdLeft}) => {


    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'blue',
            width: 50, height: 50,
            bottom: birdBottom,
            left: birdLeft
        }}/>

    );

}

export default Bird;
