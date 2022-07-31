import React from 'react'
import {View, Text,Image, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export const restaurant=[
    {
        name: "Farmhouse Kitchen Thai Restaurant",
        rating:4.5,
        image: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg',
    },
    {
        name: "Farmhouse Kitchen Thai Restaurant",
        rating:4.5,
        image: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg',
    },
    {
        name: "Farmhouse Kitchen Thai Restaurant",
        rating:4.5,
        image: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg',
    },
];

export default function RestaurantItem({navigation}){

    return(
        <>
        {restaurant.map((restaurant,index) => (
            <TouchableOpacity key={index} activeOpacity={1} style={{marginBottom:10}} 
            onPress={() => navigation.navigate("RestaurantDetail",{name: restaurant.name,})} >
        <View style={{
            marginTop:5,
            padding:15,
            backgroundColor: 'white',
        }}>
            <RestaurantImage image={restaurant.image}/>
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
        </View>
        </TouchableOpacity>
        ))}
       </> 
    );
}

const RestaurantImage =(props) =>(
    <>
    <Image source={{
        uri: props.image
        }}
        style={{width: '100%', height:180}}/>   
    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons name='heart-outline' size={25} color='#fff'/>
    </TouchableOpacity>
    </>
);

const RestaurantInfo = (props) => (
    <View style={{
        flexDirection: 'row',
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <View>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{props.name}</Text>
            <Text style={{fontSize:13, color:'gray'}}>30-45 mins</Text>
        </View>
        <View style={{
            backgroundColor: '#eee',
            height:30,
            width: 30,
            alignItems:'center',
            borderRadius: 15,
            justifyContent:'center',
        }}>
            <Text>{props.rating}</Text>
        </View>
    </View>
)