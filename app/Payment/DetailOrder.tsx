import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProductDetailScreen() {
    return (
        <ScrollView style={styles.container}>

            {/* Header Navigation */}
            <TouchableOpacity style={styles.backButton} >
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
            <TouchableOpacity style={styles.contactButton}>
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
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF69B4',
        padding: 15,
    },
    navItems: {
        flexDirection: 'row',
    },
    navButton: {
        padding: 10,
    },
    authButtons: {
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    signupButton: {
        backgroundColor: '#C71585',
        padding: 10,
        borderRadius: 5,
    },
    navText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
