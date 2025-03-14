import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProductDetailScreen() {
    const [chatVisible, setChatVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, text: 'Chào bạn, bạn muốn đổi như nào ạ', sender: 'seller' },
        { id: 2, text: 'Mình muốn đổi của bạn với B 2 của mình', sender: 'user' },
    ]);

    const sendMessage = () => {
        if (message.trim()) {
            setChatMessages([...chatMessages, { id: chatMessages.length + 1, text: message, sender: 'user' }]);
            setMessage('');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                {/* Header Navigation */}
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'< Trở về danh mục'}</Text>
                </TouchableOpacity>

                {/* Product Information */}
                <Text style={styles.productTitle}>Dây đeo Labubu Size R Đen</Text>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'https://down-ph.img.susercontent.com/file/sg-11134201-7rdxi-lydyxs424h4n4e' }} style={styles.productImage} />
                </View>

                <View style={styles.productDetails}>
                    <Text style={styles.detailText}>Khách hàng trao đổi: Mèo Simmy</Text>
                    <Text style={styles.detailText}>Sản phẩm trao đổi: Dây đeo Labubu</Text>
                    <Text style={styles.detailText}>Màu sắc: Đen</Text>
                    <Text style={styles.detailText}>Kích cỡ: R</Text>
                    <Text style={styles.detailText}>Mục tiêu trao đổi: Đổi sang S Đỏ</Text>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.contactButton} onPress={() => setChatVisible(true)}>
                    <Text style={styles.buttonText}>LIÊN HỆ NGƯỜI BÁN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exchangeButton}>
                    <Text style={styles.buttonText}>YÊU CẦU TRAO ĐỔI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartButton}>
                    <Text style={styles.buttonText}>THÊM VÀO GIỎ HÀNG</Text>
                </TouchableOpacity>

                {/* Comments Section */}
                <Text style={styles.commentTitle}>45 Bình luận về sản phẩm</Text>
                <View style={styles.commentBox}>
                    <Text style={styles.commentText}>Mình muốn xin đổi dây đeo này, sẽ bù thêm tiền do hơi khác loại</Text>
                </View>
                <View style={styles.commentBox}>
                    <Text style={styles.commentText}>Oke bạn, vô hộp chat để thảo luận thêm nhé</Text>
                </View>
            </ScrollView>

            {/* Chat Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={chatVisible}
                onRequestClose={() => setChatVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.chatContainer}>
                        {/* Chat Header */}
                        <View style={styles.chatHeader}>
                            <Text style={styles.chatHeaderText}>Mèo Simmy</Text>
                            <TouchableOpacity onPress={() => setChatVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Chat Messages */}
                        <ScrollView style={styles.chatMessagesContainer}>
                            {chatMessages.map((item) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.messageBubble,
                                        item.sender === 'user' ? styles.userMessage : styles.sellerMessage
                                    ]}
                                >
                                    <Text style={styles.messageText}>{item.text}</Text>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Chat Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nhập tin nhắn..."
                                value={message}
                                onChangeText={setMessage}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                <Text style={styles.sendButtonText}>▶</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
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
        marginRight: 10,
        marginTop: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 200,
        height: 200,
    },
    productDetails: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    contactButton: {
        backgroundColor: '#FF00AA',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    exchangeButton: {
        backgroundColor: '#00CC66',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    cartButton: {
        backgroundColor: '#0099FF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    commentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentBox: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commentText: {
        fontSize: 14,
    },
    // Chat Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    chatContainer: {
        width: '90%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FF00AA',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF00AA',
        padding: 15,
    },
    chatHeaderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    closeButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chatMessagesContainer: {
        flex: 1,
        padding: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#0099FF',
    },
    sellerMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FF00AA',
    },
    messageText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#0099FF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});