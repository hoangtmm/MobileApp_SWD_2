import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from '@react-native-picker/picker';

export default function AddProductScreen() {
    // Initial state values
    const initialState = {
        productName: "Product name",
        description: "Enter description",
        price: "5.000.000",
        stock: "10",
        selectedCategories: [],
    };

    // Form state
    const [productName, setProductName] = useState(initialState.productName);
    const [description, setDescription] = useState(initialState.description);
    const [price, setPrice] = useState(initialState.price);
    const [stock, setStock] = useState(initialState.stock);
    const [selectedCategories, setSelectedCategories] = useState(initialState.selectedCategories);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const categories = [
        { id: 1, name: 'BU NGU 1 EYE', color: 'red', date: '10/5/2025' },
        { id: 2, name: 'BULALA CRYING 3 EYES', color: 'orange', date: '10/6/2025' },
        { id: 3, name: 'BULALA POOPING 2 EYES', color: 'orange', date: '10/6/2025' },
    ];

    const handleUploadPress = () => {
        alert('Upload functionality would be triggered here');
    };

    const toggleCategoryModal = () => {
        setShowCategoryModal(!showCategoryModal);
    };

    const toggleCategorySelection = (categoryId) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter(id => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const handleDone = () => {
        toggleCategoryModal();
    };

    // Function to remove a category from the list
    const removeCategory = (categoryId) => {
        setSelectedCategories(prevSelected =>
            prevSelected.filter(id => id !== categoryId)
        );
    };

    const handleBackToCatalog = () => {
        alert('Navigate back to catalog');
    };

    // Function to reset the form to initial state
    const handleCancel = () => {
        Alert.alert(
            "Reset Form",
            "Are you sure you want to reset all entered information?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setProductName(initialState.productName);
                        setDescription(initialState.description);
                        setPrice(initialState.price);
                        setStock(initialState.stock);
                        setSelectedCategories(initialState.selectedCategories);
                    }
                }
            ]
        );
    };

    const handleAdd = () => {
        alert('Product added successfully!');
        // Here you would typically save the data and navigate away
    };

    return (
        <View style={styles.container}>
            {/* Header with Title */}
            <Text style={styles.mainTitle}>Add new product!</Text>

            <ScrollView>
                {/* Product Information Section */}
                <Text style={styles.sectionTitle}>Product information</Text>

                {/* Image Upload */}
                <Text style={styles.label}>Image</Text>
                <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={handleUploadPress}
                >
                    <Text style={styles.uploadText}>
                        <Text style={styles.purpleText}>Upload a file</Text> or drag and drop
                    </Text>
                    <Text style={styles.smallText}>PNG, JPG, GIF up to 10MB</Text>
                </TouchableOpacity>

                {/* Name Input */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={productName}
                    onChangeText={setProductName}
                />

                {/* Description Input */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Price and Stock Row */}
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Pricing</Text>
                        <View style={styles.priceContainer}>
                            <TextInput
                                style={styles.priceInput}
                                value={price}
                                onChangeText={setPrice}
                                keyboardType="numeric"
                            />
                            <View style={styles.currencyBox}>
                                <Text>VND</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.label}>Stock</Text>
                        <TextInput
                            style={styles.input}
                            value={stock}
                            onChangeText={setStock}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Category Section */}
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                    style={styles.categorySelector}
                    onPress={toggleCategoryModal}
                >
                    <Text>Existing categories</Text>
                    <Text style={styles.plusIcon}>+</Text>
                </TouchableOpacity>

                {/* Selected Categories List - only shows if categories are selected */}
                {selectedCategories.length > 0 && !showCategoryModal && (
                    <View style={styles.categoriesList}>
                        {categories
                            .filter(cat => selectedCategories.includes(cat.id))
                            .map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={styles.categoryItem}
                                    onPress={() => removeCategory(cat.id)}
                                >
                                    <Text style={{ color: cat.color, marginRight: 5 }}>★</Text>
                                    <Text style={{ flex: 1 }}>{cat.name}</Text>
                                    <Text style={{ color: '#888' }}>{cat.date}</Text>
                                    <Text style={styles.removeIcon}>×</Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}

                {/* Category Modal */}
                {showCategoryModal && (
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Select Categories</Text>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryOption}
                                onPress={() => toggleCategorySelection(cat.id)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    selectedCategories.includes(cat.id) && styles.checkedBox
                                ]} />
                                <Text style={{ color: cat.color, marginRight: 5, marginLeft: 10 }}>★</Text>
                                <Text>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={handleDone}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAdd}
                    >
                        <Text style={styles.buttonText}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Return to Catalog Button (top right) */}
            <TouchableOpacity
                style={styles.returnToCatalogButton}
                onPress={handleBackToCatalog}
            >
                <Text style={styles.returnToCatalogText}>{'< Trở về danh mục'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    uploadArea: {
        height: 120,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    uploadText: {
        fontSize: 16,
    },
    purpleText: {
        color: 'purple',
        fontWeight: 'bold',
    },
    smallText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    column: {
        width: '48%',
    },
    priceContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    priceInput: {
        flex: 1,
        padding: 10,
    },
    currencyBox: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    categorySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
    },
    plusIcon: {
        fontSize: 20,
    },
    categoriesList: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 20,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    removeIcon: {
        fontSize: 20,
        color: '#888',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    modal: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
    },
    checkedBox: {
        backgroundColor: 'purple',
        borderColor: 'purple',
    },
    doneButton: {
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    cancelButton: {
        backgroundColor: '#a8c1d1',
        padding: 15,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#4e3fb3',
        padding: 15,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 16,
        zIndex: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#555',
    },
    returnToCatalogButton: {
        position: 'absolute',
        top: 15,
        right: 16,
        backgroundColor: '#2196F3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        zIndex: 10,
    },
    returnToCatalogText: {
        color: 'white',
        fontWeight: 'bold',
    },
});