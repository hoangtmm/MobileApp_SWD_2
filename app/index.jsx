import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'
export default function Index() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
        }}>
            <Image source={require('@/assets/images/logo.png')}
                style={{
                    width: '100%',
                    height: 300,
                    marginTop: 60,
                }} />
            <View style={{
                padding: 25,
                backgroundColor: Colors.PRIMARY,
                height: '100%',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
            }}>
                <Text style={{
                    fontSize: 30,
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-bold'
                }}>WELCOME TO BABY THREE TRADING PLATFORM</Text>
                <Text style={{
                    fontSize: 20,
                    color: Colors.WHITE,
                    textAlign: 'center',
                    marginTop: 20,
                    fontFamily: 'outfit'
                }}>Baby Three - Smart Trading, Secure Future!!!</Text>
                
                <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signUp')}>
                    <Text style = {[styles.buttonText, {color: Colors.PRIMARY}]}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/auth/signIn')} style={[styles.button, {
                    backgroundColor: Colors.PRIMARY,
                    borderWidth: 1,
                    borderColor: Colors.WHITE,
                }]}>
                    <Text style = {[styles.buttonText, {color: Colors.WHITE}]}>Already have an Account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'outfit'

    }
})