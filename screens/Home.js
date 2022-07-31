import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import HeaderTabs from '../components/Home/HeaderTabs';
import SearchBar from '../components/Home/SearchBar';
import Catergories from '../components/Home/Categories';
import RestaurantItem, { restaurant} from '../components/Home/RestaurantItem';
import BottomTabs from '../components/Home/BottomTabs';
import { Divider } from 'react-native-elements';

const YELP_API_KEY= "bdRJutLhFAQJ36t7b89CWjHFBU4OKzjt9wvZzcY-nkgmvTqlNMjZWV1eG7iBQ9R74SyfxRg9LWnBAkZY06BtAZAe4d2dfX-2vuX8a1l5V7foctHfX9UKEyoM5ts3YXYx";

export default function Home({navigation}){
    const [restaurantData,setRestaurantData] = React.useState(restaurant)
    const [city, setCity] = useState("San Francisco")
    const [activeTab, setActiveTab] = useState('Delivery');
    const getRestaurantFromYelp = () => {
        const yelpurl=`https://api.yelp.com/v3/businesses/search?term=restaurnts&location=${city}`

    const apiOptions ={
        headers: {
            Autherization: `Bearer ${YELP_API_KEY}`,
        },
    };
        return fetch(yelpurl,apiOptions)
        .then((res) => res.json())
        .then(json => setRestaurantData(
            json.businesses.filter((businesses)=> 
            business.transactions.includes(activeTab.toLowerCase())
            )
            )
            );
    };
    //useEffect(() => {getRestaurantFromYelp();},[city,activeTab]);
    return(
        <SafeAreaView style={styles.fscreen}>
            <View style={styles.hbtn}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Catergories/>
                <RestaurantItem restaurantData={restaurantData} navigation={navigation} />
            </ScrollView>
            <Divider width={1}/>
                <BottomTabs/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    fscreen: {
        backgroundColor: '#eee',
        flex :1,
    },
    hbtn: {
        backgroundColor: 'white',
        padding: 15,
    },
})