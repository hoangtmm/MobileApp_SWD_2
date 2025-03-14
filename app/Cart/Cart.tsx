import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const initialCartItems = [
    {
        id: 1,
        name: 'Labubu Black Size R Strap',
        image: 'https://down-ph.img.susercontent.com/file/sg-11134201-7rdxi-lydyxs424h4n4e',
        price: '200,000₫',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Labubu T-shirt',
        image: 'https://example.com/product2.jpg',
        price: '300,000₫',
        quantity: 2,
    }
];

// Array of sample QR code URLs to randomly select from
const qrCodeSamples = [
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=paymentid123456',
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=paymentid789012',
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=paymentid345678'
];

export default function CartScreen() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [totalAmount, setTotalAmount] = useState('500,000₫');
    const [showQRCode, setShowQRCode] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // Display random QR code
    const handleShowQRCode = () => {
        // Choose a random QR code from the array
        const randomIndex = Math.floor(Math.random() * qrCodeSamples.length);
        setQrCodeUrl(qrCodeSamples[randomIndex]);
        setShowQRCode(true);
    };

    // Close QR code screen
    const handleCloseQRCode = () => {
        setShowQRCode(false);
    };

    // Handle successful scan
    const handleScanSuccess = () => {
        setShowQRCode(false);
        setShowSuccessModal(true);

        // Automatically close notification after 3 seconds
        setTimeout(() => {
            setShowSuccessModal(false);
            // Remove all items from the cart
            setCartItems([]);
            // Reset total amount to 0
            setTotalAmount('0₫');
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* Header Navigation */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>{'< Back to catalog'}</Text>
            </TouchableOpacity>

            {cartItems.length > 0 ? (
                <ScrollView style={styles.cartList}>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.price}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Cart is empty</Text>
                    <Text style={styles.emptyCartSubtext}>Thank you for your purchase!</Text>
                </View>
            )}

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalText}>Total: {totalAmount}</Text>
                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        cartItems.length === 0 && styles.disabledButton
                    ]}
                    onPress={handleShowQRCode}
                    disabled={cartItems.length === 0}
                >
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>

            {/* QR Code Modal */}
            <Modal visible={showQRCode} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.qrContainer}>
                        <Text style={styles.qrTitle}>Scan QR code to pay</Text>
                        <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
                        <Text style={styles.qrInstruction}>Use your banking app or e-wallet to scan the code</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCloseQRCode}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.scanButton} onPress={handleScanSuccess}>
                                <Text style={styles.buttonText}>Simulate successful scan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Success notification modal */}
            <Modal visible={showSuccessModal} transparent={true} animationType="fade">
                <View style={styles.successModalContainer}>
                    <View style={styles.successBox}>
                        <Text style={styles.successIcon}>✓</Text>
                        <Text style={styles.successText}>Payment successful!</Text>
                        <Text style={styles.successSubtext}>Thank you for your purchase</Text>
                    </View>
                </View>
            </Modal>
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
        alignSelf: 'flex-end', /* Position back button to the right */
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
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyCartSubtext: {
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
    disabledButton: {
        backgroundColor: '#A0A0A0',
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    qrContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    qrImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    qrInstruction: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    scanButton: {
        backgroundColor: '#00CC66',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    successModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    successBox: {
        width: '70%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    successIcon: {
        fontSize: 50,
        color: '#00CC66',
        marginBottom: 10,
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    successSubtext: {
        color: '#555',
        textAlign: 'center',
    },
});