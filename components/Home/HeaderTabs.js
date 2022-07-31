import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function HeaderTabs(props){
    const [activeTab,setActiveTab] = useState("Delivery");
    return(
        <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
            <HeaderButton text="Delivery" 
                activeTab={props.activeTab} 
                setActiveTab={props.setActiveTab}/>
            <HeaderButton 
                text="Pickup" 
                activeTab={props.activeTab} 
                setActiveTab={props.setActiveTab}/> 
        </View>
    );
}
const HeaderButton = (props) => (
    <TouchableOpacity style={{ backgroundColor: props.activeTab === props.text ? 'black' : 'white', 
        paddingVertical: 6, 
        paddingHorizontal: 16, 
        borderRadius: 30, }} 
        onPress={()=>props.setActiveTab(props.text)}>
    <Text style={{ color: props.activeTab === props.text ? 'white' : 'black', 
        fontSize: 15, 
        fontWeight: 'bold', }}>
            {props.text}
    </Text>
    </TouchableOpacity>
);
