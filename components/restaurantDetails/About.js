import React from 'react';
import {View, Text,Image} from 'react-native';


const image = 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg'
const title= 'Farmhouse Kitchen Thai Cuisine'
const description = 'Thai - Confort - $$ - 🎟 - 4 ⭐ (2913+) '
export default function About() {
    return(
        <View>
            <RestaurantImage image={image}/>
            <RestaurantTitle title={title}/>
            <RestaurantDescription description={description}/>
        </View>
    );
}

const RestaurantImage = (props) => (
    <Image source = {{uri:props.image}} style={{width: '100%', height: 180}}/>
);

const RestaurantTitle= (props) =>( 
    <Text 
    style={{ 
        fontSize: 29, 
        fontWeight: 'bold', 
        marginTop: 10, 
        marginHorizontal:15}}>
            {props.title}
    </Text>
);

const RestaurantDescription =(props) => (
    <Text
    style={{marginLeft: 15, marginTop:10, fontWeight: '400',fontSize: 15.5}}>
        {props.description}</Text>
);