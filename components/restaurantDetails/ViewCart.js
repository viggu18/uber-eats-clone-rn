import React from "react";
import { View, Text, TouchableOpacity , Modal, StyleSheet} from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import LottieView from 'lottie-react-native';


export default function ViewCart({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading,setloading] = useState(false);
    const {items , restaurantName} = useSelector((state)=> state.cartReducer.selectedItems);
    const total = items.map((item) => Number(item.price.replace('$',''))).reduce((prev,curr) => prev+curr, 0);
    const totalUSD = total.toLocaleString('en',{
        style: 'currency',
        currency: 'USD',
    });

    const addOrderToFirebase = () => { 
        setloading(true);
        const db = firebase.firestore();
        db.collection('orders').add({
            items: items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(()=> {
            setTimeout(()=> {
                setloading(false);
                navigation.navigate('OrderCompleted');
            },2500)
        });
    };

    const styles = StyleSheet.create({
        modalContainer: {
            justifyContent: 'flex-end',
            flex:1 ,
            backgroundColor: 'rgba(0,0,0,0.7)',
        },
        modalCheckoutContainer: {
            backgroundColor: 'white',
            height: 500,
            padding: 16,
            borderWidth: 1,
        },
        restaurantName: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 10,
            fontSize: 18,
        },
        subTotalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
        },
        subTotalText: {
            textAlign: 'left',
            fontWeight:'600',
            marginBottom: 10,
            fontSize: 15,
            fontWeight: 'bold',
        },
    });

    const checkoutModalContent = () => {
        return (
            <>
            <View style={styles.modalContainer}>
                <View style={styles.modalCheckoutContainer}>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                    {items.map((item,index)=>(
                        <OrderItem key={index} item={item}/>
                    ))}
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalText}>SubTotal</Text>
                        <Text>{totalUSD}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                        <TouchableOpacity activeOpacity={0.7} style={{
                            marginTop: 20,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            width: 300,
                            padding: 13,
                            position: 'relative',
                            borderRadius: 30,
                        }} 
                        onPress={()=> {addOrderToFirebase(); setModalVisible(false);}}>
                        <Text style={{color:'white', fontSize: 20}}>Check Out</Text>
                        <Text style={{color:'white',
                                position: 'absolute',
                                right:20,fontSize:15, 
                                top:17,marginRight:40, 
                                fontWeight: 'bold'}}>{total>0 ? totalUSD : ''}
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </>
        )
    };

    return(
        <>
        <Modal animationType="slide" 
        visible={modalVisible} 
        transparent={true} 
        onRequestClose={() => setModalVisible(false)}>
            {checkoutModalContent()}
        </Modal>
        {total>0 ? (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems: 'center',
            flexDirection:'row',

            position: 'absolute',
            top:270,
            zIndex: 999,
        }}>
        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            width:'100%',
        }}>
            <TouchableOpacity activeOpacity={0.7} style={{
                marginTop: 20,
                backgroundColor: 'black',
                alignItems:'center',
                justifyContent:'center',
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: 'relative',
                flexDirection:'row',

            }}
            onPress={() => setModalVisible(true)}>
            <Text style={{color:'white',fontSize:20,marginRight: 30,}}>View Cart</Text>
            <Text style={{color:'white',fontSize:20,marginRight: 30,}}>{totalUSD}</Text>
            </TouchableOpacity>
        </View>
        </View>)
        : (<></>)}
        {loading ? (<View style={{ 
                backgroundColor: 'black', 
                opacity: 0.6, 
                position:'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                }}><LottieView style={{height:200,}} source={require('../../assets/animations/scanner.json')} autoPlay speed={3}/>
                </View>): (<></>)}
        </>
    );
}