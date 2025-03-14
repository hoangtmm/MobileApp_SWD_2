import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Picker } from 'react-native';

export default function AddressDetailScreen() {
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then(response => response.json())
            .then(data => setProvinces(data));
    }, []);

    const fetchDistricts = (provinceCode) => {
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(response => response.json())
            .then(data => setDistricts(data.districts));
    };

    const fetchWards = (districtCode) => {
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then(response => response.json())
            .then(data => setWards(data.wards));
    };

    const addNewAddress = () => {
        setModalVisible(true);
    };

    const confirmAddAddress = () => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            setAddresses([...addresses, `${selectedWard}, ${selectedDistrict}, ${selectedProvince}`]);
            setSelectedProvince('');
            setSelectedDistrict('');
            setSelectedWard('');
        }
        setModalVisible(false);
    };

    const removeAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.addButton} onPress={addNewAddress}>
                    <Text style={styles.buttonText}>Add new address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'Back >'}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Saved Addresses:</Text>
            {addresses.length === 0 ? (
                <Text style={styles.emptyText}>No addresses added yet.</Text>
            ) : (
                addresses.map((address, index) => (
                    <View key={index} style={styles.addressBox}>
                        <Text style={styles.addressText}>{address}</Text>
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeAddress(index)}>
                            <Text style={styles.removeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter new address:</Text>
                        <Picker
                            selectedValue={selectedProvince}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedProvince(itemValue);
                                fetchDistricts(provinces[itemIndex - 1]?.code);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a province" value="" />
                            {provinces.map((province, index) => (
                                <Picker.Item key={index} label={province.name} value={province.name} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={selectedDistrict}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedDistrict(itemValue);
                                fetchWards(districts[itemIndex - 1]?.code);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a district" value="" />
                            {districts.map((district, index) => (
                                <Picker.Item key={index} label={district.name} value={district.name} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={selectedWard}
                            onValueChange={(itemValue) => setSelectedWard(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a ward" value="" />
                            {wards.map((ward, index) => (
                                <Picker.Item key={index} label={ward.name} value={ward.name} />
                            ))}
                        </Picker>

                        <TouchableOpacity style={styles.okButton} onPress={confirmAddAddress}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    backButton: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 5 },
    backButtonText: { color: '#fff', fontWeight: 'bold' },
    addButton: { backgroundColor: '#FF6347', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    emptyText: { fontSize: 16, fontStyle: 'italic', color: '#888' },
    addressBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E0E0E0', padding: 10, borderRadius: 5, marginBottom: 10 },
    addressText: { fontSize: 14 },
    removeButton: { backgroundColor: '#FF0000', padding: 5, borderRadius: 5 },
    removeButtonText: { color: '#fff', fontWeight: 'bold' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    picker: { width: '100%', marginBottom: 10 },
    okButton: { backgroundColor: '#32CD32', padding: 10, borderRadius: 5 }
});
