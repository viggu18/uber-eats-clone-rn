import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const foodsArr = [
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and souce bechamel",
        price: "$135",
        image: "https://goop-img.com/wp-content/uploads/2020/03/Goop0846-1.jpg",
    },
    {
        title: "Tandoori Chicken",
        description: "Amazing Indian Dish with tenderloin chicken off the sizzles",
        price: "$192",
        image: "https://foodiesterminal.com/wp-content/uploads/2020/03/instant-pot-tandoori-chicken-4.jpg",
    },
    {
        title: "Chilaquiles",
        description: "Chilaquiles with cheese and sauce. A delicious mexican dish",
        price: "$145",
        image: "https://www.spoonforkbacon.com/wp-content/uploads/2019/03/Shakshuka_Chilaquiles-800x1066.jpg",
    },
    {
        title: "Chicken Cesar Salad",
        description: "One can never go wrong with Chicken Caesar salad.",
        price: "$215",
        image: "https://www.spendwithpennies.com/wp-content/uploads/2021/04/FT-Chicken-Caesar-Salad-SpendWithPennies-4.jpg",
    },
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and souce bechamel",
        price: "$135",
        image: "https://goop-img.com/wp-content/uploads/2020/03/Goop0846-1.jpg",
    },
];


const styles=StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:20,
    },
    titleStyle: {
        fontSize: 19,
        fontWeight:'600',
    }
})
export default function MenuItem({restaurantName, foods, hideCheckbox,marginLeft,}) {
    const dispatch = useDispatch();
    const selectItem = (item,checkboxValue) => dispatch({
    type: 'ADD_TO_CART',
    payload:{...item, restaurantName: restaurantName, checkboxValue: checkboxValue,},
    });

    const cartItem = useSelector((state)=> state.cartReducer.selectedItems.items);
    const isFoodInCart = (food,cartItem) =>
        Boolean(cartItem.find((item) => item.title === food.title));



    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        {foodsArr.map((food, index) => (
        <View key={index}>
            <View style={styles.menuItemStyle}>
                {hideCheckbox ? ( <></> ):(
                <BouncyCheckbox 
                iconStyle={{borderColor: 'lightgray', borderRadius: 0,}} 
                fillColor='green'
                isChecked ={isFoodInCart(food,cartItem)}
                onPress={(checkboxValue)=>selectItem(food, checkboxValue)}
                />
                )}
                <FoodInfo food={food}/>
                <FoodImage food={food}/>
            </View>
            <Divider width={0.5} orientation='vertical' style={{marginHorizontal:20}}/>
        </View>
        ))}
        </ScrollView>
    );
}

const FoodInfo = (props) => (
    <View style={{width: 240, justifyContent: 'space-evenly'}}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);

const FoodImage =(props) => (
    <View>
        <Image source={{uri: props.food.image}}
        style={{ width: 100, height: 100, borderRadius: 8}}/>
    </View>
);
