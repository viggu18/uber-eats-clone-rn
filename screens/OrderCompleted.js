import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from 'firebase';
import MenuItem from '../components/restaurantDetails/MenuItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function OrderCompleted() {
    const [lastOrder, setlastOrder] =useState({
       items: {
            title: "Lasagna",
            description: "With butter lettuce, tomato and souce bechamel",
            price: "$135",
            image: "https://goop-img.com/wp-content/uploads/2020/03/Goop0846-1.jpg",
        },
    })
    const {items , restaurantName} = useSelector((state)=> state.cartReducer.selectedItems);
    const total = items.map((item) => Number(item.price.replace('$',''))).reduce((prev,curr) => prev+curr, 0);
    const totalUSD = total.toLocaleString('en',{
        style: 'currency',
        currency: 'USD',
    });

    useEffect(()=> {
        const db =firebase.firestore();
        const unsubscribe= db.collection('orders')
        .orderBy('createdAt','desc')
        .limit(1).onSnapshot((snapshot)=> { 
            snapshot.docs.map((doc)=>{
                setlastOrder(doc.data());
            });
        });
        return () => unsubscribe();
    },[])
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor: 'white',
        }}>
            <View style={{margin:15, alignItems:'center', height: '100%',}}>
            <LottieView style={{height:100, alignSelf: 'center', marginBottom: 30,marginTop: 20}}
            source={require('../assets/animations/check-mark.json')}
            autoPlay speed={0.5} loop={false}/>

            
            <Text style={{ fontSize: 20,fontWeight:'bold',}}>Your order at {restaurantName} has been placed for {totalUSD}</Text>

            <ScrollView>
            <MenuItem foods={lastOrder.items} hideCheckbox={true}/>
            </ScrollView>

            <LottieView style={{height:200, alignSelf: 'center', marginBottom: 30,marginTop: 20}}
            source={require('../assets/animations/cooking.json')} autoPlay speed={0.5}/>
            </View>
        </SafeAreaView>
    )
}