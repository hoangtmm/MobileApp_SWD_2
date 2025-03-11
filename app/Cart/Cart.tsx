import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const cartItems = [
    {
        id: 1,
        name: 'Dây đeo Labubu Size R Đen',
        image: 'https://down-ph.img.susercontent.com/file/sg-11134201-7rdxi-lydyxs424h4n4e',
        price: '200.000đ',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Áo thun Labubu',
        image: 'https://example.com/product2.jpg',
        price: '300.000đ',
        quantity: 2,
    }
];

export default function CartScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header Navigation */}
            <TouchableOpacity style={styles.backButton} >
                <Text style={styles.backButtonText}>{'< Trở về danh mục'}</Text>
            </TouchableOpacity>

            <ScrollView style={styles.cartList}>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                            <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalText}>Tổng tiền: 500.000đ</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.buttonText}>Thanh Toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    backButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end', /* Đưa nút trở về sang phải */
        marginBottom: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cartList: {
        flex: 1,
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#FF4500',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    checkoutButton: {
        backgroundColor: '#00CC66',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});