import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { API_USER_URL } from "@/config";

export default function CartScreen() {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartItems = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Lỗi', 'Không tìm thấy token');
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_USER_URL}/api/v1/DPSSelectCartItem`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            
            if (data && data.response && Array.isArray(data.response.items)) {
                const items = data.response.items.map((item) => ({
                    id: item.accessoryId,
                    name: item.accessoryName,
                    price: item.price,
                    quantity: item.quantity,
                    shortDescription: item.shortDescription,
                    image: item.images.length > 0 ? item.images[0].imageUrl : 'https://via.placeholder.com/150',
                }));

                setCartItems(items);

                // Tính tổng tiền
                const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotalPrice(total);
            } else {
                console.warn("Giỏ hàng trống hoặc dữ liệu không đúng định dạng:", data);
                setCartItems([]);
                setTotalPrice(0);
            }
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCartItems();
        }, [])
    );

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity <= 0) {
            Alert.alert(
                "Xác nhận xoá",
                "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý",
                        onPress: async () => {
                            try {
                                const token = await AsyncStorage.getItem('token');
                                if (!token) {
                                    Alert.alert('Lỗi', 'Không tìm thấy token');
                                    return;
                                }
    
                                // Gửi request xóa sản phẩm khi số lượng = 0
                                const response = await fetch(`${API_USER_URL}/api/v1/DPSUpdateCartItem`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        quantity: 0,
                                        accessoryID: id
                                    }),
                                });
    
                                if (!response.ok) {
                                    throw new Error('Xoá sản phẩm thất bại');
                                }
    
                                // Cập nhật lại giỏ hàng sau khi xoá thành công
                                const updatedItems = cartItems.filter(item => item.id !== id);
                                setCartItems(updatedItems);
    
                                // Tính lại tổng tiền
                                const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                                setTotalPrice(total);
    
                                console.log('Sản phẩm đã được xoá thành công');
                            } catch (error) {
                                console.error('Lỗi khi xoá sản phẩm:', error);
                                Alert.alert('Lỗi', 'Không thể xoá sản phẩm');
                            }
                        }
                    }
                ]
            );
        } else {
            const updatedItems = cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);
            const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total);
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Lỗi', 'Không tìm thấy token');
                    return;
                }
                const response = await fetch(`${API_USER_URL}/api/v1/DPSUpdateCartItem`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: newQuantity,
                        accessoryID: id
                    }),
                });
                if (!response.ok) {
                    throw new Error('Cập nhật thất bại');
                }
                console.log('Cập nhật số lượng thành công');
            } catch (error) {
                console.error('Lỗi khi cập nhật số lượng:', error);
                Alert.alert('Lỗi', 'Không thể cập nhật số lượng');
            }
        }
    };
    
    

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text>Đang tải giỏ hàng...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header Navigation */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>{'< Trở về danh mục'}</Text>
            </TouchableOpacity>

            {/* Danh sách giỏ hàng */}
            <ScrollView style={styles.cartList}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.priceQuantityContainer}>
                                    <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
                                    {/* Quantity Controller */}
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>Giỏ hàng trống</Text>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalText}>Tổng tiền: {totalPrice.toLocaleString('vi-VN')}đ</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.buttonText}>Thanh Toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Styles cập nhật
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
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginTop: 30,
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
    priceQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#FF4500',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',  // Đẩy về bên phải
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    quantityButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f0f0f0',
    },
    quantityButtonText: {
        fontSize: 16,
        color: '#000',
    },
    itemQuantity: {
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
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
